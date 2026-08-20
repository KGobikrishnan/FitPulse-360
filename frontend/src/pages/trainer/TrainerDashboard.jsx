import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';
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
  ChevronRight
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

export const TrainerDashboard = () => {
  const { data, currentUser, activeTab, setActiveTab, saveWorkoutTemplate, saveDietPlan, addTrainerFeedback } = useGym();

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

  const myTrainees = data.members.filter((m) => m.trainerId === currentUser.id || currentUser.role === 'ADMIN');
  const selectedTransformation = data.traineeTransformations.find((t) => t.memberId === selectedTraineeId) || data.traineeTransformations[0];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2.5">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Trainer Coaching & Client Hub
            </h1>
            <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full saas-badge-purple font-bold">
              Elite Coach
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Manage trainee transformations, build customized workout protocols & diet charts.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={() => setActiveTab('workout-builder')}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/20 transition flex items-center gap-1.5 cursor-pointer"
          >
            <Flame className="h-4 w-4" />
            <span>+ Build Routine</span>
          </button>
          <button
            onClick={() => setActiveTab('diet-builder')}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#12151f] hover:bg-[#171a26] text-zinc-200 border border-white/[0.08] transition flex items-center gap-1.5 cursor-pointer"
          >
            <Utensils className="h-4 w-4 text-emerald-400" />
            <span>+ Assign Diet</span>
          </button>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="saas-card-hover p-5 space-y-2">
          <p className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider font-semibold">Active Trainees</p>
          <h3 className="text-2xl font-black text-white">{myTrainees.length}</h3>
          <p className="text-[11px] text-emerald-400 font-mono font-semibold">+2 New Clients This Month</p>
        </div>

        <div className="saas-card-hover p-5 space-y-2">
          <p className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider font-semibold">Monthly PT Commission</p>
          <h3 className="text-2xl font-black text-white">₹16,800</h3>
          <p className="text-[11px] text-purple-300 font-mono">35% Revenue Share</p>
        </div>

        <div className="saas-card-hover p-5 space-y-2">
          <p className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider font-semibold">Sessions Completed</p>
          <h3 className="text-2xl font-black text-white">48</h3>
          <p className="text-[11px] text-cyan-400 font-mono">96% Attendance Rate</p>
        </div>

        <div className="saas-card-hover p-5 space-y-2">
          <p className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider font-semibold">Coach Rating</p>
          <h3 className="text-2xl font-black text-white">⭐ 4.9 <span className="text-xs text-zinc-500 font-normal">/ 5.0</span></h3>
          <p className="text-[11px] text-amber-400 font-mono">Top 5% in Gym</p>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex border-b border-white/[0.07] space-x-6 text-xs font-semibold overflow-x-auto">
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

      {/* VIEW: Trainees Roster */}
      {activeTab === 'trainees' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {myTrainees.map((trainee) => (
            <div key={trainee.id} className="saas-card-hover p-5 space-y-4">
              <div className="flex items-center space-x-3">
                <img src={trainee.avatar} alt="" className="w-12 h-12 rounded-xl object-cover border border-purple-500/40" />
                <div>
                  <h4 className="font-bold text-white text-sm">{trainee.name}</h4>
                  <p className="text-[11px] text-zinc-400">{trainee.planName}</p>
                  <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full saas-badge-emerald">
                    🔥 {trainee.streak} Day Streak
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-[#0b0d13] border border-white/[0.05] text-xs font-mono">
                <div>
                  <span className="text-zinc-500 text-[10px] block">Weight</span>
                  <span className="text-zinc-200 font-bold">{trainee.weight} kg</span>
                </div>
                <div>
                  <span className="text-zinc-500 text-[10px] block">Body Fat</span>
                  <span className="text-purple-300 font-bold">{trainee.bodyFat}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedTraineeId(trainee.id);
                  setActiveTab('transformations');
                }}
                className="w-full py-2 rounded-xl text-xs font-bold bg-[#171a26] hover:bg-[#202434] text-emerald-400 border border-emerald-500/20 transition cursor-pointer"
              >
                View Transformation Review →
              </button>
            </div>
          ))}
        </div>
      )}

      {/* VIEW: Workout Builder */}
      {activeTab === 'workout-builder' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 saas-card p-6 space-y-4">
            <h3 className="font-bold text-sm text-white">Create Custom Workout Protocol</h3>
            <form onSubmit={handleSaveWorkout} className="space-y-4 text-xs">
              <input
                type="text"
                required
                placeholder="Routine Name (e.g. Chest & Shoulder Hypertrophy Protocol)"
                value={workoutForm.name}
                onChange={(e) => setWorkoutForm({ ...workoutForm, name: e.target.value })}
                className="w-full bg-[#0b0d13] border border-white/[0.1] rounded-xl px-4 py-2.5 text-zinc-100 focus:outline-none focus:border-emerald-500"
              />

              <div className="space-y-2">
                {workoutForm.exercises.map((ex, i) => (
                  <div key={i} className="p-3 rounded-xl bg-[#171a26] border border-white/[0.05] flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                      <div>
                        <p className="font-bold text-zinc-100">{ex.name}</p>
                        <p className="text-[10px] text-zinc-400">{ex.sets} Sets × {ex.reps} Reps • {ex.targetMuscle}</p>
                      </div>
                    </div>
                    <button type="button" onClick={() => handleRemoveExercise(i)} className="text-zinc-500 hover:text-rose-400 p-1">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              <button type="submit" className="w-full py-2.5 rounded-xl font-bold bg-emerald-500 hover:bg-emerald-400 text-black shadow-md shadow-emerald-500/20">
                Save & Publish Protocol
              </button>
            </form>
          </div>

          <div className="saas-card p-6 space-y-3">
            <h3 className="font-bold text-sm text-white">Existing Templates</h3>
            <div className="space-y-2.5">
              {data.workoutTemplates.map((tpl) => (
                <div key={tpl.id} className="p-3 rounded-xl bg-[#171a26] border border-white/[0.05]">
                  <h4 className="font-bold text-xs text-white">{tpl.name}</h4>
                  <p className="text-[10px] text-zinc-400">{tpl.exercises.length} Movements • {tpl.targetGoal}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW: Diet Builder */}
      {activeTab === 'diet-builder' && (
        <div className="saas-card p-6 space-y-4">
          <h3 className="font-bold text-sm text-white">Personalized Macro & Calorie Diet Chart</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.dietPlans.map((dp) => (
              <div key={dp.id} className="p-4 rounded-xl bg-[#171a26] border border-white/[0.05] space-y-2">
                <h4 className="font-bold text-white text-xs">{dp.name}</h4>
                <p className="text-xs font-mono font-bold text-emerald-400">{dp.calorieTarget} kcal Target</p>
                <div className="grid grid-cols-3 gap-1 text-[11px] font-mono text-zinc-400 pt-1">
                  <div>P: {dp.macros.proteinG}g</div>
                  <div>C: {dp.macros.carbsG}g</div>
                  <div>F: {dp.macros.fatG}g</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW: Trainee Transformations */}
      {activeTab === 'transformations' && (
        <div className="saas-card p-6 space-y-4">
          <h3 className="font-bold text-sm text-white">Trainee Progress Review: {selectedTransformation.memberName}</h3>
          <div className="h-56 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={selectedTransformation.weeklyLogs}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="week" stroke="#71717a" tick={{ fontSize: 11 }} />
                <YAxis stroke="#71717a" domain={['dataMin - 2', 'dataMax + 2']} tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#12151f', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="weight" stroke="#10b981" strokeWidth={3} name="Weight (kg)" />
                <Line type="monotone" dataKey="bodyFat" stroke="#a855f7" strokeWidth={2} name="Body Fat %" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* VIEW: Schedule */}
      {activeTab === 'schedule' && (
        <div className="saas-card p-6 space-y-4">
          <h3 className="font-bold text-sm text-white">1-on-1 Personal Training Calendar</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            {[
              { time: "06:30 AM - 07:30 AM", client: "Rahul Sharma", goal: "Chest Hypertrophy", status: "Completed" },
              { time: "08:00 AM - 09:00 AM", client: "David Miller", goal: "Heavy Deadlift", status: "Completed" },
              { time: "05:00 PM - 06:00 PM", client: "Karthik Raja", goal: "Core Conditioning", status: "Upcoming" },
              { time: "06:30 PM - 07:30 PM", client: "Ananya Iyer", goal: "Glutes & Mobility", status: "Upcoming" },
            ].map((slot, i) => (
              <div key={i} className="p-4 rounded-xl bg-[#171a26] border border-white/[0.05] flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono text-purple-300 font-bold block">{slot.time}</span>
                  <h4 className="font-bold text-white text-xs mt-0.5">{slot.client}</h4>
                  <p className="text-[11px] text-zinc-400">{slot.goal}</p>
                </div>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                  slot.status === 'Completed' ? 'saas-badge-emerald' : 'saas-badge-amber'
                }`}>
                  {slot.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
