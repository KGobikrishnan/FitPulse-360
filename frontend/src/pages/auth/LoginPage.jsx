import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';
import { Dumbbell, Lock, Mail, ArrowRight, ShieldCheck, UserCheck, Flame, Sparkles } from 'lucide-react';

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
    <div className="min-h-screen bg-[#F7F5F0] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Subtle Warm Background Blur Blobs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md space-y-6 z-10">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex h-14 w-14 rounded-2xl bg-indigo-600 items-center justify-center shadow-lg shadow-indigo-600/25 mb-1">
            <Dumbbell className="h-7 w-7 text-white font-black" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight font-display">
            FIT<span className="text-indigo-600">PULSE</span> 360
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Next-Gen Gym Operating System & Coaching Telemetry
          </p>
        </div>

        {/* Login Box */}
        <div className="warm-card p-8 border border-[#EAE6DF] shadow-xl space-y-6 bg-white">
          <div className="flex items-center justify-between border-b border-[#EAE6DF] pb-3">
            <h2 className="text-base font-bold text-slate-900 font-display">Sign In to Dashboard</h2>
            <span className="text-[10px] font-mono bg-indigo-50 text-indigo-700 border border-indigo-200 px-2.5 py-0.5 rounded-full font-bold">
              PostgreSQL Live
            </span>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="text-slate-700 font-bold flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-slate-400" />
                <span>Email Address</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. admin@fitlife.com"
                className="w-full bg-[#FAF9F5] border border-[#EAE6DF] rounded-xl px-4 py-2.5 text-slate-800 focus:outline-none focus:border-indigo-500 transition"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-700 font-bold flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5 text-slate-400" />
                <span>Password</span>
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#FAF9F5] border border-[#EAE6DF] rounded-xl px-4 py-2.5 text-slate-800 focus:outline-none focus:border-indigo-500 transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-shiny w-full py-3 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 cursor-pointer transition disabled:opacity-50 font-display"
            >
              <span>{loading ? 'Authenticating...' : 'Access Dashboard'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* Quick Demo Credentials Switcher */}
          <div className="pt-4 border-t border-[#EAE6DF] space-y-2.5">
            <p className="text-[10px] uppercase font-mono tracking-widest text-slate-400 text-center font-bold">
              1-Click Demo Portals
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickFill('admin@fitlife.com', 'admin123')}
                className="p-2.5 rounded-xl bg-[#FAF9F5] hover:bg-indigo-50 border border-[#EAE6DF] hover:border-indigo-200 text-center transition cursor-pointer shadow-2xs"
              >
                <ShieldCheck className="h-4 w-4 text-indigo-600 mx-auto mb-1" />
                <p className="text-[11px] font-bold text-slate-800 font-display">Admin</p>
                <p className="text-[9px] text-slate-400 font-mono">admin123</p>
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('trainer@fitlife.com', 'trainer123')}
                className="p-2.5 rounded-xl bg-[#FAF9F5] hover:bg-purple-50 border border-[#EAE6DF] hover:border-purple-200 text-center transition cursor-pointer shadow-2xs"
              >
                <UserCheck className="h-4 w-4 text-purple-600 mx-auto mb-1" />
                <p className="text-[11px] font-bold text-slate-800 font-display">Trainer</p>
                <p className="text-[9px] text-slate-400 font-mono">trainer123</p>
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('user@fitlife.com', 'user123')}
                className="p-2.5 rounded-xl bg-[#FAF9F5] hover:bg-emerald-50 border border-[#EAE6DF] hover:border-emerald-200 text-center transition cursor-pointer shadow-2xs"
              >
                <Flame className="h-4 w-4 text-emerald-600 mx-auto mb-1" />
                <p className="text-[11px] font-bold text-slate-800 font-display">Member</p>
                <p className="text-[9px] text-slate-400 font-mono">user123</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
