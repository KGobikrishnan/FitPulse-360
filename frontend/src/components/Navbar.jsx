import React, { useState } from 'react';
import { useGym } from '../context/GymContext';
import {
  Dumbbell,
  QrCode,
  CheckCircle2,
  AlertTriangle,
  LogOut,
  Menu,
  X,
  Sparkles,
  ShieldCheck,
  UserCheck,
  Flame,
  LayoutDashboard,
  Users,
  DollarSign,
  Activity,
  Box,
  Lock,
  Calendar,
  Utensils,
  TrendingUp,
  Award,
  IdCard
} from 'lucide-react';

export const Navbar = ({ onToggleMobileDrawer }) => {
  const { currentUser, logoutUser, data, simulateQRCheckIn } = useGym();
  const [showQRScanModal, setShowQRScanModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  const adminMenu = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'finance', label: 'Finance & P&L', icon: DollarSign },
    { id: 'attendance', label: 'QR Gates', icon: Activity },
    { id: 'assets', label: 'Equipment & POS', icon: Box },
    { id: 'lockers', label: 'Lockers', icon: Lock },
  ];

  const trainerMenu = [
    { id: 'trainees', label: 'Trainees', icon: UserCheck },
    { id: 'workout-builder', label: 'Workouts', icon: Dumbbell },
    { id: 'diet-builder', label: 'Diet & Macros', icon: Utensils },
    { id: 'transformations', label: 'Progress Reviews', icon: TrendingUp },
    { id: 'schedule', label: 'PT Slots', icon: Calendar },
  ];

  const memberMenu = [
    { id: 'routine', label: "Today's Workout", icon: Flame },
    { id: 'diet-tracker', label: 'Diet & Water', icon: Utensils },
    { id: 'pr-vault', label: 'PR Vault', icon: Award },
    { id: 'digital-pass', label: 'Digital Pass', icon: IdCard },
    { id: 'metrics', label: 'Body Metrics', icon: TrendingUp },
    { id: 'leaderboard', label: 'Leaderboard', icon: Sparkles },
  ];

  const currentMenuItems = currentUser.role === 'ADMIN' ? adminMenu : currentUser.role === 'TRAINER' ? trainerMenu : memberMenu;

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-zinc-800/80 px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between">
      {/* Brand & Mobile Hamburger */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        <button
          onClick={onToggleMobileDrawer}
          className="md:hidden p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 shrink-0">
          <Dumbbell className="h-5 w-5 text-black font-black" />
        </div>
        <div>
          <div className="flex items-center space-x-1.5">
            <span className="font-extrabold tracking-tight text-base sm:text-lg text-white font-mono">
              FIT<span className="text-emerald-400">PULSE</span>
            </span>
            <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              360
            </span>
          </div>
          <p className="text-[10px] text-zinc-400 hidden sm:block truncate max-w-[180px] lg:max-w-none">
            {data.gymProfile.name}
          </p>
        </div>
      </div>

      {/* Live Crowd Meter Indicator (Desktop) */}
      <div className="hidden lg:flex items-center space-x-3 px-3 py-1 rounded-full bg-zinc-900/80 border border-zinc-800">
        <div className="flex items-center space-x-2">
          <span className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              crowdPct > 80 ? 'bg-rose-400' : crowdPct > 50 ? 'bg-amber-400' : 'bg-emerald-400'
            }`} />
            <span className={`relative inline-flex rounded-full h-2 w-2 ${
              crowdPct > 80 ? 'bg-rose-500' : crowdPct > 50 ? 'bg-amber-500' : 'bg-emerald-500'
            }`} />
          </span>
          <span className="text-xs text-zinc-300">Density:</span>
          <span className={`text-xs font-bold ${
            crowdPct > 80 ? 'text-rose-400' : crowdPct > 50 ? 'text-amber-400' : 'text-emerald-400'
          }`}>
            {data.gymProfile.liveOccupancy}/{data.gymProfile.maxCapacity} ({crowdPct}%)
          </span>
        </div>
        <button
          onClick={() => setShowQRScanModal(true)}
          className="text-[11px] flex items-center space-x-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-medium transition cursor-pointer"
        >
          <QrCode className="h-3 w-3" />
          <span>Gate QR</span>
        </button>
      </div>

      {/* Profile & Logout */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Gate QR for Mobile */}
        <button
          onClick={() => setShowQRScanModal(true)}
          className="lg:hidden p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-emerald-400 border border-zinc-800 transition"
          title="Gate QR Scanner"
        >
          <QrCode className="h-4 w-4" />
        </button>

        {/* User Profile Badge */}
        <div className="flex items-center space-x-2">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-8 h-8 rounded-full object-cover border border-emerald-500/40"
          />
          <div className="hidden sm:block text-left">
            <p className="text-xs font-semibold text-zinc-200 leading-tight">{currentUser.name}</p>
            <p className="text-[10px] text-emerald-400 font-mono">{currentUser.role}</p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={logoutUser}
          title="Sign Out"
          className="p-1.5 sm:p-2 rounded-xl bg-zinc-900 hover:bg-rose-950/40 text-zinc-400 hover:text-rose-400 border border-zinc-800 transition cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>


      {/* Gate QR Scan Modal */}
      {showQRScanModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-md rounded-2xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center space-x-2">
                <QrCode className="h-5 w-5 text-emerald-400" />
                <h3 className="font-bold text-base text-white">Entrance QR Gate Scanner</h3>
              </div>
              <button onClick={() => setShowQRScanModal(false)} className="text-zinc-400 hover:text-white">✕</button>
            </div>

            <p className="text-xs text-zinc-400">
              Type member code (e.g. <code className="text-emerald-400">FITPULSE-PASS-M1-RAHUL</code> or <code className="text-emerald-400">Rahul Sharma</code>).
            </p>

            <form onSubmit={handleScanSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Pass ID or Member Name..."
                value={scannedCode}
                onChange={(e) => setScannedCode(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2 text-xs text-zinc-100 focus:outline-none focus:border-emerald-500"
              />

              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => setScannedCode('FITPULSE-PASS-M1-RAHUL')}
                  className="text-[10px] bg-zinc-800 text-zinc-300 px-2 py-1 rounded"
                >
                  Rahul (Active)
                </button>
                <button
                  type="button"
                  onClick={() => setScannedCode('FITPULSE-PASS-M4-SNEHA')}
                  className="text-[10px] bg-rose-950/40 text-rose-300 border border-rose-800/40 px-2 py-1 rounded"
                >
                  Sneha (Expired)
                </button>
              </div>

              {scanResult && (
                <div className={`p-3 rounded-xl flex items-center space-x-2 text-xs ${
                  scanResult.success ? 'bg-emerald-950/50 text-emerald-300 border border-emerald-500/30' : 'bg-rose-950/50 text-rose-300 border border-rose-500/30'
                }`}>
                  {scanResult.success ? <CheckCircle2 className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
                  <span>{scanResult.message}</span>
                </div>
              )}

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowQRScanModal(false)}
                  className="px-3 py-1.5 text-xs text-zinc-400"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-bold bg-emerald-500 text-black rounded-xl"
                >
                  Scan Pass
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};
