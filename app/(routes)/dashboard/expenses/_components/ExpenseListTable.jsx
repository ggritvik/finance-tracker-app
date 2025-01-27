import { Trash } from "lucide-react";
import React from "react";
import { db } from "../../../../../utils/dbConfig";
import { eq } from "drizzle-orm";
import { toast } from "sonner";
import { Expenses } from "../../../../../utils/schema";

function ExpenseListTable({ expenseList, refreshData }) {
  const deleteExpense = async (expense) => {
    const result = await db
      .delete(Expenses)
      .where(eq(Expenses.id, expense.id))
      .returning({ InsertedId: Expenses.id });

    if (result) {
      refreshData();
      toast("Expense Deleted Successfully !");

    }
  };

  return (
    <div className="mt-3">
      {/* Expense List Table Header */}

      <div className="grid grid-cols-4 bg-slate-200 p-3 border rounded-sm font-bold ">
        <h2>Name</h2>
        <h2>Amount</h2>
        <h2>Date</h2>
        <h2>Action</h2>
      </div>

      {/* Expense List entries */}

      <div className="mt-3">
        {expenseList.map((expenses, index) => (
          <div
            key={index}
            className="grid grid-cols-4 bg-slate-50 p-3 border rounded-sm "
          >
            <h2>{expenses.name}</h2>
            <h2>${expenses.amount}</h2>
            <h2>{expenses.createdBy}</h2>
            <h2>
              <Trash
                className="text-red-500 cursor-pointer"
                onClick={() => deleteExpense(expenses)}
              />
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExpenseListTable;
