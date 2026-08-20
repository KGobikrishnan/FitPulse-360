import React, { useState, useEffect } from 'react';
import { useGym } from '../context/GymContext';
import {
  Search,
  Users,
  Dumbbell,
  DollarSign,
  Utensils,
  ArrowRight,
  X,
  Lock,
  Box,
  Flame,
  Award
} from 'lucide-react';

export const CommandPalette = ({ isOpen, onClose }) => {
  const { data, setActiveTab } = useGym();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose(!isOpen);
      }
      if (e.key === 'Escape' && isOpen) {
        onClose(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredMembers = data.members.filter((m) =>
    m.name.toLowerCase().includes(query.toLowerCase()) ||
    m.planName.toLowerCase().includes(query.toLowerCase())
  );

  const filteredEquipment = data.equipmentList.filter((e) =>
    e.name.toLowerCase().includes(query.toLowerCase()) ||
    e.category.toLowerCase().includes(query.toLowerCase())
  );

  const filteredPlans = data.plans.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[99999] flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-md">
      <div
        className="w-full max-w-xl bg-[#12151f] border border-white/[0.1] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/[0.08] relative">
          <Search className="h-4 w-4 text-emerald-400 mr-2.5 shrink-0" />
          <input
            autoFocus
            type="text"
            placeholder="Search members, plans, equipment, or routines..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none"
          />
          <button onClick={() => onClose(false)} className="p-1 text-zinc-400 hover:text-white rounded-lg">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Search Results */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-4 text-xs">
          {/* Members Category */}
          {filteredMembers.length > 0 && (
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 px-2 pb-1.5 font-bold flex items-center gap-1.5">
                <Users className="h-3 w-3" />
                <span>Members ({filteredMembers.length})</span>
              </p>
              <div className="space-y-1">
                {filteredMembers.slice(0, 4).map((member) => (
                  <button
                    key={member.id}
                    onClick={() => {
                      setActiveTab('members');
                      onClose(false);
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#171a26] text-left transition cursor-pointer"
                  >
                    <div className="flex items-center space-x-2.5">
                      <img src={member.avatar} alt="" className="w-7 h-7 rounded-full object-cover" />
                      <div>
                        <p className="font-bold text-white text-xs">{member.name}</p>
                        <p className="text-[10px] text-zinc-400">{member.planName} • Status: {member.status}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400">View Roster →</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Equipment Category */}
          {filteredEquipment.length > 0 && (
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 px-2 pb-1.5 font-bold flex items-center gap-1.5">
                <Box className="h-3 w-3" />
                <span>Equipment & Assets ({filteredEquipment.length})</span>
              </p>
              <div className="space-y-1">
                {filteredEquipment.slice(0, 3).map((eq) => (
                  <button
                    key={eq.id}
                    onClick={() => {
                      setActiveTab('assets');
                      onClose(false);
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#171a26] text-left transition cursor-pointer"
                  >
                    <div>
                      <p className="font-bold text-white text-xs">{eq.name}</p>
                      <p className="text-[10px] text-zinc-400">{eq.category} • Status: {eq.status}</p>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-400">Next due: {eq.nextDue}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredMembers.length === 0 && filteredEquipment.length === 0 && (
            <div className="p-8 text-center text-zinc-500 text-xs">
              No matching members or items found for "{query}".
            </div>
          )}
        </div>

        {/* Footer Shortcut Helper */}
        <div className="px-4 py-2 bg-[#0b0d13] border-t border-white/[0.08] flex items-center justify-between text-[11px] text-zinc-500 font-mono">
          <span>Navigation Quick Jumper</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
};
