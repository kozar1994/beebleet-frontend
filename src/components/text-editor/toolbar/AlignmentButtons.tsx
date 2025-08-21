import { Button } from "@/components/ui/button";
import { useCurrentEditor } from "@tiptap/react";
import { AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

export default function AlignmentButtons() {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className="flex gap-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            variant={
              editor.isActive({ textAlign: "left" }) ? "secondary" : "outline"
            }
            size="icon"
            type="button"
          >
            <AlignLeft className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Align left</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            variant={
              editor.isActive({ textAlign: "center" }) ? "secondary" : "outline"
            }
            size="icon"
            type="button"
          >
            <AlignCenter className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Align center</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            variant={
              editor.isActive({ textAlign: "right" }) ? "secondary" : "outline"
            }
            size="icon"
            type="button"
          >
            <AlignRight className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Align right</TooltipContent>
      </Tooltip>
    </div>
  );
}
