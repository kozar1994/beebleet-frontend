import { Button } from "@/components/ui/button";
import { useCurrentEditor } from "@tiptap/react";
import { Bold, Italic, Underline } from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

export default function FormatButtons() {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className="flex gap-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => editor.chain().focus().toggleBold().run()}
            variant={editor.isActive("bold") ? "secondary" : "outline"}
            size="icon"
            type="button"
          >
            <Bold className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Bold (Ctrl+B)</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            variant={editor.isActive("italic") ? "secondary" : "outline"}
            size="icon"
            type="button"
          >
            <Italic className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Italic (Ctrl+I)</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            variant={editor.isActive("underline") ? "secondary" : "outline"}
            size="icon"
            type="button"
          >
            <Underline className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Underline (Ctrl+U)</TooltipContent>
      </Tooltip>
    </div>
  );
}
