"use client";

import { ImagePlus } from "lucide-react";
import { Button } from "../ui/button";
import { ImageCard } from "./ImageCard";

import { Separator } from "../ui/separator";
import {
  ImageUploadProvider,
  useImageUpload,
} from "./context/ImageUploadContext";

function ImageUploadConteiner() {
  const { images, addEmptyCard } = useImageUpload();

  return (
    <div className="space-y-4">
      {images.length === 0 && (
        <div className="w-full">
          <div className="rounded text-center text-gray-500">
            No cards. Click the <span className="font-bold">Add card</span>
            button to create an empty card.
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {images.map((it) => (
          <ImageCard key={it.id} item={it} />
        ))}
      </div>

      <div>
        <Separator className="my-4  border-dashed" />
        <Button variant="outline" onClick={addEmptyCard}>
          <ImagePlus className="mr-2 w-6 h-6" />
          Add a card for image upload
        </Button>
      </div>

      {/* <pre>{JSON.stringify(images, null, 2)}</pre> */}
    </div>
  );
}

export default function ImageUploadWrapper() {
  return (
    <ImageUploadProvider>
      <ImageUploadConteiner />
    </ImageUploadProvider>
  );
}
