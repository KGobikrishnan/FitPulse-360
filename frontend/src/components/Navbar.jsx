import React, { useState, useEffect, useRef } from 'react';
import { useGym } from '../context/GymContext';
import { Html5Qrcode } from 'html5-qrcode';
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
  AlertTriangle,
  Camera,
  Keyboard,
  ScanLine
} from 'lucide-react';
import { useNetworkStatus } from '../hooks/useNetworkStatus';

export const Navbar = ({ onToggleMobileDrawer, onOpenSearch }) => {
  const { currentUser, logoutUser, data, simulateQRCheckIn } = useGym();
  const { isOnline, pendingSyncCount } = useNetworkStatus();
  const [showQRScanModal, setShowQRScanModal] = useState(false);
  const [scanMode, setScanMode] = useState('camera'); // 'camera' | 'manual'
  const [scannedCode, setScannedCode] = useState('');
  const [scanResult, setScanResult] = useState(null);
  const [cameraError, setCameraError] = useState(null);
  const html5QrCodeRef = useRef(null);

  // Live Camera Scanner Lifecycle
  useEffect(() => {
    if (showQRScanModal && scanMode === 'camera') {
      const qrRegionId = "qr-reader-live-view";
      let qrCodeScanner = new Html5Qrcode(qrRegionId);
      html5QrCodeRef.current = qrCodeScanner;

      const config = { fps: 10, qrbox: { width: 220, height: 220 } };

      qrCodeScanner.start(
        { facingMode: "environment" },
        config,
        (decodedText) => {
          // On Success
          handleProcessCode(decodedText);
          try {
            qrCodeScanner.stop();
          } catch (e) {}
        },
        (errorMessage) => {
          // Scanning in progress...
        }
      ).catch((err) => {
        console.warn("Camera access failed:", err);
        setCameraError("Camera unavailable or permission denied. Use manual entry.");
        setScanMode('manual');
      });

      return () => {
        if (html5QrCodeRef.current) {
          try {
            html5QrCodeRef.current.stop().then(() => html5QrCodeRef.current.clear());
          } catch (e) {}
        }
      };
    }
  }, [showQRScanModal, scanMode]);

  const handleProcessCode = async (code) => {
    if (!code) return;
    const res = await simulateQRCheckIn(code);
    setScanResult(res);
    setTimeout(() => {
      setScanResult(null);
      setScannedCode('');
      if (res && res.success) {
        setShowQRScanModal(false);
      }
    }, 3200);
  };

  const handleManualScanSubmit = (e) => {
    e.preventDefault();
    handleProcessCode(scannedCode);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/70 backdrop-blur-2xl border-b border-white/80 px-4 sm:px-6 py-3 flex items-center justify-between shadow-xs">
      {/* Brand Logo */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        <div className="flex items-center space-x-2.5">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-indigo-600/30 shrink-0 border border-white/40">
            <Dumbbell className="h-5 w-5 text-white font-black" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold tracking-tight text-base sm:text-lg text-slate-900 font-display">
                FIT<span className="text-indigo-600">PULSE</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-indigo-50/90 text-indigo-700 border border-indigo-200/80 shadow-2xs">
                360
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block font-medium">
              Enterprise Gym Web App
            </p>
          </div>
        </div>
      </div>

      {/* Global Search Bar (Desktop) */}
      <div
        onClick={onOpenSearch}
        className="hidden md:flex items-center w-72 lg:w-96 relative cursor-pointer"
      >
        <Search className="h-4 w-4 text-indigo-500 absolute left-3.5 pointer-events-none" />
        <input
          readOnly
          type="text"
          placeholder="Search members, equipment, plans..."
          className="w-full bg-white/60 backdrop-blur-md border border-white/90 rounded-2xl pl-10 pr-14 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 cursor-pointer focus:outline-none hover:bg-white/85 transition shadow-2xs"
        />
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-500 bg-white/90 border border-white px-2 py-0.5 rounded-lg shadow-2xs pointer-events-none">
          Ctrl K
        </kbd>
      </div>

      {/* Top Right Badges, Metrics & Profile */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Offline Mode Indicator Badge */}
        {!isOnline && (
          <div className="flex items-center space-x-1.5 px-3 py-1 rounded-xl text-xs font-bold font-mono bg-amber-50/90 text-amber-800 border border-amber-300 animate-pulse shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>Offline ({pendingSyncCount} queued)</span>
          </div>
        )}

        {/* Gate QR Scanner Trigger Button */}
        <button
          onClick={() => setShowQRScanModal(true)}
          className="btn-shiny px-3.5 py-2 rounded-2xl bg-white hover:bg-slate-50 border border-white/90 text-indigo-600 text-xs font-bold flex items-center space-x-1.5 cursor-pointer shadow-xs active:scale-95"
          title="Open Turnstile Gate Camera Scanner"
        >
          <ScanLine className="h-4 w-4 text-indigo-600 animate-pulse" />
          <span className="hidden sm:inline">Gate Scanner</span>
        </button>

        {/* User Profile Pill & Logout */}
        <div className="flex items-center space-x-2.5 bg-white/70 backdrop-blur-md border border-white/90 p-1.5 pl-2.5 rounded-2xl shadow-2xs">
          <div className="hidden sm:block text-right">
            <p className="text-xs font-bold text-slate-800 leading-tight font-display">{currentUser.name}</p>
            <p className="text-[10px] text-indigo-700 font-mono font-bold uppercase">{currentUser.role}</p>
          </div>
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-8 h-8 rounded-xl object-cover ring-2 ring-indigo-600/30 shadow-2xs"
          />
          <button
            onClick={logoutUser}
            className="p-1.5 rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition cursor-pointer"
            title="Log Out Session"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={onToggleMobileDrawer}
          className="p-2 rounded-2xl bg-white/80 hover:bg-white text-slate-700 md:hidden cursor-pointer shadow-2xs border border-white"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* MODAL: Gate Camera & Kiosk Scanner */}
      {showQRScanModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4">
          <div className="liquid-glass w-full max-w-md p-6 space-y-4 shadow-2xl bg-white/95 border border-white/90">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                  <ScanLine className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 font-display">Turnstile Gate Scanner</h3>
                  <p className="text-[10px] text-slate-500 font-mono">Live Reception Kiosk Mode</p>
                </div>
              </div>
              <button onClick={() => setShowQRScanModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer font-bold">✕</button>
            </div>

            {/* Mode Switcher Pills */}
            <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-slate-100/90 text-xs font-mono">
              <button
                type="button"
                onClick={() => setScanMode('camera')}
                className={`py-1.5 rounded-lg font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                  scanMode === 'camera' ? 'bg-white text-indigo-600 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Camera className="h-3.5 w-3.5" />
                <span>Live Camera</span>
              </button>
              <button
                type="button"
                onClick={() => setScanMode('manual')}
                className={`py-1.5 rounded-lg font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                  scanMode === 'manual' ? 'bg-white text-indigo-600 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Keyboard className="h-3.5 w-3.5" />
                <span>Manual Code</span>
              </button>
            </div>

            {/* Camera View Area */}
            {scanMode === 'camera' && (
              <div className="space-y-2">
                <div className="relative rounded-2xl overflow-hidden border-2 border-indigo-500/30 bg-slate-900 flex items-center justify-center min-h-[240px]">
                  <div id="qr-reader-live-view" className="w-full h-full" />
                </div>
                <p className="text-[10px] text-center text-slate-500 font-mono">
                  Point member's digital QR pass towards camera
                </p>
              </div>
            )}

            {/* Manual Code Entry Mode */}
            {scanMode === 'manual' && (
              <form onSubmit={handleManualScanSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder="Type Pass ID or Member Name..."
                  value={scannedCode}
                  onChange={(e) => setScannedCode(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 shadow-2xs"
                />

                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => setScannedCode('FITPULSE-PASS-M1-RAHUL')}
                    className="text-[10px] bg-slate-100 text-slate-700 px-2.5 py-1 rounded-xl cursor-pointer hover:bg-slate-200 border border-slate-200"
                  >
                    Rahul (Active Pass)
                  </button>
                  <button
                    type="button"
                    onClick={() => setScannedCode('FITPULSE-PASS-M4-SNEHA')}
                    className="text-[10px] bg-rose-50 text-rose-700 border border-rose-200 px-2.5 py-1 rounded-xl cursor-pointer hover:bg-rose-100"
                  >
                    Sneha (Expired Pass)
                  </button>
                </div>

                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    type="submit"
                    className="btn-shiny px-5 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl cursor-pointer shadow-md"
                  >
                    Verify Pass →
                  </button>
                </div>
              </form>
            )}

            {/* Scan Feedback Banner */}
            {scanResult && (
              <div className={`p-3.5 rounded-2xl flex items-center space-x-2.5 text-xs shadow-2xs font-mono font-bold animate-in fade-in ${
                scanResult.success ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
              }`}>
                {scanResult.success ? <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" /> : <AlertTriangle className="h-5 w-5 text-rose-600 shrink-0" />}
                <div>
                  <p className="font-bold">{scanResult.success ? 'ACCESS GRANTED' : 'ACCESS DENIED'}</p>
                  <p className="text-[10px] font-normal opacity-90">{scanResult.message}</p>
                </div>
              </div>
            )}

            <div className="flex justify-end pt-2 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setShowQRScanModal(false)}
                className="px-4 py-2 text-xs text-slate-500 hover:text-slate-700 cursor-pointer font-bold"
              >
                Close Kiosk
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
