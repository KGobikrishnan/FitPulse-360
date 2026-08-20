import React from 'react';
import { GymProvider, useGym } from './context/GymContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { TrainerDashboard } from './pages/trainer/TrainerDashboard';
import { MemberDashboard } from './pages/member/MemberDashboard';

const MainLayout = () => {
  const { currentUser, toastMessage } = useGym();

  return (
    <div className="min-h-screen bg-[#090a0f] text-zinc-100 flex flex-col selection:bg-emerald-500 selection:text-black">
      {/* Global Navigation */}
      <Navbar />

      {/* Main Workspace */}
      <div className="flex-1 flex w-full">
        <Sidebar />
        <main className="flex-1 p-4 lg:p-8 max-w-7xl mx-auto w-full overflow-y-auto">
          {currentUser.role === 'ADMIN' && <AdminDashboard />}
          {currentUser.role === 'TRAINER' && <TrainerDashboard />}
          {currentUser.role === 'USER' && <MemberDashboard />}
        </main>
      </div>

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce bg-emerald-500 text-zinc-950 font-bold px-5 py-3 rounded-2xl shadow-2xl shadow-emerald-500/30 flex items-center space-x-2 text-xs">
          <span>⚡</span>
          <span>{toastMessage}</span>
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
