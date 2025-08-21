"use client";

import React, { useCallback } from "react";
import { ImageItem } from "../types";
import { useImageUpload } from "./ImageUploadContext";
import { readFileAsDataUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const UploadZone: React.FC<{ item: ImageItem }> = ({ item }) => {
  const { addImageToCard } = useImageUpload();

  const onFiles = useCallback(
    async (fileList: FileList | null) => {
      if (!fileList || fileList.length === 0) return;
      const file = fileList[0];
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
          Перетягніть зображення сюди або завантажте
        </p>
        <Button asChild>
          <label>
            Завантажити
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => onFiles(e.target.files)}
            />
          </label>
        </Button>
      </CardContent>
    </Card>
  );
};
