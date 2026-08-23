import React, { useState } from 'react';
import { useGym } from '../context/GymContext';
import {
  Dumbbell,
  QrCode,
  Search,
  Crown,
  TrendingUp,
  Bell,
  LogOut,
  Menu,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { useNetworkStatus } from '../hooks/useNetworkStatus';

export const Navbar = ({ onToggleMobileDrawer, onOpenSearch }) => {
  const { currentUser, logoutUser, data, simulateQRCheckIn } = useGym();
  const { isOnline, pendingSyncCount } = useNetworkStatus();
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

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-[#EAE6DF] px-4 sm:px-6 py-3 flex items-center justify-between shadow-2xs">
      {/* Brand & Mobile Hamburger */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        <button
          onClick={onToggleMobileDrawer}
          className="md:hidden p-2 rounded-xl bg-[#FAF9F5] border border-[#EAE6DF] text-slate-700 hover:bg-[#F0EDE8] cursor-pointer"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex items-center space-x-2.5">
          <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-600/25 shrink-0">
            <Dumbbell className="h-5 w-5 text-white font-black" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold tracking-tight text-base sm:text-lg text-slate-900 font-display">
                FIT<span className="text-indigo-600">PULSE</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
                360
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block font-medium">
              Enterprise Gym Operating System
            </p>
          </div>
        </div>
      </div>

      {/* Global Search Bar (Desktop) */}
      <div
        onClick={onOpenSearch}
        className="hidden md:flex items-center w-72 lg:w-96 relative cursor-pointer"
      >
        <Search className="h-4 w-4 text-slate-400 absolute left-3 pointer-events-none" />
        <input
          readOnly
          type="text"
          placeholder="Search members, equipment, plans..."
          className="w-full bg-[#FAF9F5] border border-[#EAE6DF] rounded-xl pl-9 pr-14 py-2 text-xs text-slate-800 placeholder:text-slate-400 cursor-pointer focus:outline-none hover:bg-[#F0EDE8] transition"
        />
        <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-500 bg-white border border-[#EAE6DF] px-1.5 py-0.5 rounded shadow-2xs pointer-events-none">
          Ctrl K
        </kbd>
      </div>

      {/* Top Right Badges, Metrics & Profile */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Plan & Occupancy Metric Pill */}
        <div className="hidden xl:flex items-center space-x-2 bg-[#FAF9F5] border border-[#EAE6DF] px-3 py-1.5 rounded-xl text-xs font-mono">
          <Crown className="h-3.5 w-3.5 text-amber-500" />
          <span className="text-slate-600 font-medium">Studio Enterprise</span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-900 font-bold">42,800 (63%)</span>
        </div>

        {/* Offline Mode Indicator Badge */}
        {!isOnline && (
          <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-bold font-mono bg-amber-50 text-amber-800 border border-amber-300 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>Offline ({pendingSyncCount} queued)</span>
          </div>
        )}

        {/* Growth Metric Badge */}
        {isOnline && (
          <div className="hidden lg:flex items-center space-x-1 warm-badge-emerald px-2.5 py-1 rounded-lg text-xs font-bold font-mono">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>Grow +12%</span>
          </div>
        )}

        {/* Gate QR Trigger */}
        <button
          onClick={() => setShowQRScanModal(true)}
          className="p-2 rounded-xl bg-[#FAF9F5] hover:bg-[#F0EDE8] text-indigo-600 border border-[#EAE6DF] transition cursor-pointer"
          title="Gate QR Scanner"
        >
          <QrCode className="h-4 w-4" />
        </button>

        {/* Notifications */}
        <button className="relative p-2 rounded-xl bg-[#FAF9F5] hover:bg-[#F0EDE8] text-slate-600 border border-[#EAE6DF] transition cursor-pointer">
          <Bell className="h-4 w-4" />
          <span className="w-2 h-2 rounded-full bg-indigo-600 absolute top-1.5 right-1.5 ring-2 ring-white" />
        </button>

        {/* User Profile Capsule */}
        <div className="flex items-center space-x-2.5 pl-2 border-l border-[#EAE6DF]">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-600/20"
          />
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold text-slate-800 leading-tight font-display">{currentUser.name}</p>
            <p className="text-[10px] text-indigo-600 font-mono font-bold">{currentUser.role.toLowerCase() === 'user' ? 'Member' : currentUser.role}</p>
          </div>
        </div>

        {/* Sign Out Button */}
        <button
          onClick={logoutUser}
          title="Sign Out"
          className="p-2 rounded-xl bg-[#FAF9F5] hover:bg-rose-50 text-slate-500 hover:text-rose-600 border border-[#EAE6DF] transition cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>

      {/* Gate QR Scan Modal */}
      {showQRScanModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="warm-card w-full max-w-md p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#EAE6DF] pb-3">
              <div className="flex items-center space-x-2">
                <QrCode className="h-5 w-5 text-indigo-600" />
                <h3 className="font-bold text-base text-slate-900 font-display">Entrance QR Gate Scanner</h3>
              </div>
              <button onClick={() => setShowQRScanModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">✕</button>
            </div>

            <p className="text-xs text-slate-500">
              Type member code (e.g. <code className="text-indigo-700 bg-indigo-50 px-1 py-0.5 rounded">FITPULSE-PASS-M1-RAHUL</code>).
            </p>

            <form onSubmit={handleScanSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Pass ID or Member Name..."
                value={scannedCode}
                onChange={(e) => setScannedCode(e.target.value)}
                className="w-full bg-[#FAF9F5] border border-[#EAE6DF] rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
              />

              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => setScannedCode('FITPULSE-PASS-M1-RAHUL')}
                  className="text-[10px] bg-slate-100 text-slate-700 px-2 py-1 rounded cursor-pointer hover:bg-slate-200"
                >
                  Rahul (Active)
                </button>
                <button
                  type="button"
                  onClick={() => setScannedCode('FITPULSE-PASS-M4-SNEHA')}
                  className="text-[10px] bg-rose-50 text-rose-700 border border-rose-200 px-2 py-1 rounded cursor-pointer hover:bg-rose-100"
                >
                  Sneha (Expired)
                </button>
              </div>

              {scanResult && (
                <div className={`p-3 rounded-xl flex items-center space-x-2 text-xs ${
                  scanResult.success ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}>
                  {scanResult.success ? <CheckCircle2 className="h-4 w-4 text-emerald-600" /> : <AlertTriangle className="h-4 w-4 text-rose-600" />}
                  <span>{scanResult.message}</span>
                </div>
              )}

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowQRScanModal(false)}
                  className="px-3 py-1.5 text-xs text-slate-500 cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn-shiny px-4 py-1.5 text-xs font-bold bg-indigo-600 text-white rounded-xl cursor-pointer"
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
