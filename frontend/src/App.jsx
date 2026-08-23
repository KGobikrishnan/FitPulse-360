import React, { Suspense, lazy, useState } from 'react';
import { GymProvider, useGym } from './context/GymContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { MobileDrawer } from './components/MobileDrawer';
import { CommandPalette } from './components/CommandPalette';
import { LoginPage } from './pages/auth/LoginPage';

const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const TrainerDashboard = lazy(() => import('./pages/trainer/TrainerDashboard').then(m => ({ default: m.TrainerDashboard })));
const MemberDashboard = lazy(() => import('./pages/member/MemberDashboard').then(m => ({ default: m.MemberDashboard })));

const DashboardLoading = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="flex flex-col items-center space-y-3">
      <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      <p className="text-xs text-slate-500 font-mono">Loading portal...</p>
    </div>
  </div>
);

const MainLayout = () => {
  const { currentUser, toastMessage } = useGym();
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  if (!currentUser) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen text-slate-900 flex flex-col selection:bg-indigo-600 selection:text-white relative font-sans">
      <CommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      <MobileDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
      />

      <Navbar
        onToggleMobileDrawer={() => setIsMobileDrawerOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

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

      <MobileBottomNav />

      {toastMessage && (
        <div className="fixed bottom-16 md:bottom-6 right-4 md:right-6 z-50 bg-slate-900 text-white font-medium px-4 py-2.5 rounded-2xl shadow-2xl flex items-center space-x-2 text-xs max-w-[90vw] animate-in fade-in slide-in-from-bottom-2 border border-slate-700">
          <span className="text-indigo-400">⚡</span>
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
