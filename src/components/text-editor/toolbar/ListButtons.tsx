"use client";

import { Button } from "@/components/ui/button";
import { useCurrentEditor } from "@tiptap/react";
import { List, ListOrdered, ListTodo } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const ListButtons: React.FC = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className="flex items-center gap-1">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={editor.isActive("bulletList") ? "ghost" : "outline"}
            size="icon"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            aria-label="Bullet list"
          >
            <List className="w-4 h-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Bullet List</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={editor.isActive("orderedList") ? "ghost" : "outline"}
            size="icon"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            aria-label="Ordered list"
          >
            <ListOrdered className="w-4 h-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Ordered List</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={editor.isActive("taskList") ? "ghost" : "outline"}
            size="icon"
            onClick={() => editor.chain().focus().toggleTaskList().run()}
            aria-label="Task list"
          >
            <ListTodo className="w-4 h-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Task List</TooltipContent>
      </Tooltip>
    </div>
  );
};
