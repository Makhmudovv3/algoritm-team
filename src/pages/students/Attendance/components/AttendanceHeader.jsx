import React from 'react';
import { Download, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/ui/page-header';

export default function AttendanceHeader({ onExport, onAdd }) {
  return (
    <PageHeader
      title="Davomat"
      description="O'quvchilarning darsga qatnashish hisoboti va tahlili"
      actions={
        <>
          <Button variant="outline" size="sm" className="hidden sm:flex text-slate-600" onClick={onExport}>
            <Download className="h-3.5 w-3.5" />
            Eksport
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white" onClick={onAdd}>
            <Plus className="h-3.5 w-3.5" />
            Davomat qo'shish
          </Button>
        </>
      }
    />
  );
}
