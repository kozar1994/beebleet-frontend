import { Button } from "@/components/ui/button";
import { useCurrentEditor } from "@tiptap/react";
import { Bold, Italic, Underline } from "lucide-react";

type Props = {};
export default function FormatButtons({}: Props) {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className="flex gap-2">
      <Button
        onClick={() => editor.chain().focus().toggleBold().run()}
        variant={editor.isActive("bold") ? "secondary" : "outline"}
        size="icon"
        type="button"
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        variant={editor.isActive("italic") ? "secondary" : "outline"}
        size="icon"
        type="button"
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        variant={editor.isActive("underline") ? "secondary" : "outline"}
        size="icon"
        type="button"
      >
        <Underline className="h-4 w-4" />
      </Button>
    </div>
  );
}
