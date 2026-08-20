import React, { useState } from 'react';
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
  LogOut,
  Bell,
  Sparkles,
  Search,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export const Navbar = () => {
  const { currentUser, switchRole, data, toastMessage, simulateQRCheckIn } = useGym();
  const [showQRScanModal, setShowQRScanModal] = useState(false);
  const [scannedCode, setScannedCode] = useState('');
  const [scanResult, setScanResult] = useState(null);

  const handleScanSubmit = (e) => {
    e.preventDefault();
    if (!scannedCode) return;
    const res = simulateQRCheckIn(scannedCode);
    setScanResult(res);
    setTimeout(() => {
      setScanResult(null);
      setScannedCode('');
    }, 3000);
  };

  const crowdPct = Math.round((data.gymProfile.liveOccupancy / data.gymProfile.maxCapacity) * 100);

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-zinc-800/80 px-4 lg:px-8 py-3.5 flex items-center justify-between">
      {/* Brand */}
      <div className="flex items-center space-x-3">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <Dumbbell className="h-5 w-5 text-black font-black" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-extrabold tracking-tight text-lg text-white font-mono">
              FIT<span className="text-emerald-400">PULSE</span>
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              360 Enterprise
            </span>
          </div>
          <p className="text-xs text-zinc-400 hidden sm:block">
            {data.gymProfile.name} • {data.gymProfile.tagline}
          </p>
        </div>
      </div>

      {/* Live Crowd Meter Indicator */}
      <div className="hidden md:flex items-center space-x-4 px-4 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800">
        <div className="flex items-center space-x-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              crowdPct > 80 ? 'bg-rose-400' : crowdPct > 50 ? 'bg-amber-400' : 'bg-emerald-400'
            }`} />
            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
              crowdPct > 80 ? 'bg-rose-500' : crowdPct > 50 ? 'bg-amber-500' : 'bg-emerald-500'
            }`} />
          </span>
          <span className="text-xs font-semibold text-zinc-300">Live Gym Density:</span>
          <span className={`text-xs font-bold ${
            crowdPct > 80 ? 'text-rose-400' : crowdPct > 50 ? 'text-amber-400' : 'text-emerald-400'
          }`}>
            {data.gymProfile.liveOccupancy} / {data.gymProfile.maxCapacity} ({crowdPct}%)
          </span>
        </div>
        <button
          onClick={() => setShowQRScanModal(true)}
          className="text-xs flex items-center space-x-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-medium transition cursor-pointer"
        >
          <QrCode className="h-3.5 w-3.5" />
          <span>Scan Gate QR</span>
        </button>
      </div>

      {/* Role Switcher & User Profile */}
      <div className="flex items-center space-x-3">
        {/* Quick Role Switcher Pill for Recruiters/Evaluators */}
        <div className="flex items-center p-1 rounded-xl bg-zinc-900 border border-zinc-800 text-xs">
          <button
            onClick={() => switchRole('ADMIN')}
            className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
              currentUser.role === 'ADMIN'
                ? 'bg-emerald-500 text-zinc-950 font-bold shadow-md shadow-emerald-500/20'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Admin
          </button>
          <button
            onClick={() => switchRole('TRAINER')}
            className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
              currentUser.role === 'TRAINER'
                ? 'bg-purple-500 text-white font-bold shadow-md shadow-purple-500/20'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Trainer
          </button>
          <button
            onClick={() => switchRole('USER')}
            className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
              currentUser.role === 'USER'
                ? 'bg-cyan-500 text-zinc-950 font-bold shadow-md shadow-cyan-500/20'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Member
          </button>
        </div>

        {/* User Avatar */}
        <div className="flex items-center space-x-2 pl-2 border-l border-zinc-800">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-9 h-9 rounded-full object-cover border-2 border-emerald-500/30"
          />
          <div className="hidden xl:block text-left">
            <p className="text-xs font-semibold text-zinc-200 leading-tight">{currentUser.name}</p>
            <p className="text-[10px] text-emerald-400 font-mono">{currentUser.role}</p>
          </div>
        </div>
      </div>

      {/* Gate QR Check-in Simulator Modal */}
      {showQRScanModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-md rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center space-x-2">
                <QrCode className="h-5 w-5 text-emerald-400" />
                <h3 className="font-bold text-lg text-white">Entrance QR / Biometric Gate</h3>
              </div>
              <button
                onClick={() => setShowQRScanModal(false)}
                className="text-zinc-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-zinc-400">
              Test member check-in gate. Paste a digital pass code or type member name (e.g., <code className="text-emerald-400">FITPULSE-PASS-M1-RAHUL</code> or <code className="text-emerald-400">Rahul Sharma</code> or <code className="text-rose-400">Sneha Patel</code> (Expired)).
            </p>

            <form onSubmit={handleScanSubmit} className="space-y-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter Pass ID or Member Name..."
                  value={scannedCode}
                  onChange={(e) => setScannedCode(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => setScannedCode('FITPULSE-PASS-M1-RAHUL')}
                  className="text-[11px] bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-2.5 py-1.5 rounded-lg"
                >
                  Quick: Rahul (Active)
                </button>
                <button
                  type="button"
                  onClick={() => setScannedCode('FITPULSE-PASS-M4-SNEHA')}
                  className="text-[11px] bg-rose-950/40 hover:bg-rose-900/40 text-rose-300 border border-rose-800/40 px-2.5 py-1.5 rounded-lg"
                >
                  Quick: Sneha (Expired)
                </button>
              </div>

              {scanResult && (
                <div
                  className={`p-3 rounded-xl flex items-center space-x-3 text-xs ${
                    scanResult.success
                      ? 'bg-emerald-950/50 border border-emerald-500/40 text-emerald-300'
                      : 'bg-rose-950/50 border border-rose-500/40 text-rose-300'
                  }`}
                >
                  {scanResult.success ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-rose-400 shrink-0" />
                  )}
                  <div>
                    <p className="font-bold">{scanResult.message}</p>
                    {scanResult.member && (
                      <p className="text-[11px] opacity-80">
                        {scanResult.member.name} • Plan: {scanResult.member.planName} (Status: {scanResult.member.status})
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowQRScanModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/20"
                >
                  Simulate Gate Scan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};
