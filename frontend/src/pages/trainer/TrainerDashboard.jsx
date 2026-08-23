import React, { useState } from 'react';
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

      {/* 4 KPI Cards with Signature Accent Bars */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <div className="warm-card accent-bar-indigo p-6 space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <p className="text-xs font-mono text-slate-400 uppercase tracking-wider font-bold">Active Trainees</p>
            <span className="p-2.5 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-100">
              <Users className="h-4 w-4" />
            </span>
          </div>
          <h3 className="text-3xl font-black text-slate-900 font-display tabular-numbers tracking-tight">
            <CounterNumber value={myTrainees.length} />
          </h3>
          <div className="flex items-center justify-between text-xs font-mono pt-1">
            <span className="text-indigo-700 font-bold">+2 New Clients</span>
            <span className="text-slate-400">100% Retained</span>
          </div>
        </div>

        <div className="warm-card accent-bar-purple p-6 space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <p className="text-xs font-mono text-slate-400 uppercase tracking-wider font-bold">Monthly PT Commission</p>
            <span className="p-2.5 rounded-xl bg-purple-50 text-purple-700 border border-purple-100">
              <DollarSign className="h-4 w-4" />
            </span>
          </div>
          <h3 className="text-3xl font-black text-slate-900 font-display tabular-numbers tracking-tight">
            <CounterNumber value={16800} prefix="₹" />
          </h3>
          <div className="flex items-center justify-between text-xs font-mono pt-1">
            <span className="text-purple-700 font-bold">35% Revenue Share</span>
            <span className="text-slate-400">Next Payout: 1st</span>
          </div>
        </div>

        <div className="warm-card accent-bar-emerald p-6 space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <p className="text-xs font-mono text-slate-400 uppercase tracking-wider font-bold">Sessions Completed</p>
            <span className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100">
              <Activity className="h-4 w-4" />
            </span>
          </div>
          <h3 className="text-3xl font-black text-slate-900 font-display tabular-numbers tracking-tight">
            <CounterNumber value={48} />
          </h3>
          <div className="flex items-center justify-between text-xs font-mono pt-1">
            <span className="text-emerald-700 font-bold">96% Attendance</span>
            <span className="text-slate-400">Goal: 50</span>
          </div>
        </div>

        <div className="warm-card accent-bar-amber p-6 space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <p className="text-xs font-mono text-slate-400 uppercase tracking-wider font-bold">Coach Rating</p>
            <span className="p-2.5 rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
              <Star className="h-4 w-4 fill-amber-400 text-amber-500" />
            </span>
          </div>
          <div className="flex items-baseline space-x-1.5">
            <h3 className="text-3xl font-black text-slate-900 font-display tabular-numbers tracking-tight">4.9</h3>
            <span className="text-xs text-slate-400 font-mono">/ 5.0 (38 Reviews)</span>
          </div>
          <div className="flex items-center justify-between text-xs font-mono pt-1">
            <span className="text-amber-800 font-bold">Top 5% in Gym</span>
            <span className="text-slate-400">Badge: Master</span>
          </div>
        </div>
      </motion.div>

      {/* Sub-Navigation Tabs */}
      <motion.div variants={itemVariants} className="flex border-b border-[#EAE6DF] space-x-6 sm:space-x-8 text-xs sm:text-sm font-semibold overflow-x-auto">
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
            className={`pb-3.5 transition cursor-pointer whitespace-nowrap font-medium relative ${
              currentTab === tab.id
                ? 'text-indigo-700 font-bold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>{tab.label}</span>
            {currentTab === tab.id && (
              <motion.div
                layoutId="warmTrainerTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full shadow-xs"
              />
            )}
          </button>
        ))}
      </motion.div>

      {/* VIEW: Trainees Roster */}
      {currentTab === 'trainees' && (
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {myTrainees.map((trainee) => (
              <div key={trainee.id} className="warm-card p-6 space-y-4">
                <div className="flex items-center space-x-3.5">
                  <img src={trainee.avatar} alt="" className="w-14 h-14 rounded-2xl object-cover ring-2 ring-purple-100 shadow-sm" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm font-display">{trainee.name}</h4>
                    <p className="text-[11px] text-slate-500 font-mono">{trainee.planName}</p>
                    <span className="inline-block mt-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full warm-badge-emerald">
                      🔥 {trainee.streak} Day Streak
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-[#FAF9F5] border border-[#EAE6DF] text-xs font-mono">
                  <div>
                    <span className="text-slate-400 text-[10px] block uppercase font-bold">Current Weight</span>
                    <span className="text-slate-800 font-bold">{trainee.weight} kg</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block uppercase font-bold">Body Fat %</span>
                    <span className="text-purple-700 font-bold">{trainee.bodyFat}</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-slate-500">
                    <span>Weekly Compliance</span>
                    <span className="text-emerald-700 font-bold font-mono">92%</span>
                  </div>
                  <div className="w-full h-2 bg-[#FAF9F5] rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-600 rounded-full" style={{ width: '92%' }} />
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedTraineeId(trainee.id);
                    setActiveTab('transformations');
                  }}
                  className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#FAF9F5] hover:bg-indigo-50 text-indigo-700 border border-[#EAE6DF] hover:border-indigo-200 transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>Review Transformation Progress</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* VIEW: Workout Builder */}
      {currentTab === 'workout-builder' && (
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 warm-card p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-[#EAE6DF] pb-3">
              <div>
                <h3 className="font-bold text-sm text-slate-900 font-display">Create Custom Workout Routine Protocol</h3>
                <p className="text-xs text-slate-500">Assign specific set, rep and rest ranges for your trainees</p>
              </div>
              <span className="text-xs font-mono warm-badge-emerald px-3 py-1 rounded-full font-bold">
                {workoutForm.exercises.length} Exercises
              </span>
            </div>

            <form onSubmit={handleSaveWorkout} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-700 font-bold">Routine Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chest & Triceps Hypertrophy Protocol"
                  value={workoutForm.name}
                  onChange={(e) => setWorkoutForm({ ...workoutForm, name: e.target.value })}
                  className="w-full mt-1.5 bg-[#FAF9F5] border border-[#EAE6DF] rounded-xl px-4 py-2.5 text-slate-800 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Added Exercise List */}
              <div className="space-y-2.5">
                {workoutForm.exercises.map((ex, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#EAE6DF] flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-800 font-mono text-xs font-bold flex items-center justify-center shadow-xs">
                        {i + 1}
                      </span>
                      <div>
                        <p className="font-bold text-slate-900 text-xs font-display">{ex.name}</p>
                        <p className="text-[11px] text-slate-500">{ex.sets} Sets × {ex.reps} Reps • Rest: {ex.restSec}s • {ex.targetMuscle}</p>
                      </div>
                    </div>
                    <button type="button" onClick={() => handleRemoveExercise(i)} className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 cursor-pointer">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add New Exercise Inline Form */}
              <div className="p-5 rounded-2xl bg-[#FAF9F5] border border-[#EAE6DF] space-y-3">
                <p className="font-bold text-slate-800 text-xs font-display">+ Add Movement to Routine</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="Exercise Name (e.g. Incline DB Flyes)"
                    value={newExercise.name}
                    onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
                    className="sm:col-span-2 bg-white border border-[#EAE6DF] rounded-xl px-3 py-2 text-slate-800 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Target Muscle"
                    value={newExercise.targetMuscle}
                    onChange={(e) => setNewExercise({ ...newExercise, targetMuscle: e.target.value })}
                    className="bg-white border border-[#EAE6DF] rounded-xl px-3 py-2 text-slate-800 focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <span className="text-[10px] text-slate-500 block mb-1 font-bold">Sets</span>
                    <input
                      type="number"
                      value={newExercise.sets}
                      onChange={(e) => setNewExercise({ ...newExercise, sets: Number(e.target.value) })}
                      className="w-full bg-white border border-[#EAE6DF] rounded-xl px-3 py-1.5 text-slate-800"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block mb-1 font-bold">Reps</span>
                    <input
                      type="text"
                      value={newExercise.reps}
                      onChange={(e) => setNewExercise({ ...newExercise, reps: e.target.value })}
                      className="w-full bg-white border border-[#EAE6DF] rounded-xl px-3 py-1.5 text-slate-800"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block mb-1 font-bold">Rest (Sec)</span>
                    <input
                      type="number"
                      value={newExercise.restSec}
                      onChange={(e) => setNewExercise({ ...newExercise, restSec: Number(e.target.value) })}
                      className="w-full bg-white border border-[#EAE6DF] rounded-xl px-3 py-1.5 text-slate-800"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleAddExerciseToRoutine}
                  className="w-full py-2.5 rounded-xl font-bold text-xs bg-white hover:bg-indigo-50 text-indigo-700 border border-[#EAE6DF] hover:border-indigo-200 transition cursor-pointer shadow-xs"
                >
                  + Add Exercise to Protocol
                </button>
              </div>

              <button type="submit" className="btn-shiny w-full py-3 rounded-xl font-bold text-xs bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25 cursor-pointer">
                Save & Publish Protocol to Clients
              </button>
            </form>
          </div>

          <div className="warm-card p-6 space-y-4">
            <h3 className="font-bold text-sm text-slate-900 font-display">Existing Gym Protocols</h3>
            <div className="space-y-3">
              {data.workoutTemplates.map((tpl) => (
                <div key={tpl.id} className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#EAE6DF] space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs text-slate-900 font-display">{tpl.name}</h4>
                    <span className="text-[10px] font-mono warm-badge-purple px-2 py-0.5 rounded font-bold">{tpl.targetGoal}</span>
                  </div>
                  <p className="text-[11px] text-slate-500">{tpl.exercises.length} Movements • Difficulty: {tpl.difficulty}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* VIEW: Diet Builder */}
      {currentTab === 'diet-builder' && (
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {data.dietPlans.map((dp) => (
              <div key={dp.id} className="warm-card p-6 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 text-sm font-display">{dp.name}</h4>
                    <span className="text-xs font-mono font-bold text-emerald-700 warm-badge-emerald px-3 py-0.5 rounded-full">
                      {dp.calorieTarget} kcal
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-[#FAF9F5] border border-[#EAE6DF] text-center text-xs font-mono">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-bold">Protein</span>
                      <span className="text-emerald-700 font-bold">{dp.macros.proteinG}g</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-bold">Carbs</span>
                      <span className="text-indigo-700 font-bold">{dp.macros.carbsG}g</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-bold">Fats</span>
                      <span className="text-amber-700 font-bold">{dp.macros.fatG}g</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-1">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Assigned Daily Meals</p>
                    {dp.meals.slice(0, 3).map((meal, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-[#FAF9F5] border border-[#EAE6DF] flex items-center justify-between text-xs">
                        <span className="font-medium text-slate-800 truncate pr-2">{meal.mealName}</span>
                        <span className="font-mono text-[11px] text-slate-500 shrink-0">{meal.calories} kcal</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#FAF9F5] hover:bg-indigo-50 text-indigo-700 border border-[#EAE6DF] hover:border-indigo-200 transition cursor-pointer shadow-xs">
                  Assign to Trainee →
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* VIEW: Trainee Transformations */}
      {currentTab === 'transformations' && (
        <motion.div variants={itemVariants} className="warm-card p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EAE6DF] pb-4">
            <div>
              <h3 className="font-bold text-base text-slate-900 font-display">Trainee Progress Review: {selectedTransformation.memberName}</h3>
              <p className="text-xs text-slate-500 font-mono">Target: {selectedTransformation.currentPhase} • Coach: Marcus Vance</p>
            </div>
            <div className="flex items-center space-x-3 text-xs font-mono font-medium">
              <span className="text-emerald-700 font-bold">● Body Weight (kg)</span>
              <span className="text-purple-700 font-bold">● Body Fat (%)</span>
            </div>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={selectedTransformation.weeklyLogs}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EAE6DF" />
                <XAxis dataKey="week" stroke="#94A3B8" tick={{ fontSize: 11 }} />
                <YAxis stroke="#94A3B8" domain={['dataMin - 2', 'dataMax + 2']} tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#EAE6DF', borderRadius: '16px', fontSize: '12px' }} />
                <Line type="monotone" dataKey="weight" stroke="#059669" strokeWidth={3} dot={{ r: 4, fill: '#059669' }} name="Weight (kg)" animationDuration={1200} />
                <Line type="monotone" dataKey="bodyFat" stroke="#7C3AED" strokeWidth={2.5} dot={{ r: 4, fill: '#7C3AED' }} name="Body Fat %" animationDuration={1200} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Coach Feedback Box */}
          <div className="p-5 rounded-2xl bg-[#FAF9F5] border border-[#EAE6DF] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5 font-display">
                <MessageSquare className="h-4 w-4 text-indigo-600" />
                <span>Coach Weekly Feedback & Diet Adjustment</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Sent directly to trainee portal</span>
            </div>
            <textarea
              rows={2}
              placeholder="e.g. Great progress on the bench press! Increase carbs by 30g on leg day..."
              value={feedbackNote}
              onChange={(e) => setFeedbackNote(e.target.value)}
              className="w-full bg-white border border-[#EAE6DF] rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
            />
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => {
                  if (!feedbackNote) return;
                  addTrainerFeedback(selectedTransformation.memberId, feedbackNote);
                  setFeedbackNote('');
                }}
                className="btn-shiny px-5 py-2 rounded-xl font-bold text-xs bg-indigo-600 text-white cursor-pointer shadow-md"
              >
                Send Feedback
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* VIEW: Schedule */}
      {currentTab === 'schedule' && (
        <motion.div variants={itemVariants} className="warm-card p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-[#EAE6DF] pb-3">
            <div>
              <h3 className="font-bold text-sm text-slate-900 font-display">1-on-1 Personal Training Daily Schedule</h3>
              <p className="text-xs text-slate-500">Manage time slots, client check-ins, and session completions</p>
            </div>
            <span className="text-xs font-mono warm-badge-emerald px-3 py-1 rounded-full font-bold">
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
