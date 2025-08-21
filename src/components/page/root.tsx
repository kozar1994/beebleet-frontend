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

export type ElementType = "image" | "text";
export type BlockType = {
  id: string;
  type: ElementType;
};

export default function RootPage() {
  const [bloks, setBlocks] = useState<BlockType[]>([]);

  const bloksIds = bloks.map((it) => it.id);

  const addNewBlokHendler = (type: ElementType) => {
    setBlocks((oldBlocks) => [...oldBlocks, { id: crypto.randomUUID(), type }]);
  };

  const delteBlokHendler = (id: string) => {
    // TODO: нк забуть
    setBlocks((oldBlocks) => oldBlocks.filter((it) => it.id !== id));
  };

  const sectionWithButton = (
    <>
      <Button variant="outline" onClick={() => addNewBlokHendler("image")}>
        <Images className="mr-2 w-6 h-6" /> Картинки
      </Button>
      <Button variant="outline" onClick={() => addNewBlokHendler("text")}>
        <Notebook className="mr-2 w-6 h-6" />
        Текст
      </Button>
    </>
  );

  return (
    <div className="w-full h-screen p-2">
      <div className="container mx-auto py-4">
        <Card>
          <CardHeader>
            <CardTitle>Обери Секцію</CardTitle>
            <CardDescription className="flex gap-2 mt-2">
              {sectionWithButton}
            </CardDescription>
            <Separator className="my-4" />
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {bloks.length === 0 && (
              <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center gap-4 bg-gray-100/50">
                Зараз немає блоків, обири блок який ти хочеш додати вище,
                натиснувши на кнопку юлок ти хочеш додати:
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
