import React from 'react';
import { useGym } from '../context/GymContext';
import {
  X,
  LogOut,
  LayoutDashboard,
  Users,
  DollarSign,
  Activity,
  Box,
  Lock,
  UserCheck,
  Dumbbell,
  Utensils,
  TrendingUp,
  Calendar,
  Flame,
  Award,
  IdCard,
  Sparkles
} from 'lucide-react';

export const MobileDrawer = ({ isOpen, onClose }) => {
  const { currentUser, logoutUser, activeTab, setActiveTab, data } = useGym();

  if (!isOpen) return null;

  const crowdPct = Math.round((data.gymProfile.liveOccupancy / data.gymProfile.maxCapacity) * 100);

  const adminMenu = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'finance', label: 'Finance & P&L', icon: DollarSign },
    { id: 'attendance', label: 'QR Gates', icon: Activity },
    { id: 'assets', label: 'Equipment & POS', icon: Box },
    { id: 'lockers', label: 'Lockers', icon: Lock },
  ];

  const trainerMenu = [
    { id: 'trainees', label: 'Trainees', icon: UserCheck },
    { id: 'workout-builder', label: 'Workouts', icon: Dumbbell },
    { id: 'diet-builder', label: 'Diet & Macros', icon: Utensils },
    { id: 'transformations', label: 'Progress Reviews', icon: TrendingUp },
    { id: 'schedule', label: 'PT Slots', icon: Calendar },
  ];

  const memberMenu = [
    { id: 'routine', label: "Today's Workout", icon: Flame },
    { id: 'diet-tracker', label: 'Diet & Water', icon: Utensils },
    { id: 'pr-vault', label: 'PR Vault', icon: Award },
    { id: 'digital-pass', label: 'Digital Pass', icon: IdCard },
    { id: 'metrics', label: 'Body Metrics', icon: TrendingUp },
    { id: 'leaderboard', label: 'Leaderboard', icon: Sparkles },
  ];

  const currentMenuItems = currentUser.role === 'ADMIN' ? adminMenu : currentUser.role === 'TRAINER' ? trainerMenu : memberMenu;

  return (
    <div className="fixed inset-0 top-0 left-0 w-screen h-screen z-[99999] md:hidden">
      {/* 1. Pure Opaque Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 w-full h-full bg-black/90 backdrop-blur-md"
      />

      {/* 2. Pure Solid Slide Drawer */}
      <div
        className="fixed top-0 left-0 w-[300px] max-w-[85vw] h-full shadow-2xl flex flex-col justify-between p-5 overflow-y-auto"
        style={{
          backgroundColor: '#0c0e14',
          borderRight: '1px solid #27272a',
          zIndex: 100000
        }}
      >
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div className="flex items-center space-x-2.5">
              <img src={currentUser.avatar} alt="" className="w-10 h-10 rounded-full object-cover border-2 border-emerald-400" />
              <div>
                <p className="text-xs font-bold text-white leading-tight">{currentUser.name}</p>
                <p className="text-[10px] text-emerald-400 uppercase font-mono">{currentUser.role} Portal</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-zinc-400 hover:text-white p-1.5 rounded-xl bg-zinc-900 border border-zinc-800"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Crowd Badge */}
          <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between text-xs">
            <span className="text-zinc-400">Live Gym Crowd:</span>
            <span className="font-mono font-bold text-emerald-400">
              {data.gymProfile.liveOccupancy}/{data.gymProfile.maxCapacity} ({crowdPct}%)
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 pt-1">
            <p className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 px-2 pb-1">Navigation Menu</p>
            {currentMenuItems.map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    onClose();
                  }}
                  className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                    active
                      ? 'bg-emerald-500 text-zinc-950 font-bold shadow-md shadow-emerald-500/20'
                      : 'text-zinc-300 hover:bg-zinc-850 hover:text-white'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sign Out */}
        <div className="pt-4 border-t border-zinc-800">
          <button
            onClick={() => {
              onClose();
              logoutUser();
            }}
            className="w-full py-2.5 rounded-xl font-bold text-xs bg-rose-950/50 hover:bg-rose-900/60 text-rose-300 border border-rose-800/40 flex items-center justify-center space-x-2 transition cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};
