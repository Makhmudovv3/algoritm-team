import React from 'react';
import RoomCard from './RoomCard';

export default function RoomsGrid({ rooms, getBranchName, onEdit, onDelete, onViewDetails, isLoading }) {
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (rooms.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 bg-white border border-slate-200 rounded-lg">
        <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mb-3">
          <span className="text-lg">🚪</span>
        </div>
        <h3 className="text-[14px] font-medium text-slate-900 mb-1">Xonalar topilmadi</h3>
        <p className="text-[13px] text-slate-500 text-center max-w-sm">
          Siz qidirayotgan xona mavjud emas yoki hali hech narsa qo'shilmagan.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {rooms.map((room) => (
        <RoomCard
          key={room.id}
          room={room}
          branchName={getBranchName(room.branch_id)}
          onEdit={onEdit}
          onDelete={onDelete}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
}
