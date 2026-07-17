import React from 'react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/ui/page-header';
import { Upload, Download, Plus } from 'lucide-react';

export function StudentsHeader({ onAddStudent, onExport, onImport }) {
  const fileInputRef = React.useRef(null);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && onImport) {
      onImport(file);
    }
    // Reset the input so the same file can be imported again if needed
    if (e.target) e.target.value = '';
  };

  return (
    <PageHeader
      title="O'quvchilar"
      description="Markazdagi barcha o'quvchilar ro'yxati"
      actions={
        <>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept=".xlsx, .xls" 
            className="hidden" 
          />
          <Button variant="outline" size="sm" className="hidden sm:flex text-slate-600" onClick={handleImportClick}>
            <Upload className="h-3.5 w-3.5" />
            Import
          </Button>
          <Button variant="outline" size="sm" className="hidden sm:flex text-slate-600" onClick={onExport}>
            <Download className="h-3.5 w-3.5" />
            Export
          </Button>
          <Button size="sm" onClick={onAddStudent} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-3.5 w-3.5" />
            Yangi o'quvchi
          </Button>
        </>
      }
    />
  );
}
