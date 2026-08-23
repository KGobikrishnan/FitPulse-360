import React from 'react';
import { useGym } from '../context/GymContext';
import {
  LayoutDashboard,
  Users,
  Dumbbell,
  Flame,
  Utensils,
  Award,
  IdCard
} from 'lucide-react';

export const MobileBottomNav = () => {
  const { currentUser, activeTab, setActiveTab } = useGym();

  if (!currentUser) return null;

  const adminTabs = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'finance', label: 'Finance', icon: LayoutDashboard },
    { id: 'attendance', label: 'Gates', icon: LayoutDashboard },
  ];

  const trainerTabs = [
    { id: 'trainees', label: 'Trainees', icon: Users },
    { id: 'workout-builder', label: 'Workouts', icon: Dumbbell },
    { id: 'diet-builder', label: 'Diet', icon: Utensils },
    { id: 'transformations', label: 'Reviews', icon: LayoutDashboard },
  ];

  const memberTabs = [
    { id: 'routine', label: 'Workout', icon: Flame },
    { id: 'diet-tracker', label: 'Diet', icon: Utensils },
    { id: 'pr-vault', label: 'PRs', icon: Award },
    { id: 'digital-pass', label: 'Pass', icon: IdCard },
  ];

  const tabs = currentUser.role === 'ADMIN' ? adminTabs : currentUser.role === 'TRAINER' ? trainerTabs : memberTabs;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-lg border-t border-slate-200 px-3 py-2 flex items-center justify-around shadow-lg">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center justify-center space-y-1 px-3 py-1 rounded-xl transition cursor-pointer ${
              isActive ? 'text-emerald-700 font-bold' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Icon className={`h-5 w-5 ${isActive ? 'text-emerald-600 stroke-[2.5]' : 'text-slate-400'}`} />
            <span className="text-[10px] tracking-tight">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
