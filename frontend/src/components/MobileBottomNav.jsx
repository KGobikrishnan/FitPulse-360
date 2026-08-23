import React from 'react';
import { useGym } from '../context/GymContext';
import {
  LayoutDashboard,
  Users,
  DollarSign,
  Activity,
  Dumbbell,
  Flame,
  Utensils,
  Award,
  IdCard,
  TrendingUp
} from 'lucide-react';

export const MobileBottomNav = () => {
  const { currentUser, activeTab, setActiveTab } = useGym();

  if (!currentUser) return null;

  const adminTabs = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'finance', label: 'Finance', icon: DollarSign },
    { id: 'attendance', label: 'QR Gates', icon: Activity },
  ];

  const trainerTabs = [
    { id: 'trainees', label: 'Trainees', icon: Users },
    { id: 'workout-builder', label: 'Workouts', icon: Flame },
    { id: 'diet-builder', label: 'Diet', icon: Utensils },
    { id: 'transformations', label: 'Reviews', icon: TrendingUp },
  ];

  const memberTabs = [
    { id: 'routine', label: 'Workout', icon: Flame },
    { id: 'diet-tracker', label: 'Diet', icon: Utensils },
    { id: 'pr-vault', label: 'PRs', icon: Award },
    { id: 'digital-pass', label: 'Pass', icon: IdCard },
  ];

  const tabs = currentUser.role === 'ADMIN' ? adminTabs : currentUser.role === 'TRAINER' ? trainerTabs : memberTabs;

  return (
    <nav className="md:hidden fixed bottom-3 left-3 right-3 z-40 bg-white/75 backdrop-blur-2xl border border-white/90 rounded-2xl px-2 py-2 flex items-center justify-around shadow-lg shadow-indigo-950/5">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center justify-center space-y-1 px-3 py-1.5 rounded-xl transition-all cursor-pointer relative ${
              isActive
                ? 'text-indigo-700 font-bold bg-indigo-50/80 shadow-2xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Icon className={`h-4.5 w-4.5 ${isActive ? 'text-indigo-600 stroke-[2.5]' : 'text-slate-400'}`} />
            <span className="text-[10px] tracking-tight font-medium font-display">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
