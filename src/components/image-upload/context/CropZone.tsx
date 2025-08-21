"use client";

import React, { useCallback, useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import { ImageItem } from "../types";
import { useImageUpload } from "./ImageUploadContext";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { Save, Trash2 } from "lucide-react";

export const CropZone: React.FC<{ item: ImageItem }> = ({ item }) => {
  const { setCroppedImage, removeCard } = useImageUpload();
  const [zoom, setZoom] = useState(1);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = useCallback((_: Area, pixels: Area) => {
    setCroppedAreaPixels(pixels);
  }, []);

  const onSave = useCallback(async () => {
    if (!croppedAreaPixels || !item.imageOrigine) return;
    // TODO: треба придумати якись статус коли зберігаю, щоб показувати що картинка обрізалась, і збереглась нормально
  }, [croppedAreaPixels, item, setCroppedImage]);

  return (
    <Card className="w-full h-72 relative overflow-hidden bg-muted/90 rounded-2xl">
      {item.imageCrop ? (
        <div className="h-full w-full flex items-center justify-center p-2">
          <img
            src={item.imageCrop}
            alt="cropped"
            className="max-h-full max-w-full rounded-md shadow"
          />
        </div>
      ) : (
        <>
          <div className="absolute inset-0">
            <Cropper
              image={item.imageOrigine!}
              crop={crop}
              zoom={zoom}
              aspect={4 / 3}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>

          <div className="absolute left-3 bottom-3 right-3 flex items-center justify-between gap-3 bg-background/60 backdrop-blur-sm p-2 rounded-lg shadow">
            <div className="w-40">
              <Slider
                value={[zoom]}
                min={1}
                max={3}
                step={0.01}
                onValueChange={(val: any) => setZoom(val[0])}
              />
            </div>

            <div className="flex gap-2">
              <Button
                size="sm"
                variant="default"
                className="bg-green-600 hover:bg-green-700"
                onClick={onSave}
              >
                <Save className="w-4 h-4 mr-0 md:mr-1" />
                <span className="hidden md:inline">Зберегти</span>
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => removeCard(item.id)}
              >
                <Trash2 className="w-4 h-4 mr-0 md:mr-1" />
                <span className="hidden md:inline">Зберегти</span>
              </Button>
            </div>
          </div>
        </>
      )}
    </Card>
  );
};
