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
  Plus,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Zap,
  Info
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

  // Rest Timer State
  const [restSeconds, setRestSeconds] = useState(60);
  const [timerRunning, setTimerRunning] = useState(false);

  // Water Intake State
  const [waterGlasses, setWaterGlasses] = useState(6);
  const targetGlasses = 10;

  // New PR Modal State
  const [showPRModal, setShowPRModal] = useState(false);
  const [prForm, setPrForm] = useState({ lift: 'Incline Bench Press', weight: '95 kg', reps: '1 Rep Max (PR)', badge: 'Personal Best' });

  // Today Diet Checked Meals
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
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    });
    setPrForm({ lift: '', weight: '', reps: '1 Rep Max', badge: 'Personal Record' });
  };

  const currentMember = data.members.find((m) => m.email === currentUser.email) || data.members[0];
  const routine = data.todayMemberRoutine;

  return (
    <div className="space-y-6">
      {/* Top Welcome & Streak Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950/70 via-zinc-900 to-zinc-950 border border-emerald-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <img
            src={currentMember.avatar}
            alt={currentMember.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-400 shadow-lg shadow-emerald-500/20"
          />
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-black text-white">{currentMember.name}</h1>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
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
            className="px-4 py-2 rounded-xl text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 cursor-pointer flex items-center gap-1.5"
          >
            <Trophy className="h-4 w-4 text-amber-400" />
            <span>+ Log New PR</span>
          </button>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex border-b border-zinc-800 space-x-6 text-xs font-semibold overflow-x-auto">
        <button
          onClick={() => setActiveTab('routine')}
          className={`pb-3 transition cursor-pointer whitespace-nowrap ${
            activeTab === 'routine' ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          Today's Workout Routine 🔥
        </button>
        <button
          onClick={() => setActiveTab('diet-tracker')}
          className={`pb-3 transition cursor-pointer whitespace-nowrap ${
            activeTab === 'diet-tracker' ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          Assigned Diet & Hydration Tracker
        </button>
        <button
          onClick={() => setActiveTab('pr-vault')}
          className={`pb-3 transition cursor-pointer whitespace-nowrap ${
            activeTab === 'pr-vault' ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          PR (1-Rep Max) Vault 🏆
        </button>
        <button
          onClick={() => setActiveTab('digital-pass')}
          className={`pb-3 transition cursor-pointer whitespace-nowrap ${
            activeTab === 'digital-pass' ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          Digital Gym Pass & QR ID
        </button>
        <button
          onClick={() => setActiveTab('metrics')}
          className={`pb-3 transition cursor-pointer whitespace-nowrap ${
            activeTab === 'metrics' ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          Body Metrics & Transformation
        </button>
        <button
          onClick={() => setActiveTab('leaderboard')}
          className={`pb-3 transition cursor-pointer whitespace-nowrap ${
            activeTab === 'leaderboard' ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          Gym Leaderboard & Streaks
        </button>
      </div>

      {/* VIEW: Today's Workout Routine with Set Logger & Rest Timer */}
      {activeTab === 'routine' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Exercise Checklist & Logger */}
          <div className="lg:col-span-2 space-y-4">
            <div className="glass-panel p-5 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                  Daily Mission
                </span>
                <h3 className="font-black text-white text-base mt-0.5">{routine.routineTitle}</h3>
                <p className="text-xs text-zinc-400">Coached by {routine.assignedBy}</p>
              </div>
              <span className="text-xs font-mono px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full font-bold">
                {routine.exercises.filter((e) => e.completed).length} / {routine.exercises.length} Exercises Done
              </span>
            </div>

            {/* Exercises List */}
            <div className="space-y-4">
              {routine.exercises.map((exercise) => (
                <div key={exercise.id} className="glass-panel p-5 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-white text-sm flex items-center gap-2">
                        <span>{exercise.name}</span>
                        {exercise.completed && <CheckCircle2 className="h-4 w-4 text-emerald-400 inline" />}
                      </h4>
                      <p className="text-xs text-zinc-400">Target: {exercise.targetMuscle} • Past Best: <span className="text-zinc-200 font-mono">{exercise.historyBest}</span></p>
                    </div>
                    <button
                      onClick={() => startRestTimer(60)}
                      className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono flex items-center gap-1.5 cursor-pointer"
                    >
                      <Zap className="h-3.5 w-3.5 text-amber-400" />
                      <span>60s Timer</span>
                    </button>
                  </div>

                  {/* Sets Logger Strip */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                    {exercise.loggedSets.map((set, setIdx) => (
                      <button
                        key={setIdx}
                        onClick={() => toggleExerciseSet(exercise.id, setIdx)}
                        className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                          set.done
                            ? 'bg-emerald-950/50 border-emerald-500/50 text-emerald-200'
                            : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
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

          {/* Right Floating: Built-in Rest Stopwatch & Motivation Widget */}
          <div className="space-y-6">
            {/* Built-in Stopwatch / Rest Countdown */}
            <div className="glass-panel-glow p-5 rounded-2xl space-y-4 text-center">
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
                    timerRunning
                      ? 'bg-amber-500 hover:bg-amber-400 text-black'
                      : 'bg-emerald-500 hover:bg-emerald-400 text-black'
                  }`}
                >
                  {timerRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  <span>{timerRunning ? 'Pause' : 'Start Timer'}</span>
                </button>
                <button
                  onClick={() => {
                    setTimerRunning(false);
                    setRestSeconds(60);
                  }}
                  className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 cursor-pointer"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>
              <div className="flex justify-center gap-1.5 text-[11px] font-mono">
                <button onClick={() => startRestTimer(45)} className="px-2 py-1 bg-zinc-800 rounded-lg hover:bg-zinc-700 text-zinc-300">45s</button>
                <button onClick={() => startRestTimer(60)} className="px-2 py-1 bg-zinc-800 rounded-lg hover:bg-zinc-700 text-zinc-300">60s</button>
                <button onClick={() => startRestTimer(90)} className="px-2 py-1 bg-zinc-800 rounded-lg hover:bg-zinc-700 text-zinc-300">90s</button>
                <button onClick={() => startRestTimer(120)} className="px-2 py-1 bg-zinc-800 rounded-lg hover:bg-zinc-700 text-zinc-300">120s</button>
              </div>
            </div>

            {/* Quick Gym Announcements */}
            <div className="glass-panel p-5 rounded-2xl space-y-3">
              <h4 className="font-bold text-xs text-white flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-emerald-400" />
                <span>Gym Community Updates</span>
              </h4>
              <div className="space-y-2.5">
                {data.announcements.map((ann) => (
                  <div key={ann.id} className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-emerald-400 font-bold">{ann.tag}</span>
                      <span className="text-[10px] text-zinc-500">{ann.date}</span>
                    </div>
                    <h5 className="font-bold text-zinc-200 text-xs">{ann.title}</h5>
                    <p className="text-[11px] text-zinc-400 leading-relaxed">{ann.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: Assigned Diet & Water Tracker */}
      {activeTab === 'diet-tracker' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Diet Plan Meal Checklist */}
          <div className="lg:col-span-2 glass-panel p-5 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-white">High Protein Clean Cut (2200 kcal)</h3>
                <p className="text-xs text-zinc-400">Assigned by Coach Marcus Vance</p>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400 px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                Target: 185g Protein
              </span>
            </div>

            {/* Meal Items with Checkboxes */}
            <div className="space-y-3">
              {data.dietPlans[0].meals.map((meal, idx) => (
                <div
                  key={idx}
                  onClick={() => setCheckedMeals({ ...checkedMeals, [idx]: !checkedMeals[idx] })}
                  className={`p-4 rounded-xl border flex items-center justify-between transition cursor-pointer ${
                    checkedMeals[idx]
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-zinc-200'
                      : 'bg-zinc-950/60 border-zinc-800 text-zinc-400'
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

          {/* Water Intake Tracker */}
          <div className="glass-panel p-5 rounded-2xl space-y-4 text-center">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Droplets className="h-4 w-4 text-cyan-400" />
                <span>Hydration Tracker</span>
              </span>
              <span className="text-xs font-mono font-bold text-cyan-400">
                {(waterGlasses * 0.35).toFixed(1)}L / 3.5L
              </span>
            </div>

            {/* Glasses Visual Grid */}
            <div className="grid grid-cols-5 gap-2 py-4">
              {Array.from({ length: targetGlasses }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setWaterGlasses(i + 1)}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center transition cursor-pointer ${
                    i < waterGlasses
                      ? 'bg-cyan-950/60 border-cyan-400 text-cyan-400 shadow-md shadow-cyan-500/20'
                      : 'bg-zinc-950/60 border-zinc-800 text-zinc-600'
                  }`}
                >
                  <Droplets className="h-5 w-5" />
                  <span className="text-[10px] font-mono mt-1 font-bold">{i + 1}</span>
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setWaterGlasses((g) => Math.min(targetGlasses, g + 1))}
                className="w-full py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-black cursor-pointer"
              >
                + Drink 1 Glass (350ml)
              </button>
              <button
                onClick={() => setWaterGlasses(0)}
                className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: PR (1-Rep Max) Vault */}
      {activeTab === 'pr-vault' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-white">Personal Records (1-Rep Max) Vault</h3>
              <p className="text-xs text-zinc-400">Celebrate your all-time heaviest lifts and strength milestones.</p>
            </div>
            <button
              onClick={() => setShowPRModal(true)}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-black shadow-lg shadow-amber-500/20 flex items-center gap-1.5 cursor-pointer"
            >
              <Trophy className="h-4 w-4" />
              <span>+ Log New PR</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.personalRecords.map((pr, i) => (
              <div key={i} className="glass-panel p-5 rounded-2xl space-y-3 relative overflow-hidden border-t-2 border-t-amber-400/80">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold">
                    {pr.badge}
                  </span>
                  <span className="text-[11px] text-zinc-500 font-mono">{pr.date}</span>
                </div>
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

      {/* VIEW: Digital QR Entry Pass */}
      {activeTab === 'digital-pass' && (
        <div className="flex justify-center">
          <div className="w-full max-w-sm rounded-3xl p-6 bg-gradient-to-b from-zinc-900 via-zinc-950 to-black border-2 border-emerald-500/40 shadow-2xl shadow-emerald-500/10 space-y-6 text-center">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="h-5 w-5 text-emerald-400" />
                <span className="font-extrabold text-sm text-white font-mono">FITPULSE DIGITAL PASS</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                ACTIVE
              </span>
            </div>

            {/* Member Profile Banner */}
            <div className="flex flex-col items-center space-y-2">
              <img
                src={currentMember.avatar}
                alt={currentMember.name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-emerald-400 shadow-lg shadow-emerald-500/30"
              />
              <h3 className="font-black text-lg text-white">{currentMember.name}</h3>
              <p className="text-xs text-zinc-400 font-mono">ID: {currentMember.id.toUpperCase()}</p>
            </div>

            {/* Dynamic QR Pass */}
            <div className="p-4 rounded-2xl bg-white mx-auto inline-block shadow-inner">
              <QRCodeSVG
                value={currentMember.qrCodeString}
                size={180}
                level="H"
                includeMargin={false}
              />
            </div>

            <div className="space-y-1 text-xs">
              <p className="text-zinc-300 font-semibold">{currentMember.planName}</p>
              <p className="text-zinc-500 text-[11px]">Valid Until: {currentMember.expiryDate} • Locker: {currentMember.lockerNo}</p>
            </div>

            <p className="text-[10px] text-zinc-500 leading-tight">
              Scan this dynamic QR code at the entrance biometric gate turnstile for automated gym entry.
            </p>
          </div>
        </div>
      )}

      {/* VIEW: Body Metrics & Photos */}
      {activeTab === 'metrics' && (
        <div className="space-y-6">
          <div className="glass-panel p-5 rounded-2xl space-y-4">
            <div>
              <h3 className="font-bold text-sm text-white">Body Composition Progression</h3>
              <p className="text-xs text-zinc-400">Weekly weight tracking and body fat percentage reduction.</p>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.traineeTransformations[0].weeklyLogs}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                  <XAxis dataKey="week" stroke="#71717a" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#71717a" domain={['dataMin - 2', 'dataMax + 2']} tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#3f3f46', borderRadius: '8px', fontSize: '12px' }} />
                  <Line type="monotone" dataKey="weight" stroke="#10b981" strokeWidth={3} name="Weight (kg)" />
                  <Line type="monotone" dataKey="bodyFat" stroke="#38bdf8" strokeWidth={2} name="Body Fat %" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: Gym Leaderboard & Streaks */}
      {activeTab === 'leaderboard' && (
        <div className="glass-panel p-5 rounded-2xl space-y-4">
          <div>
            <h3 className="font-bold text-sm text-white">Monthly Attendance & Streak Leaderboard</h3>
            <p className="text-xs text-zinc-400">Top consistent warriors this month at FitPulse 360.</p>
          </div>
          <div className="divide-y divide-zinc-800">
            {data.leaderboard.map((user) => (
              <div key={user.rank} className="py-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className={`w-6 h-6 rounded-full font-mono text-xs font-black flex items-center justify-center ${
                    user.rank === 1 ? 'bg-amber-400 text-black' : user.rank === 2 ? 'bg-zinc-300 text-black' : user.rank === 3 ? 'bg-amber-700 text-white' : 'text-zinc-500'
                  }`}>
                    {user.rank}
                  </span>
                  <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover border border-zinc-700" />
                  <div>
                    <p className="font-bold text-xs text-zinc-100">{user.name}</p>
                    <span className="text-[10px] text-emerald-400 font-bold">{user.badge}</span>
                  </div>
                </div>
                <div className="text-right font-mono text-xs">
                  <span className="text-amber-400 font-bold block">🔥 {user.streakDays} Day Streak</span>
                  <span className="text-zinc-500 text-[10px]">{user.checkInsThisMonth} Check-ins this month</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL: Log New PR */}
      {showPRModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-md rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <Trophy className="h-5 w-5 text-amber-400" />
                <span>Log New Personal Record</span>
              </h3>
              <button onClick={() => setShowPRModal(false)} className="text-zinc-400 hover:text-white">✕</button>
            </div>
            <form onSubmit={handlePRSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-zinc-300 font-semibold">Lift / Exercise</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Barbell Deadlift"
                  value={prForm.lift}
                  onChange={(e) => setPrForm({ ...prForm, lift: e.target.value })}
                  className="w-full mt-1 bg-zinc-950 border border-zinc-700 rounded-xl px-3.5 py-2 text-zinc-100 focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-zinc-300 font-semibold">Weight Lifted</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 180 kg"
                    value={prForm.weight}
                    onChange={(e) => setPrForm({ ...prForm, weight: e.target.value })}
                    className="w-full mt-1 bg-zinc-950 border border-zinc-700 rounded-xl px-3.5 py-2 text-zinc-100 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-zinc-300 font-semibold">Reps / Effort</label>
                  <input
                    type="text"
                    placeholder="e.g. 1 Rep Max"
                    value={prForm.reps}
                    onChange={(e) => setPrForm({ ...prForm, reps: e.target.value })}
                    className="w-full mt-1 bg-zinc-950 border border-zinc-700 rounded-xl px-3.5 py-2 text-zinc-100 focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setShowPRModal(false)}
                  className="px-4 py-2 rounded-xl text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold bg-amber-500 hover:bg-amber-400 text-black"
                >
                  Celebrate PR! 🔥
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
