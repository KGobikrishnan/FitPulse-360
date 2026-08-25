import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';
import { 
  Dumbbell, Lock, Mail, ArrowRight, ShieldCheck, UserCheck, Flame, Sparkles, 
  Activity, CheckCircle2, Zap, Trophy, TrendingUp, Users, HeartPulse, 
  Timer, KeyRound, ChevronRight, Eye, EyeOff
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const LoginPage = () => {
  const { loginUser } = useGym();
  const [email, setEmail] = useState('admin@fitlife.com');
  const [password, setPassword] = useState('admin123');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeRole, setActiveRole] = useState('admin');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);
    const success = await loginUser(email, password);
    setLoading(false);
    if (!success) {
      setErrorMsg('Invalid email or password. Please verify your credentials.');
    }
  };

  const handleRoleSelect = (role, roleEmail, rolePass) => {
    setActiveRole(role);
    setEmail(roleEmail);
    setPassword(rolePass);
    setErrorMsg('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-3 sm:p-6 lg:p-10 relative overflow-hidden">
      {/* Dynamic Aurora Ambient Background Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-400/15 rounded-full blur-[130px] pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-5xl z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
        
        {/* 🌟 Left Side: Studio Operating Telemetry & Live Showcase (Desktop & Tablet) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:flex lg:col-span-7 flex-col justify-between p-8 xl:p-10 liquid-glass-hero min-h-[580px] relative overflow-hidden border border-white/90 shadow-2xl"
        >
          {/* Top Brand & Status */}
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center space-x-3.5">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-600/30 ring-2 ring-white">
                <Dumbbell className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight font-display">
                  FIT<span className="text-indigo-600">PULSE</span> 360
                </h2>
                <p className="text-[10px] text-slate-500 font-mono font-bold tracking-wider uppercase">Enterprise Studio OS v2.4</p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-700 warm-badge-emerald px-3 py-1 rounded-full shadow-2xs flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>PostgreSQL & Redis Live</span>
            </span>
          </div>

          {/* Centerpiece: Live Gym Operating Telemetry Deck */}
          <div className="my-auto py-6 space-y-4 z-10">
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200/80">
                ⚡ Real-Time Studio Ecosystem
              </span>
              <h3 className="text-2xl xl:text-3xl font-black text-slate-900 font-display tracking-tight leading-tight">
                High-Performance Gym Operations & Athlete Intelligence
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Unified multi-tenant dashboard connecting coaches, members, and management with automated billing and workout tracking.
              </p>
            </div>

            {/* Live Interactive Stat Chips */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-white/80 backdrop-blur-md border border-white/90 shadow-2xs flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-mono font-bold uppercase">Monthly Growth</p>
                  <p className="text-sm font-black text-slate-900 font-display tabular-numbers">+41.8% <span className="text-[10px] font-normal text-emerald-600 font-mono">YoY</span></p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/80 backdrop-blur-md border border-white/90 shadow-2xs flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-purple-50 text-purple-600 shrink-0">
                  <HeartPulse className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-mono font-bold uppercase">Active Athletes</p>
                  <p className="text-sm font-black text-slate-900 font-display tabular-numbers">248 <span className="text-[10px] font-normal text-purple-600 font-mono">Live</span></p>
                </div>
              </div>
            </div>

            {/* Live Workout Stream Preview Pill */}
            <div className="p-3.5 rounded-2xl bg-white/60 backdrop-blur-md border border-white/90 shadow-2xs flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 flex items-center justify-center text-white text-xs font-bold shadow-2xs">
                  🏆
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 font-display">Leaderboard: 180kg Deadlift PR Logged</p>
                  <p className="text-[10px] text-slate-500 font-mono">Marcus Vance • Strength Conditioning Arena</p>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full warm-badge-amber">
                Just Now
              </span>
            </div>
          </div>

          {/* Bottom Security Footer */}
          <div className="grid grid-cols-3 gap-2.5 z-10 pt-4 border-t border-white/80 text-center text-xs">
            <div className="p-2.5 rounded-xl bg-white/60 border border-white/90 shadow-2xs">
              <ShieldCheck className="h-4 w-4 text-indigo-600 mx-auto mb-0.5" />
              <p className="font-bold text-slate-800 text-[11px]">Spring Security 6</p>
              <p className="text-[9px] text-slate-400 font-mono">RBAC + JWT</p>
            </div>
            <div className="p-2.5 rounded-xl bg-white/60 border border-white/90 shadow-2xs">
              <Zap className="h-4 w-4 text-amber-500 mx-auto mb-0.5" />
              <p className="font-bold text-slate-800 text-[11px]">Instant Cache</p>
              <p className="text-[9px] text-slate-400 font-mono">Redis Powered</p>
            </div>
            <div className="p-2.5 rounded-xl bg-white/60 border border-white/90 shadow-2xs">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 mx-auto mb-0.5" />
              <p className="font-bold text-slate-800 text-[11px]">99.9% Uptime</p>
              <p className="text-[9px] text-slate-400 font-mono">Docker Cluster</p>
            </div>
          </div>
        </motion.div>

        {/* 🔐 Right Side: Liquid Frosted Glass Login Portal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-5 w-full space-y-3.5"
        >
          {/* Mobile High-Impact Header & Live Stat Chips (Shown on Mobile Only) */}
          <div className="space-y-3 lg:hidden">
            <div className="flex items-center justify-between bg-white/70 backdrop-blur-xl p-3 rounded-2xl border border-white/90 shadow-sm">
              <div className="flex items-center space-x-2.5">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center shadow-md shadow-indigo-600/30 text-white">
                  <Dumbbell className="h-5 w-5" />
                </div>
                <div>
                  <h1 className="text-base font-black text-slate-900 tracking-tight font-display">
                    FIT<span className="text-indigo-600">PULSE</span> 360
                  </h1>
                  <p className="text-[9px] text-slate-500 font-mono font-bold">Studio OS v2.4</p>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold text-emerald-700 warm-badge-emerald px-2.5 py-1 rounded-full flex items-center gap-1 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                <span>Live Sync</span>
              </span>
            </div>

            {/* Mobile 2x1 Live Telemetry Banner */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 rounded-2xl bg-white/60 backdrop-blur-md border border-white/80 shadow-2xs flex items-center space-x-2">
                <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
                  <TrendingUp className="h-3.5 w-3.5" />
                </div>
                <div>
                  <p className="text-[8px] text-slate-400 font-mono font-bold uppercase">Growth</p>
                  <p className="text-xs font-black text-slate-900 font-display">+41.8% <span className="text-[8px] font-normal text-emerald-600 font-mono">YoY</span></p>
                </div>
              </div>

              <div className="p-2.5 rounded-2xl bg-white/60 backdrop-blur-md border border-white/80 shadow-2xs flex items-center space-x-2">
                <div className="p-1.5 rounded-lg bg-purple-50 text-purple-600">
                  <HeartPulse className="h-3.5 w-3.5" />
                </div>
                <div>
                  <p className="text-[8px] text-slate-400 font-mono font-bold uppercase">Athletes</p>
                  <p className="text-xs font-black text-slate-900 font-display">248 <span className="text-[8px] font-normal text-purple-600 font-mono">Active</span></p>
                </div>
              </div>
            </div>

            {/* Mobile PR Ticker */}
            <div className="p-2.5 rounded-2xl bg-white/60 backdrop-blur-md border border-white/80 shadow-2xs flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2 truncate">
                <span className="text-xs">🏆</span>
                <p className="text-[11px] font-bold text-slate-800 font-display truncate">180kg Deadlift PR Logged</p>
              </div>
              <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full warm-badge-amber shrink-0 ml-1">
                Just Now
              </span>
            </div>
          </div>

          {/* Login Card Surface */}
          <div className="liquid-glass p-4 sm:p-7 border border-white/90 shadow-2xl space-y-3.5 sm:space-y-4 backdrop-blur-3xl">
            <div className="flex items-center justify-between border-b border-white/80 pb-2.5">
              <div>
                <h2 className="text-sm sm:text-base font-bold text-slate-900 font-display">Sign In to Dashboard</h2>
                <p className="text-[10px] sm:text-[11px] text-slate-500">Select your role or enter credentials</p>
              </div>
              <span className="text-[9px] sm:text-[10px] font-mono bg-indigo-50/90 text-indigo-700 border border-indigo-200/80 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full font-bold shadow-2xs">
                Encrypted Session
              </span>
            </div>

            {/* Interactive 1-Click Role Switcher */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-bold block">
                Select Workspace Role
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleRoleSelect('admin', 'admin@fitlife.com', 'admin123')}
                  className={`p-2.5 rounded-2xl border text-center transition cursor-pointer active:scale-95 shadow-2xs ${
                    activeRole === 'admin'
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/25 ring-2 ring-indigo-300/40'
                      : 'bg-white/70 hover:bg-indigo-50/80 text-slate-700 border-white/90'
                  }`}
                >
                  <ShieldCheck className={`h-4 w-4 mx-auto mb-1 ${activeRole === 'admin' ? 'text-white' : 'text-indigo-600'}`} />
                  <p className="text-[11px] font-bold font-display leading-tight">Admin</p>
                  <p className={`text-[9px] font-mono ${activeRole === 'admin' ? 'text-indigo-100' : 'text-slate-400'}`}>Control</p>
                </button>

                <button
                  type="button"
                  onClick={() => handleRoleSelect('trainer', 'trainer@fitlife.com', 'trainer123')}
                  className={`p-2.5 rounded-2xl border text-center transition cursor-pointer active:scale-95 shadow-2xs ${
                    activeRole === 'trainer'
                      ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-600/25 ring-2 ring-purple-300/40'
                      : 'bg-white/70 hover:bg-purple-50/80 text-slate-700 border-white/90'
                  }`}
                >
                  <UserCheck className={`h-4 w-4 mx-auto mb-1 ${activeRole === 'trainer' ? 'text-white' : 'text-purple-600'}`} />
                  <p className="text-[11px] font-bold font-display leading-tight">Trainer</p>
                  <p className={`text-[9px] font-mono ${activeRole === 'trainer' ? 'text-purple-100' : 'text-slate-400'}`}>Coach</p>
                </button>

                <button
                  type="button"
                  onClick={() => handleRoleSelect('member', 'user@fitlife.com', 'user123')}
                  className={`p-2.5 rounded-2xl border text-center transition cursor-pointer active:scale-95 shadow-2xs ${
                    activeRole === 'member'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/25 ring-2 ring-emerald-300/40'
                      : 'bg-white/70 hover:bg-emerald-50/80 text-slate-700 border-white/90'
                  }`}
                >
                  <Flame className={`h-4 w-4 mx-auto mb-1 ${activeRole === 'member' ? 'text-white' : 'text-emerald-600'}`} />
                  <p className="text-[11px] font-bold font-display leading-tight">Member</p>
                  <p className={`text-[9px] font-mono ${activeRole === 'member' ? 'text-emerald-100' : 'text-slate-400'}`}>Athlete</p>
                </button>
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-2xl bg-rose-50/90 border border-rose-200 text-xs text-rose-700 font-medium shadow-2xs animate-shake">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3 text-xs pt-1">
              <div className="space-y-1.5">
                <label className="text-slate-700 font-bold flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 text-indigo-600" />
                    <span>Email Address</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Demo: {email}</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. admin@fitlife.com"
                  className="w-full bg-white/80 border border-white/90 rounded-2xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 shadow-2xs transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-700 font-bold flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5">
                    <Lock className="h-3.5 w-3.5 text-indigo-600" />
                    <span>Password</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[10px] text-indigo-600 hover:text-indigo-800 font-mono font-bold cursor-pointer"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white/80 border border-white/90 rounded-2xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 shadow-2xs transition pr-10"
                  />
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                    <KeyRound className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-shiny w-full py-3 mt-2 rounded-2xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600 text-white shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 cursor-pointer transition disabled:opacity-50 font-display text-xs active:scale-98"
              >
                <span>{loading ? 'Authenticating...' : `Access ${activeRole.toUpperCase()} Dashboard`}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="pt-2 text-center">
              <p className="text-[10px] text-slate-400 font-mono">
                Protected by JWT Stateless Session & Encrypted Tokens
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
