import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/ui/page-header';

export default function LessonsHeader({ onNewLesson }) {
  return (
    <PageHeader
      title="Darslar"
      description="Guruhlarning o'tilgan yoki rejalashtirilgan darslari"
      actions={
        <Button size="sm" onClick={onNewLesson} className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="h-3.5 w-3.5" />
          Yangi dars
        </Button>
      }
    />
  );
}
