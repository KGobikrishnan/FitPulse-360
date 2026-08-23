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
  Sparkles,
  ShieldCheck,
  Zap,
  ChevronRight
} from 'lucide-react';

export const MobileDrawer = ({ isOpen, onClose }) => {
  const { currentUser, logoutUser, activeTab, setActiveTab, data } = useGym();

  if (!isOpen) return null;

  const crowdPct = Math.round((data.gymProfile.liveOccupancy / data.gymProfile.maxCapacity) * 100);

  const adminMenu = [
    { id: 'dashboard', label: 'Business Overview', icon: LayoutDashboard },
    { id: 'members', label: 'Members & Invoicing', icon: Users },
    { id: 'finance', label: 'Finance & P&L', icon: DollarSign },
    { id: 'attendance', label: 'QR Passes & Heatmap', icon: Activity },
    { id: 'assets', label: 'Equipment & Mini POS', icon: Box },
    { id: 'lockers', label: 'Lockers & Stores', icon: Lock },
  ];

  const trainerMenu = [
    { id: 'trainees', label: 'Trainees Roster', icon: Users },
    { id: 'workout-builder', label: 'Workout Builder', icon: Flame },
    { id: 'diet-builder', label: 'Diet & Macro Chart', icon: Utensils },
    { id: 'transformations', label: 'Progress Review', icon: TrendingUp },
    { id: 'schedule', label: '1-on-1 PT Schedule', icon: Calendar },
  ];

  const memberMenu = [
    { id: 'routine', label: "Today's Workout", icon: Flame },
    { id: 'diet-tracker', label: 'Diet & Hydration', icon: Utensils },
    { id: 'pr-vault', label: 'PR (1-Rep Max) Vault', icon: Award },
    { id: 'digital-pass', label: 'Digital Gym Pass', icon: IdCard },
    { id: 'metrics', label: 'Body Metrics & Photos', icon: TrendingUp },
    { id: 'leaderboard', label: 'Leaderboard & Streaks', icon: Sparkles },
  ];

  const currentMenuItems = currentUser.role === 'ADMIN' ? adminMenu : currentUser.role === 'TRAINER' ? trainerMenu : memberMenu;

  return (
    <div className="fixed inset-0 top-0 left-0 w-screen h-screen z-[99999] md:hidden">
      {/* 1. Frosted Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 w-full h-full bg-slate-900/40 backdrop-blur-md transition-opacity"
      />

      {/* 2. macOS Liquid Glass Slide Drawer (Right Side) */}
      <div
        className="fixed top-0 right-0 w-[310px] max-w-[85vw] h-full shadow-2xl flex flex-col justify-between p-5 overflow-y-auto bg-white/85 backdrop-blur-2xl border-l border-white/90 animate-in slide-in-from-right duration-300"
        style={{ zIndex: 100000 }}
      >
        <div className="space-y-4">
          {/* Header Profile Capsule */}
          <div className="flex items-center justify-between border-b border-white/80 pb-3.5">
            <div className="flex items-center space-x-3">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-11 h-11 rounded-2xl object-cover ring-2 ring-indigo-600/40 shadow-sm"
              />
              <div>
                <p className="text-xs font-bold text-slate-900 leading-tight font-display">{currentUser.name}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="text-[10px] font-mono font-bold text-indigo-700 bg-indigo-50/90 border border-indigo-200/80 px-2 py-0.5 rounded-md shadow-2xs">
                    {currentUser.role.toLowerCase() === 'user' ? 'Member' : currentUser.role} Tier
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-700 p-2 rounded-2xl bg-white/80 border border-white cursor-pointer shadow-2xs active:scale-95 transition"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Floor Capacity Metric Pill */}
          <div className="p-3.5 rounded-2xl bg-white/70 backdrop-blur-md border border-white flex items-center justify-between text-xs shadow-2xs">
            <span className="text-slate-600 font-medium flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5 text-indigo-600" />
              <span>Live Floor Density:</span>
            </span>
            <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              {data.gymProfile.liveOccupancy}/{data.gymProfile.maxCapacity} ({crowdPct}%)
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 pt-1">
            <p className="text-[10px] uppercase font-mono tracking-widest text-slate-400 px-3 pb-1 font-bold">
              Navigation Menu
            </p>
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
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
                    active
                      ? 'bg-gradient-to-r from-indigo-500/15 to-indigo-500/5 text-indigo-700 font-bold border border-indigo-200/80 shadow-xs'
                      : 'text-slate-600 hover:bg-white/60 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`h-4 w-4 ${active ? 'text-indigo-600' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {active && <ChevronRight className="h-3.5 w-3.5 text-indigo-500" />}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sign Out Capsule */}
        <div className="pt-4 border-t border-white/80 space-y-3">
          <button
            onClick={() => {
              onClose();
              logoutUser();
            }}
            className="btn-shiny w-full py-2.5 rounded-2xl font-bold text-xs bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200/80 flex items-center justify-center space-x-2 transition cursor-pointer shadow-2xs active:scale-98"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out from FitPulse</span>
          </button>
        </div>
      </div>
    </div>
  );
};
