import React from 'react';
import { GymProvider, useGym } from './context/GymContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { MobileDrawer } from './components/MobileDrawer';
import { LoginPage } from './pages/auth/LoginPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { TrainerDashboard } from './pages/trainer/TrainerDashboard';
import { MemberDashboard } from './pages/member/MemberDashboard';

const MainLayout = () => {
  const { currentUser, toastMessage } = useGym();
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = React.useState(false);

  // If user is not logged in, show Login Page
  if (!currentUser) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-[#090a0f] text-zinc-100 flex flex-col selection:bg-emerald-500 selection:text-black relative">
      {/* Standalone Root Mobile Drawer */}
      <MobileDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
      />

      {/* Global Navigation */}
      <Navbar onToggleMobileDrawer={() => setIsMobileDrawerOpen(true)} />

      {/* Main Workspace */}
      <div className="flex-1 flex w-full">
        <Sidebar />
        <main className="flex-1 p-3 sm:p-5 lg:p-8 max-w-7xl mx-auto w-full overflow-y-auto pb-20 md:pb-8">
          {currentUser.role === 'ADMIN' && <AdminDashboard />}
          {currentUser.role === 'TRAINER' && <TrainerDashboard />}
          {currentUser.role === 'USER' && <MemberDashboard />}
        </main>
      </div>

      {/* Mobile Floating Bottom Bar */}
      <MobileBottomNav />

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-16 md:bottom-6 right-4 md:right-6 z-50 animate-bounce bg-emerald-500 text-zinc-950 font-bold px-4 py-2.5 rounded-2xl shadow-2xl shadow-emerald-500/30 flex items-center space-x-2 text-xs max-w-[90vw]">
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
