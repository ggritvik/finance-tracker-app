"use client"
import React from 'react'
import EmojiPicker from 'emoji-picker-react';
import { Button } from '../../../../../components/ui/button';
import { useState } from 'react';
import { Input } from '../../../../../components/ui/input';
import { Budgets } from '../../../../../utils/schema';
import { useUser } from '@clerk/nextjs';

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogClose,
    DialogTrigger,
  } from '../../../../../components/ui/dialog';

import { db } from '../../../../../utils/dbConfig';
//import { toast, useToast } from '../../../../../components/hooks/use-toast';

import { toast } from "sonner"



function CreateBudget({refreshData}) {

  const [emojiIcon, setEmojiIcon] = useState("😀");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

  const[name, setName] = useState();
  const[amount, setAmount] = useState();

  const {user} = useUser()

  //const { toast } = useToast();
  const onCreateBudget = async() => {
    const result = await db.insert(Budgets)
    .values({
      name: name,
      amount: amount,
      createdBy:user?.primaryEmailAddress?.emailAddress,
      icon: emojiIcon
    }).returning({InsertedId:Budgets.id})

    if (result) {
      refreshData();
      toast("Budget Created Successfully")}
  }


  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
        <div className='bg-slate-50 p-10 rounded-md items-center flex flex-col border-dashed border-2 cursor-pointer hover:shadow-md'>
          <h2 className='text-4xl'>+</h2>
          <h2 className='text-2xl font-bold'>Create New Budget</h2>
      </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Budget</DialogTitle>
            <DialogDescription>
              <div className='mt-5'>
                <Button variant="outline"
                  className="text-2xl"
                  onClick={() => setOpenEmojiPicker(!openEmojiPicker)}>{emojiIcon}</Button>
                <div>
                  <EmojiPicker 
                  open={openEmojiPicker}
                  onEmojiClick={(e) => {
                    setEmojiIcon(e.emoji)
                    setOpenEmojiPicker(false)}}/>
                </div>
                <div className='mt-3'>

                  <h2 className='text-black font-medium my-1'>Buget Name</h2>
                  <Input 
                  type="text"
                  placeholder="e.g. Home Decor" 
                  onChange={(e) => setName(e.target.value)}/>
                  
                  <h2 className='text-black font-medium my-1'>Buget Amount</h2>
                  <Input 
                  type="number"
                  placeholder="e.g. 5000 $" 
                  onChange={(e) => setAmount(e.target.value)}/>
                </div>

                    

              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
          <Button 
                      disabled={name && amount ? false : true}
                      onClick={() => onCreateBudget()}
                      className='mt-2 w-full'>Create Budget</Button>
          </DialogClose>
        </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CreateBudget
