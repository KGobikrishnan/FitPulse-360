import React, { useState, useEffect } from 'react';
import { useGym } from '../../context/GymContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ThreeHeroTorus } from '../../components/ThreeHeroTorus';
import {
  Users,
  DollarSign,
  TrendingUp,
  Activity,
  UserPlus,
  AlertCircle,
  CreditCard,
  QrCode,
  Box,
  Lock,
  ArrowUpRight,
  Sparkles,
  Send,
  Download,
  SlidersHorizontal,
  ChevronRight,
  MoreVertical,
  Calendar,
  Zap,
  TrendingDown,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

// Senior Designer Counter-Up Component
const CounterNumber = ({ value, prefix = '', suffix = '', duration = 1.2 }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplayValue(Math.floor(ease * value));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [value, duration]);

  return (
    <span>{prefix}{displayValue.toLocaleString()}{suffix}</span>
  );
};

export const AdminDashboard = () => {
  const { data, activeTab, setActiveTab, addMember, updateMemberStatus, recordExpense, toggleLockerStatus, updateEquipmentStatus, sellInventoryItem } = useGym();

  const currentTab = ['dashboard', 'members', 'finance', 'attendance', 'assets', 'lockers'].includes(activeTab)
    ? activeTab
    : 'dashboard';

  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [newMemberForm, setNewMemberForm] = useState({
    name: '',
    email: '',
    phone: '',
    planId: 'p3',
    planName: 'Annual Beast Mode',
    totalPaid: 18999,
    pendingDue: 0,
    status: 'ACTIVE',
    startDate: new Date().toISOString().split('T')[0],
    expiryDate: '2027-01-01',
    trainerName: 'Marcus Vance',
    lockerNo: 'L-01',
  });

  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [expenseForm, setExpenseForm] = useState({ name: '', amount: '' });
  const [selectedInvoiceMember, setSelectedInvoiceMember] = useState(null);

  const handleAddMemberSubmit = (e) => {
    e.preventDefault();
    if (!newMemberForm.name || !newMemberForm.email) return;
    addMember(newMemberForm);
    setShowAddMemberModal(false);
    setNewMemberForm({
      name: '',
      email: '',
      phone: '',
      planId: 'p3',
      planName: 'Annual Beast Mode',
      totalPaid: 18999,
      pendingDue: 0,
      status: 'ACTIVE',
      startDate: new Date().toISOString().split('T')[0],
      expiryDate: '2027-01-01',
      trainerName: 'Marcus Vance',
      lockerNo: 'L-01',
    });
  };

  const handleExpenseSubmit = (e) => {
    e.preventDefault();
    if (!expenseForm.name || !expenseForm.amount) return;
    recordExpense(expenseForm);
    setShowExpenseModal(false);
    setExpenseForm({ name: '', amount: '' });
  };

  // 📊 CSV / Excel Export Utilities
  const downloadCSV = (filename, csvContent) => {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportMembersToCSV = () => {
    const headers = ['Member ID', 'Full Name', 'Email', 'Phone', 'Plan Name', 'Status', 'Start Date', 'Expiry Date', 'Total Paid (INR)', 'Pending Due (INR)', 'Assigned Coach', 'Locker No'];
    const rows = data.members.map((m) => [
      m.id,
      `"${m.name}"`,
      m.email,
      `"${m.phone || ''}"`,
      `"${m.planName}"`,
      m.status,
      m.startDate,
      m.expiryDate,
      m.totalPaid,
      m.pendingDue,
      `"${m.trainerName || 'Unassigned'}"`,
      m.lockerNo
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    downloadCSV(`FitPulse_Members_Roster_${new Date().toISOString().split('T')[0]}.csv`, csvContent);
  };

  const exportFinancialsToCSV = () => {
    const headers = ['Category', 'Item / Payee', 'Amount (INR)', 'Type', 'Date'];
    const rows = [
      ['Revenue', 'Membership Subscriptions & POS', data.financials.monthlyRevenue, 'INFLOW', new Date().toISOString().split('T')[0]],
      ...data.financials.expenseBreakdown.map((exp) => ['Expense', `"${exp.name}"`, exp.amount, 'OUTFLOW', new Date().toISOString().split('T')[0]]),
      ...data.trainers.map((t) => ['Payroll', `"${t.name} (Base + PT Commission)"`, t.baseSalary + t.monthlyCommission, 'OUTFLOW', new Date().toISOString().split('T')[0]])
    ];

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    downloadCSV(`FitPulse_Financial_PL_Report_${new Date().toISOString().split('T')[0]}.csv`, csvContent);
  };

  const exportAttendanceToCSV = () => {
    const headers = ['Log ID', 'Member / Athlete', 'Check-In Time', 'Gate / Method', 'Access Status'];
    const rows = data.recentAttendance.map((log) => [
      log.id,
      `"${log.memberName}"`,
      log.time,
      `"${log.method}"`,
      `"${log.status}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    downloadCSV(`FitPulse_Attendance_AccessLogs_${new Date().toISOString().split('T')[0]}.csv`, csvContent);
  };

  const activeMembers = data.members.filter((m) => m.status === 'ACTIVE').length;

  const containerVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* 🌟 Top Hero Bar with Interactive Three.js 3D Liquid Torus */}
      <motion.div variants={itemVariants} className="liquid-glass-hero p-6 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="z-10 max-w-xl">
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
              Executive Business Control
            </h1>
            <span className="text-[11px] font-mono px-3 py-1 rounded-full warm-badge-emerald font-bold flex items-center gap-1.5 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live Operations</span>
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-1.5 font-medium leading-relaxed">
            Real-time revenue telemetry, member retention analytics & complete facility management with macOS Liquid Glass architecture.
          </p>

          <div className="flex items-center space-x-3 mt-4">
            <button
              onClick={() => setShowExpenseModal(true)}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-white/80 hover:bg-white text-slate-700 border border-white transition flex items-center gap-2 cursor-pointer shadow-xs active:scale-98"
            >
              <DollarSign className="h-4 w-4 text-rose-500" />
              <span>Record Expense</span>
            </button>
            <button
              onClick={() => setShowAddMemberModal(true)}
              className="btn-shiny px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25 transition flex items-center gap-2 cursor-pointer active:scale-98"
            >
              <UserPlus className="h-4 w-4" />
              <span>+ Enroll Member</span>
            </button>
          </div>
        </div>

        {/* 🔮 Three.js 3D Liquid Glass Studio Dumbbell Assembly */}
        <div className="w-full sm:w-72 md:w-80 h-48 sm:h-52 flex items-center justify-center shrink-0 relative pointer-events-auto">
          <ThreeHeroTorus className="w-full h-full" />
        </div>
      </motion.div>

      {/* 📊 4 Liquid Glass KPI Cards (2x2 Grid on Mobile, 4 Cols on Desktop) */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {/* Card 1: Gross Revenue */}
        <div className="liquid-glass accent-bar-indigo p-4 sm:p-6 space-y-2 sm:space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <p className="text-[10px] sm:text-xs font-mono text-slate-500 uppercase tracking-wider font-bold truncate">Gross Collection</p>
            <span className="p-1.5 sm:p-2.5 rounded-xl bg-indigo-50/90 text-indigo-700 border border-indigo-100/80 shadow-2xs shrink-0">
              <DollarSign className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </span>
          </div>
          <h3 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight tabular-numbers font-display">
            <CounterNumber value={data.financials.monthlyRevenue} prefix="₹" />
          </h3>
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs text-indigo-700 font-bold font-mono truncate">
              <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
              <span>+41.2%</span>
            </div>
            <div className="hidden sm:flex items-end gap-0.5 h-4">
              <span className="w-1 h-2 bg-indigo-300 rounded-full" />
              <span className="w-1 h-3 bg-indigo-400 rounded-full" />
              <span className="w-1 h-2 bg-indigo-300 rounded-full" />
              <span className="w-1 h-4 bg-indigo-600 rounded-full" />
            </div>
          </div>
        </div>

        {/* Card 2: Net Profit */}
        <div className="liquid-glass accent-bar-emerald p-4 sm:p-6 space-y-2 sm:space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <p className="text-[10px] sm:text-xs font-mono text-slate-500 uppercase tracking-wider font-bold truncate">Net Profit (P&L)</p>
            <span className="p-1.5 sm:p-2.5 rounded-xl bg-emerald-50/90 text-emerald-700 border border-emerald-100/80 shadow-2xs shrink-0">
              <TrendingUp className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </span>
          </div>
          <h3 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight tabular-numbers font-display">
            <CounterNumber value={data.financials.netProfit} prefix="₹" />
          </h3>
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs text-emerald-700 font-bold font-mono truncate">
              <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
              <span>+28.7%</span>
            </div>
            <div className="hidden sm:flex items-end gap-0.5 h-4">
              <span className="w-1 h-2 bg-emerald-300 rounded-full" />
              <span className="w-1 h-4 bg-emerald-600 rounded-full" />
              <span className="w-1 h-3 bg-emerald-400 rounded-full" />
            </div>
          </div>
        </div>

        {/* Card 3: Active Members */}
        <div className="liquid-glass accent-bar-purple p-4 sm:p-6 space-y-2 sm:space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <p className="text-[10px] sm:text-xs font-mono text-slate-500 uppercase tracking-wider font-bold truncate">Active Members</p>
            <span className="p-1.5 sm:p-2.5 rounded-xl bg-purple-50/90 text-purple-700 border border-purple-100/80 shadow-2xs shrink-0">
              <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </span>
          </div>
          <div className="flex items-baseline space-x-1.5">
            <h3 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight tabular-numbers font-display">
              <CounterNumber value={activeMembers * 3 + 120} />
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">Live</span>
          </div>
          <div className="flex items-center justify-between text-[10px] sm:text-xs text-slate-500 pt-1">
            <span className="truncate"><strong className="text-purple-700 font-bold">10 New</strong></span>
            <div className="hidden sm:flex items-end gap-0.5 h-3">
              {[3, 5, 2, 8, 6, 4, 7, 9, 5, 8].map((h, i) => (
                <span key={i} className="w-0.5 bg-purple-500 rounded" style={{ height: `${h * 2}px` }} />
              ))}
            </div>
          </div>
        </div>

        {/* Card 4: Trainer Payroll */}
        <div className="liquid-glass accent-bar-amber p-4 sm:p-6 space-y-2 sm:space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <p className="text-[10px] sm:text-xs font-mono text-slate-500 uppercase tracking-wider font-bold truncate">Trainer Payroll</p>
            <span className="p-1.5 sm:p-2.5 rounded-xl bg-amber-50/90 text-amber-700 border border-amber-100/80 shadow-2xs shrink-0">
              <CreditCard className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </span>
          </div>
          <h3 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight tabular-numbers font-display">
            <CounterNumber value={96400} prefix="₹" />
          </h3>
          <div className="flex items-center justify-between text-[10px] sm:text-xs text-amber-800 font-mono font-bold pt-1">
            <span className="truncate">Base + Share</span>
            <div className="hidden sm:flex items-end gap-0.5 h-3">
              {[4, 6, 8, 5, 7, 9, 6].map((h, i) => (
                <span key={i} className="w-0.5 bg-amber-500 rounded" style={{ height: `${h * 2}px` }} />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* 🧭 Horizontal Sub Navigation Tabs (Glass Pills on Mobile & Desktop) */}
      <motion.div variants={itemVariants} className="flex items-center justify-between border-b border-white/60 overflow-x-auto no-scrollbar scroll-smooth py-1">
        <div className="flex space-x-2 sm:space-x-3 text-xs sm:text-sm font-semibold shrink-0">
          {[
            { id: 'dashboard', label: 'Business Analytics' },
            { id: 'members', label: `Members & Invoicing (${data.members.length})` },
            { id: 'finance', label: 'Financials & P&L' },
            { id: 'attendance', label: 'QR Passes & Heatmap' },
            { id: 'assets', label: 'Equipment & Mini POS' },
            { id: 'lockers', label: 'Lockers (18 Free)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2 rounded-2xl transition-all cursor-pointer whitespace-nowrap text-xs font-semibold relative ${
                currentTab === tab.id
                  ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/25 active:scale-98'
                  : 'bg-white/60 hover:bg-white/90 text-slate-600 hover:text-slate-900 border border-white/80'
              }`}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="hidden sm:flex items-center space-x-2 text-xs text-slate-500 font-mono shrink-0 pl-4">
          <Calendar className="h-4 w-4 text-slate-400" />
          <span>Fiscal Year 2026</span>
        </div>
      </motion.div>

      {/* 📈 TAB 1: Business Analytics */}
      {currentTab === 'dashboard' && (
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 6-Month Area Chart */}
            <div className="lg:col-span-2 liquid-glass p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="font-bold text-base text-slate-900 font-display">6-Month Revenue vs Expense Performance</h3>
                  <p className="text-xs text-slate-500">Monthly subscription collections and operational expenses</p>
                </div>
                <div className="flex items-center space-x-4 text-xs font-mono font-medium">
                  <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-600" /> Revenue</div>
                  <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Expenses</div>
                  <button className="px-3 py-1.5 rounded-xl bg-white/70 border border-white text-slate-700 text-xs font-bold cursor-pointer hover:bg-white transition shadow-2xs">
                    Monthly ▾
                  </button>
                </div>
              </div>

              <div className="h-68 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data.financials.monthlyTrend}>
                    <defs>
                      <linearGradient id="warmGlowRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#059669" stopOpacity={0.35}/>
                        <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="warmGlowExp" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#F43F5E" stopOpacity={0.25}/>
                        <stop offset="95%" stopColor="#F43F5E" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.7)" />
                    <XAxis dataKey="month" stroke="#94A3B8" tick={{ fontSize: 11 }} />
                    <YAxis stroke="#94A3B8" tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)', borderColor: 'rgba(255,255,255,0.9)', borderRadius: '16px', fontSize: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.06)' }} />
                    <Area type="monotone" dataKey="revenue" stroke="#059669" strokeWidth={3} fillOpacity={1} fill="url(#warmGlowRev)" name="Revenue (₹)" animationDuration={1500} />
                    <Area type="monotone" dataKey="expense" stroke="#F43F5E" strokeWidth={2.5} fillOpacity={1} fill="url(#warmGlowExp)" name="Expenses (₹)" animationDuration={1500} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Inflow Stream Donut */}
            <div className="liquid-glass p-6 space-y-4 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-base text-slate-900 font-display">Revenue Inflow Stream</h3>
                <p className="text-xs text-slate-500 font-mono">Total <span className="text-slate-900 font-bold">₹245,600</span></p>
              </div>

              <div className="h-44 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data.financials.revenueBreakdown}
                      dataKey="amount"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={48}
                      outerRadius={70}
                      paddingAngle={5}
                      animationDuration={1200}
                    >
                      {data.financials.revenueBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)', borderColor: 'rgba(255,255,255,0.9)', borderRadius: '12px', fontSize: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-2 text-xs">
                {[
                  { name: "Subscriptions", pct: "45%", amt: "₹245,000", color: "#059669" },
                  { name: "Personal Training", pct: "28%", amt: "₹82,000", color: "#4F46E5" },
                  { name: "Mini POS / Store", pct: "20%", amt: "₹29,500", color: "#7C3AED" },
                  { name: "Admission Fees", pct: "7%", amt: "₹7,600", color: "#D97706" },
                ].map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-slate-600">
                    <div className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full shadow-2xs" style={{ backgroundColor: item.color }} />
                      <span className="font-medium text-slate-700">{item.name}</span>
                    </div>
                    <div className="space-x-2 font-mono">
                      <span className="text-slate-400">{item.pct}</span>
                      <span className="font-bold text-slate-900">{item.amt}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/60 text-[11px] text-slate-400">
                <span>Updated live from POS</span>
                <button className="text-indigo-700 hover:text-indigo-800 font-bold flex items-center gap-1 cursor-pointer">
                  <span>View Breakdown</span>
                  <ChevronRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>

          {/* 3 Lower Liquid Glass Control Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Card 1: Dues */}
            <div className="liquid-glass p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-900 font-display">Automated Billing Alerts</h3>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full warm-badge-amber font-bold">
                  3 Action Required
                </span>
              </div>

              <div className="divide-y divide-white/60">
                {[
                  { name: "Karthik Raja", plan: "Monthly Plan", due: "2026-08-20", amt: "₹1,499", status: "DUE", avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80" },
                  { name: "Sneha Patel", plan: "Monthly Plan", due: "2026-08-01", amt: "₹2,299", status: "DUE", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80" },
                  { name: "Arjun Verma", plan: "PT Package", due: "2026-07-25", amt: "EXPIRED", status: "EXPIRED", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" }
                ].map((item, idx) => (
                  <div key={idx} className="py-3 flex items-center justify-between gap-2">
                    <div className="flex items-center space-x-2.5">
                      <img src={item.avatar} alt="" className="w-8 h-8 rounded-full object-cover ring-1 ring-white shadow-2xs" />
                      <div>
                        <p className="text-xs font-bold text-slate-800">{item.name}</p>
                        <p className="text-[10px] text-slate-500">{item.plan} • Due: {item.due}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {item.status === 'EXPIRED' ? (
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded warm-badge-coral">
                          EXPIRED
                        </span>
                      ) : (
                        <span className="text-xs font-mono font-bold text-amber-700">Due: {item.amt}</span>
                      )}
                      <button className="px-2.5 py-1 rounded-lg bg-indigo-50/90 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 text-[11px] font-bold transition cursor-pointer shadow-2xs">
                        Send Link
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button onClick={() => setActiveTab('members')} className="w-full text-center text-xs text-slate-500 hover:text-slate-700 pt-2 block font-bold cursor-pointer">
                View All Dues →
              </button>
            </div>

            {/* Card 2: Coach Roster */}
            <div className="liquid-glass p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-900 font-display">Top Performing Trainers</h3>
                <button onClick={() => setActiveTab('finance')} className="text-xs text-slate-500 hover:text-slate-800 cursor-pointer font-bold">View All →</button>
              </div>

              <div className="space-y-3">
                {[
                  { rank: 1, name: "Rohit Sharma", sessions: 128, rating: 4.9, avatar: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=150&auto=format&fit=crop&q=80" },
                  { rank: 2, name: "Anita Patel", sessions: 96, rating: 4.8, avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80" },
                  { rank: 3, name: "Varun Mehta", sessions: 74, rating: 4.7, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80" }
                ].map((t) => (
                  <div key={t.rank} className="p-3 rounded-2xl bg-white/60 border border-white flex items-center justify-between shadow-2xs">
                    <div className="flex items-center space-x-3">
                      <span className="w-6 h-6 rounded-full bg-white text-xs font-mono font-bold flex items-center justify-center text-slate-700 shadow-2xs">
                        {t.rank}
                      </span>
                      <img src={t.avatar} alt="" className="w-9 h-9 rounded-full object-cover ring-1 ring-white" />
                      <div>
                        <p className="text-xs font-bold text-slate-900">{t.name}</p>
                        <p className="text-[11px] text-slate-500 font-mono">Sessions: {t.sessions}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono font-bold text-emerald-700">★ {t.rating}</span>
                      <div className="w-16 h-1.5 bg-slate-200/80 rounded-full mt-1 overflow-hidden">
                        <div className="h-full bg-emerald-600" style={{ width: `${(t.rating / 5) * 100}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 3: AI Smart Actionable Insight */}
            <div className="liquid-glass-hero p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-purple-900">
                  <Sparkles className="h-4 w-4 text-purple-600" />
                  <span>Executive Growth Telemetry</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Monthly recurring revenue is up <strong className="text-purple-900 font-mono font-bold">+41%</strong>. Supplement sales and PT cross-sell conversion have hit record highs.
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-[10px] bg-white border border-purple-200 text-purple-800 font-bold px-2 py-0.5 rounded-md shadow-2xs">
                    +₹34,200 Surplus
                  </span>
                  <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold px-2 py-0.5 rounded-md shadow-2xs">
                    94% Member Retention
                  </span>
                </div>
              </div>

              <button className="w-full py-2.5 rounded-xl text-xs font-bold bg-white/90 hover:bg-white text-purple-800 border border-purple-200 flex items-center justify-center gap-2 transition cursor-pointer shadow-xs">
                <span>Explore Full Audit Report</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* 👥 TAB 2: Members Directory (Mobile Card Flow + Responsive Table) */}
      {currentTab === 'members' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/60 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-white/80 shadow-2xs">
            <div>
              <h3 className="font-bold text-xs sm:text-base text-slate-900 font-display">Member Directory & Subscription Lifecycle</h3>
              <p className="text-[11px] text-slate-500 font-medium">{data.members.length} Registered Members • Auto-Tax Invoicing Ready</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={exportMembersToCSV}
                className="btn-shiny px-3.5 py-2 rounded-xl text-xs font-bold bg-white/90 hover:bg-white text-emerald-800 border border-emerald-200/80 flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs active:scale-98"
                title="Export Members Roster to CSV/Excel"
              >
                <Download className="h-4 w-4 text-emerald-600" />
                <span>Export CSV</span>
              </button>
              <button
                onClick={() => setShowAddMemberModal(true)}
                className="btn-shiny px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-500 flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-indigo-600/20 active:scale-98"
              >
                <UserPlus className="h-4 w-4" />
                <span>Enroll Member</span>
              </button>
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block liquid-glass p-6 overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-white/60 text-slate-500 uppercase text-[10px] tracking-wider border-b border-white">
                <tr>
                  <th className="py-3.5 px-4">Member</th>
                  <th className="py-3.5 px-4">Plan & Expiry</th>
                  <th className="py-3.5 px-4">Trainer & Locker</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Paid / Due</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/60">
                {data.members.map((member) => (
                  <tr key={member.id} className="hover:bg-white/70 transition">
                    <td className="py-3.5 px-4 flex items-center space-x-3">
                      <img src={member.avatar} alt={member.name} className="w-8 h-8 rounded-full object-cover ring-1 ring-white shadow-2xs" />
                      <div>
                        <p className="font-bold text-slate-900">{member.name}</p>
                        <p className="text-[11px] text-slate-500">{member.email}</p>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-slate-800">{member.planName}</p>
                      <p className="text-[11px] text-slate-500">Exp: {member.expiryDate}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="text-slate-700">{member.trainerName || 'Unassigned'}</p>
                      <p className="text-[11px] text-slate-500 font-mono">Locker: {member.lockerNo}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        member.status === 'ACTIVE'
                          ? 'warm-badge-emerald'
                          : member.status === 'DUE'
                          ? 'warm-badge-amber'
                          : 'warm-badge-coral'
                      }`}>
                        {member.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono">
                      <p className="text-emerald-700 font-bold">₹{member.totalPaid.toLocaleString()}</p>
                      {member.pendingDue > 0 && <p className="text-amber-700 text-[10px]">Due: ₹{member.pendingDue}</p>}
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button
                        onClick={() => setSelectedInvoiceMember(member)}
                        className="btn-shiny px-3 py-1.5 rounded-xl bg-white/90 hover:bg-white text-indigo-700 font-bold text-[11px] inline-flex items-center gap-1 cursor-pointer transition border border-white shadow-2xs"
                      >
                        <span>Invoice</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View (Optimized for Small Screens) */}
          <div className="grid grid-cols-1 gap-3 md:hidden">
            {data.members.map((member) => (
              <div key={member.id} className="liquid-glass p-4 space-y-3 border border-white/90 shadow-2xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-2xl object-cover ring-2 ring-indigo-600/30 shadow-2xs" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm font-display leading-tight">{member.name}</h4>
                      <p className="text-[10px] text-slate-500">{member.email}</p>
                    </div>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono ${
                    member.status === 'ACTIVE' ? 'warm-badge-emerald' : member.status === 'DUE' ? 'warm-badge-amber' : 'warm-badge-coral'
                  }`}>
                    {member.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 p-2.5 rounded-2xl bg-white/70 backdrop-blur-md border border-white/90 text-xs font-mono">
                  <div>
                    <span className="text-slate-400 text-[9px] block uppercase font-bold">Plan</span>
                    <span className="text-slate-800 font-bold text-[11px] truncate block">{member.planName}</span>
                  </div>
                  <div className="border-l border-white pl-2">
                    <span className="text-slate-400 text-[9px] block uppercase font-bold">Paid / Due</span>
                    <span className="text-emerald-700 font-black text-xs">₹{member.totalPaid.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <p className="text-[10px] text-slate-500 font-mono">Coach: <strong className="text-slate-700">{member.trainerName || 'Unassigned'}</strong> • {member.lockerNo}</p>
                  <button
                    onClick={() => setSelectedInvoiceMember(member)}
                    className="btn-shiny px-3 py-1.5 rounded-xl bg-white hover:bg-indigo-50 text-indigo-700 font-bold text-[11px] border border-white/90 shadow-2xs"
                  >
                    View Invoice
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* 💰 TAB 3: Finance & P&L */}
      {currentTab === 'finance' && (
        <motion.div variants={itemVariants} className="space-y-4 sm:space-y-6">
          <div className="flex items-center justify-between bg-white/60 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-white/80 shadow-2xs">
            <div>
              <h3 className="font-bold text-xs sm:text-base text-slate-900 font-display">Financial Statements & Profit & Loss Statement</h3>
              <p className="text-[11px] text-slate-500 font-medium">Auto-calculated Net Margins • Operational Cashflow Telemetry</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={exportFinancialsToCSV}
                className="btn-shiny px-3.5 py-2 rounded-xl text-xs font-bold bg-white/90 hover:bg-white text-emerald-800 border border-emerald-200/80 flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs active:scale-98"
                title="Export P&L Statement to CSV/Excel"
              >
                <Download className="h-4 w-4 text-emerald-600" />
                <span>Export P&L (CSV)</span>
              </button>
              <button
                onClick={() => setShowExpenseModal(true)}
                className="btn-shiny px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 text-white hover:bg-rose-500 flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-rose-600/20 active:scale-98"
              >
                <span>+ Expense</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div className="liquid-glass p-4 sm:p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900 font-display">Operating Expense Outflows</h3>
                  <p className="text-[10px] text-slate-500 font-mono">Fixed & Variable Monthly Overhead</p>
                </div>
                <button onClick={() => setShowExpenseModal(true)} className="btn-shiny px-3 py-1.5 rounded-xl text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 cursor-pointer shadow-2xs active:scale-95">
                  + Expense
                </button>
              </div>
              <div className="space-y-2.5">
                {data.financials.expenseBreakdown.map((exp, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-white/70 backdrop-blur-md border border-white/90 shadow-2xs">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-3 h-3 rounded-full shrink-0 shadow-2xs" style={{ backgroundColor: exp.color }} />
                      <span className="text-xs font-bold text-slate-800">{exp.name}</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-rose-600">₹{exp.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="liquid-glass p-4 sm:p-6 space-y-4">
              <div>
                <h3 className="font-bold text-xs sm:text-sm text-slate-900 font-display">Trainer Payroll & PT Commissions</h3>
                <p className="text-[10px] text-slate-500 font-mono">Base Salary + 35% PT Revenue Share</p>
              </div>
              <div className="space-y-2.5">
                {data.trainers.map((trainer) => (
                  <div key={trainer.id} className="p-3 rounded-2xl bg-white/70 backdrop-blur-md border border-white/90 flex items-center justify-between shadow-2xs">
                    <div className="flex items-center space-x-3">
                      <img src={trainer.avatar} alt={trainer.name} className="w-9 h-9 rounded-2xl object-cover ring-1 ring-white" />
                      <div>
                        <p className="text-xs font-bold text-slate-900">{trainer.name}</p>
                        <p className="text-[10px] text-slate-500">{trainer.specialization}</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-700">
                      ₹{(trainer.baseSalary + trainer.monthlyCommission).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* 🚪 TAB 4: Attendance & Heatmap */}
      {currentTab === 'attendance' && (
        <motion.div variants={itemVariants} className="liquid-glass p-4 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/80 pb-3">
            <div>
              <h3 className="font-bold text-xs sm:text-sm text-slate-900 font-display">Gym Floor Peak-Hour Density Heatmap & Gate Logs</h3>
              <p className="text-[10px] text-slate-500 font-mono">Real-time attendance & gate sensor telemetry</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={exportAttendanceToCSV}
                className="btn-shiny px-3 py-1.5 rounded-xl text-xs font-bold bg-white/90 hover:bg-white text-emerald-800 border border-emerald-200/80 flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs active:scale-98"
                title="Export Gate Attendance to CSV/Excel"
              >
                <Download className="h-3.5 w-3.5 text-emerald-600" />
                <span>Export Logs (CSV)</span>
              </button>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded-full warm-badge-emerald font-bold">
                Floor Capacity: 80 Max
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-3">
            {data.peakHoursHeatmap.map((slot, i) => (
              <div
                key={i}
                className={`p-3.5 rounded-2xl border text-center transition shadow-2xs ${
                  slot.crowd >= 80
                    ? 'warm-badge-coral'
                    : slot.crowd >= 60
                    ? 'warm-badge-amber'
                    : 'warm-badge-emerald'
                }`}
              >
                <p className="text-[11px] font-mono font-bold">{slot.slot}</p>
                <div className="my-1"><span className="text-xl sm:text-2xl font-black font-display">{slot.crowd}%</span></div>
                <p className="text-[10px] opacity-80 truncate">{slot.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* 📦 TAB 5: Assets & Mini POS */}
      {currentTab === 'assets' && (
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="liquid-glass p-4 sm:p-6 space-y-4">
            <h3 className="font-bold text-xs sm:text-sm text-slate-900 font-display">Equipment Maintenance Log</h3>
            <div className="space-y-2.5">
              {data.equipmentList.map((eq) => (
                <div key={eq.id} className="p-3.5 rounded-2xl bg-white/70 backdrop-blur-md border border-white/90 flex items-center justify-between shadow-2xs">
                  <div>
                    <p className="text-xs font-bold text-slate-900">{eq.name}</p>
                    <p className="text-[10px] text-slate-500 font-mono">Next Due: {eq.nextDue}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full font-mono ${
                    eq.status === 'OPERATIONAL' ? 'warm-badge-emerald' : 'warm-badge-amber'
                  }`}>
                    {eq.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="liquid-glass p-4 sm:p-6 space-y-4">
            <h3 className="font-bold text-xs sm:text-sm text-slate-900 font-display">Supplement Store & Mini POS</h3>
            <div className="space-y-2.5">
              {data.inventoryStore.map((item) => (
                <div key={item.id} className="p-3.5 rounded-2xl bg-white/70 backdrop-blur-md border border-white/90 flex items-center justify-between shadow-2xs">
                  <div>
                    <p className="text-xs font-bold text-slate-900">{item.name}</p>
                    <p className="text-[10px] text-slate-500 font-mono">Stock: <strong className="text-slate-800">{item.stock}</strong> • ₹{item.price}</p>
                  </div>
                  <button
                    onClick={() => sellInventoryItem(item.id, 1)}
                    className="btn-shiny px-3.5 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer shadow-xs active:scale-95"
                  >
                    Sell 1x
                  </button>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* 🔐 TAB 6: Lockers Grid */}
      {currentTab === 'lockers' && (
        <motion.div variants={itemVariants} className="liquid-glass p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/80 pb-3">
            <div>
              <h3 className="font-bold text-xs sm:text-sm text-slate-900 font-display">Gym Locker Allocation Grid</h3>
              <p className="text-[10px] text-slate-500 font-mono">Tap any locker to toggle status (Available / Assigned / Maintenance)</p>
            </div>
            <span className="text-[10px] font-mono warm-badge-emerald px-2.5 py-1 rounded-full font-bold">
              18 Free
            </span>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2.5 pt-1">
            {data.lockers.map((locker) => (
              <button
                key={locker.id}
                onClick={() => {
                  const next = locker.status === 'AVAILABLE' ? 'OCCUPIED' : locker.status === 'OCCUPIED' ? 'MAINTENANCE' : 'AVAILABLE';
                  toggleLockerStatus(locker.id, next, next === 'OCCUPIED' ? 'Assigned' : null);
                }}
                className={`p-3 rounded-2xl border text-center transition cursor-pointer active:scale-95 shadow-2xs ${
                  locker.status === 'AVAILABLE'
                    ? 'bg-emerald-50/90 border-emerald-200 text-emerald-800'
                    : locker.status === 'OCCUPIED'
                    ? 'bg-rose-50/90 border-rose-200 text-rose-800'
                    : 'bg-amber-50/90 border-amber-200 text-amber-800'
                }`}
              >
                <p className="font-mono font-bold text-xs">{locker.number}</p>
                <p className="text-[9px] mt-0.5 truncate font-medium">{locker.assignedTo || locker.status}</p>
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* MODAL: Add Member */}
      {showAddMemberModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4">
          <div className="liquid-glass w-full max-w-lg p-6 space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-white pb-3">
              <h3 className="font-bold text-base text-slate-900 font-display">Enroll New Gym Member</h3>
              <button onClick={() => setShowAddMemberModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">✕</button>
            </div>
            <form onSubmit={handleAddMemberSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-700 font-bold">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={newMemberForm.name}
                  onChange={(e) => setNewMemberForm({ ...newMemberForm, name: e.target.value })}
                  className="w-full mt-1 bg-white/80 border border-white rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:border-indigo-500 shadow-2xs"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-bold">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="ramesh@gmail.com"
                    value={newMemberForm.email}
                    onChange={(e) => setNewMemberForm({ ...newMemberForm, email: e.target.value })}
                    className="w-full mt-1 bg-white/80 border border-white rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none shadow-2xs"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-bold">Phone</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 00000"
                    value={newMemberForm.phone}
                    onChange={(e) => setNewMemberForm({ ...newMemberForm, phone: e.target.value })}
                    className="w-full mt-1 bg-white/80 border border-white rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none shadow-2xs"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-3 border-t border-white">
                <button type="button" onClick={() => setShowAddMemberModal(false)} className="px-4 py-2 rounded-xl text-slate-500 cursor-pointer font-medium">Cancel</button>
                <button type="submit" className="btn-shiny px-5 py-2.5 rounded-xl font-bold bg-indigo-600 text-white cursor-pointer shadow-md">Enroll Member</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Record Expense */}
      {showExpenseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4">
          <div className="liquid-glass w-full max-w-md p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white pb-3">
              <h3 className="font-bold text-base text-slate-900 font-display">Record Operating Expense</h3>
              <button onClick={() => setShowExpenseModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">✕</button>
            </div>
            <form onSubmit={handleExpenseSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-700 font-bold">Expense Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AC Maintenance"
                  value={expenseForm.name}
                  onChange={(e) => setExpenseForm({ ...expenseForm, name: e.target.value })}
                  className="w-full mt-1 bg-white/80 border border-white rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none shadow-2xs"
                />
              </div>
              <div>
                <label className="text-slate-700 font-bold">Amount (₹)</label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 4500"
                  value={expenseForm.amount}
                  onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })}
                  className="w-full mt-1 bg-white/80 border border-white rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none shadow-2xs"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-3 border-t border-white">
                <button type="button" onClick={() => setShowExpenseModal(false)} className="px-4 py-2 rounded-xl text-slate-500 cursor-pointer font-medium">Cancel</button>
                <button type="submit" className="btn-shiny px-5 py-2.5 rounded-xl font-bold bg-rose-600 text-white cursor-pointer shadow-md">Record Expense</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* MODAL: GST Tax Invoice & Download */}
      {selectedInvoiceMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-3 sm:p-4 overflow-y-auto">
          <div className="liquid-glass w-full max-w-xl p-5 sm:p-7 space-y-4 shadow-2xl bg-white/95 border border-white/90 text-slate-900 max-h-[90vh] overflow-y-auto print:m-0 print:p-0 print:border-none print:shadow-none">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-3.5 print:hidden">
              <div className="flex items-center space-x-2">
                <span className="text-base sm:text-lg font-black font-display text-indigo-600">FITPULSE 360</span>
                <span className="text-[10px] font-mono font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full">GST INVOICE</span>
              </div>
              <button 
                onClick={() => setSelectedInvoiceMember(null)} 
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer transition font-bold"
              >
                ✕
              </button>
            </div>

            {/* Invoice Document Body (Ready for Print / PDF) */}
            <div id="tax-invoice-printable" className="space-y-4 text-xs font-mono">
              {/* Gym & Tax Details Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-200 pb-3">
                <div>
                  <h2 className="text-base sm:text-lg font-black text-slate-900 font-display">FITPULSE 360 FITNESS & ATHLETICS CLUB</h2>
                  <p className="text-[11px] text-slate-600">No. 42, Olympic Avenue, 100ft Road, Anna Nagar</p>
                  <p className="text-[11px] text-slate-600">Chennai, Tamil Nadu - 600040</p>
                  <p className="text-[10px] text-indigo-600 font-bold mt-1">GSTIN: 33AAACF1234F1Z8 • SAC Code: 999723</p>
                </div>
                <div className="sm:text-right bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <p className="text-[10px] text-slate-400 font-bold">INVOICE NO.</p>
                  <p className="font-bold text-slate-900 text-xs">FP-INV-2026-{String(selectedInvoiceMember.id).replace('m-', '').padStart(4, '0')}</p>
                  <p className="text-[10px] text-slate-400 font-bold mt-1">DATE</p>
                  <p className="font-bold text-slate-800 text-xs">{selectedInvoiceMember.startDate || new Date().toISOString().split('T')[0]}</p>
                </div>
              </div>

              {/* Billed To / Member Info */}
              <div className="grid grid-cols-2 gap-3 bg-slate-50/80 p-3 rounded-xl border border-slate-200/80">
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Billed To (Member)</p>
                  <p className="font-bold text-slate-900 text-xs font-display">{selectedInvoiceMember.name}</p>
                  <p className="text-[11px] text-slate-600">{selectedInvoiceMember.email}</p>
                  <p className="text-[11px] text-slate-600">{selectedInvoiceMember.phone}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Plan & Access Pass</p>
                  <p className="font-bold text-slate-900 text-xs">{selectedInvoiceMember.planName}</p>
                  <p className="text-[10px] text-slate-600">Valid: {selectedInvoiceMember.startDate} to {selectedInvoiceMember.expiryDate}</p>
                  <p className="text-[10px] text-emerald-700 font-bold">Locker: {selectedInvoiceMember.lockerNo} • Status: {selectedInvoiceMember.status}</p>
                </div>
              </div>

              {/* Line Items Table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-600 uppercase text-[10px] border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-3">Description</th>
                      <th className="py-2.5 px-3 text-center">SAC</th>
                      <th className="py-2.5 px-3 text-right">Amount (₹)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="py-3 px-3">
                        <p className="font-bold text-slate-900">{selectedInvoiceMember.planName} Membership</p>
                        <p className="text-[10px] text-slate-500">Includes Full Gym Access, Steam & Personal Locker</p>
                      </td>
                      <td className="py-3 px-3 text-center text-slate-600">999723</td>
                      <td className="py-3 px-3 text-right font-bold text-slate-800">
                        ₹{(Math.round(selectedInvoiceMember.totalPaid / 1.18)).toLocaleString()}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 text-slate-500 text-[11px]">CGST (9%)</td>
                      <td className="py-2 px-3 text-center text-slate-400 text-[10px]">-</td>
                      <td className="py-2 px-3 text-right text-slate-700 text-[11px]">
                        ₹{(Math.round((selectedInvoiceMember.totalPaid / 1.18) * 0.09)).toLocaleString()}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 text-slate-500 text-[11px]">SGST (9%)</td>
                      <td className="py-2 px-3 text-center text-slate-400 text-[10px]">-</td>
                      <td className="py-2 px-3 text-right text-slate-700 text-[11px]">
                        ₹{(Math.round((selectedInvoiceMember.totalPaid / 1.18) * 0.09)).toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                  <tfoot className="bg-indigo-50/80 border-t border-indigo-100 font-bold text-xs">
                    <tr>
                      <td colSpan="2" className="py-2.5 px-3 text-indigo-900">Total Paid (Inclusive of 18% GST)</td>
                      <td className="py-2.5 px-3 text-right text-indigo-700 font-black text-sm">₹{selectedInvoiceMember.totalPaid.toLocaleString()}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Tax & Authorization Footer */}
              <div className="flex items-center justify-between pt-2 text-[10px] text-slate-500 border-t border-slate-200">
                <div>
                  <p>• Computer-generated Tax Invoice. No signature required.</p>
                  <p>• Payments are non-refundable & non-transferable.</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-700">FITPULSE 360 PVT LTD</p>
                  <p className="text-[9px] text-emerald-600 font-bold">Authorized Signatory</p>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-200 print:hidden">
              <button
                type="button"
                onClick={() => setSelectedInvoiceMember(null)}
                className="px-4 py-2 rounded-xl text-xs text-slate-500 hover:text-slate-700 cursor-pointer font-bold"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="btn-shiny px-5 py-2.5 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer shadow-md flex items-center gap-1.5 text-xs active:scale-98"
              >
                <Download className="h-4 w-4" />
                <span>Print / Save as PDF</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </motion.div>
  );
};
