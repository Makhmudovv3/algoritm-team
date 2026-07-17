import React from 'react';
import { SearchBar, Toolbar } from '@/components/ui/page-header';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal, LayoutGrid, List } from 'lucide-react';

export function GroupsToolbar({
  searchQuery, setSearchQuery,
  viewMode, setViewMode,
  isFiltersOpen, onToggleFilters
}) {
  return (
    <Toolbar
      className="mb-4"
      left={
        <>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Guruh nomini qidiring..."
            className="w-72"
          />
          <Button
            variant={isFiltersOpen ? 'secondary' : 'outline'}
            size="sm"
            onClick={onToggleFilters}
            className="text-slate-600"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Filtrlar
          </Button>
        </>
      }
      right={
        <div className="flex items-center bg-slate-100 rounded-md p-0.5 gap-0.5">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setViewMode('grid')}
            className={viewMode === 'grid' ? 'bg-white shadow-sm text-slate-900 h-7 px-2.5' : 'text-slate-500 h-7 px-2.5'}
          >
            <LayoutGrid className="h-3.5 w-3.5 mr-1" /> Kartalar
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setViewMode('table')}
            className={viewMode === 'table' ? 'bg-white shadow-sm text-slate-900 h-7 px-2.5' : 'text-slate-500 h-7 px-2.5'}
          >
            <List className="h-3.5 w-3.5 mr-1" /> Jadval
          </Button>
        </div>
      }
    />
  );
}
