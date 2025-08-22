"use client";

import React, { createContext, useContext, useState } from "react";
import { CroppedAreaPixels, ImageItem } from "../types";

type Context = {
  images: ImageItem[];
  addEmptyCard: () => void;
  addImageToCard: (id: string, dataUrl: string) => void;
  setCroppedImage: (
    id: string,
    dataUrl: string,
    croppedAreaPixels: CroppedAreaPixels
  ) => void;
  removeCard: (id: string) => void;
};

const ImageUploadContext = createContext<Context | undefined>(undefined);

export const ImageUploadProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const defaultImage: ImageItem = {
    id: crypto.randomUUID(),
    imageOrigine: null,
    imageCrop: null,
    croppedAreaPixels: null,
  };
  const [images, setImages] = useState<ImageItem[]>([defaultImage]);

  const addEmptyCard = () => {
    setImages((s) => [...s, { ...defaultImage, id: crypto.randomUUID() }]);
  };

  const addImageToCard = (id: string, dataUrl: string) => {
    setImages((s) =>
      s.map((it) => (it.id === id ? { ...it, imageOrigine: dataUrl } : it))
    );
  };

  const setCroppedImage = (
    id: string,
    dataUrl: string,
    croppedAreaPixels: CroppedAreaPixels
  ) => {
    setImages((s) =>
      s.map((it) =>
        it.id === id ? { ...it, imageCrop: dataUrl, croppedAreaPixels } : it
      )
    );
  };

  const removeCard = (id: string) =>
    setImages((s) => s.filter((it) => it.id !== id));

  return (
    <ImageUploadContext.Provider
      value={{
        images,
        addEmptyCard,
        addImageToCard,
        setCroppedImage,
        removeCard,
      }}
    >
      {children}
    </ImageUploadContext.Provider>
  );
};

export const useImageUpload = (): Context => {
  const ctx = useContext(ImageUploadContext);
  if (!ctx) throw new Error("Викликав не в контексті");
  return ctx;
};
