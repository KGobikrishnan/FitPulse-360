import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialGymData } from '../data/gymData';
import { api } from '../services/api';

const GymContext = createContext(null);

export const GymProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('fitpulse_gym_data_v3');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return initialGymData;
  });

  // Current logged in user context (null if not logged in)
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('fitpulse_current_user_v3');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {}
    }
    return null; // Force Login Page first
  });

  // Active view / subtab
  const [activeTab, setActiveTab] = useState('dashboard');
  const [toastMessage, setToastMessage] = useState(null);

  // Sync with PostgreSQL Backend on startup
  useEffect(() => {
    const syncFromDB = async () => {
      const dbOverview = await api.getAdminOverview();
      if (dbOverview && dbOverview.members) {
        setData((prev) => ({
          ...prev,
          members: dbOverview.members.map((m) => ({
            id: `m-${m.id}`,
            name: m.fullName,
            email: m.email,
            phone: m.phone || '+91 98765 00000',
            planName: m.planName || 'Monthly Elite',
            status: m.status || 'ACTIVE',
            startDate: m.startDate || '2026-01-01',
            expiryDate: m.expiryDate || '2027-01-01',
            trainerName: 'Marcus Vance',
            lockerNo: m.lockerNo || 'L-01',
            totalPaid: m.totalPaid || 2499,
            pendingDue: m.pendingDue || 0,
            streak: m.streak || 1,
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
            qrCodeString: m.qrCodeString || `FITPULSE-PASS-M${m.id}`,
            weight: 78.5,
            targetWeight: 72.0,
            bodyFat: '17.2%',
            muscleMass: '36.8 kg'
          })),
          lockers: dbOverview.lockers && dbOverview.lockers.length > 0 ? dbOverview.lockers.map((l) => ({
            id: l.lockerNumber,
            number: l.lockerNumber,
            status: l.status,
            assignedTo: l.assignedTo,
            gender: l.gender
          })) : prev.lockers,
          equipmentList: dbOverview.equipmentList && dbOverview.equipmentList.length > 0 ? dbOverview.equipmentList : prev.equipmentList,
          inventoryStore: dbOverview.inventoryStore && dbOverview.inventoryStore.length > 0 ? dbOverview.inventoryStore : prev.inventoryStore,
          recentAttendance: dbOverview.recentAttendance && dbOverview.recentAttendance.length > 0 ? dbOverview.recentAttendance : prev.recentAttendance
        }));
      }
    };
    syncFromDB();
  }, []);

  useEffect(() => {
    localStorage.setItem('fitpulse_gym_data_v3', JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('fitpulse_current_user_v3', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('fitpulse_current_user_v3');
    }
  }, [currentUser]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // LOGIN FLOW (Checks DB or fallback)
  const loginUser = async (email, password) => {
    // 1. Try Backend DB authentication first
    const dbRes = await api.login(email, password);
    if (dbRes && dbRes.role) {
      const loggedIn = {
        id: `u-${dbRes.id}`,
        name: dbRes.name,
        email: dbRes.email,
        role: dbRes.role, // ADMIN | TRAINER | USER
        avatar: dbRes.role === 'ADMIN'
          ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
          : dbRes.role === 'TRAINER'
          ? 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=150&auto=format&fit=crop&q=80'
          : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        badge: dbRes.role === 'ADMIN' ? 'Executive Director' : dbRes.role === 'TRAINER' ? 'Lead Coach' : 'Member'
      };
      setCurrentUser(loggedIn);
      setActiveTab(loggedIn.role === 'ADMIN' ? 'dashboard' : loggedIn.role === 'TRAINER' ? 'trainees' : 'routine');
      showToast(`Welcome back, ${loggedIn.name}! Authenticated via PostgreSQL.`);
      return true;
    }

    // 2. Local Fallback Verification
    if (email === 'admin@fitlife.com' && password === 'admin123') {
      const u = {
        id: 'u-admin',
        name: 'Vikram Malhotra',
        email: 'admin@fitlife.com',
        role: 'ADMIN',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        badge: 'Executive Director',
      };
      setCurrentUser(u);
      setActiveTab('dashboard');
      showToast('Welcome, Vikram Malhotra (Admin)');
      return true;
    } else if (email === 'trainer@fitlife.com' && password === 'trainer123') {
      const u = {
        id: 't1',
        name: 'Marcus Vance',
        email: 'trainer@fitlife.com',
        role: 'TRAINER',
        avatar: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=150&auto=format&fit=crop&q=80',
        badge: 'Lead Coach',
      };
      setCurrentUser(u);
      setActiveTab('trainees');
      showToast('Welcome, Coach Marcus Vance');
      return true;
    } else if (email === 'user@fitlife.com' && password === 'user123') {
      const u = {
        id: 'm1',
        name: 'Rahul Sharma',
        email: 'user@fitlife.com',
        role: 'USER',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        badge: 'Beast Mode Member 🔥',
      };
      setCurrentUser(u);
      setActiveTab('routine');
      showToast('Welcome, Rahul Sharma');
      return true;
    }
    return false;
  };

  const logoutUser = () => {
    setCurrentUser(null);
    showToast('Logged out successfully.');
  };

  // Switch role seamlessly
  const switchRole = (role) => {
    if (role === 'ADMIN') {
      loginUser('admin@fitlife.com', 'admin123');
    } else if (role === 'TRAINER') {
      loginUser('trainer@fitlife.com', 'trainer123');
    } else if (role === 'USER') {
      loginUser('user@fitlife.com', 'user123');
    }
  };

  // ADMIN ACTIONS
  const addMember = async (member) => {
    // Send to PostgreSQL Backend
    await api.enrollMember(member);

    const newMember = {
      ...member,
      id: `m-${Date.now()}`,
      qrCodeString: `FITPULSE-PASS-${Date.now()}`,
      streak: 1,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      totalPaid: Number(member.totalPaid || 0),
      pendingDue: Number(member.pendingDue || 0),
      weight: Number(member.weight || 70),
      targetWeight: Number(member.targetWeight || 65),
      bodyFat: '20.0%',
      muscleMass: '32.0 kg'
    };
    setData((prev) => ({
      ...prev,
      members: [newMember, ...prev.members],
      financials: {
        ...prev.financials,
        monthlyRevenue: prev.financials.monthlyRevenue + newMember.totalPaid,
        netProfit: prev.financials.netProfit + newMember.totalPaid
      }
    }));
    showToast(`Member "${member.name}" enrolled into PostgreSQL & auto-invoiced!`);
  };

  const updateMemberStatus = (memberId, newStatus) => {
    setData((prev) => ({
      ...prev,
      members: prev.members.map((m) => (m.id === memberId ? { ...m, status: newStatus } : m))
    }));
    showToast(`Member status updated to ${newStatus}`);
  };

  const recordExpense = (expense) => {
    setData((prev) => ({
      ...prev,
      financials: {
        ...prev.financials,
        monthlyExpense: prev.financials.monthlyExpense + Number(expense.amount),
        netProfit: prev.financials.monthlyRevenue - (prev.financials.monthlyExpense + Number(expense.amount)),
        expenseBreakdown: [
          ...prev.financials.expenseBreakdown,
          { name: expense.name, amount: Number(expense.amount), color: '#ec4899' }
        ]
      }
    }));
    showToast(`Expense recorded: ₹${expense.amount} for ${expense.name}`);
  };

  const toggleLockerStatus = (lockerId, newStatus, assignedTo = null) => {
    setData((prev) => ({
      ...prev,
      lockers: prev.lockers.map((loc) =>
        loc.id === lockerId ? { ...loc, status: newStatus, assignedTo } : loc
      )
    }));
    showToast(`Locker ${lockerId} status updated: ${newStatus}`);
  };

  const updateEquipmentStatus = (eqId, status, nextDue) => {
    setData((prev) => ({
      ...prev,
      equipmentList: prev.equipmentList.map((eq) =>
        eq.id === eqId ? { ...eq, status, nextDue: nextDue || eq.nextDue } : eq
      )
    }));
    showToast(`Equipment ${eqId} maintenance status saved.`);
  };

  const sellInventoryItem = (itemId, qty = 1) => {
    setData((prev) => {
      const item = prev.inventoryStore.find((i) => i.id === itemId);
      if (!item || item.stock < qty) return prev;
      const saleAmount = item.price * qty;
      return {
        ...prev,
        inventoryStore: prev.inventoryStore.map((i) =>
          i.id === itemId ? { ...i, stock: i.stock - qty } : i
        ),
        financials: {
          ...prev.financials,
          monthlyRevenue: prev.financials.monthlyRevenue + saleAmount,
          netProfit: prev.financials.netProfit + saleAmount
        }
      };
    });
    showToast(`POS: Sold ${qty} item(s). Revenue updated!`);
  };

  const simulateQRCheckIn = async (qrPassString) => {
    // Also sync to Backend DB
    await api.scanGateQR(qrPassString);

    const member = data.members.find((m) => m.qrCodeString === qrPassString || m.id === qrPassString || m.name.toLowerCase().includes(qrPassString.toLowerCase()));
    if (!member) {
      showToast("❌ QR Scanner: Invalid or Unrecognized Pass!");
      return { success: false, message: "Invalid Pass" };
    }
    if (member.status === "EXPIRED") {
      const log = {
        id: `att-${Date.now()}`,
        memberName: member.name,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        method: "QR Scanner Gate 1",
        status: "Denied (Membership Expired)"
      };
      setData((prev) => ({ ...prev, recentAttendance: [log, ...prev.recentAttendance] }));
      showToast(`⛔ ACCESS DENIED for ${member.name} (Membership Expired)`);
      return { success: false, member, message: "Membership Expired" };
    }

    const log = {
      id: `att-${Date.now()}`,
      memberName: member.name,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      method: "QR Scanner Gate 1",
      status: "Granted"
    };
    setData((prev) => ({
      ...prev,
      recentAttendance: [log, ...prev.recentAttendance],
      members: prev.members.map((m) => (m.id === member.id ? { ...m, streak: m.streak + 1 } : m)),
      gymProfile: { ...prev.gymProfile, liveOccupancy: Math.min(prev.gymProfile.maxCapacity, prev.gymProfile.liveOccupancy + 1) }
    }));
    showToast(`✅ ACCESS GRANTED: Welcome ${member.name}! (Streak +1 🔥)`);
    return { success: true, member, message: "Access Granted" };
  };

  // TRAINER ACTIONS
  const saveWorkoutTemplate = (newTemplate) => {
    setData((prev) => ({
      ...prev,
      workoutTemplates: [
        { ...newTemplate, id: `tpl-${Date.now()}`, trainerId: currentUser.id },
        ...prev.workoutTemplates
      ]
    }));
    showToast(`Workout plan "${newTemplate.name}" created and published!`);
  };

  const saveDietPlan = (newDiet) => {
    setData((prev) => ({
      ...prev,
      dietPlans: [
        { ...newDiet, id: `dp-${Date.now()}`, trainerId: currentUser.id },
        ...prev.dietPlans
      ]
    }));
    showToast(`Diet chart "${newDiet.name}" assigned successfully!`);
  };

  const addTrainerFeedback = (memberId, noteText) => {
    setData((prev) => ({
      ...prev,
      traineeTransformations: prev.traineeTransformations.map((t) =>
        t.memberId === memberId ? { ...t, trainerNotes: noteText } : t
      )
    }));
    showToast("Feedback sent to trainee dashboard!");
  };

  // MEMBER ACTIONS
  const toggleExerciseSet = (exerciseId, setIndex) => {
    setData((prev) => {
      const routine = { ...prev.todayMemberRoutine };
      routine.exercises = routine.exercises.map((ex) => {
        if (ex.id === exerciseId) {
          const sets = [...ex.loggedSets];
          sets[setIndex] = { ...sets[setIndex], done: !sets[setIndex].done };
          const allDone = sets.every((s) => s.done);
          return { ...ex, loggedSets: sets, completed: allDone };
        }
        return ex;
      });
      return { ...prev, todayMemberRoutine: routine };
    });
  };

  const logNewPR = (pr) => {
    setData((prev) => ({
      ...prev,
      personalRecords: [
        { ...pr, date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), icon: 'Flame' },
        ...prev.personalRecords
      ]
    }));
    showToast(`🔥 NEW PR CELEBRATION! Logged ${pr.lift} @ ${pr.weight}!`);
  };

  return (
    <GymContext.Provider
      value={{
        data,
        currentUser,
        activeTab,
        setActiveTab,
        toastMessage,
        showToast,
        loginUser,
        logoutUser,
        switchRole,
        // Admin
        addMember,
        updateMemberStatus,
        recordExpense,
        toggleLockerStatus,
        updateEquipmentStatus,
        sellInventoryItem,
        simulateQRCheckIn,
        // Trainer
        saveWorkoutTemplate,
        saveDietPlan,
        addTrainerFeedback,
        // Member
        toggleExerciseSet,
        logNewPR
      }}
    >
      {children}
    </GymContext.Provider>
  );
};

export const useGym = () => {
  const context = useContext(GymContext);
  if (!context) throw new Error("useGym must be used within a GymProvider");
  return context;
};
