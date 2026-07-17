import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/ui/page-header';

export function ParentsHeader({ onAddParent }) {
  return (
    <PageHeader
      title="Ota-onalar"
      description="O'quvchilarning ota-onalari bazasi"
      actions={
        <Button size="sm" onClick={onAddParent} className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="h-3.5 w-3.5" />
          Yangi ota-ona
        </Button>
      }
    />
  );
}
