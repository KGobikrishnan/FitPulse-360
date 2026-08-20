import React from 'react';
import { useGym } from '../context/GymContext';
import {
  LayoutDashboard,
  Users,
  DollarSign,
  Activity,
  UserCheck,
  Dumbbell,
  Utensils,
  TrendingUp,
  Flame,
  Award,
  IdCard,
  Sparkles
} from 'lucide-react';

export const MobileBottomNav = () => {
  const { currentUser, activeTab, setActiveTab } = useGym();

  const adminTabs = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'finance', label: 'Finance', icon: DollarSign },
    { id: 'attendance', label: 'Gates', icon: Activity },
  ];

  const trainerTabs = [
    { id: 'trainees', label: 'Trainees', icon: UserCheck },
    { id: 'workout-builder', label: 'Workouts', icon: Dumbbell },
    { id: 'diet-builder', label: 'Diets', icon: Utensils },
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
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/95 backdrop-blur-lg border-t border-zinc-800/80 px-2 py-1.5 flex justify-around items-center">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition cursor-pointer ${
              isActive
                ? 'text-emerald-400 font-bold'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Icon className={`h-5 w-5 ${isActive ? 'scale-110' : ''}`} />
            <span className="text-[10px] mt-0.5 tracking-tight">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};
