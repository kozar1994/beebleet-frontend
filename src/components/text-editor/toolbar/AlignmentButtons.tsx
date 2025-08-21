import { Button } from "@/components/ui/button";
import { useCurrentEditor } from "@tiptap/react";
import { AlignLeft, AlignCenter, AlignRight } from "lucide-react";

type Props = {};
export default function AlignmentButtons({}: Props) {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className="flex gap-2">
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
    </div>
  );
}
