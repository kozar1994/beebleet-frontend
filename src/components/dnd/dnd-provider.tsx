// DndProvider.tsx
"use client";

import { ReactNode, Dispatch, SetStateAction } from "react";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
  useDroppable,
  TouchSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

type OnDragEndCallback = (newItems: { id: string; type?: string }[]) => void;

type Props = {
  items: string[]; // Для DND передай завжди id(простий маси). Не працює коли обєкти з ID передаю
  children: ReactNode;
  setBlocks: Dispatch<SetStateAction<{ id: string; type: any }[]>>;
  onDragEnd?: OnDragEndCallback;
  containerId?: string;
};

export default function DndProvider({
  items,
  children,
  setBlocks,
  onDragEnd,
  containerId = "blocks-container",
}: Props) {
  const blocks = items;

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 150, tolerance: 5 },
    })
  );

  // реф для droppable-контейнера
  const { setNodeRef: setContainerNodeRef } = useDroppable({ id: containerId });

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    // Якщо немає "over" — кидок поза дроп-зоною → нічого не міняємо
    if (!over) {
      document.body.style.cursor = "";
      return;
    }

    setBlocks((blocksState) => {
      const oldIndex = blocksState.findIndex((b) => b.id === active.id);

      // якщо кинуто саме на контейнер — кладемо в кінець
      const newIndex =
        over.id === containerId
          ? blocksState.length - 1
          : blocksState.findIndex((b) => b.id === over.id);

      // якщо індекси не валідні або нічого не змінилось — повертаємо старий стан
      if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) {
        document.body.style.cursor = "";
        return blocksState;
      }

      const newBlocks = arrayMove(blocksState, oldIndex, newIndex);

      if (onDragEnd) onDragEnd(newBlocks);
      document.body.style.cursor = "";
      return newBlocks;
    });
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={() => (document.body.style.cursor = "grabbing")}
      onDragCancel={() => (document.body.style.cursor = "")}
    >
      <div
        ref={setContainerNodeRef}
        data-droppable-id={containerId}
        className="flex flex-col gap-4"
      >
        <SortableContext items={blocks} strategy={verticalListSortingStrategy}>
          {children}
        </SortableContext>
      </div>
    </DndContext>
  );
}
