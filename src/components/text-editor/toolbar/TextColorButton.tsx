import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCurrentEditor } from "@tiptap/react";
import { Palette } from "lucide-react";
import { useState, useEffect } from "react";
//TODO: react-colorful давно не обнолвлялась треба ошукати заміну
import { HexColorPicker } from "react-colorful";

type Props = {};
export default function TextColorButton({}: Props) {
  const { editor } = useCurrentEditor();
  const [color, setColor] = useState("#000000");
  const [open, setOpen] = useState(false);

  if (!editor) {
    return null;
  }

  const currentColor = editor.getAttributes("textStyle")?.color || "#000000";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={
            editor.isActive("textStyle", { color }) ? "secondary" : "outline"
          }
          size="icon"
          type="button"
        >
          <Palette className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2">
        <HexColorPicker
          color={currentColor}
          onChange={(newColor) => {
            setColor(newColor);
            editor.chain().focus().setColor(newColor).run();
          }}
        />
        <Button
          className="mt-2 w-full"
          onClick={() => {
            editor.chain().focus().unsetColor().run();
            setOpen(false);
          }}
        >
          Відмінити
        </Button>
      </PopoverContent>
    </Popover>
  );
}
