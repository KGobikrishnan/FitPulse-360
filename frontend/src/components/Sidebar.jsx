import React from 'react';
import { useGym } from '../context/GymContext';
import {
  LayoutDashboard,
  Users,
  DollarSign,
  Activity,
  Box,
  Lock,
  Calendar,
  Utensils,
  TrendingUp,
  Flame,
  Award,
  IdCard,
  Sparkles,
  ShieldCheck,
  ChevronDown,
  Rocket,
  ArrowRight,
  ChevronLeft
} from 'lucide-react';

export const Sidebar = () => {
  const { currentUser, activeTab, setActiveTab } = useGym();

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

  const menu = currentUser.role === 'ADMIN' ? adminMenu : currentUser.role === 'TRAINER' ? trainerMenu : memberMenu;

  return (
    <aside className="w-64 shrink-0 hidden md:flex flex-col justify-between bg-[#0b0d13] border-r border-white/[0.07] min-h-[calc(100vh-61px)] p-4">
      <div className="space-y-5">
        {/* Current Portal Dropdown Badge */}
        <div className="p-3 rounded-2xl bg-[#12151f] border border-white/[0.07] flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[9px] font-mono uppercase tracking-wider text-zinc-500">Current Portal</p>
              <p className="text-xs font-bold text-white capitalize">{currentUser.role.toLowerCase()} Mode</p>
            </div>
          </div>
          <ChevronDown className="h-4 w-4 text-zinc-500" />
        </div>

        {/* Main Navigation */}
        <nav className="space-y-1">
          <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 px-3 pb-1 font-bold">
            Main Navigation
          </p>
          {menu.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer text-left ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-500/20 to-emerald-500/5 text-emerald-400 border border-emerald-500/30 font-bold shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#12151f]'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-emerald-400' : 'text-zinc-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* AI Insights Card */}
        <div className="p-3.5 rounded-2xl bg-[#12151f] border border-white/[0.07] space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-emerald-400">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Insights</span>
            </div>
            <span className="text-[9px] font-mono bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded font-bold">
              NEW
            </span>
          </div>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            AI-powered insights to help you make smarter business decisions.
          </p>
          <button className="text-[11px] text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 cursor-pointer">
            <span>View Insights</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Upgrade to Pro & Collapse Footer */}
      <div className="space-y-3 pt-4 border-t border-white/[0.07]">
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#181c2b] to-[#12151f] border border-white/[0.08] relative overflow-hidden">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-white">Upgrade to Pro</h4>
            <Rocket className="h-4 w-4 text-purple-400" />
          </div>
          <p className="text-[10px] text-zinc-400 mt-1">
            Unlock advanced analytics, custom reports & more.
          </p>
          <button className="mt-3 w-full py-1.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-black shadow-md shadow-emerald-500/20 cursor-pointer">
            Upgrade Now
          </button>
        </div>

        <button className="w-full flex items-center space-x-2 px-3 py-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition">
          <ChevronLeft className="h-3.5 w-3.5" />
          <span>Collapse</span>
        </button>
      </div>
    </aside>
  );
};
