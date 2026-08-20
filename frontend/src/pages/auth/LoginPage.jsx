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
    <div className="min-h-screen bg-[#090a0f] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Dynamic Background Glow Elements */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md space-y-6 z-10">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex h-14 w-14 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-500 items-center justify-center shadow-xl shadow-emerald-500/20 mb-2">
            <Dumbbell className="h-7 w-7 text-black font-black" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight font-mono">
            FIT<span className="text-emerald-400">PULSE</span> 360
          </h1>
          <p className="text-xs text-zinc-400">
            Enterprise Gym Management, Coaching & Member Portal
          </p>
        </div>

        {/* Login Box */}
        <div className="glass-panel p-8 rounded-3xl border border-zinc-800 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <h2 className="text-base font-bold text-white">Sign In to Dashboard</h2>
            <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold">
              PostgreSQL Connected
            </span>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-xs text-rose-300">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="text-zinc-300 font-semibold flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-zinc-400" />
                <span>Email Address</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. admin@fitlife.com"
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2.5 text-zinc-100 focus:outline-none focus:border-emerald-500 transition"
              />
            </div>

            <div className="space-y-1">
              <label className="text-zinc-300 font-semibold flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5 text-zinc-400" />
                <span>Password</span>
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2.5 text-zinc-100 focus:outline-none focus:border-emerald-500 transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-bold bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer transition disabled:opacity-50"
            >
              <span>{loading ? 'Authenticating...' : 'Access Dashboard'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* Quick Demo Credentials Switcher */}
          <div className="pt-4 border-t border-zinc-800 space-y-2">
            <p className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 text-center">
              Quick Demo Accounts (Database Pre-Seeded)
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickFill('admin@fitlife.com', 'admin123')}
                className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-center transition cursor-pointer"
              >
                <ShieldCheck className="h-4 w-4 text-emerald-400 mx-auto mb-1" />
                <p className="text-[11px] font-bold text-zinc-200">Admin</p>
                <p className="text-[9px] text-zinc-500 font-mono">admin123</p>
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('trainer@fitlife.com', 'trainer123')}
                className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-center transition cursor-pointer"
              >
                <UserCheck className="h-4 w-4 text-purple-400 mx-auto mb-1" />
                <p className="text-[11px] font-bold text-zinc-200">Trainer</p>
                <p className="text-[9px] text-zinc-500 font-mono">trainer123</p>
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('user@fitlife.com', 'user123')}
                className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-center transition cursor-pointer"
              >
                <Flame className="h-4 w-4 text-cyan-400 mx-auto mb-1" />
                <p className="text-[11px] font-bold text-zinc-200">Member</p>
                <p className="text-[9px] text-zinc-500 font-mono">user123</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
