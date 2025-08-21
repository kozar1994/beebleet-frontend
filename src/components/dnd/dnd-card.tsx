"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { BlockType } from "../page/root";
import { ReactNode } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { GripVertical, Trash } from "lucide-react";

type Props = {
  item: BlockType;
  children: ReactNode;
  delteBlokHendler: (id: string) => void;
};

export default function DndCard({ item, delteBlokHendler, children }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString({
      x: transform?.x ?? 0,
      y: transform?.y ?? 0,
      scaleX: transform?.scaleX ?? 1,
      scaleY: 1,
    }),
    transition,
    opacity: isDragging ? 0.6 : 1,
    zIndex: isDragging ? 999 : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {/* style={style2} */}
      <Card
        className={`bg-gray-100/50 ${isDragging ? "ring-2 ring-blue-500" : ""}`}
      >
        <CardHeader className="flex justify-between items-center">
          <div
            ref={setActivatorNodeRef}
            {...listeners}
            {...attributes}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 w-8 cursor-grab active:cursor-grabbing"
          >
            <GripVertical className="w-4 h-4" />
          </div>
          <Button
            variant="destructive"
            size="icon"
            className="size-8"
            onClick={() => delteBlokHendler(item.id)}
          >
            <Trash />
          </Button>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
}
