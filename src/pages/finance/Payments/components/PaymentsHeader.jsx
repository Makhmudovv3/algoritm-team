import React from 'react';
import { Plus, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/ui/page-header';

export default function PaymentsHeader({ onAddPayment, onExport }) {
  return (
    <PageHeader
      title="To'lovlar"
      description="O'quvchilar tomonidan qilingan barcha to'lovlar tarixi"
      actions={
        <>
          <Button variant="outline" size="sm" className="hidden sm:flex text-slate-600" onClick={onExport}>
            <Download className="h-3.5 w-3.5" />
            Export
          </Button>
          <Button size="sm" onClick={onAddPayment} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-3.5 w-3.5" />
            To'lov qabul qilish
          </Button>
        </>
      }
    />
  );
}
