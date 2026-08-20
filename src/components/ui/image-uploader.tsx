import React, { useState, useCallback, useRef } from "react";
import { Loader2, UploadCloud, X } from "lucide-react";
import { toast } from "sonner";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
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

export function ImageUploader({ value, onChange, className = "" }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    if (e.dataTransfer.files?.[0]) {
      handleUpload(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      handleUpload(e.target.files[0]);
    }
  };

  const handleUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("يرجى اختيار صورة صالحة");
      return;
    }
    setIsUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      onChange(url);
      toast.success("تم رفع الصورة بنجاح ✓");
    } catch (err: any) {
      toast.error(err.message || "حدث خطأ أثناء رفع الصورة");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const removeImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
  };

  return (
    <div
      className={`relative flex min-h-[160px] cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed transition-all duration-200 ${
        isDragging
          ? "scale-[1.01] border-primary bg-primary/10"
          : value
            ? "border-border/40 bg-transparent"
            : "border-border/70 bg-card/30 hover:border-primary/50 hover:bg-card/50"
      } ${className}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={() => !value && !isUploading && fileInputRef.current?.click()}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInput}
        accept="image/*"
        className="hidden"
      />

      {isUploading ? (
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <Loader2 className="h-9 w-9 animate-spin text-primary" />
          <span className="text-sm">جاري الرفع...</span>
        </div>
      ) : value ? (
        <div className="relative flex h-full w-full items-center justify-center p-2">
          <img
            src={value}
            alt="Preview"
            className="max-h-[200px] rounded object-contain shadow-sm"
          />
          <button
            type="button"
            onClick={removeImage}
            title="حذف الصورة"
            className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-background/90 shadow transition-colors hover:bg-destructive hover:text-destructive-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 p-6 text-center text-muted-foreground">
          <UploadCloud className="h-10 w-10 text-muted-foreground/50" />
          <span className="text-sm font-medium">اسحب وأفلت الصورة هنا</span>
          <span className="text-xs opacity-70">أو اضغط لاختيار ملف</span>
        </div>
      )}
    </div>
  );
}
