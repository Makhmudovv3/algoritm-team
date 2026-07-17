import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/ui/page-header';

export default function RoomsHeader({ onAddRoom }) {
  return (
    <PageHeader
      title="Xonalar"
      description="O'quv markazidagi dars xonalarini boshqarish"
      actions={
        <Button size="sm" onClick={onAddRoom} className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="h-3.5 w-3.5" />
          Yangi xona
        </Button>
      }
    />
  );
}
