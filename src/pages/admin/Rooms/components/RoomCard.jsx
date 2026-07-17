import React from 'react';
import { Edit2, Trash2, DoorOpen, Users, CheckCircle2, ChevronRight } from 'lucide-react';

export default function RoomCard({ room, branchName, onEdit, onDelete, onViewDetails }) {
  // Mock data for new requirements
  const isAvailable = Math.random() > 0.3;
  const occupancy = Math.floor(Math.random() * 100);

  return (
    <div 
      className="group bg-white border border-slate-200 rounded-lg p-3 hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer flex flex-col gap-3"
      onClick={() => onViewDetails(room)}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-slate-50 flex items-center justify-center border border-slate-100">
            <DoorOpen size={16} className="text-slate-600" />
          </div>
          <div>
            <h3 className="font-medium text-[13px] text-slate-900 leading-tight">{room.name}</h3>
            <p className="text-[12px] text-slate-500">{branchName}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity" onClick={e => e.stopPropagation()}>
          <button className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded" onClick={() => onEdit(room)}>
            <Edit2 size={14} />
          </button>
          <button className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded" onClick={() => onDelete(room.id)}>
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="flex items-center gap-1.5 p-1.5 rounded-md bg-slate-50 border border-slate-100">
          <Users size={12} className="text-slate-400" />
          <span className="text-[12px] font-medium text-slate-700">{room.capacity} o'rin</span>
        </div>
        <div className="flex items-center gap-1.5 p-1.5 rounded-md bg-slate-50 border border-slate-100">
          <CheckCircle2 size={12} className={isAvailable ? "text-blue-500" : "text-slate-400"} />
          <span className="text-[12px] font-medium text-slate-700">{occupancy}% band</span>
        </div>
      </div>
    </div>
  );
}

