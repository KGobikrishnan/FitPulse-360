import React, { useState } from 'react';
import { useGym } from '../context/GymContext';
import {
  Dumbbell,
  QrCode,
  Search,
  Crown,
  TrendingUp,
  Bell,
  HelpCircle,
  LogOut,
  Menu,
  CheckCircle2,
  AlertTriangle,
  ChevronDown
} from 'lucide-react';

export const Navbar = ({ onToggleMobileDrawer, onOpenSearch }) => {
  const { currentUser, logoutUser, data, simulateQRCheckIn } = useGym();
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
    <header className="sticky top-0 z-40 w-full bg-[#0b0d13]/90 backdrop-blur-md border-b border-white/[0.07] px-4 sm:px-6 py-3 flex items-center justify-between">
      {/* Brand & Mobile Hamburger */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        <button
          onClick={onToggleMobileDrawer}
          className="md:hidden p-1.5 rounded-lg bg-[#141722] border border-white/[0.08] text-zinc-300 hover:text-white"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex items-center space-x-2.5">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 shrink-0">
            <Dumbbell className="h-5 w-5 text-black font-black" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold tracking-tight text-base sm:text-lg text-white font-mono">
                FIT<span className="text-emerald-400">PULSE</span>
              </span>
              <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                360
              </span>
            </div>
            <p className="text-[10px] text-zinc-500 hidden sm:block">
              Drive • Decide • Dominate
            </p>
          </div>
        </div>
      </div>

      {/* Global Search Bar (Desktop) */}
      <div
        onClick={onOpenSearch}
        className="hidden md:flex items-center w-72 lg:w-96 relative cursor-pointer"
      >
        <Search className="h-4 w-4 text-zinc-500 absolute left-3 pointer-events-none" />
        <input
          readOnly
          type="text"
          placeholder="Search members, equipment, plans..."
          className="w-full bg-[#12151f] border border-white/[0.08] rounded-xl pl-9 pr-14 py-1.5 text-xs text-zinc-200 placeholder:text-zinc-500 cursor-pointer focus:outline-none"
        />
        <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-zinc-500 bg-[#171a26] border border-white/[0.08] px-1.5 py-0.5 rounded pointer-events-none">
          Ctrl K
        </kbd>
      </div>

      {/* Top Right Badges, Metrics & Profile */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Plan & Occupancy Metric Pill */}
        <div className="hidden xl:flex items-center space-x-2 bg-[#12151f] border border-white/[0.08] px-3 py-1.5 rounded-xl text-xs font-mono">
          <Crown className="h-3.5 w-3.5 text-amber-400" />
          <span className="text-zinc-300">Premium Plan</span>
          <span className="text-zinc-600">•</span>
          <span className="text-amber-400 font-bold">42,800 (63%)</span>
        </div>

        {/* Growth Metric Badge */}
        <div className="hidden lg:flex items-center space-x-1 saas-badge-emerald px-2.5 py-1 rounded-lg text-xs font-bold font-mono">
          <TrendingUp className="h-3.5 w-3.5" />
          <span>Grow 12%</span>
        </div>

        {/* Gate QR Trigger */}
        <button
          onClick={() => setShowQRScanModal(true)}
          className="p-2 rounded-xl bg-[#12151f] hover:bg-[#171a26] text-emerald-400 border border-white/[0.08] transition"
          title="Gate QR Scanner"
        >
          <QrCode className="h-4 w-4" />
        </button>

        {/* Notifications */}
        <button className="relative p-2 rounded-xl bg-[#12151f] hover:bg-[#171a26] text-zinc-400 hover:text-zinc-200 border border-white/[0.08] transition">
          <Bell className="h-4 w-4" />
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 absolute top-1.5 right-1.5" />
        </button>

        {/* User Profile Capsule */}
        <div className="flex items-center space-x-2.5 pl-2 border-l border-white/[0.08]">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-8 h-8 rounded-full object-cover border border-emerald-500/40"
          />
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold text-zinc-100 leading-tight">{currentUser.name}</p>
            <p className="text-[10px] text-emerald-400 font-mono font-medium">{currentUser.role.toLowerCase() === 'user' ? 'Member' : currentUser.role}</p>
          </div>
        </div>

        {/* Sign Out Button */}
        <button
          onClick={logoutUser}
          title="Sign Out"
          className="p-2 rounded-xl bg-[#12151f] hover:bg-rose-950/40 text-zinc-400 hover:text-rose-400 border border-white/[0.08] transition"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>

      {/* Gate QR Scan Modal */}
      {showQRScanModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4">
          <div className="saas-card w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
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
                className="w-full bg-[#0b0d13] border border-white/[0.1] rounded-xl px-4 py-2.5 text-xs text-zinc-100 focus:outline-none focus:border-emerald-500"
              />

              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => setScannedCode('FITPULSE-PASS-M1-RAHUL')}
                  className="text-[10px] bg-[#1a1d2c] text-zinc-300 px-2 py-1 rounded"
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
