import { useRef, useState } from 'react';
import { Upload, FileText } from 'lucide-react';
import { Card } from '@/components/ui/card';

export const FileUpload = ({ onFileUpload }) => {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
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
      setFileName(file.name);
      onFileUpload(file);
    }
  };

  return (
    <Card className="shadow-card hover:shadow-md transition-shadow w-full">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`px-6 py-8 md:px-10 md:py-10 border-2 border-dashed rounded-lg transition-all min-h-[140px] md:min-h-[160px] w-full ${
          isDragging 
            ? 'border-primary bg-primary/5' 
            : 'border-border bg-card'
        }`}
      >
        <input
          type="file"
          id="file-upload"
          accept=".csv,.xls,.xlsx,.xlsm,.json"
          onChange={handleFileInput}
          ref={fileInputRef}
          className="hidden"
        />
        
        <label htmlFor="file-upload" className="cursor-pointer">
          <div className="flex flex-col items-center justify-center gap-2 md:gap-3">
            <div className="p-3 rounded-full bg-primary/10">
              <Upload className="w-6 h-6 text-primary" />
            </div>
            
            {fileName ? (
              <div className="flex items-center gap-2 text-sm">
                <FileText className="w-4 h-4 text-success" />
                <span className="font-medium text-foreground">{fileName}</span>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-sm font-medium text-foreground mb-1">
                  Drop your file here or click to browse
                </p>
                <p className="text-xs text-muted-foreground">
                  Supports .csv, .xls, .xlsx, .xlsm, .json
                </p>
              </div>
            )}
          </div>
        </label>
      </div>
    </Card>
  );
};
