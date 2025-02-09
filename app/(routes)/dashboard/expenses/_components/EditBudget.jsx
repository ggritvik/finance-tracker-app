"use client";
import React from "react";
import { Button } from "../../../../../components/ui/button";
import { PenBox } from "lucide-react";
import { Input } from "../../../../../components/ui/input";
import EmojiPicker from "emoji-picker-react";
import { useState, useEffect } from "react";
import { db } from "../../../../../utils/dbConfig";
import { Budgets } from "../../../../../utils/schema";
import { eq } from "drizzle-orm";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "../../../../../components/ui/dialog";

function EditBudget({ budgetInfo, refreshData}) {
  const [emojiIcon, setEmojiIcon] = useState(budgetInfo?.icon);
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

  const [name, setName] = useState();
  const [amount, setAmount] = useState();

  useEffect(() => {
    if (budgetInfo) {
      setEmojiIcon(budgetInfo?.icon);
      setAmount(budgetInfo.amount);
      setName(budgetInfo.name);
    }
  }, [budgetInfo]);

  const onUpdateBudget = async () => {
    const result = await db
      .update(Budgets)
      .set({ name: name, amount: amount, icon: emojiIcon })
      .where(eq(Budgets.id, budgetInfo?.id))
      .returning();

    if (result) {
      refreshData()
      toast("Budget Updated Successfully");

    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex gap-2">
            <PenBox />
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Budget</DialogTitle>
            <DialogDescription>
              <div className="mt-5">
                <Button
                  variant="outline"
                  className="text-2xl"
                  onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                >
                  {emojiIcon}
                </Button>
                <div>
                  <EmojiPicker
                    open={openEmojiPicker}
                    onEmojiClick={(e) => {
                      setEmojiIcon(e.emoji);
                      setOpenEmojiPicker(false);
                    }}
                  />
                </div>
                <div className="mt-3">
                  <h2 className="text-black font-medium my-1">Buget Name</h2>
                  <Input
                    type="text"
                    placeholder="e.g. Home Decor"
                    defaultValue={budgetInfo?.name}
                    onChange={(e) => setName(e.target.value)}
                  />

                  <h2 className="text-black font-medium my-1">Buget Amount</h2>
                  <Input
                    type="number"
                    placeholder="e.g. 5000 $"
                    defaultValue={budgetInfo?.amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                disabled={name && amount ? false : true}
                onClick={() => onUpdateBudget()}
                className="mt-2 w-full"
              >
                Update Budget
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditBudget;
