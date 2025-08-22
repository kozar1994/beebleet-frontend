import React from "react";
import { ImageItem } from "./types";
import { UploadZone } from "./UploadZone";
import { CropZone } from "./CropZone";
import { useSortable } from "@dnd-kit/react/sortable";
import { Button } from "../ui/button";
import { Grip } from "lucide-react";

type Props = {
  index: number;
  item: ImageItem;
};
export const ImageCard: React.FC<Props> = ({ item, index }) => {
  const { ref, handleRef } = useSortable({ id: item.id, index: index });

  return (
    <div ref={ref} className="bg-white p-4 rounded shadow-sm">
      <Button
        ref={handleRef}
        variant="secondary"
        size="icon"
        className="size-8 mb-2"
      >
        <Grip />
      </Button>
      {item.imageOrigine === null ? (
        <UploadZone item={item} />
      ) : (
        <CropZone item={item} />
      )}
    </div>
  );
};
