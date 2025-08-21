"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Images, Notebook } from "lucide-react";
import { Separator } from "../ui/separator";
import ImageUploadWrapper from "../image-upload/ImageUploadWrapper";
import TextEditor from "../text-editor";
import DndProvider from "../dnd/dnd-provider";
import DndCard from "../dnd/dnd-card";
import { Badge } from "../ui/badge";

export type ElementType = "image" | "text";
export type BlockType = {
  id: string;
  type: ElementType;
};

const LIMIT_BLOCK = {
  IMAGE: 3,
  TEXT: 4,
};

export default function RootPage() {
  const [bloks, setBlocks] = useState<BlockType[]>([]);

  const bloksIds = bloks.map((it) => it.id);
  const countImageBlock = bloks.filter((it) => it.type === "image").length;
  const countTextBlock = bloks.filter((it) => it.type === "text").length;

  const addNewBlokHendler = (type: ElementType) => {
    setBlocks((oldBlocks) => [...oldBlocks, { id: crypto.randomUUID(), type }]);
  };

  const delteBlokHendler = (id: string) => {
    // TODO: нк забуть
    setBlocks((oldBlocks) => oldBlocks.filter((it) => it.id !== id));
  };

  const sectionWithButton = (
    <>
      <Button
        disabled={countImageBlock >= LIMIT_BLOCK.IMAGE}
        variant="outline"
        onClick={() => addNewBlokHendler("image")}
      >
        <Images className="mr-2 w-6 h-6" /> Add a new section for images
        <Badge variant="secondary">
          limit: {countImageBlock}/{LIMIT_BLOCK.IMAGE}
        </Badge>
      </Button>
      <Button
        disabled={countTextBlock >= LIMIT_BLOCK.TEXT}
        variant="outline"
        onClick={() => addNewBlokHendler("text")}
      >
        <Notebook className="mr-2 w-6 h-6" />
        Add a new text section
        <Badge variant="secondary">
          limit: {countTextBlock}/{LIMIT_BLOCK.TEXT}
        </Badge>
      </Button>
    </>
  );

  return (
    <div className="w-full h-screen p-2">
      <div className="container mx-auto py-4">
        <Card>
          <CardHeader>
            <CardTitle>What would you like to add?</CardTitle>
            <CardDescription className="flex gap-2 mt-2">
              {sectionWithButton}
            </CardDescription>
            <Separator className="my-4" />
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {bloks.length === 0 && (
              <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center gap-4 bg-gray-100/50">
                Add your first block. Choose a block type from the options
                above.
                <div className="m-auto flex gap-2"> {sectionWithButton}</div>
              </div>
            )}

            <DndProvider
              items={bloksIds}
              setBlocks={setBlocks}
              onDragEnd={(newBlocks) => {
                console.log("setBlocks()", newBlocks);
              }}
            >
              {bloks.map((it) =>
                it.type === "image" ? (
                  <DndCard
                    key={it.id}
                    item={it}
                    delteBlokHendler={delteBlokHendler}
                  >
                    <ImageUploadWrapper />
                  </DndCard>
                ) : (
                  <DndCard
                    key={it.id}
                    item={it}
                    delteBlokHendler={delteBlokHendler}
                  >
                    <TextEditor />
                  </DndCard>
                )
              )}
            </DndProvider>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
