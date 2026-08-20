import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';
import {
  UserCheck,
  Dumbbell,
  Utensils,
  TrendingUp,
  Calendar,
  DollarSign,
  Plus,
  Trash2,
  Copy,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronRight,
  Flame,
  MessageSquare,
  Award
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

  // Workout Builder State
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

  // Diet Builder State
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
    setWorkoutForm({
      name: '',
      targetGoal: 'Hypertrophy',
      difficulty: 'Intermediate',
      exercises: []
    });
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
    setDietForm({
      name: '',
      calorieTarget: 2400,
      waterIntakeLiters: 4.0,
      proteinG: 180,
      carbsG: 240,
      fatG: 60,
      meals: []
    });
    setActiveTab('diet-builder');
  };

  const myTrainees = data.members.filter((m) => m.trainerId === currentUser.id || currentUser.role === 'ADMIN');
  const selectedTransformation = data.traineeTransformations.find((t) => t.memberId === selectedTraineeId) || data.traineeTransformations[0];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-950/60 via-zinc-900 to-zinc-950 border border-purple-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-purple-400 shadow-lg shadow-purple-500/20"
          />
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-black text-white">{currentUser.name}</h1>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold">
                Elite Coach
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-1">Specialization: Hypertrophy & Bio-Mechanics Conditioning</p>
            <div className="flex items-center gap-4 text-xs font-mono text-zinc-300 mt-2">
              <span>⭐ 4.9 Rating</span>
              <span>•</span>
              <span>👥 {myTrainees.length} Active PT Clients</span>
              <span>•</span>
              <span className="text-emerald-400 font-bold">₹16,800 Commission This Month</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('workout-builder')}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-purple-500 hover:bg-purple-400 text-white shadow-lg shadow-purple-500/20 cursor-pointer flex items-center gap-1.5"
          >
            <Dumbbell className="h-4 w-4" />
            <span>+ Build Routine</span>
          </button>
          <button
            onClick={() => setActiveTab('diet-builder')}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 cursor-pointer flex items-center gap-1.5"
          >
            <Utensils className="h-4 w-4 text-emerald-400" />
            <span>+ Build Macro Diet</span>
          </button>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex border-b border-zinc-800 space-x-6 text-xs font-semibold overflow-x-auto">
        <button
          onClick={() => setActiveTab('trainees')}
          className={`pb-3 transition cursor-pointer whitespace-nowrap ${
            activeTab === 'trainees' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          My Trainees Roster ({myTrainees.length})
        </button>
        <button
          onClick={() => setActiveTab('workout-builder')}
          className={`pb-3 transition cursor-pointer whitespace-nowrap ${
            activeTab === 'workout-builder' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          Workout Routines & Templates ({data.workoutTemplates.length})
        </button>
        <button
          onClick={() => setActiveTab('diet-builder')}
          className={`pb-3 transition cursor-pointer whitespace-nowrap ${
            activeTab === 'diet-builder' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          Diet & Macro Builder ({data.dietPlans.length})
        </button>
        <button
          onClick={() => setActiveTab('transformations')}
          className={`pb-3 transition cursor-pointer whitespace-nowrap ${
            activeTab === 'transformations' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          Trainee Progress Reviews
        </button>
        <button
          onClick={() => setActiveTab('schedule')}
          className={`pb-3 transition cursor-pointer whitespace-nowrap ${
            activeTab === 'schedule' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          1-on-1 PT Slots & Calendar
        </button>
      </div>

      {/* VIEW: Assigned Trainees Roster */}
      {activeTab === 'trainees' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {myTrainees.map((trainee) => (
            <div key={trainee.id} className="glass-panel-accent p-5 rounded-2xl space-y-4 relative">
              <div className="flex items-center space-x-3">
                <img src={trainee.avatar} alt={trainee.name} className="w-12 h-12 rounded-xl object-cover border border-purple-400/40" />
                <div>
                  <h4 className="font-bold text-white text-sm">{trainee.name}</h4>
                  <p className="text-[11px] text-zinc-400">{trainee.planName}</p>
                  <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                    🔥 {trainee.streak} Day Streak
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-zinc-950/60 border border-zinc-800 text-xs font-mono">
                <div>
                  <span className="text-zinc-500 text-[10px] block">Weight:</span>
                  <span className="text-zinc-200 font-bold">{trainee.weight} kg</span>
                  <span className="text-zinc-500 text-[10px] block">Goal: {trainee.targetWeight} kg</span>
                </div>
                <div>
                  <span className="text-zinc-500 text-[10px] block">Body Fat:</span>
                  <span className="text-purple-300 font-bold">{trainee.bodyFat}</span>
                  <span className="text-zinc-500 text-[10px] block">Muscle: {trainee.muscleMass}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2 border-t border-zinc-800">
                <button
                  onClick={() => {
                    setSelectedTraineeId(trainee.id);
                    setActiveTab('transformations');
                  }}
                  className="w-full py-2 rounded-xl text-xs font-bold bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/30 transition cursor-pointer"
                >
                  View Progress Log →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIEW: Workout Builder */}
      {activeTab === 'workout-builder' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Builder Form */}
          <div className="lg:col-span-2 glass-panel p-5 rounded-2xl space-y-4">
            <div>
              <h3 className="font-bold text-sm text-white">Create Custom Workout Routine</h3>
              <p className="text-xs text-zinc-400">Add target exercises, configure sets, rep ranges, rest timers, and movement cues.</p>
            </div>

            <form onSubmit={handleSaveWorkout} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="text-zinc-300 font-semibold">Routine Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chest & Tricep Hypertrophy Protocol"
                    value={workoutForm.name}
                    onChange={(e) => setWorkoutForm({ ...workoutForm, name: e.target.value })}
                    className="w-full mt-1 bg-zinc-950 border border-zinc-700 rounded-xl px-3.5 py-2 text-zinc-100 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-zinc-300 font-semibold">Goal Focus</label>
                  <select
                    value={workoutForm.targetGoal}
                    onChange={(e) => setWorkoutForm({ ...workoutForm, targetGoal: e.target.value })}
                    className="w-full mt-1 bg-zinc-950 border border-zinc-700 rounded-xl px-3.5 py-2 text-zinc-100 focus:outline-none"
                  >
                    <option value="Hypertrophy">Hypertrophy (Muscle Gain)</option>
                    <option value="Strength Powerlifting">Strength Powerlifting</option>
                    <option value="Fat Loss & HIIT">Fat Loss & HIIT</option>
                    <option value="Mobility & Rehab">Mobility & Rehab</option>
                  </select>
                </div>
              </div>

              {/* Added Exercises List */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-purple-300">Added Exercise Sequence ({workoutForm.exercises.length})</p>
                {workoutForm.exercises.map((ex, i) => (
                  <div key={i} className="p-3 rounded-xl bg-zinc-950/70 border border-zinc-800 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 text-[11px] font-bold flex items-center justify-center font-mono">
                        {i + 1}
                      </span>
                      <div>
                        <p className="font-bold text-zinc-100">{ex.name}</p>
                        <p className="text-[11px] text-zinc-400">
                          {ex.sets} Sets × {ex.reps} Reps • {ex.restSec}s Rest • <span className="text-purple-300">{ex.targetMuscle}</span>
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveExercise(i)}
                      className="text-zinc-500 hover:text-rose-400 p-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add New Exercise Quick Strip */}
              <div className="p-4 rounded-2xl bg-zinc-950/90 border border-zinc-800 space-y-3">
                <p className="font-bold text-zinc-200 text-xs flex items-center gap-1.5">
                  <Plus className="h-3.5 w-3.5 text-purple-400" />
                  <span>Add Exercise to Protocol</span>
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder="Exercise Name (e.g. Incline DB Fly)"
                    value={newExercise.name}
                    onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
                    className="bg-zinc-900 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-zinc-100 text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Muscle (e.g. Upper Chest)"
                    value={newExercise.targetMuscle}
                    onChange={(e) => setNewExercise({ ...newExercise, targetMuscle: e.target.value })}
                    className="bg-zinc-900 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-zinc-100 text-xs"
                  />
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Sets"
                      value={newExercise.sets}
                      onChange={(e) => setNewExercise({ ...newExercise, sets: Number(e.target.value) })}
                      className="w-1/2 bg-zinc-900 border border-zinc-700 rounded-lg px-2 py-1.5 text-zinc-100 text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Reps"
                      value={newExercise.reps}
                      onChange={(e) => setNewExercise({ ...newExercise, reps: e.target.value })}
                      className="w-1/2 bg-zinc-900 border border-zinc-700 rounded-lg px-2 py-1.5 text-zinc-100 text-xs"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleAddExerciseToRoutine}
                  className="w-full py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold"
                >
                  + Add Exercise to List
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl font-bold bg-purple-500 hover:bg-purple-400 text-white shadow-lg shadow-purple-500/20"
              >
                Save & Publish Routine
              </button>
            </form>
          </div>

          {/* Existing Templates Library */}
          <div className="glass-panel p-5 rounded-2xl space-y-4">
            <h3 className="font-bold text-sm text-white">Routine Templates Library</h3>
            <div className="space-y-3">
              {data.workoutTemplates.map((tpl) => (
                <div key={tpl.id} className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-white text-xs">{tpl.name}</h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300">
                      {tpl.exercises.length} Movements
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400">Target: {tpl.targetGoal} • {tpl.difficulty}</p>
                  <div className="divide-y divide-zinc-800/60 pt-1">
                    {tpl.exercises.slice(0, 3).map((ex, i) => (
                      <div key={i} className="py-1 text-[11px] text-zinc-400 flex justify-between">
                        <span>{ex.name}</span>
                        <span className="font-mono text-zinc-300">{ex.sets} × {ex.reps}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW: Diet & Macro Builder */}
      {activeTab === 'diet-builder' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 glass-panel p-5 rounded-2xl space-y-4">
            <h3 className="font-bold text-sm text-white">Build Personalized Macro & Diet Plan</h3>
            <form onSubmit={handleSaveDiet} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-zinc-300 font-semibold">Diet Chart Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Lean Shred Diet (2200 kcal)"
                    value={dietForm.name}
                    onChange={(e) => setDietForm({ ...dietForm, name: e.target.value })}
                    className="w-full mt-1 bg-zinc-950 border border-zinc-700 rounded-xl px-3.5 py-2 text-zinc-100 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-zinc-300 font-semibold">Daily Calorie Target</label>
                  <input
                    type="number"
                    value={dietForm.calorieTarget}
                    onChange={(e) => setDietForm({ ...dietForm, calorieTarget: e.target.value })}
                    className="w-full mt-1 bg-zinc-950 border border-zinc-700 rounded-xl px-3.5 py-2 text-zinc-100 focus:outline-none"
                  />
                </div>
              </div>

              {/* Macro Sliders */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-zinc-950/70 border border-zinc-800 text-center font-mono">
                <div>
                  <span className="text-[10px] text-zinc-400 block">Protein Goal</span>
                  <span className="text-emerald-400 font-bold text-base">{dietForm.proteinG}g</span>
                  <span className="text-[10px] text-zinc-500 block">{dietForm.proteinG * 4} kcal</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-400 block">Carbs Goal</span>
                  <span className="text-amber-400 font-bold text-base">{dietForm.carbsG}g</span>
                  <span className="text-[10px] text-zinc-500 block">{dietForm.carbsG * 4} kcal</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-400 block">Fats Goal</span>
                  <span className="text-rose-400 font-bold text-base">{dietForm.fatG}g</span>
                  <span className="text-[10px] text-zinc-500 block">{dietForm.fatG * 9} kcal</span>
                </div>
              </div>

              {/* Preloaded Meal Timings Preview */}
              <div className="space-y-2">
                <p className="font-bold text-zinc-200">Meal Structure & Timings ({dietForm.meals.length} Meals)</p>
                {dietForm.meals.map((m, i) => (
                  <div key={i} className="p-3 rounded-xl bg-zinc-950/70 border border-zinc-800 flex justify-between">
                    <div>
                      <p className="font-bold text-zinc-200 text-xs">{m.mealName}</p>
                      <p className="text-[11px] text-zinc-400">{m.items}</p>
                    </div>
                    <div className="text-right font-mono text-xs">
                      <span className="text-emerald-400 font-bold block">{m.calories} kcal</span>
                      <span className="text-zinc-500 text-[10px]">{m.protein}g Protein</span>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl font-bold bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/20"
              >
                Assign & Save Diet Chart
              </button>
            </form>
          </div>

          <div className="glass-panel p-5 rounded-2xl space-y-4">
            <h3 className="font-bold text-sm text-white">Active Diet Charts</h3>
            <div className="space-y-3">
              {data.dietPlans.map((dp) => (
                <div key={dp.id} className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-white text-xs">{dp.name}</h4>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">{dp.calorieTarget} kcal</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1 text-[11px] font-mono text-zinc-400 pt-1">
                    <div>P: {dp.macros.proteinG}g</div>
                    <div>C: {dp.macros.carbsG}g</div>
                    <div>F: {dp.macros.fatG}g</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW: Trainee Transformation Review */}
      {activeTab === 'transformations' && (
        <div className="space-y-6">
          <div className="glass-panel p-5 rounded-2xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-bold text-sm text-white">Trainee Transformation Progress Log: {selectedTransformation.memberName}</h3>
                <p className="text-xs text-zinc-400">Review weight trends, body fat reduction, and physique photo logs.</p>
              </div>
              <div className="flex gap-2">
                <span className="text-xs font-mono px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full font-bold">
                  Active {selectedTransformation.monthsActive} Months
                </span>
              </div>
            </div>

            {/* Weight Progression Chart */}
            <div className="h-56 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={selectedTransformation.weeklyLogs}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                  <XAxis dataKey="week" stroke="#71717a" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#71717a" domain={['dataMin - 2', 'dataMax + 2']} tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#3f3f46', borderRadius: '8px', fontSize: '12px' }} />
                  <Line type="monotone" dataKey="weight" stroke="#10b981" strokeWidth={3} name="Weight (kg)" />
                  <Line type="monotone" dataKey="bodyFat" stroke="#a855f7" strokeWidth={2} name="Body Fat %" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Photo Vault */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950">
                <div className="p-2 text-[10px] font-bold text-zinc-400 text-center uppercase tracking-wider">Front View</div>
                <img src={selectedTransformation.photos.front} alt="Front View" className="w-full h-48 object-cover" />
              </div>
              <div className="rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950">
                <div className="p-2 text-[10px] font-bold text-zinc-400 text-center uppercase tracking-wider">Side Profile</div>
                <img src={selectedTransformation.photos.side} alt="Side View" className="w-full h-48 object-cover" />
              </div>
              <div className="rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950">
                <div className="p-2 text-[10px] font-bold text-zinc-400 text-center uppercase tracking-wider">Back & Lat Spread</div>
                <img src={selectedTransformation.photos.back} alt="Back View" className="w-full h-48 object-cover" />
              </div>
            </div>

            {/* Feedback Box */}
            <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-3">
              <h4 className="font-bold text-xs text-white flex items-center gap-1.5">
                <MessageSquare className="h-4 w-4 text-purple-400" />
                <span>Coach Direct Feedback & Weekly Notes</span>
              </h4>
              <textarea
                rows={3}
                placeholder="Type form corrections, meal adjustments, or motivational feedback..."
                value={feedbackNote || selectedTransformation.trainerNotes}
                onChange={(e) => setFeedbackNote(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-3 text-xs text-zinc-100 focus:outline-none"
              />
              <button
                onClick={() => addTrainerFeedback(selectedTransformation.memberId, feedbackNote)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-purple-500 hover:bg-purple-400 text-white flex items-center gap-1.5 cursor-pointer"
              >
                <span>Send Note to Trainee App</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: 1-on-1 PT Slots & Calendar */}
      {activeTab === 'schedule' && (
        <div className="glass-panel p-5 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-white">1-on-1 Personal Training Schedule</h3>
              <p className="text-xs text-zinc-400">Booked sessions and open client consultation slots.</p>
            </div>
            <span className="text-xs font-mono px-2.5 py-1 bg-emerald-500/20 text-emerald-400 rounded-full font-bold">
              6 Sessions Today
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            {[
              { time: "06:30 AM - 07:30 AM", client: "Rahul Sharma", goal: "Chest & Shoulders Hypertrophy", status: "Completed" },
              { time: "08:00 AM - 09:00 AM", client: "David Miller", goal: "Heavy Deadlift & Lat Width", status: "Completed" },
              { time: "05:00 PM - 06:00 PM", client: "Karthik Raja", goal: "Core & Metabolic Conditioning", status: "Upcoming" },
              { time: "06:30 PM - 07:30 PM", client: "Ananya Iyer", goal: "Functional Glutes & Mobility", status: "Upcoming" },
            ].map((slot, i) => (
              <div key={i} className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono text-purple-300 font-bold block">{slot.time}</span>
                  <h4 className="font-bold text-white text-xs mt-0.5">{slot.client}</h4>
                  <p className="text-[11px] text-zinc-400">{slot.goal}</p>
                </div>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                  slot.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-300'
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
