import React from 'react';
import { Button } from '@/components/ui/button';
import { SearchBar, Toolbar } from '@/components/ui/page-header';
import { Filter, X, Trash2, Mail, SlidersHorizontal } from 'lucide-react';
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuSeparator
} from '@/components/ui/dropdown';

export function StudentsToolbar({
  searchQuery, setSearchQuery,
  selectedCount = 0,
  isFiltersOpen, onToggleFilters,
  onDeleteSelected
}) {
  return (
    <div className="mb-4">
      <Toolbar
        left={
          <>
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="F.I.SH yoki telefon..."
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
          selectedCount > 0 ? (
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-medium text-slate-500 bg-blue-50 border border-blue-200 rounded-md px-2 py-1">
                {selectedCount} tanlandi
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="text-slate-700">
                    Amallar
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44">
                  <DropdownMenuItem>
                    <Mail className="mr-2 h-3.5 w-3.5 text-slate-400" />
                    SMS yuborish
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600 hover:bg-red-50" onSelect={onDeleteSelected}>
                    <Trash2 className="mr-2 h-3.5 w-3.5" />
                    O'chirish
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : null
        }
      />
    </div>
  );
}
