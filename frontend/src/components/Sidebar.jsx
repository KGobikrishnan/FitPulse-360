import React from 'react';
import { useGym } from '../context/GymContext';
import {
  LayoutDashboard,
  Users,
  DollarSign,
  QrCode,
  Dumbbell,
  ShieldCheck,
  Calendar,
  Utensils,
  TrendingUp,
  Activity,
  Flame,
  Award,
  IdCard,
  Layers,
  Box,
  CreditCard,
  UserCheck,
  Lock,
  Sparkles
} from 'lucide-react';

export const Sidebar = () => {
  const { currentUser, activeTab, setActiveTab } = useGym();

  const adminMenu = [
    { id: 'dashboard', label: 'Business Overview', icon: LayoutDashboard },
    { id: 'members', label: 'Members & Invoicing', icon: Users },
    { id: 'finance', label: 'Finance & P&L', icon: DollarSign },
    { id: 'attendance', label: 'QR Passes & Heatmap', icon: Activity },
    { id: 'assets', label: 'Equipment & Mini POS', icon: Box },
    { id: 'lockers', label: 'Lockers & Slots', icon: Lock },
  ];

  const trainerMenu = [
    { id: 'trainees', label: 'Assigned Trainees', icon: UserCheck },
    { id: 'workout-builder', label: 'Workout Builder', icon: Dumbbell },
    { id: 'diet-builder', label: 'Diet & Macro Chart', icon: Utensils },
    { id: 'transformations', label: 'Transformation Review', icon: TrendingUp },
    { id: 'schedule', label: '1-on-1 PT Schedule', icon: Calendar },
    { id: 'earnings', label: 'Trainer Commissions', icon: DollarSign },
  ];

  const memberMenu = [
    { id: 'routine', label: "Today's Workout", icon: Flame },
    { id: 'diet-tracker', label: 'Diet & Water Tracker', icon: Utensils },
    { id: 'pr-vault', label: 'PR (1-Rep Max) Vault', icon: Award },
    { id: 'digital-pass', label: 'Digital QR Pass', icon: IdCard },
    { id: 'metrics', label: 'Body Metrics & Photos', icon: TrendingUp },
    { id: 'leaderboard', label: 'Leaderboard & Streaks', icon: Sparkles },
  ];

  const getMenuItems = () => {
    if (currentUser.role === 'ADMIN') return adminMenu;
    if (currentUser.role === 'TRAINER') return trainerMenu;
    return memberMenu;
  };

  const menu = getMenuItems();

  return (
    <aside className="w-64 shrink-0 hidden md:block glass-panel border-r border-zinc-800/80 min-h-[calc(100vh-65px)] p-4">
      {/* Role Banner Badge */}
      <div className="mb-6 p-3 rounded-2xl bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 border border-zinc-700/60 shadow-inner">
        <div className="flex items-center space-x-2">
          <div className={`p-1.5 rounded-lg ${
            currentUser.role === 'ADMIN' ? 'bg-emerald-500/20 text-emerald-400' :
            currentUser.role === 'TRAINER' ? 'bg-purple-500/20 text-purple-400' :
            'bg-cyan-500/20 text-cyan-400'
          }`}>
            <ShieldCheck className="h-4 w-4" />
          </div>
          <div>
            <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Current Portal</p>
            <p className="text-xs font-bold text-white capitalize">{currentUser.role.toLowerCase()} Mode</p>
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="space-y-1.5">
        <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 px-3 pb-1">Navigation Menu</p>
        {menu.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer text-left ${
                isActive
                  ? currentUser.role === 'ADMIN'
                    ? 'bg-emerald-500 text-zinc-950 font-bold shadow-lg shadow-emerald-500/20 translate-x-1'
                    : currentUser.role === 'TRAINER'
                    ? 'bg-purple-500 text-white font-bold shadow-lg shadow-purple-500/20 translate-x-1'
                    : 'bg-cyan-500 text-zinc-950 font-bold shadow-lg shadow-cyan-500/20 translate-x-1'
                  : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60'
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? 'text-inherit' : 'text-zinc-400'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Quick Helper Box */}
      <div className="mt-12 p-3.5 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 text-xs text-zinc-400 space-y-2">
        <div className="flex items-center space-x-1.5 text-emerald-400 font-semibold">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Dev Portfolio Note</span>
        </div>
        <p className="text-[11px] leading-relaxed text-zinc-400">
          Switch roles using top navbar buttons to experience role-specific UI, state mutations & business flows.
        </p>
      </div>
    </aside>
  );
};
