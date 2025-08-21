import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCurrentEditor } from "@tiptap/react";
import { Link } from "lucide-react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {};
export default function LinkButton({}: Props) {
  const { editor } = useCurrentEditor();
  const [url, setUrl] = useState("");
  const [open, setOpen] = useState(false);

  if (!editor) {
    return null;
  }

  const applyLink = () => {
    if (url) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    } else {
      editor.chain().focus().unsetLink().run();
    }
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={editor.isActive("link") ? "secondary" : "outline"}
          size="icon"
          type="button"
        >
          <Link className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Додати посилання</h4>
            <p className="text-sm text-muted-foreground">
              Ввесдить URL для посилання
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="col-span-2 h-8"
                placeholder="https://example.com"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Відмінити
            </Button>
            <Button onClick={applyLink}>Застосивати</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
