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
    <aside className="w-64 shrink-0 hidden md:flex flex-col justify-between bg-white/60 backdrop-blur-2xl border-r border-white/80 min-h-[calc(100vh-61px)] p-4 shadow-xs">
      <div className="space-y-5">
        {/* Current Portal Badge */}
        <div className="p-3 rounded-2xl bg-white/70 backdrop-blur-md border border-white flex items-center justify-between shadow-2xs">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-indigo-50/90 text-indigo-700 border border-indigo-100/80 shadow-2xs">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Portal Mode</p>
              <p className="text-xs font-bold text-slate-800 capitalize font-display">{currentUser.role.toLowerCase()} Tier</p>
            </div>
          </div>
          <ChevronDown className="h-4 w-4 text-slate-400" />
        </div>

        {/* Main Navigation */}
        <nav className="space-y-1.5">
          <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 px-3 pb-1 font-bold">
            Navigation
          </p>
          {menu.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-2xl text-xs font-semibold cursor-pointer text-left nav-item-slide transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-500/15 to-indigo-500/5 text-indigo-700 font-bold border border-indigo-200/80 active shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* AI Smart Actionable Insight Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-white/80 to-purple-50/70 backdrop-blur-xl border border-purple-200/80 space-y-2.5 relative overflow-hidden shadow-2xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-purple-900">
              <Sparkles className="h-4 w-4 text-purple-600" />
              <span>Smart Insight</span>
            </div>
            <span className="text-[9px] font-mono bg-purple-100/90 text-purple-800 px-2 py-0.5 rounded-full font-bold">
              LIVE TELEMETRY
            </span>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
            Recurring PT retention is up <strong className="text-purple-900 font-bold">+38%</strong> this month.
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            <button className="text-[10px] bg-white border border-purple-200 text-purple-700 font-bold px-2.5 py-1 rounded-xl hover:bg-purple-50 cursor-pointer shadow-2xs">
              View Roster
            </button>
            <button className="text-[10px] bg-indigo-600 text-white font-bold px-2.5 py-1 rounded-xl hover:bg-indigo-700 cursor-pointer shadow-2xs">
              Apply Growth
            </button>
          </div>
        </div>
      </div>

      {/* Footer Pro Upgrade */}
      <div className="space-y-3 pt-4 border-t border-white/60">
        <div className="p-4 rounded-2xl bg-slate-900/90 backdrop-blur-xl text-white relative overflow-hidden shadow-lg border border-slate-700/50">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-white font-display">Studio Enterprise</h4>
            <Rocket className="h-4 w-4 text-indigo-400" />
          </div>
          <p className="text-[11px] text-slate-300 mt-1 leading-normal">
            Multi-branch sync, biometric IoT gate & auto payroll.
          </p>
          <button className="btn-shiny mt-3 w-full py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 cursor-pointer">
            Upgrade Access
          </button>
        </div>

        <button className="w-full flex items-center space-x-2 px-3 py-1.5 text-xs text-slate-400 hover:text-slate-600 transition cursor-pointer">
          <ChevronLeft className="h-3.5 w-3.5" />
          <span>Collapse</span>
        </button>
      </div>
    </aside>
  );
};
