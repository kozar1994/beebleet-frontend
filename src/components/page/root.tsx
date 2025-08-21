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

export type ElementType = "image" | "text";
export type BlockType = {
  id: string;
  type: ElementType;
};

export default function RootPage() {
  const [bloks, setBlocks] = useState<BlockType[]>([]);

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
    <div className="w-full h-screen bg-gray-100">
      <div className="container mx-auto py-4">
        <Card>
          <CardHeader>
            <CardTitle>Обери Секцію</CardTitle>
            <CardDescription className="flex gap-2 mt-2">
              {sectionWithButton}
            </CardDescription>
            <Separator className="my-4" />
          </CardHeader>
          <CardContent>
            {bloks.length === 0 && (
              <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center gap-4 bg-gray-100/50">
                Зараз немає блоків, обири блок який ти хочеш додати вище,
                натиснувши на кнопку юлок ти хочеш додати:
                <div className="m-auto flex gap-2"> {sectionWithButton}</div>
              </div>
            )}

            {bloks.map((it) => (
              <div key={it.id}>
                {it.type === "image" && <div>Картинка</div>}
                {it.type === "text" && <div>Текст</div>}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
