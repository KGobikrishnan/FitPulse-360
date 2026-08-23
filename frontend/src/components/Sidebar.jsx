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
    <aside className="w-64 shrink-0 hidden md:flex flex-col justify-between bg-white border-r border-slate-200/80 min-h-[calc(100vh-61px)] p-4 shadow-2xs">
      <div className="space-y-5">
        {/* Current Portal Dropdown Badge */}
        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-1.5 rounded-lg bg-emerald-100/80 text-emerald-700">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Current Portal</p>
              <p className="text-xs font-bold text-slate-800 capitalize">{currentUser.role.toLowerCase()} Mode</p>
            </div>
          </div>
          <ChevronDown className="h-4 w-4 text-slate-400" />
        </div>

        {/* Main Navigation */}
        <nav className="space-y-1">
          <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 px-3 pb-1.5 font-bold">
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
                    ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* AI Insights Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50/50 to-teal-50/30 border border-emerald-100 space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-emerald-800">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
              <span>Smart Insights</span>
            </div>
            <span className="text-[9px] font-mono bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">
              AI LIVE
            </span>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            Personal training revenue retention increased by 38% this quarter.
          </p>
          <button className="text-[11px] text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1 cursor-pointer pt-0.5">
            <span>Explore Trends</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Upgrade to Pro & Collapse Footer */}
      <div className="space-y-3 pt-4 border-t border-slate-100">
        <div className="p-4 rounded-2xl bg-slate-900 text-white relative overflow-hidden shadow-lg shadow-slate-900/10">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-white">Upgrade to Studio Pro</h4>
            <Rocket className="h-4 w-4 text-purple-300" />
          </div>
          <p className="text-[11px] text-slate-300 mt-1 leading-normal">
            Multi-branch sync, biometric hardware bridges & auto payroll.
          </p>
          <button className="btn-shiny mt-3 w-full py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20 cursor-pointer">
            Unlock Full Access
          </button>
        </div>

        <button className="w-full flex items-center space-x-2 px-3 py-1.5 text-xs text-slate-400 hover:text-slate-600 transition cursor-pointer">
          <ChevronLeft className="h-3.5 w-3.5" />
          <span>Collapse Sidebar</span>
        </button>
      </div>
    </aside>
  );
};
