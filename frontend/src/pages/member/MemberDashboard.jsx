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
  ShieldCheck
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
        confetti({ particleCount: 30, spread: 60, origin: { y: 0.8 } });
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
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    setPrForm({ lift: '', weight: '', reps: '1 Rep Max', badge: 'Personal Record' });
  };

  const currentMember = data.members.find((m) => m.email === currentUser.email) || data.members[0];
  const routine = data.todayMemberRoutine;

  return (
    <div className="space-y-6">
      {/* Top Welcome Card */}
      <div className="saas-card-glow p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <img
            src={currentMember.avatar}
            alt={currentMember.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-400 shadow-lg shadow-emerald-500/20"
          />
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-black text-white">{currentMember.name}</h1>
              <span className="text-xs px-2.5 py-0.5 rounded-full saas-badge-emerald font-bold">
                {currentMember.planName}
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-1">Assigned Coach: <strong className="text-zinc-200">{currentMember.trainerName}</strong> • Locker: {currentMember.lockerNo}</p>
            <div className="flex items-center gap-3 text-xs font-mono text-zinc-300 mt-2">
              <span className="text-amber-400 font-bold flex items-center gap-1">
                <Flame className="h-4 w-4 fill-amber-400" />
                {currentMember.streak}-Day Gym Streak 🔥
              </span>
              <span>•</span>
              <span className="text-emerald-400 font-bold">Status: {currentMember.status}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('digital-pass')}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/20 cursor-pointer flex items-center gap-1.5"
          >
            <IdCard className="h-4 w-4" />
            <span>Show Digital Entry Pass</span>
          </button>
          <button
            onClick={() => setShowPRModal(true)}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-[#171a26] hover:bg-[#202434] text-zinc-200 border border-white/[0.08] cursor-pointer flex items-center gap-1.5"
          >
            <Trophy className="h-4 w-4 text-amber-400" />
            <span>+ Log New PR</span>
          </button>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex border-b border-white/[0.07] space-x-6 text-xs font-semibold overflow-x-auto">
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

      {/* VIEW: Today's Routine */}
      {activeTab === 'routine' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="saas-card p-5 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                  Daily Mission
                </span>
                <h3 className="font-black text-white text-base mt-0.5">{routine.routineTitle}</h3>
                <p className="text-xs text-zinc-400">Coached by {routine.assignedBy}</p>
              </div>
              <span className="text-xs font-mono px-3 py-1 saas-badge-emerald rounded-full font-bold">
                {routine.exercises.filter((e) => e.completed).length} / {routine.exercises.length} Exercises Done
              </span>
            </div>

            <div className="space-y-4">
              {routine.exercises.map((exercise) => (
                <div key={exercise.id} className="saas-card p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-white text-sm flex items-center gap-2">
                        <span>{exercise.name}</span>
                        {exercise.completed && <CheckCircle2 className="h-4 w-4 text-emerald-400 inline" />}
                      </h4>
                      <p className="text-xs text-zinc-400">Target: {exercise.targetMuscle} • Best: <span className="text-zinc-200 font-mono">{exercise.historyBest}</span></p>
                    </div>
                    <button
                      onClick={() => startRestTimer(60)}
                      className="px-3 py-1.5 rounded-xl bg-[#171a26] hover:bg-[#202434] text-zinc-200 text-xs font-mono flex items-center gap-1.5 cursor-pointer"
                    >
                      <Zap className="h-3.5 w-3.5 text-amber-400" />
                      <span>60s Timer</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                    {exercise.loggedSets.map((set, setIdx) => (
                      <button
                        key={setIdx}
                        onClick={() => toggleExerciseSet(exercise.id, setIdx)}
                        className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                          set.done
                            ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                            : 'bg-[#0b0d13] border-white/[0.08] text-zinc-400 hover:border-white/[0.15]'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-mono font-bold">Set {set.setNo}</span>
                          {set.done ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> : <span className="w-3.5 h-3.5 rounded-full border border-zinc-600" />}
                        </div>
                        <p className="font-mono font-bold text-sm text-white mt-1">{set.weight} kg</p>
                        <p className="text-[10px] text-zinc-400">{set.reps} reps</p>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Rest Timer */}
          <div className="space-y-6">
            <div className="saas-card-glow p-5 space-y-4 text-center">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                Inter-Set Rest Timer
              </span>
              <div className="my-2">
                <span className="font-mono text-5xl font-black text-white">
                  00:{restSeconds < 10 ? `0${restSeconds}` : restSeconds}
                </span>
              </div>
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => setTimerRunning(!timerRunning)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer ${
                    timerRunning ? 'bg-amber-500 text-black' : 'bg-emerald-500 text-black'
                  }`}
                >
                  {timerRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  <span>{timerRunning ? 'Pause' : 'Start Timer'}</span>
                </button>
                <button onClick={() => { setTimerRunning(false); setRestSeconds(60); }} className="p-2 rounded-xl bg-[#171a26] text-zinc-300 cursor-pointer">
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: Diet & Hydration */}
      {activeTab === 'diet-tracker' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 saas-card p-5 space-y-4">
            <h3 className="font-bold text-sm text-white">High Protein Clean Cut (2200 kcal)</h3>
            <div className="space-y-3">
              {data.dietPlans[0].meals.map((meal, idx) => (
                <div
                  key={idx}
                  onClick={() => setCheckedMeals({ ...checkedMeals, [idx]: !checkedMeals[idx] })}
                  className={`p-4 rounded-xl border flex items-center justify-between transition cursor-pointer ${
                    checkedMeals[idx]
                      ? 'bg-emerald-950/30 border-emerald-500/40 text-zinc-200'
                      : 'bg-[#171a26] border-white/[0.05] text-zinc-400'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-5 h-5 rounded-lg border flex items-center justify-center ${
                      checkedMeals[idx] ? 'bg-emerald-500 border-emerald-400 text-black' : 'border-zinc-600'
                    }`}>
                      {checkedMeals[idx] && <CheckCircle2 className="h-4 w-4" />}
                    </div>
                    <div>
                      <p className="font-bold text-xs text-zinc-100">{meal.mealName}</p>
                      <p className="text-[11px] text-zinc-400">{meal.items}</p>
                    </div>
                  </div>
                  <div className="text-right font-mono text-xs">
                    <span className="text-emerald-400 font-bold block">{meal.calories} kcal</span>
                    <span className="text-zinc-500 text-[10px]">{meal.protein}g Protein</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="saas-card p-5 space-y-4 text-center">
            <span className="text-xs font-bold text-white flex items-center justify-center gap-1.5">
              <Droplets className="h-4 w-4 text-cyan-400" />
              <span>Hydration Tracker ({(waterGlasses * 0.35).toFixed(1)}L / 3.5L)</span>
            </span>

            <div className="grid grid-cols-5 gap-2 py-4">
              {Array.from({ length: targetGlasses }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setWaterGlasses(i + 1)}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center transition cursor-pointer ${
                    i < waterGlasses ? 'bg-cyan-950/50 border-cyan-400 text-cyan-400' : 'bg-[#0b0d13] border-white/[0.05] text-zinc-600'
                  }`}
                >
                  <Droplets className="h-5 w-5" />
                  <span className="text-[10px] font-mono mt-1 font-bold">{i + 1}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setWaterGlasses((g) => Math.min(targetGlasses, g + 1))}
              className="w-full py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-black cursor-pointer"
            >
              + Drink 1 Glass (350ml)
            </button>
          </div>
        </div>
      )}

      {/* VIEW: PR Vault */}
      {activeTab === 'pr-vault' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.personalRecords.map((pr, i) => (
              <div key={i} className="saas-card-hover p-5 space-y-3 relative overflow-hidden border-t-2 border-t-amber-400">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full saas-badge-amber font-bold">{pr.badge}</span>
                <div>
                  <h4 className="font-bold text-white text-base">{pr.lift}</h4>
                  <p className="font-mono text-2xl font-black text-amber-400 mt-1">{pr.weight}</p>
                  <p className="text-xs text-zinc-400">{pr.reps}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW: Digital Pass */}
      {activeTab === 'digital-pass' && (
        <div className="flex justify-center">
          <div className="w-full max-w-sm rounded-3xl p-6 bg-[#12151f] border border-emerald-500/40 shadow-2xl space-y-6 text-center">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-white font-mono">FITPULSE DIGITAL PASS</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded saas-badge-emerald font-bold">ACTIVE</span>
            </div>

            <div className="flex flex-col items-center space-y-2">
              <img src={currentMember.avatar} alt="" className="w-20 h-20 rounded-2xl object-cover border-2 border-emerald-400" />
              <h3 className="font-black text-lg text-white">{currentMember.name}</h3>
              <p className="text-xs text-zinc-400 font-mono">ID: {currentMember.id.toUpperCase()}</p>
            </div>

            <div className="p-4 rounded-2xl bg-white mx-auto inline-block">
              <QRCodeSVG value={currentMember.qrCodeString} size={180} level="H" />
            </div>

            <p className="text-[10px] text-zinc-500">Scan at gym gate turnstile for fast access.</p>
          </div>
        </div>
      )}

      {/* VIEW: Metrics */}
      {activeTab === 'metrics' && (
        <div className="saas-card p-5 space-y-4">
          <h3 className="font-bold text-sm text-white">Body Composition Progression</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.traineeTransformations[0].weeklyLogs}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="week" stroke="#71717a" tick={{ fontSize: 11 }} />
                <YAxis stroke="#71717a" domain={['dataMin - 2', 'dataMax + 2']} tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#12151f', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="weight" stroke="#10b981" strokeWidth={3} name="Weight (kg)" />
                <Line type="monotone" dataKey="bodyFat" stroke="#38bdf8" strokeWidth={2} name="Body Fat %" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* VIEW: Leaderboard */}
      {activeTab === 'leaderboard' && (
        <div className="saas-card p-5 space-y-4">
          <h3 className="font-bold text-sm text-white">Monthly Attendance & Streak Leaderboard</h3>
          <div className="divide-y divide-white/[0.05]">
            {data.leaderboard.map((user) => (
              <div key={user.rank} className="py-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="font-mono text-xs font-bold text-zinc-400 w-5">{user.rank}</span>
                  <img src={user.avatar} alt="" className="w-9 h-9 rounded-full object-cover" />
                  <div>
                    <p className="font-bold text-xs text-zinc-100">{user.name}</p>
                    <span className="text-[10px] text-emerald-400 font-bold">{user.badge}</span>
                  </div>
                </div>
                <div className="text-right font-mono text-xs">
                  <span className="text-amber-400 font-bold block">🔥 {user.streakDays} Day Streak</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
