"use client";

import React, { useCallback, useEffect, useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import { ImageItem } from "./types";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card, CardAction } from "@/components/ui/card";
import { Pencil, Save, Trash2 } from "lucide-react";
import Image from "next/image";
import { useImageUpload } from "./context/ImageUploadContext";
import { createCroppedImage } from "@/lib/utils";

export const CropZone: React.FC<{ item: ImageItem }> = ({ item }) => {
  const { setCroppedImage, removeCard } = useImageUpload();
  const [zoom, setZoom] = useState(1);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [aspect, setAspect] = useState(4 / 3);
  const [isEditMode, setIsEditMode] = useState(item.imageCrop ? false : true);

  const viewImage = item.imageCrop ? item.imageCrop! : item.imageOrigine!;

  const onCropComplete = useCallback((_: Area, pixels: Area) => {
    setCroppedAreaPixels(pixels);
  }, []);

  const onSave = useCallback(async () => {
    if (!croppedAreaPixels || !item.imageOrigine) return;

    const croppedImage = await createCroppedImage(
      item.imageOrigine,
      croppedAreaPixels
    );
    setCroppedImage(item.id, croppedImage, croppedAreaPixels);
    setIsEditMode(false);
  }, [croppedAreaPixels, item, setCroppedImage]);

  return (
    <>
      <Card className="w-full h-72 relative overflow-hidden bg-muted/90 rounded-2xl">
        {!isEditMode && item.imageCrop ? (
          <div className="h-full w-full flex items-center justify-center p-2">
            {viewImage.startsWith("data:image") ? (
              <img
                src={viewImage}
                alt="cropped"
                className="max-h-full max-w-full rounded-md shadow"
              />
            ) : (
              <Image
                src={viewImage}
                alt="cropped"
                width={500}
                height={500}
                className="max-h-full max-w-full rounded-md shadow"
              />
            )}
            {!isEditMode && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditMode(true)}
                className="absolute top-3 right-3"
              >
                <Pencil className="w-4 h-4 mr-0 md:mr-1" />{" "}
                <span className="hidden md:inline">Edit</span>
              </Button>
            )}
          </div>
        ) : (
          <>
            <div className="absolute inset-0">
              <Cropper
                image={item.imageOrigine!}
                crop={crop}
                zoom={zoom}
                aspect={aspect}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => removeCard(item.id)}
              className="absolute top-3 right-3"
            >
              <Trash2 className="w-4 h-4 mr-0 md:mr-1" />
              <span className="hidden md:inline">Remove</span>
            </Button>

            <div className="absolute left-3 bottom-3 right-3 flex items-center justify-between gap-3 bg-background/60 backdrop-blur-sm p-2 rounded-lg shadow">
              <div className="w-40">
                <Slider
                  value={[zoom]}
                  min={1}
                  max={3}
                  step={0.01}
                  onValueChange={(val: number[]) => setZoom(val[0])}
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
                  <span className="hidden md:inline">Save</span>
                </Button>

                <Button
                  size="sm"
                  variant="default"
                  onClick={() => setIsEditMode(false)}
                >
                  <Save className="w-4 h-4 mr-0 md:mr-1" />
                  <span className="hidden md:inline">Cancel</span>
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>

      {isEditMode && (
        <div className="flex justify-center gap-2 p-2">
          <Button
            variant={aspect === 1 ? "default" : "outline"}
            size="sm"
            onClick={() => setAspect(1)}
          >
            1:1
          </Button>
          <Button
            variant={aspect === 4 / 3 ? "default" : "outline"}
            size="sm"
            onClick={() => setAspect(4 / 3)}
          >
            4:3
          </Button>
          <Button
            variant={aspect === 16 / 9 ? "default" : "outline"}
            size="sm"
            onClick={() => setAspect(16 / 9)}
          >
            16:9
          </Button>
          <Button
            variant={aspect === 2 / 3 ? "default" : "outline"}
            size="sm"
            onClick={() => setAspect(2 / 3)}
          >
            2:3
          </Button>
        </div>
      )}
    </>
  );
};
