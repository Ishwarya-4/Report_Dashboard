import { useRef, useState } from 'react';
import { Upload } from 'lucide-react';

export const FileUpload = ({ onFileUpload }) => {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileUpload(file);
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div
      onClick={() => fileInputRef.current?.click()}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        relative border-2 border-dashed rounded-lg p-12 
        transition-all duration-200 cursor-pointer
        ${isDragging 
          ? 'border-primary bg-primary/5 scale-[1.02]' 
          : 'border-muted-foreground/30 bg-muted/30 hover:border-primary hover:bg-primary/5'
        }
      `}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".csv,.xls,.xlsx,.xlsm"
        className="hidden"
      />
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="p-4 rounded-full bg-primary/10">
          <Upload className="h-10 w-10 text-primary" />
        </div>
        <div className="text-center">
          <p className="text-lg font-medium text-foreground mb-1">
            Drop your file here or click to browse
          </p>
          <p className="text-sm text-muted-foreground">
            Supports .csv, .xls, .xlsx, .xlsm
          </p>
        </div>
      </div>
    </div>
  );
};
