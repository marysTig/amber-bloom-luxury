import React, { useState, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, Loader2, Star, UploadCloud, X, Plus, GripVertical } from "lucide-react";
import { toast } from "sonner";

interface MultiImageUploaderProps {
  value: string[];
  onChange: (urls: string[]) => void;
  className?: string;
}

async function uploadToCloudinary(file: File): Promise<string> {
  const cloudName = import.meta.env["VITE_CLOUDINARY_CLOUD_NAME"];
  const uploadPreset = import.meta.env["VITE_CLOUDINARY_UPLOAD_PRESET"];

  if (!cloudName || !uploadPreset) {
    throw new Error("Cloudinary configuration missing");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  formData.append("folder", "parfum");

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error?.message || "Upload failed");
  }

  const data = await res.json();
  return data.secure_url as string;
}

export function MultiImageUploader({ value = [], onChange, className = "" }: MultiImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Always keep a fresh reference to value to avoid stale closures in async callbacks
  const latestValue = useRef(value);
  latestValue.current = value;

  // Drag-to-reorder state
  const dragItemIndex = useRef<number | null>(null);
  const dragOverItemIndex = useRef<number | null>(null);

  const handleUpload = useCallback(async (files: File[]) => {
    const validFiles = files.filter(f => f.type.startsWith("image/"));
    if (validFiles.length === 0) {
      toast.error("يرجى اختيار صور صالحة");
      return;
    }

    setIsUploading(true);
    try {
      const urls = await Promise.all(validFiles.map(uploadToCloudinary));
      // Use latestValue.current so we never lose photos added since the last render
      onChange([...latestValue.current, ...urls]);
      toast.success("تم رفع الصور بنجاح ✓");
    } catch (err: any) {
      toast.error(err.message || "حدث خطأ أثناء رفع الصور");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }, [onChange]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleUpload(Array.from(e.dataTransfer.files));
    }
  }, [handleUpload]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleUpload(Array.from(e.target.files));
    }
  };

  // Move image left/right or to first position
  const moveImage = (index: number, direction: "left" | "right" | "first") => {
    const newValues = [...value];
    if (direction === "first") {
      const [item] = newValues.splice(index, 1);
      newValues.unshift(item);
    } else if (direction === "left" && index > 0) {
      [newValues[index - 1], newValues[index]] = [newValues[index], newValues[index - 1]];
    } else if (direction === "right" && index < newValues.length - 1) {
      [newValues[index], newValues[index + 1]] = [newValues[index + 1], newValues[index]];
    }
    onChange(newValues);
  };

  const removeImage = (e: React.MouseEvent, indexToRemove: number) => {
    e.stopPropagation();
    const newValues = [...value];
    newValues.splice(indexToRemove, 1);
    onChange(newValues);
  };

  // ── Drag-to-reorder handlers ────────────────────────────────────────────────
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const onImageDragStart = (e: React.DragEvent, index: number) => {
    dragItemIndex.current = index;
    e.dataTransfer.effectAllowed = "move";
    // use a transparent ghost
    const ghost = document.createElement("div");
    ghost.style.position = "absolute";
    ghost.style.top = "-9999px";
    document.body.appendChild(ghost);
    e.dataTransfer.setDragImage(ghost, 0, 0);
    setTimeout(() => document.body.removeChild(ghost), 0);
  };

  const onImageDragEnter = (index: number) => {
    dragOverItemIndex.current = index;
    setDragOverIndex(index);
  };

  const onImageDragEnd = () => {
    const from = dragItemIndex.current;
    const to = dragOverItemIndex.current;
    if (from !== null && to !== null && from !== to) {
      const newValues = [...value];
      const [moved] = newValues.splice(from, 1);
      newValues.splice(to, 0, moved);
      onChange(newValues);
    }
    dragItemIndex.current = null;
    dragOverItemIndex.current = null;
    setDragOverIndex(null);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Gallery */}
      {value.length > 0 && (
        <>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <GripVertical className="h-3 w-3" />
            اسحب أو استخدم الأسهم لتغيير الترتيب — الصورة الأولى هي الرئيسية
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {value.map((url, index) => (
              <div
                key={url + index}
                draggable
                onDragStart={(e) => onImageDragStart(e, index)}
                onDragEnter={() => onImageDragEnter(index)}
                onDragOver={(e) => { e.preventDefault(); e.dataTransfer.dropEffect = "move"; }}
                onDragEnd={onImageDragEnd}
                className={`relative group aspect-square rounded-md overflow-hidden border transition-all duration-150 cursor-grab active:cursor-grabbing select-none ${
                  dragOverIndex === index
                    ? "border-primary scale-105 shadow-lg shadow-primary/20"
                    : "border-border/50 bg-card"
                }`}
              >
                <img
                  src={url}
                  alt={`Preview ${index}`}
                  className="w-full h-full object-cover pointer-events-none"
                  draggable={false}
                />
                {/* Drag handle overlay — desktop */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">
                  <GripVertical className="h-4 w-4 text-white drop-shadow" />
                </div>
                {/* Remove button */}
                <button
                  type="button"
                  onClick={(e) => removeImage(e, index)}
                  title="حذف الصورة"
                  className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-background/80 shadow text-muted-foreground opacity-0 group-hover:opacity-100 sm:opacity-0 opacity-100 transition-all hover:bg-destructive hover:text-destructive-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
                {/* Mobile reorder buttons — bottom bar */}
                <div className="absolute bottom-0 inset-x-0 flex items-center justify-between bg-black/50 px-1 py-0.5 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); moveImage(index, "left"); }}
                    disabled={index === 0}
                    className="flex h-6 w-6 items-center justify-center rounded text-white/80 hover:text-white disabled:opacity-20 transition-colors"
                    title="تحريك يساراً"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  {index !== 0 && (
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); moveImage(index, "first"); }}
                      className="flex h-5 w-5 items-center justify-center rounded text-yellow-400 hover:text-yellow-300 transition-colors"
                      title="جعلها الصورة الرئيسية"
                    >
                      <Star className="h-3.5 w-3.5 fill-current" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); moveImage(index, "right"); }}
                    disabled={index === value.length - 1}
                    className="flex h-6 w-6 items-center justify-center rounded text-white/80 hover:text-white disabled:opacity-20 transition-colors"
                    title="تحريك يميناً"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
                {index === 0 && (
                  <span className="absolute top-2 left-2 bg-primary/90 text-primary-foreground text-[10px] px-2 py-0.5 rounded shadow backdrop-blur">
                    الرئيسية
                  </span>
                )}
              </div>
            ))}
            
            {/* Add more button */}
            <div 
              onClick={() => !isUploading && fileInputRef.current?.click()}
              className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-border/60 rounded-md cursor-pointer hover:border-primary/50 hover:bg-card/50 transition-colors"
            >
              {isUploading ? (
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              ) : (
                <Plus className="h-8 w-8 text-muted-foreground/60" />
              )}
            </div>
          </div>
        </>
      )}

      {/* Upload Zone (shown when empty or as main drop zone) */}
      {value.length === 0 && (
        <div
          className={`relative flex min-h-[160px] cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed transition-all duration-200 ${
            isDragging
              ? "scale-[1.01] border-primary bg-primary/10"
              : "border-border/70 bg-card/30 hover:border-primary/50 hover:bg-card/50"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => !isUploading && fileInputRef.current?.click()}
        >
          {isUploading ? (
            <div className="flex flex-col items-center gap-3 text-muted-foreground">
              <Loader2 className="h-9 w-9 animate-spin text-primary" />
              <span className="text-sm">جاري الرفع...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 p-6 text-center text-muted-foreground">
              <UploadCloud className="h-10 w-10 text-muted-foreground/50" />
              <span className="text-sm font-medium">اسحب وأفلت الصور هنا</span>
              <span className="text-xs opacity-70">أو اضغط لاختيار ملفات</span>
            </div>
          )}
        </div>
      )}
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInput}
        accept="image/*"
        multiple
        className="hidden"
      />
    </div>
  );
}
