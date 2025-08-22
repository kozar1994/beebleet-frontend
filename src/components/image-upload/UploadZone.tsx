"use client";

import React, { useCallback, useState } from "react";
import { readFileAsDataUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ImageItem } from "./types";
import { useImageUpload } from "./context/ImageUploadContext";
import { AlertCircleIcon } from "lucide-react";

export const UploadZone: React.FC<{ item: ImageItem }> = ({ item }) => {
  const { addImageToCard } = useImageUpload();
  const acceptedFormats =
    ".jpg,.jpeg,.png,.webp,.gif,image/jpeg,image/png,image/webp,image/gif";

  const [error, setError] = useState<string | null>(null);
  const onFiles = useCallback(
    async (fileList: FileList | null) => {
      if (!fileList || fileList.length === 0) return;

      const file = fileList[0];
      const acceptedTypes = acceptedFormats.split(",").map((f) => f.trim());

      if (
        !acceptedTypes.some((format) => {
          if (format.startsWith(".")) {
            return file.name.toLowerCase().endsWith(format);
          }
          return file.type === format;
        })
      ) {
        const formatList = acceptedTypes
          .filter((f) => f.startsWith("."))
          .join(", ");
        setError(
          `We don't support this format. Supported formats: ${formatList}`
        );
        return;
      }

      setError(null);
      const dataUrl = await readFileAsDataUrl(file);
      addImageToCard(item.id, dataUrl);
    },
    [item.id, addImageToCard]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      onFiles(e.dataTransfer.files);
    },
    [onFiles]
  );

  return (
    <Card
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
      className="border-dashed border-2 border-muted-foreground/30 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 text-center cursor-pointer transition hover:border-primary"
    >
      <CardContent className="flex flex-col items-center gap-4">
        <p className="text-sm text-muted-foreground">
          Drag and drop an image here or upload it:
        </p>
        <Button asChild>
          <label>
            Upload image
            <input
              type="file"
              accept={acceptedFormats}
              className="hidden"
              onChange={(e) => onFiles(e.target.files)}
            />
          </label>
        </Button>
      </CardContent>
      <CardAction className="flex w-full">
        {error && (
          <Alert variant="destructive" className="items-start">
            <AlertCircleIcon />
            <AlertTitle>Not support format</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardAction>
    </Card>
  );
};
