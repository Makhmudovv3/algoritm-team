import React from 'react';
import { Plus, LayoutGrid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/ui/page-header';

export default function TeachersHeader({ onAdd, viewMode, setViewMode }) {
  return (
    <PageHeader
      title="O'qituvchilar"
      description="Markazdagi o'qituvchilarni boshqarish"
      actions={
        <>
          <div className="flex items-center bg-slate-100 rounded-md p-0.5 gap-0.5">
            <Button
              variant="ghost" size="sm"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'bg-white shadow-sm text-slate-900 h-7 px-2.5' : 'text-slate-500 h-7 px-2.5'}
            >
              <List className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost" size="sm"
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'bg-white shadow-sm text-slate-900 h-7 px-2.5' : 'text-slate-500 h-7 px-2.5'}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
            </Button>
          </div>
          <Button size="sm" onClick={onAdd} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-3.5 w-3.5" />
            Yangi o'qituvchi
          </Button>
        </>
      }
    />
  );
}
