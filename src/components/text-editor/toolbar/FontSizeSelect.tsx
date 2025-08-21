import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCurrentEditor } from "@tiptap/react";
import { ArrowDown } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

const FONT_SIZES = [
  { label: "12px", value: "12px" },
  { label: "16px", value: "16px" },
  { label: "20px", value: "20px" },
  { label: "24px", value: "24px" },
  { label: "28px", value: "28px" },
  { label: "32px", value: "32px" },
];

const DEFAULT_SIZE = "16px";

export default function FontSizeSelect() {
  const { editor } = useCurrentEditor();
  const [currentSize, setCurrentSize] = useState(DEFAULT_SIZE);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!editor) return;

    const updateState = () => {
      const size = editor.getAttributes("textStyle")?.fontSize || DEFAULT_SIZE;
      setCurrentSize(size);
    };

    editor.on("transaction", updateState);
    return () => {
      editor.off("transaction", updateState);
    };
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1">
              {FONT_SIZES.find((size) => size.value === currentSize)?.label ||
                "Font size"}
              <ArrowDown className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>
        <TooltipContent>Font size</TooltipContent>
      </Tooltip>
      <PopoverContent className="w-auto p-1">
        <div className="flex flex-col">
          {FONT_SIZES.map((size) => (
            <Button
              key={size.value}
              variant={currentSize === size.value ? "secondary" : "ghost"}
              className="justify-start"
              onClick={() => {
                editor.chain().focus().setFontSize(size.value).run();
                setOpen(false);
              }}
            >
              {size.label}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
