import { Button } from "@/components/ui/button";
import { useCurrentEditor } from "@tiptap/react";
import { Redo, Undo } from "lucide-react";
import { useState, useEffect } from "react";

type Props = {};
export default function UndoRedoBottons({}: Props) {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="icon"
        className="size-8"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        type="button"
      >
        <Undo />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="size-8"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        type="button"
      >
        <Redo />
      </Button>
    </div>
  );
}
