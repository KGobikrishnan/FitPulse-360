import React, { useState, useEffect } from 'react';
import { useGym } from '../../context/GymContext';
import { motion } from 'framer-motion';
import {
  Users,
  Dumbbell,
  Utensils,
  TrendingUp,
  Calendar,
  DollarSign,
  Plus,
  Trash2,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  Flame,
  MessageSquare,
  Award,
  ChevronRight,
  Clock,
  Target,
  Zap,
  Star,
  Activity,
  ChevronDown
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

// Counter-Up Helper
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

export const TrainerDashboard = () => {
  const { data, currentUser, activeTab, setActiveTab, saveWorkoutTemplate, saveDietPlan, addTrainerFeedback } = useGym();

  const currentTab = ['trainees', 'workout-builder', 'diet-builder', 'transformations', 'schedule'].includes(activeTab)
    ? activeTab
    : 'trainees';

  const [workoutForm, setWorkoutForm] = useState({
    name: '',
    targetGoal: 'Hypertrophy',
    difficulty: 'Intermediate',
    exercises: [
      { name: 'Incline Barbell Bench Press', sets: 4, reps: '8-10', restSec: 90, targetMuscle: 'Upper Chest', notes: 'Control tempo 3s' },
      { name: 'Dual Cable Lateral Raise', sets: 4, reps: '12-15', restSec: 60, targetMuscle: 'Side Delts', notes: 'Constant tension' },
    ]
  });

  const [newExercise, setNewExercise] = useState({
    name: '',
    sets: 3,
    reps: '10-12',
    restSec: 60,
    targetMuscle: 'Chest',
    notes: ''
  });

  const [dietForm, setDietForm] = useState({
    name: '',
    calorieTarget: 2400,
    waterIntakeLiters: 4.0,
    proteinG: 180,
    carbsG: 240,
    fatG: 60,
    meals: [
      { mealName: 'Breakfast (8:00 AM)', items: '4 Eggs Omelette + Oatmeal 60g + Banana', calories: 550, protein: 34 },
      { mealName: 'Lunch (1:30 PM)', items: 'Grilled Chicken Breast 200g + White Rice 200g + Green Salad', calories: 650, protein: 52 },
      { mealName: 'Post-Workout (5:30 PM)', items: 'Whey Protein 1 scoop + Apple + 5g Creatine', calories: 230, protein: 27 },
      { mealName: 'Dinner (8:30 PM)', items: 'Grilled Paneer/Fish 180g + Stir fry veggies + 2 Roti', calories: 580, protein: 42 }
    ]
  });

  const [feedbackNote, setFeedbackNote] = useState('');
  const [selectedTraineeId, setSelectedTraineeId] = useState('m1');

  const handleAddExerciseToRoutine = () => {
    if (!newExercise.name) return;
    setWorkoutForm({
      ...workoutForm,
      exercises: [...workoutForm.exercises, { ...newExercise, id: `ex-${Date.now()}` }]
    });
    setNewExercise({ name: '', sets: 3, reps: '10-12', restSec: 60, targetMuscle: 'Chest', notes: '' });
  };

  const handleRemoveExercise = (idx) => {
    setWorkoutForm({
      ...workoutForm,
      exercises: workoutForm.exercises.filter((_, i) => i !== idx)
    });
  };

  const handleSaveWorkout = (e) => {
    e.preventDefault();
    if (!workoutForm.name || workoutForm.exercises.length === 0) return;
    saveWorkoutTemplate(workoutForm);
    setWorkoutForm({ name: '', targetGoal: 'Hypertrophy', difficulty: 'Intermediate', exercises: [] });
    setActiveTab('workout-builder');
  };

  const handleSaveDiet = (e) => {
    e.preventDefault();
    if (!dietForm.name) return;
    saveDietPlan({
      name: dietForm.name,
      calorieTarget: Number(dietForm.calorieTarget),
      waterIntakeLiters: Number(dietForm.waterIntakeLiters),
      macros: {
        proteinG: Number(dietForm.proteinG),
        carbsG: Number(dietForm.carbsG),
        fatG: Number(dietForm.fatG)
      },
      meals: dietForm.meals
    });
    setDietForm({ name: '', calorieTarget: 2400, waterIntakeLiters: 4.0, proteinG: 180, carbsG: 240, fatG: 60, meals: [] });
    setActiveTab('diet-builder');
  };

  const myTrainees = data.members.filter((m) => m.trainerId === currentUser.id || currentUser.role === 'ADMIN' || currentUser.role === 'TRAINER');
  const selectedTransformation = data.traineeTransformations.find((t) => t.memberId === selectedTraineeId) || data.traineeTransformations[0];

  const containerVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.08 } }
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
      {/* Top Header */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
              Trainer Coaching & Client Hub
            </h1>
            <span className="text-[11px] font-mono px-3 py-1 rounded-full warm-badge-purple font-bold flex items-center gap-1 shadow-2xs">
              <Zap className="h-3.5 w-3.5 text-purple-600" />
              <span>Elite Coach</span>
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Manage trainee transformations, build customized workout protocols & diet charts.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={() => setActiveTab('workout-builder')}
            className="btn-shiny px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25 transition flex items-center gap-2 cursor-pointer active:scale-98"
          >
            <Flame className="h-4 w-4" />
            <span>+ Build Routine</span>
          </button>
          <button
            onClick={() => setActiveTab('diet-builder')}
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-white hover:bg-[#FAF9F5] text-slate-700 border border-[#EAE6DF] transition flex items-center gap-2 cursor-pointer shadow-xs active:scale-98"
          >
            <Utensils className="h-4 w-4 text-emerald-600" />
            <span>+ Assign Diet</span>
          </button>
        </div>
      </motion.div>

      {/* 4 KPI Cards with Signature Accent Bars (2x2 Grid on Mobile, 4 Cols on Desktop) */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        <div className="warm-card accent-bar-indigo p-4 sm:p-6 space-y-2 sm:space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <p className="text-[10px] sm:text-xs font-mono text-slate-400 uppercase tracking-wider font-bold truncate">Active Trainees</p>
            <span className="p-1.5 sm:p-2.5 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-100 shrink-0">
              <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </span>
          </div>
          <h3 className="text-xl sm:text-3xl font-black text-slate-900 font-display tabular-numbers tracking-tight">
            <CounterNumber value={myTrainees.length} />
          </h3>
          <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono pt-1">
            <span className="text-indigo-700 font-bold truncate">+2 New</span>
            <span className="text-slate-400 hidden sm:inline">100% Retained</span>
          </div>
        </div>

        <div className="warm-card accent-bar-purple p-4 sm:p-6 space-y-2 sm:space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <p className="text-[10px] sm:text-xs font-mono text-slate-400 uppercase tracking-wider font-bold truncate">PT Commission</p>
            <span className="p-1.5 sm:p-2.5 rounded-xl bg-purple-50 text-purple-700 border border-purple-100 shrink-0">
              <DollarSign className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </span>
          </div>
          <h3 className="text-xl sm:text-3xl font-black text-slate-900 font-display tabular-numbers tracking-tight">
            <CounterNumber value={16800} prefix="₹" />
          </h3>
          <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono pt-1">
            <span className="text-purple-700 font-bold truncate">35% Share</span>
            <span className="text-slate-400 hidden sm:inline">Next: 1st</span>
          </div>
        </div>

        <div className="warm-card accent-bar-emerald p-4 sm:p-6 space-y-2 sm:space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <p className="text-[10px] sm:text-xs font-mono text-slate-400 uppercase tracking-wider font-bold truncate">Sessions</p>
            <span className="p-1.5 sm:p-2.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100 shrink-0">
              <Activity className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </span>
          </div>
          <h3 className="text-xl sm:text-3xl font-black text-slate-900 font-display tabular-numbers tracking-tight">
            <CounterNumber value={48} />
          </h3>
          <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono pt-1">
            <span className="text-emerald-700 font-bold truncate">96% Attend</span>
            <span className="text-slate-400 hidden sm:inline">Goal: 50</span>
          </div>
        </div>

        <div className="warm-card accent-bar-amber p-4 sm:p-6 space-y-2 sm:space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <p className="text-[10px] sm:text-xs font-mono text-slate-400 uppercase tracking-wider font-bold truncate">Coach Rating</p>
            <span className="p-1.5 sm:p-2.5 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 shrink-0">
              <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-amber-400 text-amber-500" />
            </span>
          </div>
          <div className="flex items-baseline space-x-1">
            <h3 className="text-xl sm:text-3xl font-black text-slate-900 font-display tabular-numbers tracking-tight">4.9</h3>
            <span className="text-[10px] text-slate-400 font-mono">/ 5.0</span>
          </div>
          <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono pt-1">
            <span className="text-amber-800 font-bold truncate">Top 5%</span>
            <span className="text-slate-400 hidden sm:inline">Master</span>
          </div>
        </div>
      </motion.div>

      {/* Sub-Navigation Tabs (Modern Glass Pills with No Scrollbar) */}
      <motion.div variants={itemVariants} className="flex space-x-2 sm:space-x-3 text-xs sm:text-sm font-semibold overflow-x-auto no-scrollbar scroll-smooth py-1 border-b border-white/60">
        {[
          { id: 'trainees', label: `My Trainees Roster (${myTrainees.length})` },
          { id: 'workout-builder', label: `Workout Protocols (${data.workoutTemplates.length})` },
          { id: 'diet-builder', label: `Macro Diet Charts (${data.dietPlans.length})` },
          { id: 'transformations', label: 'Trainee Progress Reviews' },
          { id: 'schedule', label: '1-on-1 PT Calendar' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3.5 py-2 rounded-2xl transition-all cursor-pointer whitespace-nowrap text-xs font-semibold shrink-0 ${
              currentTab === tab.id
                ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/25 active:scale-98'
                : 'bg-white/60 hover:bg-white/90 text-slate-600 hover:text-slate-900 border border-white/80'
            }`}
          >
            <span>{tab.label}</span>
          </button>
        ))}
      </motion.div>

      {/* VIEW: Trainees Roster (Mobile Optimized Liquid Glass Cards) */}
      {currentTab === 'trainees' && (
        <motion.div variants={itemVariants} className="space-y-4">
          {/* Header Action & Summary Pill */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/60 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-white/80 shadow-2xs">
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-xl bg-indigo-50 text-indigo-700 font-bold">
                <Users className="h-4 w-4" />
              </span>
              <div>
                <h3 className="font-bold text-slate-900 text-xs sm:text-sm font-display">Client Roster & Telemetry</h3>
                <p className="text-[11px] text-slate-500 font-medium">{myTrainees.length} Active Coaching Clients • 100% Retention</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-[11px] font-mono">
              <span className="px-2.5 py-1 rounded-xl warm-badge-emerald font-bold">● 92% Avg Compliance</span>
            </div>
          </div>

          {/* Trainee Cards Grid (1 col on mobile, 2 on tablet, 3 on desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
            {myTrainees.map((trainee) => (
              <div
                key={trainee.id}
                className="liquid-glass p-4 sm:p-5 space-y-3.5 relative overflow-hidden border border-white/90 shadow-sm hover:shadow-md transition-all"
              >
                {/* Top Profile Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={trainee.avatar}
                        alt={trainee.name}
                        className="w-12 h-12 rounded-2xl object-cover ring-2 ring-indigo-600/30 shadow-2xs"
                      />
                      <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 text-sm font-display tracking-tight leading-tight">{trainee.name}</h4>
                      <p className="text-[10px] text-indigo-600 font-mono font-bold mt-0.5">{trainee.planName}</p>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full warm-badge-amber font-mono shrink-0 shadow-2xs">
                    🔥 {trainee.streak}d
                  </span>
                </div>

                {/* Metrics 2-Col Stat Capsule */}
                <div className="grid grid-cols-2 gap-2 p-2.5 rounded-2xl bg-white/70 backdrop-blur-md border border-white/90 text-xs font-mono shadow-2xs">
                  <div className="pl-1">
                    <span className="text-slate-400 text-[9px] block uppercase font-bold tracking-wider">Weight</span>
                    <span className="text-slate-900 font-black text-sm font-display tabular-numbers">{trainee.weight} <span className="text-[10px] font-normal text-slate-400">kg</span></span>
                  </div>
                  <div className="pl-1 border-l border-white">
                    <span className="text-slate-400 text-[9px] block uppercase font-bold tracking-wider">Body Fat</span>
                    <span className="text-purple-700 font-black text-sm font-display tabular-numbers">{trainee.bodyFat}</span>
                  </div>
                </div>

                {/* Compliance Progress Bar */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-[11px] text-slate-600 font-medium">
                    <span>Weekly Compliance</span>
                    <span className="text-emerald-700 font-bold font-mono">92%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200/60 rounded-full overflow-hidden p-0.5">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full shadow-2xs" style={{ width: '92%' }} />
                  </div>
                </div>

                {/* Quick Action Button */}
                <button
                  onClick={() => {
                    setSelectedTraineeId(trainee.id);
                    setActiveTab('transformations');
                  }}
                  className="btn-shiny w-full py-2.5 rounded-xl text-xs font-bold bg-white hover:bg-indigo-50 text-indigo-700 border border-white/90 hover:border-indigo-200 transition flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs active:scale-98"
                >
                  <span>Review Transformation</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* VIEW: Workout Builder (Liquid Glass Protocol Architect) */}
      {currentTab === 'workout-builder' && (
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-2 liquid-glass p-4 sm:p-6 space-y-4 sm:space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/80 pb-3">
              <div>
                <h3 className="font-bold text-sm sm:text-base text-slate-900 font-display">Create Custom Workout Routine Protocol</h3>
                <p className="text-[11px] sm:text-xs text-slate-500">Assign specific set, rep and rest ranges for your trainees</p>
              </div>
              <span className="text-[10px] sm:text-xs font-mono warm-badge-emerald px-3 py-1 rounded-full font-bold self-start sm:self-auto shadow-2xs">
                {workoutForm.exercises.length} Exercises Loaded
              </span>
            </div>

            <form onSubmit={handleSaveWorkout} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-700 font-bold text-xs">Routine Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chest & Triceps Hypertrophy Protocol"
                  value={workoutForm.name}
                  onChange={(e) => setWorkoutForm({ ...workoutForm, name: e.target.value })}
                  className="w-full mt-1.5 bg-white/70 border border-white/90 rounded-2xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 shadow-2xs transition"
                />
              </div>

              {/* Added Exercise List */}
              <div className="space-y-2.5">
                {workoutForm.exercises.map((ex, i) => (
                  <div key={i} className="p-3.5 sm:p-4 rounded-2xl bg-white/70 backdrop-blur-md border border-white/90 flex items-center justify-between shadow-2xs">
                    <div className="flex items-center space-x-3">
                      <span className="w-7 h-7 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200/80 font-mono text-xs font-bold flex items-center justify-center shadow-2xs shrink-0">
                        {i + 1}
                      </span>
                      <div>
                        <p className="font-bold text-slate-900 text-xs sm:text-sm font-display">{ex.name}</p>
                        <p className="text-[10px] sm:text-[11px] text-slate-500 font-mono mt-0.5">{ex.sets} Sets × {ex.reps} Reps • Rest: {ex.restSec}s • {ex.targetMuscle}</p>
                      </div>
                    </div>
                    <button type="button" onClick={() => handleRemoveExercise(i)} className="text-slate-400 hover:text-rose-600 p-2 rounded-xl hover:bg-rose-50 cursor-pointer transition active:scale-95">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add New Exercise Inline Form */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/60 backdrop-blur-md border border-white/90 space-y-3 shadow-2xs">
                <p className="font-bold text-slate-800 text-xs font-display flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5 text-indigo-600" />
                  <span>+ Add Movement to Routine</span>
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                  <input
                    type="text"
                    placeholder="Exercise Name (e.g. Incline DB Flyes)"
                    value={newExercise.name}
                    onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
                    className="sm:col-span-2 bg-white/80 border border-white rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none shadow-2xs"
                  />
                  <input
                    type="text"
                    placeholder="Target Muscle"
                    value={newExercise.targetMuscle}
                    onChange={(e) => setNewExercise({ ...newExercise, targetMuscle: e.target.value })}
                    className="bg-white/80 border border-white rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none shadow-2xs"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2.5">
                  <div>
                    <span className="text-[9px] text-slate-500 block mb-1 font-bold uppercase tracking-wider">Sets</span>
                    <input
                      type="number"
                      value={newExercise.sets}
                      onChange={(e) => setNewExercise({ ...newExercise, sets: Number(e.target.value) })}
                      className="w-full bg-white/80 border border-white rounded-xl px-3 py-1.5 text-xs text-slate-800 shadow-2xs"
                    />
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 block mb-1 font-bold uppercase tracking-wider">Reps</span>
                    <input
                      type="text"
                      value={newExercise.reps}
                      onChange={(e) => setNewExercise({ ...newExercise, reps: e.target.value })}
                      className="w-full bg-white/80 border border-white rounded-xl px-3 py-1.5 text-xs text-slate-800 shadow-2xs"
                    />
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 block mb-1 font-bold uppercase tracking-wider">Rest (Sec)</span>
                    <input
                      type="number"
                      value={newExercise.restSec}
                      onChange={(e) => setNewExercise({ ...newExercise, restSec: Number(e.target.value) })}
                      className="w-full bg-white/80 border border-white rounded-xl px-3 py-1.5 text-xs text-slate-800 shadow-2xs"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleAddExerciseToRoutine}
                  className="w-full py-2.5 rounded-xl font-bold text-xs bg-white hover:bg-indigo-50 text-indigo-700 border border-white/90 hover:border-indigo-200 transition cursor-pointer shadow-2xs active:scale-98"
                >
                  + Add Exercise to Protocol
                </button>
              </div>

              <button type="submit" className="btn-shiny w-full py-3 rounded-2xl font-bold text-xs bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25 cursor-pointer active:scale-98">
                Save & Publish Protocol to Clients
              </button>
            </form>
          </div>

          <div className="liquid-glass p-4 sm:p-6 space-y-4">
            <h3 className="font-bold text-sm text-slate-900 font-display">Existing Gym Protocols</h3>
            <div className="space-y-3">
              {data.workoutTemplates.map((tpl) => (
                <div key={tpl.id} className="p-3.5 sm:p-4 rounded-2xl bg-white/70 backdrop-blur-md border border-white/90 space-y-1.5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 font-display">{tpl.name}</h4>
                    <span className="text-[10px] font-mono warm-badge-purple px-2 py-0.5 rounded-md font-bold">{tpl.targetGoal}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-mono">{tpl.exercises.length} Movements • Difficulty: {tpl.difficulty}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* VIEW: Diet Builder (Macro Diet Charts) */}
      {currentTab === 'diet-builder' && (
        <motion.div variants={itemVariants} className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6">
            {data.dietPlans.map((dp) => (
              <div key={dp.id} className="liquid-glass p-4 sm:p-6 space-y-4 flex flex-col justify-between border border-white/90 shadow-sm">
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 text-sm sm:text-base font-display">{dp.name}</h4>
                    <span className="text-xs font-mono font-bold text-emerald-700 warm-badge-emerald px-3 py-1 rounded-full shadow-2xs">
                      {dp.calorieTarget} kcal
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-white/70 backdrop-blur-md border border-white/90 text-center text-xs font-mono shadow-2xs">
                    <div>
                      <span className="text-[9px] text-slate-400 block font-bold uppercase">Protein</span>
                      <span className="text-emerald-700 font-black text-sm font-display tabular-numbers">{dp.macros.proteinG}g</span>
                    </div>
                    <div className="border-x border-white">
                      <span className="text-[9px] text-slate-400 block font-bold uppercase">Carbs</span>
                      <span className="text-indigo-700 font-black text-sm font-display tabular-numbers">{dp.macros.carbsG}g</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-400 block font-bold uppercase">Fats</span>
                      <span className="text-amber-700 font-black text-sm font-display tabular-numbers">{dp.macros.fatG}g</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-1">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Assigned Daily Meals</p>
                    {dp.meals.slice(0, 3).map((meal, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-white/60 border border-white/90 flex items-center justify-between text-xs shadow-2xs">
                        <span className="font-medium text-slate-800 truncate pr-2">{meal.mealName}</span>
                        <span className="font-mono text-[11px] text-slate-500 shrink-0 font-bold">{meal.calories} kcal</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="btn-shiny w-full py-2.5 rounded-xl text-xs font-bold bg-white hover:bg-indigo-50 text-indigo-700 border border-white/90 hover:border-indigo-200 transition cursor-pointer shadow-2xs active:scale-98">
                  Assign to Trainee →
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* VIEW: Trainee Transformations (Progress Reviews) */}
      {currentTab === 'transformations' && (
        <motion.div variants={itemVariants} className="liquid-glass p-4 sm:p-6 space-y-5 sm:space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/80 pb-4">
            <div>
              <h3 className="font-bold text-sm sm:text-base text-slate-900 font-display">Trainee Progress Review: {selectedTransformation.memberName}</h3>
              <p className="text-[11px] sm:text-xs text-slate-500 font-mono">Target: {selectedTransformation.currentPhase} • Coach: Marcus Vance</p>
            </div>
            <div className="flex items-center space-x-3 text-[11px] sm:text-xs font-mono font-medium">
              <span className="text-emerald-700 font-bold">● Body Weight (kg)</span>
              <span className="text-purple-700 font-bold">● Body Fat (%)</span>
            </div>
          </div>

          <div className="h-56 sm:h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={selectedTransformation.weeklyLogs}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.7)" />
                <XAxis dataKey="week" stroke="#94A3B8" tick={{ fontSize: 10 }} />
                <YAxis stroke="#94A3B8" domain={['dataMin - 2', 'dataMax + 2']} tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)', borderColor: 'rgba(255,255,255,0.9)', borderRadius: '16px', fontSize: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.06)' }} />
                <Line type="monotone" dataKey="weight" stroke="#059669" strokeWidth={3} dot={{ r: 4, fill: '#059669' }} name="Weight (kg)" animationDuration={1200} />
                <Line type="monotone" dataKey="bodyFat" stroke="#7C3AED" strokeWidth={2.5} dot={{ r: 4, fill: '#7C3AED' }} name="Body Fat %" animationDuration={1200} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Coach Feedback Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/60 backdrop-blur-md border border-white/90 space-y-3 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5 font-display">
                <MessageSquare className="h-4 w-4 text-indigo-600" />
                <span>Coach Weekly Feedback & Diet Adjustment</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">Sent directly to trainee portal</span>
            </div>
            <textarea
              rows={2}
              placeholder="e.g. Great progress on the bench press! Increase carbs by 30g on leg day..."
              value={feedbackNote}
              onChange={(e) => setFeedbackNote(e.target.value)}
              className="w-full bg-white/80 border border-white/90 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 shadow-2xs"
            />
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => {
                  if (!feedbackNote) return;
                  addTrainerFeedback(selectedTransformation.memberId, feedbackNote);
                  setFeedbackNote('');
                }}
                className="btn-shiny px-5 py-2 rounded-xl font-bold text-xs bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer shadow-md active:scale-98"
              >
                Send Feedback
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* VIEW: Schedule */}
      {currentTab === 'schedule' && (
        <motion.div variants={itemVariants} className="liquid-glass p-4 sm:p-6 space-y-4 sm:space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/80 pb-3">
            <div>
              <h3 className="font-bold text-sm sm:text-base text-slate-900 font-display">1-on-1 Personal Training Daily Schedule</h3>
              <p className="text-[11px] sm:text-xs text-slate-500">Manage time slots, client check-ins, and session completions</p>
            </div>
            <span className="text-[10px] sm:text-xs font-mono warm-badge-emerald px-3 py-1 rounded-full font-bold self-start sm:self-auto shadow-2xs">
              Today: 4 Sessions Booked
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            {[
              { time: "06:30 AM - 07:30 AM", client: "Rahul Sharma", goal: "Chest & Delts Hypertrophy", status: "Completed", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80" },
              { time: "08:00 AM - 09:00 AM", client: "David Miller", goal: "Heavy Deadlift & Grip Strength", status: "Completed", avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80" },
              { time: "05:00 PM - 06:00 PM", client: "Karthik Raja", goal: "Core & Metabolic Conditioning", status: "Upcoming", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" },
              { time: "06:30 PM - 07:30 PM", client: "Ananya Iyer", goal: "Glutes, Hamstrings & Mobility", status: "Upcoming", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80" },
            ].map((slot, i) => (
              <div key={i} className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#EAE6DF] flex items-center justify-between">
                <div className="flex items-center space-x-3.5">
                  <img src={slot.avatar} alt="" className="w-11 h-11 rounded-2xl object-cover ring-1 ring-purple-200" />
                  <div>
                    <span className="text-[11px] font-mono text-purple-700 font-bold block flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {slot.time}
                    </span>
                    <h4 className="font-bold text-slate-900 text-xs mt-0.5 font-display">{slot.client}</h4>
                    <p className="text-[11px] text-slate-500">{slot.goal}</p>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${
                  slot.status === 'Completed' ? 'warm-badge-emerald' : 'warm-badge-amber'
                }`}>
                  {slot.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
