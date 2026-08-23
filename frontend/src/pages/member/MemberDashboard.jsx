import React, { useState, useEffect } from 'react';
import { useGym } from '../../context/GymContext';
import { QRCodeSVG } from 'qrcode.react';
import confetti from 'canvas-confetti';
import {
  Flame,
  Utensils,
  Award,
  IdCard,
  TrendingUp,
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Trophy,
  Droplets,
  Zap,
  ShieldCheck,
  ChevronRight,
  Activity,
  Heart
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export const MemberDashboard = () => {
  const { data, currentUser, activeTab, setActiveTab, toggleExerciseSet, logNewPR } = useGym();

  const currentTab = ['routine', 'diet-tracker', 'pr-vault', 'digital-pass', 'metrics', 'leaderboard'].includes(activeTab)
    ? activeTab
    : 'routine';

  const [restSeconds, setRestSeconds] = useState(60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [waterGlasses, setWaterGlasses] = useState(6);
  const targetGlasses = 10;
  const [showPRModal, setShowPRModal] = useState(false);
  const [prForm, setPrForm] = useState({ lift: 'Incline Bench Press', weight: '95 kg', reps: '1 Rep Max (PR)', badge: 'Personal Best' });
  const [checkedMeals, setCheckedMeals] = useState({ 0: true, 1: true });

  useEffect(() => {
    let interval = null;
    if (timerRunning && restSeconds > 0) {
      interval = setInterval(() => setRestSeconds((sec) => sec - 1), 1000);
    } else if (restSeconds === 0 && timerRunning) {
      setTimerRunning(false);
      try {
        confetti({ particleCount: 40, spread: 70, origin: { y: 0.8 } });
      } catch (e) {}
    }
    return () => clearInterval(interval);
  }, [timerRunning, restSeconds]);

  const startRestTimer = (duration = 60) => {
    setRestSeconds(duration);
    setTimerRunning(true);
  };

  const handlePRSubmit = (e) => {
    e.preventDefault();
    if (!prForm.weight) return;
    logNewPR(prForm);
    setShowPRModal(false);
    confetti({ particleCount: 140, spread: 90, origin: { y: 0.6 } });
    setPrForm({ lift: '', weight: '', reps: '1 Rep Max', badge: 'Personal Record' });
  };

  const currentMember = data.members.find((m) => m.email === currentUser.email) || data.members[0];
  const routine = data.todayMemberRoutine;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 🌟 Hero Member Header Card */}
      <div className="saas-card-glow p-6 flex flex-col md:flex-row md:items-center justify-between gap-5 relative overflow-hidden">
        <div className="flex items-center space-x-4 z-10">
          <div className="relative">
            <img
              src={currentMember.avatar}
              alt={currentMember.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-2 ring-emerald-500/30 shadow-md shadow-emerald-500/15"
            />
            <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center text-[10px] text-white font-bold">
              ✓
            </span>
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">{currentMember.name}</h1>
              <span className="text-xs px-3 py-0.5 rounded-full saas-badge-emerald font-bold font-mono">
                {currentMember.planName}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Assigned Coach: <strong className="text-slate-800">{currentMember.trainerName}</strong> • Locker: <span className="text-emerald-700 font-mono font-bold">{currentMember.lockerNo}</span>
            </p>
            <div className="flex items-center gap-3 text-xs font-mono text-slate-600 mt-2">
              <span className="text-amber-700 font-bold flex items-center gap-1">
                <Flame className="h-4 w-4 fill-amber-500 text-amber-500" />
                {currentMember.streak}-Day Gym Streak 🔥
              </span>
              <span>•</span>
              <span className="text-emerald-700 font-bold">Status: {currentMember.status}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 z-10">
          <button
            onClick={() => setActiveTab('digital-pass')}
            className="btn-shiny px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 cursor-pointer flex items-center gap-1.5"
          >
            <IdCard className="h-4 w-4" />
            <span>Show Digital Entry Pass</span>
          </button>
          <button
            onClick={() => setShowPRModal(true)}
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 cursor-pointer flex items-center gap-1.5 transition shadow-2xs"
          >
            <Trophy className="h-4 w-4 text-amber-500" />
            <span>+ Log New PR</span>
          </button>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex border-b border-slate-200 space-x-6 text-xs font-semibold overflow-x-auto">
        {[
          { id: 'routine', label: "Today's Workout Routine 🔥" },
          { id: 'diet-tracker', label: 'Assigned Diet & Hydration Tracker' },
          { id: 'pr-vault', label: 'PR (1-Rep Max) Vault 🏆' },
          { id: 'digital-pass', label: 'Digital Gym Pass & QR ID' },
          { id: 'metrics', label: 'Body Metrics & Progress' },
          { id: 'leaderboard', label: 'Gym Leaderboard & Streaks' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3.5 transition cursor-pointer whitespace-nowrap font-medium ${
              currentTab === tab.id
                ? 'text-emerald-700 border-b-2 border-emerald-600 font-bold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* VIEW: Today's Routine */}
      {currentTab === 'routine' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="saas-card p-5 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-700 font-bold">
                  Daily Mission
                </span>
                <h3 className="font-black text-slate-900 text-base mt-0.5">{routine.routineTitle}</h3>
                <p className="text-xs text-slate-500">Coached by {routine.assignedBy}</p>
              </div>
              <span className="text-xs font-mono px-3 py-1 saas-badge-emerald rounded-full font-bold">
                {routine.exercises.filter((e) => e.completed).length} / {routine.exercises.length} Exercises Done
              </span>
            </div>

            <div className="space-y-4">
              {routine.exercises.map((exercise) => (
                <div key={exercise.id} className="saas-card-hover p-5 space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                        <span>{exercise.name}</span>
                        {exercise.completed && <CheckCircle2 className="h-4 w-4 text-emerald-600 inline" />}
                      </h4>
                      <p className="text-xs text-slate-500">Target: {exercise.targetMuscle} • Past Best: <span className="text-slate-800 font-mono font-bold">{exercise.historyBest}</span></p>
                    </div>
                    <button
                      onClick={() => startRestTimer(60)}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-mono flex items-center gap-1.5 border border-slate-200 cursor-pointer transition"
                    >
                      <Zap className="h-3.5 w-3.5 text-amber-500" />
                      <span>60s Timer</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                    {exercise.loggedSets.map((set, setIdx) => (
                      <button
                        key={setIdx}
                        onClick={() => toggleExerciseSet(exercise.id, setIdx)}
                        className={`p-3.5 rounded-xl border text-left transition cursor-pointer ${
                          set.done
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-2xs'
                            : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-mono font-bold">Set {set.setNo}</span>
                          {set.done ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> : <span className="w-3.5 h-3.5 rounded-full border border-slate-300" />}
                        </div>
                        <p className="font-mono font-bold text-base text-slate-900 mt-1.5">{set.weight} kg</p>
                        <p className="text-[10px] text-slate-500">{set.reps} reps</p>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Rest Timer */}
          <div className="space-y-6">
            <div className="saas-card-glow p-6 space-y-4 text-center">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-700 font-bold">
                Inter-Set Rest Timer
              </span>
              <div className="my-2">
                <span className="font-mono text-5xl font-black text-slate-900 tracking-tight">
                  00:{restSeconds < 10 ? `0${restSeconds}` : restSeconds}
                </span>
              </div>
              <div className="flex justify-center gap-2.5">
                <button
                  onClick={() => setTimerRunning(!timerRunning)}
                  className={`btn-shiny px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md ${
                    timerRunning ? 'bg-amber-500 text-slate-950' : 'bg-emerald-600 text-white shadow-emerald-600/20'
                  }`}
                >
                  {timerRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  <span>{timerRunning ? 'Pause' : 'Start Timer'}</span>
                </button>
                <button onClick={() => { setTimerRunning(false); setRestSeconds(60); }} className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 cursor-pointer hover:text-slate-900">
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Daily Nutrition Mini Card */}
            <div className="saas-card p-5 space-y-3">
              <h4 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                <Activity className="h-4 w-4 text-cyan-600" />
                <span>Today's Nutrition Target</span>
              </h4>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between text-slate-500">
                  <span>Calories: <strong className="text-slate-800">1,650 / 2,200</strong></span>
                  <span className="text-emerald-700 font-bold">75%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '75%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: Diet Tracker */}
      {currentTab === 'diet-tracker' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 saas-card p-6 space-y-4">
            <h3 className="font-bold text-sm text-slate-900">High Protein Clean Cut (2200 kcal Target)</h3>
            <div className="space-y-3">
              {data.dietPlans[0].meals.map((meal, idx) => (
                <div
                  key={idx}
                  onClick={() => setCheckedMeals({ ...checkedMeals, [idx]: !checkedMeals[idx] })}
                  className={`p-4 rounded-xl border flex items-center justify-between transition cursor-pointer ${
                    checkedMeals[idx]
                      ? 'bg-emerald-50/70 border-emerald-200 text-slate-800 shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center space-x-3.5">
                    <div className={`w-5 h-5 rounded-lg border flex items-center justify-center ${
                      checkedMeals[idx] ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300'
                    }`}>
                      {checkedMeals[idx] && <CheckCircle2 className="h-4 w-4" />}
                    </div>
                    <div>
                      <p className="font-bold text-xs text-slate-900">{meal.mealName}</p>
                      <p className="text-[11px] text-slate-500">{meal.items}</p>
                    </div>
                  </div>
                  <div className="text-right font-mono text-xs">
                    <span className="text-emerald-700 font-bold block">{meal.calories} kcal</span>
                    <span className="text-slate-400 text-[10px]">{meal.protein}g Protein</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="saas-card p-6 space-y-4 text-center">
            <span className="text-xs font-bold text-slate-900 flex items-center justify-center gap-1.5">
              <Droplets className="h-4 w-4 text-cyan-600" />
              <span>Hydration Tracker ({(waterGlasses * 0.35).toFixed(1)}L / 3.5L)</span>
            </span>

            <div className="grid grid-cols-5 gap-2.5 py-4">
              {Array.from({ length: targetGlasses }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setWaterGlasses(i + 1)}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center transition cursor-pointer ${
                    i < waterGlasses ? 'bg-cyan-50 border-cyan-300 text-cyan-700 shadow-2xs' : 'bg-slate-50 border-slate-200 text-slate-400 hover:border-slate-300'
                  }`}
                >
                  <Droplets className="h-5 w-5" />
                  <span className="text-[10px] font-mono mt-1 font-bold">{i + 1}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setWaterGlasses((g) => Math.min(targetGlasses, g + 1))}
              className="btn-shiny w-full py-2.5 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white cursor-pointer shadow-md shadow-cyan-600/20"
            >
              + Drink 1 Glass (350ml)
            </button>
          </div>
        </div>
      )}

      {/* VIEW: PR Vault */}
      {currentTab === 'pr-vault' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.personalRecords.map((pr, i) => (
              <div key={i} className="saas-card-hover p-6 space-y-3 relative overflow-hidden border-t-2 border-t-amber-500">
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full saas-badge-amber font-bold">{pr.badge}</span>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">{pr.lift}</h4>
                  <p className="font-mono text-3xl font-black text-amber-600 mt-1">{pr.weight}</p>
                  <p className="text-xs text-slate-500">{pr.reps} • Logged: {pr.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW: Digital Pass */}
      {currentTab === 'digital-pass' && (
        <div className="flex justify-center">
          <div className="w-full max-w-sm rounded-3xl p-7 bg-white border border-slate-200 shadow-xl space-y-6 text-center">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-slate-900 font-mono">FITPULSE DIGITAL PASS</span>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded saas-badge-emerald font-bold">ACTIVE</span>
            </div>

            <div className="flex flex-col items-center space-y-2">
              <img src={currentMember.avatar} alt="" className="w-20 h-20 rounded-2xl object-cover ring-2 ring-emerald-500 shadow-md" />
              <h3 className="font-black text-xl text-slate-900">{currentMember.name}</h3>
              <p className="text-xs text-slate-500 font-mono">PASS ID: {currentMember.id.toUpperCase()}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 mx-auto inline-block shadow-2xs">
              <QRCodeSVG value={currentMember.qrCodeString} size={180} level="H" />
            </div>

            <p className="text-[11px] text-slate-500">Scan at gym gate turnstile scanner for fast access.</p>
          </div>
        </div>
      )}

      {/* VIEW: Metrics */}
      {currentTab === 'metrics' && (
        <div className="saas-card p-6 space-y-4">
          <h3 className="font-bold text-sm text-slate-900">Body Composition Progression</h3>
          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.traineeTransformations[0].weeklyLogs}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="week" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                <YAxis stroke="#94a3b8" domain={['dataMin - 2', 'dataMax + 2']} tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', fontSize: '12px' }} />
                <Line type="monotone" dataKey="weight" stroke="#059669" strokeWidth={3} dot={{ r: 4, fill: '#059669' }} name="Weight (kg)" />
                <Line type="monotone" dataKey="bodyFat" stroke="#0284c7" strokeWidth={2.5} dot={{ r: 4, fill: '#0284c7' }} name="Body Fat %" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* VIEW: Leaderboard */}
      {currentTab === 'leaderboard' && (
        <div className="saas-card p-6 space-y-4">
          <h3 className="font-bold text-sm text-slate-900">Monthly Attendance & Streak Leaderboard</h3>
          <div className="divide-y divide-slate-100">
            {data.leaderboard.map((user) => (
              <div key={user.rank} className="py-3.5 flex items-center justify-between">
                <div className="flex items-center space-x-3.5">
                  <span className="font-mono text-sm font-bold text-slate-400 w-6">#{user.rank}</span>
                  <img src={user.avatar} alt="" className="w-10 h-10 rounded-full object-cover ring-1 ring-slate-200" />
                  <div>
                    <p className="font-bold text-xs text-slate-900">{user.name}</p>
                    <span className="text-[10px] text-emerald-700 font-bold font-mono">{user.badge}</span>
                  </div>
                </div>
                <div className="text-right font-mono text-xs">
                  <span className="text-amber-600 font-bold block">🔥 {user.streakDays} Day Streak</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
