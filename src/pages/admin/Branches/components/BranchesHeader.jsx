import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/ui/page-header';

export default function BranchesHeader({ onAdd }) {
  return (
    <PageHeader
      title="Filiallar"
      description="O'quv markazining barcha filiallarini boshqarish"
      actions={
        <Button size="sm" onClick={onAdd} className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="h-3.5 w-3.5" />
          Yangi filial
        </Button>
      }
    />
  );
}
