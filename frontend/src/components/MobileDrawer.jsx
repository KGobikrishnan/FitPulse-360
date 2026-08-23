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
      {/* 1. Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 w-full h-full bg-slate-900/50 backdrop-blur-sm"
      />

      {/* 2. Slide Drawer */}
      <div
        className="fixed top-0 left-0 w-[300px] max-w-[85vw] h-full shadow-2xl flex flex-col justify-between p-5 overflow-y-auto bg-white border-r border-slate-200"
        style={{ zIndex: 100000 }}
      >
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2.5">
              <img src={currentUser.avatar} alt="" className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500" />
              <div>
                <p className="text-xs font-bold text-slate-900 leading-tight">{currentUser.name}</p>
                <p className="text-[10px] text-emerald-700 uppercase font-mono font-bold">{currentUser.role} Portal</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-700 p-1.5 rounded-xl bg-slate-100 border border-slate-200 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Crowd Badge */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
            <span className="text-slate-600 font-medium">Live Floor Crowd:</span>
            <span className="font-mono font-bold text-emerald-700">
              {data.gymProfile.liveOccupancy}/{data.gymProfile.maxCapacity} ({crowdPct}%)
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 pt-1">
            <p className="text-[10px] uppercase font-mono tracking-widest text-slate-400 px-2 pb-1 font-bold">Navigation Menu</p>
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
                      ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 shadow-2xs'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${active ? 'text-emerald-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sign Out */}
        <div className="pt-4 border-t border-slate-100">
          <button
            onClick={() => {
              onClose();
              logoutUser();
            }}
            className="w-full py-2.5 rounded-xl font-bold text-xs bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 flex items-center justify-center space-x-2 transition cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};
