"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import UndoRedoBottons from "./UndoRedoBottons";
import FormatButtons from "./FormatButtons";
import FontSizeSelect from "./FontSizeSelect";
import TextColorButton from "./TextColorButton";
import AlignmentButtons from "./AlignmentButtons";
import LinkButton from "./LinkButton";
import { useCurrentEditor } from "@tiptap/react";

export const Toolbar: React.FC = () => {
  const [_, forceUpdate] = useState({});

  const { editor } = useCurrentEditor();

  useEffect(() => {
    if (!editor) return;

    const updateState = () => forceUpdate({});

    editor.on("transaction", updateState);
    return () => {
      editor.off("transaction", updateState);
    };
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div
      role="toolbar"
      aria-label="Editor toolbar"
      className="border-dashed border-2 border-muted-foreground/30 rounded-md p-2 md:p-1 flex items-center gap-2
                 overflow-x-auto md:overflow-visible whitespace-nowrap"
      // style={{ WebkitOverflowScrolling: "touch" }}
    >
      <UndoRedoBottons />
      <Separator orientation="vertical" className="h-6 bg-gray-300 w-px" />
      <FormatButtons />
      <Separator orientation="vertical" className="h-6 bg-gray-300 w-px" />

      <FontSizeSelect />
      <Separator orientation="vertical" className="h-6 bg-gray-300 w-px" />

      <TextColorButton />
      <Separator orientation="vertical" className="h-6 bg-gray-300 w-px" />

      <AlignmentButtons />
      <Separator orientation="vertical" className="h-6 bg-gray-300 w-px" />

      <LinkButton />
    </div>
  );
};
