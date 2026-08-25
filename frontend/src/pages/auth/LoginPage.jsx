import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';
import { ThreeHeroTorus } from '../../components/ThreeHeroTorus';
import { Dumbbell, Lock, Mail, ArrowRight, ShieldCheck, UserCheck, Flame, Sparkles, Activity, CheckCircle2, Zap, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

export const LoginPage = () => {
  const { loginUser } = useGym();
  const [email, setEmail] = useState('admin@fitlife.com');
  const [password, setPassword] = useState('admin123');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

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

  const handleQuickFill = (roleEmail, rolePass) => {
    setEmail(roleEmail);
    setPassword(rolePass);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-3 sm:p-6 lg:p-10 relative overflow-hidden">
      {/* Dynamic Aurora Ambient Background Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-emerald-400/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-5xl z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
        {/* Left Side: 3D Interactive Telemetry Showcase (Desktop & Large Screen) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:flex lg:col-span-7 flex-col justify-between p-8 xl:p-10 liquid-glass-hero h-[600px] relative overflow-hidden border border-white/90 shadow-2xl"
        >
          {/* Top Brand Pill */}
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center space-x-3">
              <div className="h-11 w-11 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/30">
                <Dumbbell className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight font-display">
                  FIT<span className="text-indigo-600">PULSE</span> 360
                </h2>
                <p className="text-[10px] text-slate-500 font-mono font-bold tracking-wider uppercase">Enterprise Studio OS</p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-700 warm-badge-emerald px-3 py-1 rounded-full shadow-2xs">
              ● WebGL 3D Studio Live
            </span>
          </div>

          {/* Interactive Three.js 3D Dumbbell Assembly */}
          <div className="relative h-64 w-full my-auto flex items-center justify-center">
            <div className="w-full h-full">
              <ThreeHeroTorus className="w-full h-full" />
            </div>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center pointer-events-none">
              <span className="text-[10px] font-mono font-bold text-slate-400 bg-white/70 px-3 py-1 rounded-full border border-white/90 shadow-2xs backdrop-blur-md">
                🖱️ Drag & Tilt 3D Dumbbell Telemetry
              </span>
            </div>
          </div>

          {/* Bottom Feature Badges */}
          <div className="grid grid-cols-3 gap-3 z-10 pt-4 border-t border-white/80">
            <div className="p-3 rounded-2xl bg-white/70 backdrop-blur-md border border-white/90 shadow-2xs">
              <Activity className="h-4 w-4 text-indigo-600 mb-1" />
              <p className="font-bold text-slate-900 text-xs font-display">Live Telemetry</p>
              <p className="text-[10px] text-slate-500 font-mono">Biometric Sync</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/70 backdrop-blur-md border border-white/90 shadow-2xs">
              <Trophy className="h-4 w-4 text-amber-500 mb-1" />
              <p className="font-bold text-slate-900 text-xs font-display">1-Rep Max PR</p>
              <p className="text-[10px] text-slate-500 font-mono">Real-time Leaderboard</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/70 backdrop-blur-md border border-white/90 shadow-2xs">
              <ShieldCheck className="h-4 w-4 text-emerald-600 mb-1" />
              <p className="font-bold text-slate-900 text-xs font-display">RBAC Security</p>
              <p className="text-[10px] text-slate-500 font-mono">Spring 6 + JWT</p>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Liquid Frosted Glass Login Portal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-5 w-full space-y-4 sm:space-y-5"
        >
          {/* Mobile Header (Shown on mobile only) */}
          <div className="text-center space-y-1.5 lg:hidden">
            <div className="inline-flex h-12 w-12 rounded-2xl bg-indigo-600 items-center justify-center shadow-lg shadow-indigo-600/30 mb-1">
              <Dumbbell className="h-6 w-6 text-white font-black" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight font-display">
              FIT<span className="text-indigo-600">PULSE</span> 360
            </h1>
            <p className="text-[11px] text-slate-500 font-medium">
              Next-Gen Gym Operating System & Coaching Telemetry
            </p>
          </div>

          {/* Login Card Surface */}
          <div className="liquid-glass p-5 sm:p-7 border border-white/90 shadow-2xl space-y-4 sm:space-y-5 backdrop-blur-3xl">
            <div className="flex items-center justify-between border-b border-white/80 pb-3">
              <div>
                <h2 className="text-sm sm:text-base font-bold text-slate-900 font-display">Sign In to Dashboard</h2>
                <p className="text-[11px] text-slate-500">Access your personalized workspace</p>
              </div>
              <span className="text-[10px] font-mono bg-indigo-50/90 text-indigo-700 border border-indigo-200/80 px-2.5 py-1 rounded-full font-bold shadow-2xs">
                PostgreSQL Live
              </span>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-2xl bg-rose-50/90 border border-rose-200 text-xs text-rose-700 font-medium shadow-2xs animate-shake">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div className="space-y-1.5">
                <label className="text-slate-700 font-bold flex items-center gap-1.5 text-xs">
                  <Mail className="h-3.5 w-3.5 text-indigo-600" />
                  <span>Email Address</span>
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
                <label className="text-slate-700 font-bold flex items-center gap-1.5 text-xs">
                  <Lock className="h-3.5 w-3.5 text-indigo-600" />
                  <span>Password</span>
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/80 border border-white/90 rounded-2xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 shadow-2xs transition"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-shiny w-full py-3 rounded-2xl font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 cursor-pointer transition disabled:opacity-50 font-display text-xs active:scale-98"
              >
                <span>{loading ? 'Authenticating...' : 'Access Dashboard'}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            {/* Quick Demo Credentials Switcher */}
            <div className="pt-3.5 border-t border-white/80 space-y-2.5">
              <p className="text-[10px] uppercase font-mono tracking-widest text-slate-400 text-center font-bold">
                ⚡ 1-Click Demo Portals
              </p>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickFill('admin@fitlife.com', 'admin123')}
                  className={`p-2.5 rounded-2xl border text-center transition cursor-pointer shadow-2xs active:scale-95 ${
                    email === 'admin@fitlife.com'
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20'
                      : 'bg-white/70 hover:bg-indigo-50 text-slate-800 border-white/90 hover:border-indigo-200'
                  }`}
                >
                  <ShieldCheck className={`h-4 w-4 mx-auto mb-1 ${email === 'admin@fitlife.com' ? 'text-white' : 'text-indigo-600'}`} />
                  <p className="text-[11px] font-bold font-display leading-tight">Admin</p>
                  <p className={`text-[9px] font-mono ${email === 'admin@fitlife.com' ? 'text-indigo-100' : 'text-slate-400'}`}>admin123</p>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickFill('trainer@fitlife.com', 'trainer123')}
                  className={`p-2.5 rounded-2xl border text-center transition cursor-pointer shadow-2xs active:scale-95 ${
                    email === 'trainer@fitlife.com'
                      ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-600/20'
                      : 'bg-white/70 hover:bg-purple-50 text-slate-800 border-white/90 hover:border-purple-200'
                  }`}
                >
                  <UserCheck className={`h-4 w-4 mx-auto mb-1 ${email === 'trainer@fitlife.com' ? 'text-white' : 'text-purple-600'}`} />
                  <p className="text-[11px] font-bold font-display leading-tight">Trainer</p>
                  <p className={`text-[9px] font-mono ${email === 'trainer@fitlife.com' ? 'text-purple-100' : 'text-slate-400'}`}>trainer123</p>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickFill('user@fitlife.com', 'user123')}
                  className={`p-2.5 rounded-2xl border text-center transition cursor-pointer shadow-2xs active:scale-95 ${
                    email === 'user@fitlife.com'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20'
                      : 'bg-white/70 hover:bg-emerald-50 text-slate-800 border-white/90 hover:border-emerald-200'
                  }`}
                >
                  <Flame className={`h-4 w-4 mx-auto mb-1 ${email === 'user@fitlife.com' ? 'text-white' : 'text-emerald-600'}`} />
                  <p className="text-[11px] font-bold font-display leading-tight">Member</p>
                  <p className={`text-[9px] font-mono ${email === 'user@fitlife.com' ? 'text-emerald-100' : 'text-slate-400'}`}>user123</p>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
