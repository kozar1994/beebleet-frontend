import React from "react";
import { ImageItem } from "./types";
import { UploadZone } from "./UploadZone";
import { CropZone } from "./CropZone";

export const ImageCard: React.FC<{ item: ImageItem }> = ({ item }) => {
  return (
    <div className="bg-white p-4 rounded shadow-sm">
      {item.imageOrigine === null ? (
        <UploadZone item={item} />
      ) : (
        <CropZone item={item} />
      )}
    </div>
  );
};
