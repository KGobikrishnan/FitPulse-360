import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';
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
  Calendar
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

export const AdminDashboard = () => {
  const { data, activeTab, setActiveTab, addMember, updateMemberStatus, recordExpense, toggleLockerStatus, updateEquipmentStatus, sellInventoryItem } = useGym();

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

  const handlePlanSelect = (e) => {
    const plan = data.plans.find((p) => p.id === e.target.value);
    if (plan) {
      setNewMemberForm({
        ...newMemberForm,
        planId: plan.id,
        planName: plan.name,
        totalPaid: plan.price + plan.admissionFee,
      });
    }
  };

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

  const totalMembers = data.members.length;
  const activeMembers = data.members.filter((m) => m.status === 'ACTIVE').length;

  return (
    <div className="space-y-6">
      {/* Top Header & Executive Control Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2.5">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight font-sans">
              Executive Business Control
            </h1>
            <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full saas-badge-emerald font-bold">
              Live Operations
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Real-time tracking, intelligent insights & complete control over your business.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={() => setShowExpenseModal(true)}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#12151f] hover:bg-[#171a26] text-zinc-200 border border-white/[0.08] transition flex items-center gap-1.5 cursor-pointer"
          >
            <DollarSign className="h-4 w-4 text-rose-400" />
            <span>Record Expense</span>
          </button>
          <button
            onClick={() => setShowAddMemberModal(true)}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/20 transition flex items-center gap-1.5 cursor-pointer"
          >
            <UserPlus className="h-4 w-4" />
            <span>+ Enroll Member</span>
          </button>
          <button className="p-2 rounded-xl bg-[#12151f] border border-white/[0.08] text-zinc-400 hover:text-white">
            <SlidersHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* 4 Premium SaaS KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Gross Collection */}
        <div className="saas-card-hover p-5 space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider font-semibold">Gross Collection</p>
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <DollarSign className="h-4 w-4" />
            </span>
          </div>
          <h3 className="text-2xl font-black text-white">₹{data.financials.monthlyRevenue.toLocaleString()}</h3>
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold font-mono">
              <ArrowUpRight className="h-3.5 w-3.5" />
              <span>41.2% from last month</span>
            </div>
            {/* Sparkline Visual */}
            <div className="flex items-end gap-0.5 h-4">
              <span className="w-1 h-2 bg-emerald-500/40 rounded-full" />
              <span className="w-1 h-3 bg-emerald-500/60 rounded-full" />
              <span className="w-1 h-2 bg-emerald-500/40 rounded-full" />
              <span className="w-1 h-4 bg-emerald-400 rounded-full" />
            </div>
          </div>
        </div>

        {/* Card 2: Net Profit (P&L) */}
        <div className="saas-card-hover p-5 space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider font-semibold">Net Profit (P&L)</p>
            <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <TrendingUp className="h-4 w-4" />
            </span>
          </div>
          <h3 className="text-2xl font-black text-white">₹{data.financials.netProfit.toLocaleString()}</h3>
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1 text-[11px] text-cyan-400 font-semibold font-mono">
              <ArrowUpRight className="h-3.5 w-3.5" />
              <span>28.7% from last month</span>
            </div>
            <div className="flex items-end gap-0.5 h-4">
              <span className="w-1 h-2 bg-cyan-500/40 rounded-full" />
              <span className="w-1 h-4 bg-cyan-400 rounded-full" />
              <span className="w-1 h-3 bg-cyan-500/60 rounded-full" />
            </div>
          </div>
        </div>

        {/* Card 3: Active Members */}
        <div className="saas-card-hover p-5 space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider font-semibold">Active Members</p>
            <span className="p-2 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
              <Users className="h-4 w-4" />
            </span>
          </div>
          <div className="flex items-baseline space-x-2">
            <h3 className="text-2xl font-black text-white">{activeMembers * 3 + 120}</h3>
            <span className="text-xs text-zinc-500 font-mono">Live</span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-1">
            <span><strong className="text-emerald-400">10 New</strong> • <strong className="text-rose-400">18 Expired</strong></span>
            {/* Sparkline Bar array */}
            <div className="flex items-end gap-0.5 h-3">
              {[3, 5, 2, 8, 6, 4, 7, 9, 5, 8].map((h, i) => (
                <span key={i} className="w-0.5 bg-emerald-500/70 rounded" style={{ height: `${h * 2}px` }} />
              ))}
            </div>
          </div>
        </div>

        {/* Card 4: Trainer Payroll */}
        <div className="saas-card-hover p-5 space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider font-semibold">Trainer Payroll</p>
            <span className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <CreditCard className="h-4 w-4" />
            </span>
          </div>
          <h3 className="text-2xl font-black text-white">₹96,400</h3>
          <div className="flex items-center justify-between text-[11px] text-purple-300 font-mono pt-1">
            <span>Extra Salary + 15% PT Commission</span>
            <div className="flex items-end gap-0.5 h-3">
              {[4, 6, 8, 5, 7, 9, 6].map((h, i) => (
                <span key={i} className="w-0.5 bg-purple-400 rounded" style={{ height: `${h * 2}px` }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Navigation Filter Tabs */}
      <div className="flex items-center justify-between border-b border-white/[0.07] overflow-x-auto">
        <div className="flex space-x-6 text-xs font-semibold">
          {[
            { id: 'dashboard', label: 'Business Analytics' },
            { id: 'members', label: `Members & Auto Invoicing (${data.members.length})` },
            { id: 'finance', label: 'Financials & P&L Statement' },
            { id: 'attendance', label: 'QR Gates & Peak Heatmap' },
            { id: 'assets', label: 'Equipment & Mini POS' },
            { id: 'lockers', label: 'Lockers (18 Free)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 transition cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-emerald-400 border-b-2 border-emerald-400 font-bold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="hidden sm:flex items-center space-x-2 text-xs text-zinc-400 pb-3 font-mono">
          <Calendar className="h-3.5 w-3.5" />
          <span>FY 2026</span>
        </div>
      </div>

      {/* VIEW: Business Analytics Dashboard (Exact Layout from Image) */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Top 2 Main Visual Analytics Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Chart: 6-Month Revenue vs Expense Performance */}
            <div className="lg:col-span-2 saas-card p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="font-bold text-sm text-white">6-Month Revenue vs Expense Performance</h3>
                  <p className="text-xs text-zinc-400">Monthly revenue collections and operational expenses</p>
                </div>
                <div className="flex items-center space-x-4 text-xs font-mono">
                  <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400" /> Revenue</div>
                  <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-rose-400" /> Expenses</div>
                  <button className="px-2.5 py-1 rounded-lg bg-[#171a26] border border-white/[0.08] text-zinc-300 text-[11px]">
                    Monthly ▾
                  </button>
                </div>
              </div>

              <div className="h-64 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data.financials.monthlyTrend}>
                    <defs>
                      <linearGradient id="glowRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.35}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="glowExp" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.25}/>
                        <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="month" stroke="#71717a" tick={{ fontSize: 11 }} />
                    <YAxis stroke="#71717a" tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={{ backgroundColor: '#12151f', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '12px' }} />
                    <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#glowRev)" name="Revenue (₹)" />
                    <Area type="monotone" dataKey="expense" stroke="#f43f5e" strokeWidth={2} fillOpacity={1} fill="url(#glowExp)" name="Expenses (₹)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Right Donut: Revenue Inflow Stream */}
            <div className="saas-card p-6 space-y-4 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-sm text-white">Revenue Inflow Stream</h3>
                <p className="text-xs text-zinc-400 font-mono">Total <span className="text-white font-bold">₹245,600</span></p>
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
                    >
                      {data.financials.revenueBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#12151f', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-2 text-xs">
                {[
                  { name: "Subscriptions", pct: "45%", amt: "₹245,000", color: "#10b981" },
                  { name: "Personal Training", pct: "28%", amt: "₹82,000", color: "#38bdf8" },
                  { name: "Mini POS / Accessories", pct: "20%", amt: "₹29,500", color: "#a855f7" },
                  { name: "Admission Fee", pct: "7%", amt: "₹7,600", color: "#fbbf24" },
                ].map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-zinc-300">
                    <div className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span>{item.name}</span>
                    </div>
                    <div className="space-x-2 font-mono">
                      <span className="text-zinc-500">{item.pct}</span>
                      <span className="font-bold text-white">{item.amt}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/[0.07] text-[11px] text-zinc-500">
                <span>Updated 2 min ago</span>
                <button className="text-zinc-400 hover:text-white flex items-center gap-1">
                  <span>View Details</span>
                  <ChevronRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom 3 Detailed Panels */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Panel 1: Automated Billing Alerts & Pending Dues */}
            <div className="saas-card p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-xs sm:text-sm text-white">Automated Billing Alerts & Pending Dues</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full saas-badge-amber font-bold">
                  3 Action Required
                </span>
              </div>

              <div className="divide-y divide-white/[0.07]">
                {[
                  { name: "Karthik Raja", plan: "Monthly Plan", due: "2026-08-20", amt: "₹1,499", status: "DUE", avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80" },
                  { name: "Sneha Patel", plan: "Monthly Plan", due: "2026-08-01", amt: "₹2,299", status: "DUE", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80" },
                  { name: "Arjun Verma", plan: "PT Package", due: "2026-07-25", amt: "EXPIRED", status: "EXPIRED", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" }
                ].map((item, idx) => (
                  <div key={idx} className="py-3 flex items-center justify-between gap-2">
                    <div className="flex items-center space-x-2.5">
                      <img src={item.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <p className="text-xs font-bold text-zinc-100">{item.name}</p>
                        <p className="text-[10px] text-zinc-500">{item.plan} • Due: {item.due}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {item.status === 'EXPIRED' ? (
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-950/40 text-rose-400 border border-rose-800/40">
                          EXPIRED
                        </span>
                      ) : (
                        <span className="text-xs font-mono font-bold text-amber-400">Due: {item.amt}</span>
                      )}
                      <button className="px-2.5 py-1 rounded-lg bg-[#171a26] hover:bg-[#202434] text-emerald-400 border border-emerald-500/20 text-[11px] font-medium transition cursor-pointer">
                        Send Payment Link
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full text-center text-xs text-zinc-400 hover:text-zinc-200 pt-2 block font-medium">
                View All Dues →
              </button>
            </div>

            {/* Panel 2: Top Performing Trainers */}
            <div className="saas-card p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-xs sm:text-sm text-white">Top Performing Trainers</h3>
                <button className="text-xs text-zinc-400 hover:text-white">View All →</button>
              </div>

              <div className="space-y-3">
                {[
                  { rank: 1, name: "Rohit Sharma", sessions: 128, rating: 4.9, avatar: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=150&auto=format&fit=crop&q=80" },
                  { rank: 2, name: "Anita Patel", sessions: 96, rating: 4.8, avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80" },
                  { rank: 3, name: "Varun Mehta", sessions: 74, rating: 4.7, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80" }
                ].map((t) => (
                  <div key={t.rank} className="p-2.5 rounded-xl bg-[#171a26] border border-white/[0.05] flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#1e2333] text-[10px] font-mono font-bold flex items-center justify-center text-zinc-400">
                        {t.rank}
                      </span>
                      <img src={t.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <p className="text-xs font-bold text-zinc-100">{t.name}</p>
                        <p className="text-[10px] text-zinc-500 font-mono">PT Sessions: {t.sessions}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono font-bold text-emerald-400">Rating {t.rating}</span>
                      <div className="w-14 h-1 bg-zinc-800 rounded-full mt-1 overflow-hidden">
                        <div className="h-full bg-emerald-400" style={{ width: `${(t.rating / 5) * 100}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Panel 3: AI Business Insight Card */}
            <div className="saas-card-glow p-5 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-400">
                  <Sparkles className="h-4 w-4" />
                  <span>AI Business Insight</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Revenue is up <strong className="text-emerald-400 font-mono font-bold">41%</strong> this month! Personal training growth is outperforming other streams.
                </p>
              </div>

              <button className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#171a26] hover:bg-[#202434] text-emerald-400 border border-emerald-500/30 flex items-center justify-center gap-1.5 transition cursor-pointer">
                <span>Explore Insights</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: Members Table & Invoicing */}
      {activeTab === 'members' && (
        <div className="saas-card p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-sm text-white">Member Directory & Subscription Lifecycle</h3>
              <p className="text-xs text-zinc-400">Manage memberships, generate digital invoices, and track payment dues.</p>
            </div>
            <button
              onClick={() => setShowAddMemberModal(true)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-500 text-black hover:bg-emerald-400 flex items-center gap-1.5"
            >
              <UserPlus className="h-3.5 w-3.5" />
              <span>Enroll New Member</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-zinc-300">
              <thead className="bg-[#0b0d13] text-zinc-400 uppercase text-[10px] tracking-wider border-b border-white/[0.08]">
                <tr>
                  <th className="py-3 px-4">Member</th>
                  <th className="py-3 px-4">Plan & Expiry</th>
                  <th className="py-3 px-4">Trainer & Locker</th>
                  <th className="py-3 px-4">Billing Status</th>
                  <th className="py-3 px-4">Paid / Due</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05]">
                {data.members.map((member) => (
                  <tr key={member.id} className="hover:bg-[#151824] transition">
                    <td className="py-3 px-4 flex items-center space-x-3">
                      <img src={member.avatar} alt={member.name} className="w-8 h-8 rounded-full object-cover border border-zinc-700" />
                      <div>
                        <p className="font-bold text-zinc-100">{member.name}</p>
                        <p className="text-[11px] text-zinc-500">{member.email}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-semibold text-zinc-200">{member.planName}</p>
                      <p className="text-[11px] text-zinc-500">Exp: {member.expiryDate}</p>
                    </td>
                    <td className="py-3 px-4">
                      <p className="text-zinc-300">{member.trainerName || 'Unassigned'}</p>
                      <p className="text-[11px] text-zinc-500 font-mono">Locker: {member.lockerNo}</p>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        member.status === 'ACTIVE'
                          ? 'saas-badge-emerald'
                          : member.status === 'DUE'
                          ? 'saas-badge-amber'
                          : 'bg-rose-950/40 text-rose-400 border border-rose-800/40'
                      }`}>
                        {member.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono">
                      <p className="text-emerald-400 font-semibold">₹{member.totalPaid.toLocaleString()}</p>
                      {member.pendingDue > 0 && <p className="text-amber-400 text-[10px]">Due: ₹{member.pendingDue}</p>}
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => setSelectedInvoiceMember(member)}
                        className="px-2.5 py-1 rounded-lg bg-[#1a1e2c] hover:bg-[#252a3d] text-zinc-200 font-medium text-[11px] inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>Invoice</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW: Financials & P&L Statement */}
      {activeTab === 'finance' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="saas-card p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-white">Operating Expense Outflows</h3>
                <button onClick={() => setShowExpenseModal(true)} className="px-3 py-1 rounded-xl text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  + Add Expense
                </button>
              </div>
              <div className="space-y-2.5">
                {data.financials.expenseBreakdown.map((exp, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-[#171a26] border border-white/[0.05]">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: exp.color }} />
                      <span className="text-xs font-semibold text-zinc-200">{exp.name}</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-rose-400">₹{exp.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="saas-card p-5 space-y-4">
              <h3 className="font-bold text-sm text-white">Trainer Payroll & PT Commission Engine</h3>
              <div className="space-y-3">
                {data.trainers.map((trainer) => (
                  <div key={trainer.id} className="p-4 rounded-xl bg-[#171a26] border border-white/[0.05] space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2.5">
                        <img src={trainer.avatar} alt={trainer.name} className="w-8 h-8 rounded-full object-cover" />
                        <div>
                          <p className="text-xs font-bold text-zinc-100">{trainer.name}</p>
                          <p className="text-[10px] text-zinc-400">{trainer.specialization}</p>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold text-emerald-400">
                        ₹{(trainer.baseSalary + trainer.monthlyCommission).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: QR Passes & Heatmap */}
      {activeTab === 'attendance' && (
        <div className="saas-card p-5 space-y-4">
          <h3 className="font-bold text-sm text-white">Gym Floor Peak-Hour Density Heatmap</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {data.peakHoursHeatmap.map((slot, i) => (
              <div
                key={i}
                className={`p-3 rounded-xl border text-center transition ${
                  slot.crowd >= 80
                    ? 'bg-rose-950/30 border-rose-500/40 text-rose-300'
                    : slot.crowd >= 60
                    ? 'bg-amber-950/30 border-amber-500/40 text-amber-300'
                    : 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                }`}
              >
                <p className="text-[11px] font-mono font-bold">{slot.slot}</p>
                <div className="my-1.5"><span className="text-lg font-black">{slot.crowd}%</span></div>
                <p className="text-[10px] opacity-80">{slot.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW: Assets & Mini POS */}
      {activeTab === 'assets' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="saas-card p-5 space-y-4">
            <h3 className="font-bold text-sm text-white">Equipment Maintenance Log</h3>
            <div className="space-y-3">
              {data.equipmentList.map((eq) => (
                <div key={eq.id} className="p-3.5 rounded-xl bg-[#171a26] border border-white/[0.05] flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-zinc-100">{eq.name}</p>
                    <p className="text-[10px] text-zinc-400">Next Due: {eq.nextDue}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    eq.status === 'OPERATIONAL' ? 'saas-badge-emerald' : 'saas-badge-amber'
                  }`}>
                    {eq.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="saas-card p-5 space-y-4">
            <h3 className="font-bold text-sm text-white">Supplement Store & Mini POS</h3>
            <div className="space-y-3">
              {data.inventoryStore.map((item) => (
                <div key={item.id} className="p-3.5 rounded-xl bg-[#171a26] border border-white/[0.05] flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-zinc-100">{item.name}</p>
                    <p className="text-[10px] text-zinc-400 font-mono">Stock: {item.stock} • ₹{item.price}</p>
                  </div>
                  <button
                    onClick={() => sellInventoryItem(item.id, 1)}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-black cursor-pointer"
                  >
                    Sell 1x
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW: Lockers */}
      {activeTab === 'lockers' && (
        <div className="saas-card p-5 space-y-4">
          <h3 className="font-bold text-sm text-white">Gym Locker Allocation Grid</h3>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 pt-2">
            {data.lockers.map((locker) => (
              <button
                key={locker.id}
                onClick={() => {
                  const next = locker.status === 'AVAILABLE' ? 'OCCUPIED' : locker.status === 'OCCUPIED' ? 'MAINTENANCE' : 'AVAILABLE';
                  toggleLockerStatus(locker.id, next, next === 'OCCUPIED' ? 'Assigned' : null);
                }}
                className={`p-3 rounded-xl border text-center transition cursor-pointer ${
                  locker.status === 'AVAILABLE'
                    ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                    : locker.status === 'OCCUPIED'
                    ? 'bg-rose-950/30 border-rose-500/40 text-rose-300'
                    : 'bg-amber-950/30 border-amber-500/40 text-amber-300'
                }`}
              >
                <p className="font-mono font-bold text-sm">{locker.number}</p>
                <p className="text-[10px] mt-1 truncate">{locker.assignedTo || locker.status}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* MODAL: Enroll Member */}
      {showAddMemberModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4">
          <div className="saas-card w-full max-w-lg p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <h3 className="font-bold text-base text-white">Enroll New Gym Member</h3>
              <button onClick={() => setShowAddMemberModal(false)} className="text-zinc-400 hover:text-white">✕</button>
            </div>
            <form onSubmit={handleAddMemberSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-zinc-300 font-semibold">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={newMemberForm.name}
                  onChange={(e) => setNewMemberForm({ ...newMemberForm, name: e.target.value })}
                  className="w-full mt-1 bg-[#0b0d13] border border-white/[0.1] rounded-xl px-3.5 py-2 text-zinc-100 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-zinc-300 font-semibold">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="ramesh@gmail.com"
                    value={newMemberForm.email}
                    onChange={(e) => setNewMemberForm({ ...newMemberForm, email: e.target.value })}
                    className="w-full mt-1 bg-[#0b0d13] border border-white/[0.1] rounded-xl px-3.5 py-2 text-zinc-100 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-zinc-300 font-semibold">Phone</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 00000"
                    value={newMemberForm.phone}
                    onChange={(e) => setNewMemberForm({ ...newMemberForm, phone: e.target.value })}
                    className="w-full mt-1 bg-[#0b0d13] border border-white/[0.1] rounded-xl px-3.5 py-2 text-zinc-100 focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-3 border-t border-white/[0.08]">
                <button type="button" onClick={() => setShowAddMemberModal(false)} className="px-4 py-2 rounded-xl text-zinc-400">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl font-bold bg-emerald-500 text-black">Enroll Member</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Record Expense */}
      {showExpenseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4">
          <div className="saas-card w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <h3 className="font-bold text-base text-white">Record Operating Expense</h3>
              <button onClick={() => setShowExpenseModal(false)} className="text-zinc-400 hover:text-white">✕</button>
            </div>
            <form onSubmit={handleExpenseSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-zinc-300 font-semibold">Expense Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AC Repair"
                  value={expenseForm.name}
                  onChange={(e) => setExpenseForm({ ...expenseForm, name: e.target.value })}
                  className="w-full mt-1 bg-[#0b0d13] border border-white/[0.1] rounded-xl px-3.5 py-2 text-zinc-100 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-zinc-300 font-semibold">Amount (₹)</label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 4500"
                  value={expenseForm.amount}
                  onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })}
                  className="w-full mt-1 bg-[#0b0d13] border border-white/[0.1] rounded-xl px-3.5 py-2 text-zinc-100 focus:outline-none"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-3 border-t border-white/[0.08]">
                <button type="button" onClick={() => setShowExpenseModal(false)} className="px-4 py-2 rounded-xl text-zinc-400">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl font-bold bg-rose-500 text-white">Record Expense</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
