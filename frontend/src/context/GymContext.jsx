import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialGymData } from '../data/gymData';

const GymContext = createContext(null);

export const GymProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('fitpulse_gym_data_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved state, using default initial data", e);
      }
    }
    return initialGymData;
  });

  // Current logged in user context
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('fitpulse_current_user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {
        console.error("Failed to parse saved user", e);
      }
    }
    return initialGymData.currentUser;
  });

  // Active view / subtab
  const [activeTab, setActiveTab] = useState('dashboard');
  const [toastMessage, setToastMessage] = useState(null);

  // Save to localStorage on state changes
  useEffect(() => {
    localStorage.setItem('fitpulse_gym_data_v2', JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem('fitpulse_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Switch role seamlessly
  const switchRole = (role) => {
    if (role === 'ADMIN') {
      setCurrentUser({
        id: 'u-admin',
        name: 'Vikram Malhotra',
        email: 'admin@fitlife.com',
        role: 'ADMIN',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        badge: 'Master Gym Director',
      });
      setActiveTab('dashboard');
      showToast('Switched to Admin Dashboard (Full Business & Operations)');
    } else if (role === 'TRAINER') {
      setCurrentUser({
        id: 't1',
        name: 'Marcus Vance',
        email: 'trainer@fitlife.com',
        role: 'TRAINER',
        avatar: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=150&auto=format&fit=crop&q=80',
        badge: 'Lead Strength Coach',
      });
      setActiveTab('trainees');
      showToast('Switched to Trainer Portal (Client Tracking & Plan Builder)');
    } else if (role === 'USER') {
      setCurrentUser({
        id: 'm1',
        name: 'Rahul Sharma',
        email: 'user@fitlife.com',
        role: 'USER',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        badge: 'Beast Mode Member (16-Day Streak 🔥)',
      });
      setActiveTab('routine');
      showToast('Switched to Member Portal (Workout Logger & Digital Pass)');
    }
  };

  // ADMIN ACTIONS
  const addMember = (member) => {
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
    showToast(`Member "${member.name}" enrolled successfully! Auto-invoice generated.`);
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

  const simulateQRCheckIn = (qrPassString) => {
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
