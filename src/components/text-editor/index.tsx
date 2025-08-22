"use client";

import { EditorContent, EditorContext, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Link from "@tiptap/extension-link";
import FontSize from "@tiptap/extension-font-size";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import { Toolbar } from "./toolbar/Toolbar";
import "./styles.scss";

export default function TextEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TextStyle,
      Color,
      FontSize,
      Link.configure({
        openOnClick: false,
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
    ],
    content: "<p>Hello World! 🌎️</p>",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "break-all border-input focus-visible:ring-ring placeholder:text-muted-foreground min-h-[110px] w-full rounded-md border bg-transparent px-3 pt-2 pb-7 text-base focus-visible:ring-2 focus-visible:outline-none bg-white/50 [&_a]:text-blue-600 [&_a]:underline",
      },
    },
  });

  return (
    <div className="flex w-full flex-col gap-4">
      <EditorContext.Provider value={{ editor: editor }}>
        <Toolbar />
        <EditorContent
          editor={editor}
          className="ProseMirror prose prose-sm max-w-none"
        />
      </EditorContext.Provider>
    </div>
  );
}
