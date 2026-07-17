import React from 'react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/ui/page-header';
import { Plus, Download, Upload } from 'lucide-react';

export function GroupsHeader({ onAddGroup, onExport }) {
  return (
    <PageHeader
      title="Guruhlar"
      description="O'quv markazidagi barcha guruhlar"
      actions={
        <>
          <Button variant="outline" size="sm" className="hidden sm:flex text-slate-600" onClick={onExport}>
            <Download className="h-3.5 w-3.5" />
            Export
          </Button>
          <Button size="sm" onClick={onAddGroup} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-3.5 w-3.5" />
            Yangi guruh
          </Button>
        </>
      }
    />
  );
}
