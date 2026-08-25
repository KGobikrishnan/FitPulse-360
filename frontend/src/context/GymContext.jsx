import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialGymData } from '../data/gymData';
import { api } from '../services/api';

const GymContext = createContext(null);

export const GymProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('fitpulse_gym_data_v4');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return initialGymData;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('fitpulse_current_user_v4');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {}
    }
    return null;
  });

  const [activeTab, setActiveTab] = useState(() => {
    const savedUser = localStorage.getItem('fitpulse_current_user_v4');
    if (savedUser) {
      try {
        const u = JSON.parse(savedUser);
        if (u.role === 'TRAINER') return 'trainees';
        if (u.role === 'USER') return 'routine';
      } catch (e) {}
    }
    return 'dashboard';
  });
  const [toastMessage, setToastMessage] = useState(null);

  // Sync with PostgreSQL Backend when logged in as ADMIN
  useEffect(() => {
    const syncFromDB = async () => {
      const token = localStorage.getItem('fitpulse_jwt_token');
      if (!token) return; // Skip if not authenticated

      if (currentUser && currentUser.role !== 'ADMIN') return; // Only admin can fetch admin overview

      try {
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
              id: l.id || l.lockerNumber,
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
      } catch (err) {
        // Suppress unhandled errors if session expired
      }
    };
    syncFromDB();

    // Listen for unauthorized events to trigger clean logout
    const handleUnauthorized = () => {
      setCurrentUser(null);
      showToast('Session expired. Please log in again.');
    };
    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => window.removeEventListener('auth:unauthorized', handleUnauthorized);
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('fitpulse_gym_data_v4', JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('fitpulse_current_user_v4', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('fitpulse_current_user_v4');
    }
  }, [currentUser]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Real Database Login via JWT
  const loginUser = async (email, password) => {
    const dbRes = await api.login(email, password);
    if (dbRes && dbRes.role) {
      const loggedIn = {
        id: `u-${dbRes.id}`,
        name: dbRes.name,
        email: dbRes.email,
        role: dbRes.role,
        avatar: dbRes.role === 'ADMIN'
          ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
          : dbRes.role === 'TRAINER'
          ? 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=150&auto=format&fit=crop&q=80'
          : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        badge: dbRes.role === 'ADMIN' ? 'Executive Director' : dbRes.role === 'TRAINER' ? 'Lead Coach' : 'Member'
      };
      setCurrentUser(loggedIn);
      setActiveTab(loggedIn.role === 'ADMIN' ? 'dashboard' : loggedIn.role === 'TRAINER' ? 'trainees' : 'routine');
      showToast(`Welcome back, ${loggedIn.name}! Authenticated via PostgreSQL JWT.`);
      return true;
    }

    // Local Fallback Verification if server is offline
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
    api.logout();
    localStorage.removeItem('fitpulse_jwt_token');
    localStorage.removeItem('fitpulse_refresh_token');
    setCurrentUser(null);
    showToast('Logged out successfully.');
  };

  const switchRole = (role) => {
    if (role === 'ADMIN') loginUser('admin@fitlife.com', 'admin123');
    else if (role === 'TRAINER') loginUser('trainer@fitlife.com', 'trainer123');
    else if (role === 'USER') loginUser('user@fitlife.com', 'user123');
  };

  // ADMIN ACTIONS WITH BACKEND SYNC
  const addMember = async (member) => {
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

  const updateMemberStatus = async (memberId, newStatus) => {
    await api.updateMemberStatus(memberId, newStatus);
    setData((prev) => ({
      ...prev,
      members: prev.members.map((m) => (m.id === memberId ? { ...m, status: newStatus } : m))
    }));
    showToast(`Member status updated to ${newStatus}`);
  };

  const recordExpense = async (expense) => {
    await api.recordExpense({
      name: expense.name,
      amount: Number(expense.amount),
      category: 'General',
      expenseDate: new Date().toISOString().split('T')[0]
    });

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
    showToast(`Expense recorded in database: ₹${expense.amount} for ${expense.name}`);
  };

  const toggleLockerStatus = async (lockerId, newStatus, assignedTo = null) => {
    await api.updateLockerStatus(lockerId, newStatus, assignedTo);
    setData((prev) => ({
      ...prev,
      lockers: prev.lockers.map((loc) =>
        loc.id === lockerId || loc.number === lockerId ? { ...loc, status: newStatus, assignedTo } : loc
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
    showToast(`Equipment ${eqId} status saved.`);
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

  // TRAINER ACTIONS WITH BACKEND SYNC
  const saveWorkoutTemplate = async (newTemplate) => {
    await api.createWorkout({
      name: newTemplate.name,
      trainerId: currentUser.id,
      targetGoal: newTemplate.targetGoal,
      difficulty: newTemplate.difficulty,
      exercisesJson: JSON.stringify(newTemplate.exercises)
    });

    setData((prev) => ({
      ...prev,
      workoutTemplates: [
        { ...newTemplate, id: `tpl-${Date.now()}`, trainerId: currentUser.id },
        ...prev.workoutTemplates
      ]
    }));
    showToast(`Workout plan "${newTemplate.name}" created and synced to database!`);
  };

  const saveDietPlan = async (newDiet) => {
    await api.assignDiet({
      name: newDiet.name,
      trainerId: currentUser.id,
      calorieTarget: newDiet.calorieTarget,
      waterIntakeLiters: newDiet.waterIntakeLiters,
      proteinG: newDiet.macros.proteinG,
      carbsG: newDiet.macros.carbsG,
      fatG: newDiet.macros.fatG,
      mealsJson: JSON.stringify(newDiet.meals)
    });

    setData((prev) => ({
      ...prev,
      dietPlans: [
        { ...newDiet, id: `dp-${Date.now()}`, trainerId: currentUser.id },
        ...prev.dietPlans
      ]
    }));
    showToast(`Diet chart "${newDiet.name}" assigned & saved to database!`);
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

  // MEMBER ACTIONS (Offline resilient)
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

    if (!navigator.onLine) {
      try {
        const queue = JSON.parse(localStorage.getItem('fitpulse_offline_sync_queue') || '[]');
        queue.push({ action: 'TOGGLE_SET', exerciseId, setIndex, time: new Date().toISOString() });
        localStorage.setItem('fitpulse_offline_sync_queue', JSON.stringify(queue));
      } catch (e) {}
      showToast('⚡ Logged set offline! Will auto-sync when network returns.');
    }
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
