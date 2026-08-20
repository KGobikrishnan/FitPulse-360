import React, { Suspense, lazy, useState } from 'react';
import { GymProvider, useGym } from './context/GymContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { MobileDrawer } from './components/MobileDrawer';
import { CommandPalette } from './components/CommandPalette';
import { LoginPage } from './pages/auth/LoginPage';

// Code-splitting via React lazy for high-performance bundle loading
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const TrainerDashboard = lazy(() => import('./pages/trainer/TrainerDashboard').then(m => ({ default: m.TrainerDashboard })));
const MemberDashboard = lazy(() => import('./pages/member/MemberDashboard').then(m => ({ default: m.MemberDashboard })));

const DashboardLoading = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="flex flex-col items-center space-y-3">
      <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-xs text-zinc-500 font-mono">Loading portal...</p>
    </div>
  </div>
);

const MainLayout = () => {
  const { currentUser, toastMessage } = useGym();
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // If user is not logged in, show Login Page
  if (!currentUser) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-[#0b0d13] text-zinc-100 flex flex-col selection:bg-emerald-500 selection:text-black relative font-sans">
      {/* Global Command Search Palette (Ctrl + K) */}
      <CommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Standalone Root Mobile Drawer */}
      <MobileDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
      />

      {/* Global Navigation */}
      <Navbar
        onToggleMobileDrawer={() => setIsMobileDrawerOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Workspace */}
      <div className="flex-1 flex w-full">
        <Sidebar />
        <main className="flex-1 p-3 sm:p-5 lg:p-8 max-w-7xl mx-auto w-full overflow-y-auto pb-20 md:pb-8">
          <Suspense fallback={<DashboardLoading />}>
            {currentUser.role === 'ADMIN' && <AdminDashboard />}
            {currentUser.role === 'TRAINER' && <TrainerDashboard />}
            {currentUser.role === 'USER' && <MemberDashboard />}
          </Suspense>
        </main>
      </div>

      {/* Mobile Floating Bottom Bar */}
      <MobileBottomNav />

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-16 md:bottom-6 right-4 md:right-6 z-50 bg-emerald-500 text-zinc-950 font-bold px-4 py-2.5 rounded-2xl shadow-2xl shadow-emerald-500/30 flex items-center space-x-2 text-xs max-w-[90vw] animate-in fade-in slide-in-from-bottom-2">
          <span>⚡</span>
          <span className="truncate">{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <GymProvider>
      <MainLayout />
    </GymProvider>
  );
}
