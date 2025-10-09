import { useRef } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const FileUpload = ({ onFileUpload }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".csv,.xls,.xlsx,.xlsm"
        className="hidden"
      />
      <Button
        onClick={() => fileInputRef.current?.click()}
        className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md"
      >
        <Upload className="mr-2 h-4 w-4" />
        Upload File
      </Button>
    </div>
  );
};
