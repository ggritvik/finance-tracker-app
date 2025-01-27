import React from "react";
import { Input } from "../../../../../components/ui/input";
import { useState } from "react";
import { Button } from "../../../../../components/ui/button";
import { db } from "../../../../../utils/dbConfig";
import { toast } from "sonner";
import { Expenses, Budgets } from "../../../../../utils/schema";
import moment from "moment";

function AddExpense({ budgetId, user, refreshData }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const addNewExpense = async () => {
    const result = await db
      .insert(Expenses)
      .values({
        name: name,
        amount: amount,
        budgetId: budgetId,
        createdBy: moment().format("DD-MM-YYYY"),
        //user?.primaryEmailAddress?.emailAddress,
      })
      .returning({ InsertedId: Budgets.id });
      
      if (result) {
        refreshData();
        toast("Expense Added Successfully");
    }
  };

  return (
    <div className="border rounded-lg p-5">
      <h2 className="text-lg font-bold">Add Expense</h2>
      <div className="mt-3">
        <h2 className="text-black font-medium my-1">Expense Name</h2>
        <Input
          type="text"
          placeholder="e.g. Bedroom Decor"
          onChange={(e) => setName(e.target.value)}
        />
        <h2 className="text-black font-medium my-1">Expense Amount</h2>
        <Input
          type="number"
          placeholder="e.g. 5000 $"
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <Button
        disabled={!(name && amount)}
        onClick={() => {
          addNewExpense();
        }}
        className="mt-3 w-full"
      >
        Add Expense
      </Button>
    </div>
  );
}

export default AddExpense;
