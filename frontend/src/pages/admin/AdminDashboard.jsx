import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';
import {
  Users,
  DollarSign,
  TrendingUp,
  Activity,
  UserPlus,
  AlertCircle,
  CheckCircle2,
  Calendar,
  CreditCard,
  QrCode,
  Box,
  Lock,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  Send,
  Download
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
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

  // Member Registration Modal State
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
    trainerId: 't1',
    trainerName: 'Marcus Vance',
    lockerNo: 'L-01',
  });

  // Expense Modal State
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [expenseForm, setExpenseForm] = useState({ name: '', amount: '' });

  // Selected Member for Invoice Modal
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
      trainerId: 't1',
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

  // KPIs
  const totalMembers = data.members.length;
  const activeMembers = data.members.filter((m) => m.status === 'ACTIVE').length;
  const dueMembers = data.members.filter((m) => m.status === 'DUE').length;
  const expiredMembers = data.members.filter((m) => m.status === 'EXPIRED').length;

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span>Executive Business Control</span>
            <span className="text-xs px-2.5 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full font-mono">
              Live Operations
            </span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Revenue tracking, auto-invoicing, trainer payroll, peak-hour heatmaps, and facility asset logs.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowExpenseModal(true)}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition cursor-pointer flex items-center gap-1.5"
          >
            <DollarSign className="h-4 w-4 text-rose-400" />
            <span>Record Expense</span>
          </button>
          <button
            onClick={() => setShowAddMemberModal(true)}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-zinc-950 shadow-lg shadow-emerald-500/20 transition cursor-pointer flex items-center gap-1.5"
          >
            <UserPlus className="h-4 w-4" />
            <span>+ Enroll Member</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Monthly Subscription Revenue */}
        <div className="glass-panel-glow p-5 rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <p className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Gross Collection</p>
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <DollarSign className="h-4 w-4" />
            </span>
          </div>
          <h3 className="text-2xl font-black text-white mt-2">₹{data.financials.monthlyRevenue.toLocaleString()}</h3>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 mt-2 font-medium">
            <ArrowUpRight className="h-3.5 w-3.5" />
            <span>+14.2% from last month</span>
          </div>
        </div>

        {/* Card 2: Net Profit Margin */}
        <div className="glass-panel p-5 rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <p className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Net Profit (P&L)</p>
            <span className="p-2 rounded-xl bg-teal-500/10 text-teal-400">
              <TrendingUp className="h-4 w-4" />
            </span>
          </div>
          <h3 className="text-2xl font-black text-white mt-2">₹{data.financials.netProfit.toLocaleString()}</h3>
          <p className="text-[11px] text-zinc-400 mt-2">
            After Rent, Trainer Payroll & Restocking
          </p>
        </div>

        {/* Card 3: Active Members & Retention */}
        <div className="glass-panel p-5 rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <p className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Active Members</p>
            <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
              <Users className="h-4 w-4" />
            </span>
          </div>
          <h3 className="text-2xl font-black text-white mt-2">{activeMembers} <span className="text-xs font-normal text-zinc-500">/ {totalMembers} Total</span></h3>
          <div className="flex items-center gap-2 text-[11px] text-zinc-400 mt-2">
            <span className="text-amber-400 font-bold">{dueMembers} Dues</span> • <span className="text-rose-400 font-bold">{expiredMembers} Expired</span>
          </div>
        </div>

        {/* Card 4: Trainer Payroll & Commissions */}
        <div className="glass-panel p-5 rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <p className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Trainer Payroll</p>
            <span className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
              <CreditCard className="h-4 w-4" />
            </span>
          </div>
          <h3 className="text-2xl font-black text-white mt-2">
            ₹{(data.trainers.reduce((acc, t) => acc + t.baseSalary + t.monthlyCommission, 0)).toLocaleString()}
          </h3>
          <p className="text-[11px] text-purple-300 mt-2">
            Base Salary + 35% PT Commission
          </p>
        </div>
      </div>

      {/* Sub-View Navigation Tabs */}
      <div className="flex border-b border-zinc-800 space-x-6 text-xs font-semibold overflow-x-auto">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`pb-3 transition cursor-pointer whitespace-nowrap ${
            activeTab === 'dashboard'
              ? 'text-emerald-400 border-b-2 border-emerald-400'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          Business Analytics
        </button>
        <button
          onClick={() => setActiveTab('members')}
          className={`pb-3 transition cursor-pointer whitespace-nowrap ${
            activeTab === 'members'
              ? 'text-emerald-400 border-b-2 border-emerald-400'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          Members & Auto-Invoicing ({data.members.length})
        </button>
        <button
          onClick={() => setActiveTab('finance')}
          className={`pb-3 transition cursor-pointer whitespace-nowrap ${
            activeTab === 'finance'
              ? 'text-emerald-400 border-b-2 border-emerald-400'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          Financials & P&L Statement
        </button>
        <button
          onClick={() => setActiveTab('attendance')}
          className={`pb-3 transition cursor-pointer whitespace-nowrap ${
            activeTab === 'attendance'
              ? 'text-emerald-400 border-b-2 border-emerald-400'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          QR Gates & Peak Heatmap
        </button>
        <button
          onClick={() => setActiveTab('assets')}
          className={`pb-3 transition cursor-pointer whitespace-nowrap ${
            activeTab === 'assets'
              ? 'text-emerald-400 border-b-2 border-emerald-400'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          Equipment & Mini POS
        </button>
        <button
          onClick={() => setActiveTab('lockers')}
          className={`pb-3 transition cursor-pointer whitespace-nowrap ${
            activeTab === 'lockers'
              ? 'text-emerald-400 border-b-2 border-emerald-400'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          Lockers ({data.lockers.filter((l) => l.status === 'AVAILABLE').length} Free)
        </button>
      </div>

      {/* VIEW: Business Analytics Overview */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Revenue Trend Area Chart */}
            <div className="lg:col-span-2 glass-panel p-5 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-white">6-Month Revenue vs Expense Performance</h3>
                  <p className="text-xs text-zinc-400">Monthly subscription collections and operational overheads</p>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 bg-zinc-800 text-zinc-300 rounded-lg">FY 2026</span>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data.financials.monthlyTrend}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                    <XAxis dataKey="month" stroke="#71717a" textAnchor="middle" tick={{ fontSize: 11 }} />
                    <YAxis stroke="#71717a" tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#3f3f46', borderRadius: '8px', fontSize: '12px' }} />
                    <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" name="Revenue (₹)" />
                    <Area type="monotone" dataKey="expense" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorExp)" name="Expenses (₹)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Revenue Sources Breakdown Pie */}
            <div className="glass-panel p-5 rounded-2xl space-y-4">
              <h3 className="font-bold text-sm text-white">Revenue Inflow Stream</h3>
              <div className="h-52 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data.financials.revenueBreakdown}
                      dataKey="amount"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={75}
                      paddingAngle={4}
                    >
                      {data.financials.revenueBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#3f3f46', borderRadius: '8px', fontSize: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-1.5 text-xs">
                {data.financials.revenueBreakdown.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-zinc-300">
                    <div className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span>{item.name}</span>
                    </div>
                    <span className="font-mono font-bold">₹{item.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Alerts & Due Tracker */}
          <div className="glass-panel p-5 rounded-2xl space-y-3">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-amber-400" />
              <span>Automated Billing Alerts & Pending Dues Action List</span>
            </h3>
            <div className="divide-y divide-zinc-800">
              {data.members.filter((m) => m.status === 'DUE' || m.status === 'EXPIRED').map((member) => (
                <div key={member.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center space-x-3">
                    <img src={member.avatar} alt={member.name} className="w-9 h-9 rounded-full object-cover border border-zinc-700" />
                    <div>
                      <p className="text-xs font-bold text-zinc-100">{member.name}</p>
                      <p className="text-[11px] text-zinc-400">{member.planName} • Exp: {member.expiryDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full ${
                      member.status === 'DUE' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    }`}>
                      {member.status === 'DUE' ? `Due: ₹${member.pendingDue}` : 'EXPIRED'}
                    </span>
                    <button
                      onClick={() => setSelectedInvoiceMember(member)}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition flex items-center gap-1 cursor-pointer"
                    >
                      <Send className="h-3.5 w-3.5" />
                      <span>Send Payment Link</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW: Members & Invoicing */}
      {activeTab === 'members' && (
        <div className="glass-panel p-5 rounded-2xl space-y-4">
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
              <thead className="bg-zinc-950/80 text-zinc-400 uppercase text-[10px] tracking-wider border-b border-zinc-800">
                <tr>
                  <th className="py-3 px-4">Member</th>
                  <th className="py-3 px-4">Plan & Expiry</th>
                  <th className="py-3 px-4">Trainer & Locker</th>
                  <th className="py-3 px-4">Billing Status</th>
                  <th className="py-3 px-4">Paid / Due</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {data.members.map((member) => (
                  <tr key={member.id} className="hover:bg-zinc-900/40 transition">
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
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : member.status === 'DUE'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
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
                        className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium text-[11px] inline-flex items-center gap-1 cursor-pointer"
                      >
                        <FileText className="h-3 w-3 text-emerald-400" />
                        <span>Invoice</span>
                      </button>
                      <select
                        value={member.status}
                        onChange={(e) => updateMemberStatus(member.id, e.target.value)}
                        className="bg-zinc-950 border border-zinc-700 text-zinc-300 rounded-lg px-2 py-1 text-[11px] focus:outline-none"
                      >
                        <option value="ACTIVE">ACTIVE</option>
                        <option value="DUE">DUE</option>
                        <option value="EXPIRED">EXPIRED</option>
                      </select>
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
            {/* Expense Breakdown List */}
            <div className="glass-panel p-5 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-white">Operating Expense Outflows</h3>
                <button
                  onClick={() => setShowExpenseModal(true)}
                  className="px-3 py-1 rounded-xl text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30"
                >
                  + Add Expense
                </button>
              </div>
              <div className="space-y-2.5">
                {data.financials.expenseBreakdown.map((exp, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/60 border border-zinc-800">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: exp.color }} />
                      <span className="text-xs font-semibold text-zinc-200">{exp.name}</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-rose-400">₹{exp.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trainer Payroll & PT Commission Calculation Engine */}
            <div className="glass-panel p-5 rounded-2xl space-y-4">
              <h3 className="font-bold text-sm text-white flex items-center justify-between">
                <span>Trainer Payroll & PT Commission Engine</span>
                <span className="text-[10px] font-mono bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full">
                  Automated Calculation
                </span>
              </h3>
              <div className="space-y-3">
                {data.trainers.map((trainer) => (
                  <div key={trainer.id} className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2.5">
                        <img src={trainer.avatar} alt={trainer.name} className="w-8 h-8 rounded-full object-cover" />
                        <div>
                          <p className="text-xs font-bold text-zinc-100">{trainer.name}</p>
                          <p className="text-[10px] text-zinc-400">{trainer.specialization}</p>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold text-emerald-400">
                        Total Payout: ₹{(trainer.baseSalary + trainer.monthlyCommission).toLocaleString()}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-zinc-800/80 text-[11px] text-zinc-400 font-mono">
                      <div>Base: ₹{trainer.baseSalary.toLocaleString()}</div>
                      <div>PT Rate: {trainer.ptCommissionPct}%</div>
                      <div className="text-purple-300 font-bold">Comm: ₹{trainer.monthlyCommission.toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: QR Passes & Peak Heatmap */}
      {activeTab === 'attendance' && (
        <div className="space-y-6">
          {/* Peak Hour Heatmap */}
          <div className="glass-panel p-5 rounded-2xl space-y-4">
            <div>
              <h3 className="font-bold text-sm text-white">Gym Floor Peak-Hour Density Heatmap</h3>
              <p className="text-xs text-zinc-400">Hourly crowd distribution analysis to manage facility capacity and equipment wear.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {data.peakHoursHeatmap.map((slot, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-xl border text-center transition ${
                    slot.crowd >= 80
                      ? 'bg-rose-950/40 border-rose-500/40 text-rose-300'
                      : slot.crowd >= 60
                      ? 'bg-amber-950/40 border-amber-500/40 text-amber-300'
                      : 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                  }`}
                >
                  <p className="text-[11px] font-mono font-bold">{slot.slot}</p>
                  <div className="my-1.5">
                    <span className="text-lg font-black">{slot.crowd}%</span>
                  </div>
                  <p className="text-[10px] opacity-80">{slot.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Entry Log */}
          <div className="glass-panel p-5 rounded-2xl space-y-3">
            <h3 className="font-bold text-sm text-white">Live Gate Access Log</h3>
            <div className="divide-y divide-zinc-800 text-xs">
              {data.recentAttendance.map((log) => (
                <div key={log.id} className="py-2.5 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className={`w-2 h-2 rounded-full ${log.status.includes('Granted') ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                    <span className="font-bold text-zinc-200">{log.memberName}</span>
                    <span className="text-zinc-500 text-[11px]">via {log.method}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-zinc-400 font-mono text-[11px]">{log.time}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      log.status.includes('Granted') ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                    }`}>
                      {log.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW: Assets & Mini POS */}
      {activeTab === 'assets' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Equipment Maintenance */}
          <div className="glass-panel p-5 rounded-2xl space-y-4">
            <h3 className="font-bold text-sm text-white">Equipment Health & Maintenance Log</h3>
            <div className="space-y-3">
              {data.equipmentList.map((eq) => (
                <div key={eq.id} className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-zinc-100">{eq.name}</p>
                      <p className="text-[10px] text-zinc-400">Category: {eq.category} • Last Serviced: {eq.lastServiced}</p>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      eq.status === 'OPERATIONAL'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : eq.status === 'DUE_SERVICE'
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'bg-rose-500/20 text-rose-400'
                    }`}>
                      {eq.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-zinc-800 text-[11px] text-zinc-400">
                    <span>Next Due: <strong className="text-zinc-200">{eq.nextDue}</strong></span>
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => updateEquipmentStatus(eq.id, 'OPERATIONAL')}
                        className="px-2 py-0.5 rounded bg-emerald-900/40 text-emerald-300 text-[10px]"
                      >
                        Set Operational
                      </button>
                      <button
                        onClick={() => updateEquipmentStatus(eq.id, 'UNDER_REPAIR')}
                        className="px-2 py-0.5 rounded bg-rose-900/40 text-rose-300 text-[10px]"
                      >
                        Report Breakdown
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mini POS Inventory Store */}
          <div className="glass-panel p-5 rounded-2xl space-y-4">
            <h3 className="font-bold text-sm text-white">Supplement Store & Mini POS</h3>
            <div className="space-y-3">
              {data.inventoryStore.map((item) => (
                <div key={item.id} className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-zinc-100">{item.name}</p>
                    <p className="text-[10px] text-zinc-400 font-mono">
                      Stock: <span className={item.stock < item.minThreshold ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>{item.stock} Units</span> • ₹{item.price}
                    </p>
                  </div>
                  <button
                    onClick={() => sellInventoryItem(item.id, 1)}
                    disabled={item.stock <= 0}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-black disabled:opacity-40 transition cursor-pointer"
                  >
                    Quick Sell 1x
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW: Lockers Allocation */}
      {activeTab === 'lockers' && (
        <div className="glass-panel p-5 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-white">Gym Locker Allocation Grid</h3>
              <p className="text-xs text-zinc-400">Click any locker cell to toggle Available / Occupied / Maintenance.</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium">
              <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-emerald-500" /> Available</div>
              <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-rose-500" /> Occupied</div>
              <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-amber-500" /> Maintenance</div>
            </div>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 pt-2">
            {data.lockers.map((locker) => (
              <button
                key={locker.id}
                onClick={() => {
                  const next = locker.status === 'AVAILABLE' ? 'OCCUPIED' : locker.status === 'OCCUPIED' ? 'MAINTENANCE' : 'AVAILABLE';
                  toggleLockerStatus(locker.id, next, next === 'OCCUPIED' ? 'Assigned Walk-in' : null);
                }}
                className={`p-3 rounded-xl border text-center transition cursor-pointer ${
                  locker.status === 'AVAILABLE'
                    ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300 hover:bg-emerald-950/60'
                    : locker.status === 'OCCUPIED'
                    ? 'bg-rose-950/30 border-rose-500/40 text-rose-300 hover:bg-rose-950/60'
                    : 'bg-amber-950/30 border-amber-500/40 text-amber-300 hover:bg-amber-950/60'
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-lg rounded-2xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
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
                  className="w-full mt-1 bg-zinc-950 border border-zinc-700 rounded-xl px-3.5 py-2 text-zinc-100 focus:outline-none focus:border-emerald-500"
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
                    className="w-full mt-1 bg-zinc-950 border border-zinc-700 rounded-xl px-3.5 py-2 text-zinc-100 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-zinc-300 font-semibold">Phone</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 00000"
                    value={newMemberForm.phone}
                    onChange={(e) => setNewMemberForm({ ...newMemberForm, phone: e.target.value })}
                    className="w-full mt-1 bg-zinc-950 border border-zinc-700 rounded-xl px-3.5 py-2 text-zinc-100 focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-zinc-300 font-semibold">Select Plan</label>
                  <select
                    value={newMemberForm.planId}
                    onChange={handlePlanSelect}
                    className="w-full mt-1 bg-zinc-950 border border-zinc-700 rounded-xl px-3.5 py-2 text-zinc-100 focus:outline-none"
                  >
                    {data.plans.map((p) => (
                      <option key={p.id} value={p.id}>{p.name} (₹{p.price})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-zinc-300 font-semibold">Assigned Trainer</label>
                  <select
                    value={newMemberForm.trainerId}
                    onChange={(e) => {
                      const t = data.trainers.find((tr) => tr.id === e.target.value);
                      setNewMemberForm({ ...newMemberForm, trainerId: e.target.value, trainerName: t ? t.name : 'Unassigned' });
                    }}
                    className="w-full mt-1 bg-zinc-950 border border-zinc-700 rounded-xl px-3.5 py-2 text-zinc-100 focus:outline-none"
                  >
                    {data.trainers.map((t) => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-zinc-300 font-semibold">Initial Payment (₹)</label>
                  <input
                    type="number"
                    value={newMemberForm.totalPaid}
                    onChange={(e) => setNewMemberForm({ ...newMemberForm, totalPaid: e.target.value })}
                    className="w-full mt-1 bg-zinc-950 border border-zinc-700 rounded-xl px-3.5 py-2 text-zinc-100 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-zinc-300 font-semibold">Pending Due (₹)</label>
                  <input
                    type="number"
                    value={newMemberForm.pendingDue}
                    onChange={(e) => setNewMemberForm({ ...newMemberForm, pendingDue: e.target.value })}
                    className="w-full mt-1 bg-zinc-950 border border-zinc-700 rounded-xl px-3.5 py-2 text-zinc-100 focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setShowAddMemberModal(false)}
                  className="px-4 py-2 rounded-xl text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold bg-emerald-500 hover:bg-emerald-400 text-black"
                >
                  Enroll & Generate Pass
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Record Expense */}
      {showExpenseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-md rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="font-bold text-base text-white">Record Operating Expense</h3>
              <button onClick={() => setShowExpenseModal(false)} className="text-zinc-400 hover:text-white">✕</button>
            </div>
            <form onSubmit={handleExpenseSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-zinc-300 font-semibold">Expense Title / Category</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AC Repair & Gas Refill"
                  value={expenseForm.name}
                  onChange={(e) => setExpenseForm({ ...expenseForm, name: e.target.value })}
                  className="w-full mt-1 bg-zinc-950 border border-zinc-700 rounded-xl px-3.5 py-2 text-zinc-100 focus:outline-none"
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
                  className="w-full mt-1 bg-zinc-950 border border-zinc-700 rounded-xl px-3.5 py-2 text-zinc-100 focus:outline-none"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setShowExpenseModal(false)}
                  className="px-4 py-2 rounded-xl text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold bg-rose-500 hover:bg-rose-400 text-white"
                >
                  Add to P&L Outflow
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Auto-Generated GST Invoice & Payment Link */}
      {selectedInvoiceMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-zinc-900 border border-zinc-700 w-full max-w-lg rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div>
                <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold">
                  OFFICIAL TAX INVOICE
                </span>
                <h3 className="font-bold text-base text-white mt-1">Invoice #{selectedInvoiceMember.id.toUpperCase()}-2026</h3>
              </div>
              <button onClick={() => setSelectedInvoiceMember(null)} className="text-zinc-400 hover:text-white">✕</button>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-xs space-y-3">
              <div className="flex justify-between">
                <div>
                  <p className="font-bold text-white text-sm">{data.gymProfile.name}</p>
                  <p className="text-zinc-400 text-[11px]">GSTIN: {data.gymProfile.gstNumber}</p>
                  <p className="text-zinc-500 text-[10px]">{data.gymProfile.address}</p>
                </div>
                <div className="text-right">
                  <p className="text-zinc-400">Billed To:</p>
                  <p className="font-bold text-emerald-400 text-sm">{selectedInvoiceMember.name}</p>
                  <p className="text-zinc-400 text-[11px]">{selectedInvoiceMember.phone}</p>
                </div>
              </div>

              <div className="border-t border-zinc-800 pt-2 space-y-1.5">
                <div className="flex justify-between text-zinc-300">
                  <span>Subscription: {selectedInvoiceMember.planName}</span>
                  <span className="font-mono font-bold">₹{selectedInvoiceMember.totalPaid}</span>
                </div>
                <div className="flex justify-between text-zinc-500 text-[11px]">
                  <span>GST (18% Included)</span>
                  <span className="font-mono">₹{Math.round(selectedInvoiceMember.totalPaid * 0.18)}</span>
                </div>
                <div className="flex justify-between text-zinc-100 font-bold border-t border-zinc-800 pt-2 text-sm">
                  <span>Net Amount Paid:</span>
                  <span className="text-emerald-400 font-mono">₹{selectedInvoiceMember.totalPaid.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Simulated WhatsApp / UPI Link */}
            <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs space-y-1.5">
              <div className="flex items-center justify-between text-emerald-300 font-bold">
                <span>Instant Payment & Invoice Link</span>
                <span className="text-[10px] font-mono">UPI: {data.gymProfile.upiId}</span>
              </div>
              <input
                readOnly
                value={`https://pay.fitpulse360.com/inv/${selectedInvoiceMember.id}?due=${selectedInvoiceMember.pendingDue}`}
                className="w-full bg-zinc-950 text-[11px] font-mono px-2.5 py-1.5 rounded-lg border border-emerald-500/30 text-zinc-300 select-all"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => {
                  alert(`Invoice PDF downloaded for ${selectedInvoiceMember.name}!`);
                  setSelectedInvoiceMember(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-white flex items-center gap-1.5"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Export PDF</span>
              </button>
              <button
                onClick={() => {
                  alert(`WhatsApp invoice alert sent to ${selectedInvoiceMember.phone}!`);
                  setSelectedInvoiceMember(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-black flex items-center gap-1.5"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Send WhatsApp Alert</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
