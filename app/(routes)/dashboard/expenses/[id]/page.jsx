"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "../../../../../utils/dbConfig";
import { Budgets, Expenses } from "../../../../../utils/schema";
import { getTableColumns, sql, eq, desc } from "drizzle-orm";
import BudgetItem from "../../budgets/_components/BudgetItem";
import AddExpense from "../_components/AddExpense";
import EditBudget from "../_components/EditBudget";
import ExpenseListTable from "../_components/ExpenseListTable";
import { Button } from "../../../../../components/ui/button";
import { PenBox, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../../../components/ui/alert-dialog";
import { toast } from "sonner";

function ExpenseScreen({ params }) {
  //const {budgetId} = await params;
  const { id } = React.use(params);

  const { user } = useUser();
  const [budgetInfo, setBudgetInfo] = useState([]);
  const [expenseList, setExpenseList] = useState([]);

  const router = useRouter();

  useEffect(() => {
    user && getBudgetInfo();
    getExpenseList();
  }, [user]);

  const getBudgetInfo = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .where(eq(Budgets.id, id))
      .groupBy(Budgets.id);

    setBudgetInfo(result[0]);
    getExpenseList();
  };

  const deleteBudget = async (id) => {
    const Expensedeleteresult = await db
      .delete(Expenses)
      .where(eq(Expenses.budgetId, id))
      .returning({ InsertedId: Expenses.id });

    if (Expensedeleteresult) {
      const result = await db
        .delete(Budgets)
        .where(eq(Budgets.id, id))
        .returning({ InsertedId: Budgets.id });
    }
    toast("Budget Deleted Successfully !");
    router.replace("/dashboard/budgets");
  };

  const getExpenseList = async () => {
    const result = await db
      .select()
      .from(Expenses)
      .where(eq(Expenses.budgetId, id))
      .orderBy(desc(Expenses.id));

    setExpenseList(result);
  };

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold flex justify-between items-center ">
        My Expenses
        <span>
          <div className="flex gap-2 items-center">
            <EditBudget
              budgetInfo={budgetInfo}
              refreshData={()=>getBudgetInfo()}
            />

            <AlertDialog>
              <AlertDialogTrigger>
                <Button className="flex gap-2" variant="destructive">
                  <Trash /> Delete{" "}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your Budget and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      deleteBudget(id);
                    }}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
        {budgetInfo ? (
          <BudgetItem budget={budgetInfo} />
        ) : (
          <div className=" h-[150px] w-full bg-slate-200 rounded-lg animate-pulse"></div>
        )}
        <AddExpense
          budgetId={id}
          user={user}
          refreshData={() => getBudgetInfo()}
        />
      </div>

      <div className="mt-5">
        <h2 className="text-xl font-bold">Expense List</h2>
        <ExpenseListTable
          expenseList={expenseList}
          refreshData={() => getBudgetInfo()}
        />
      </div>
    </div>
  );
}

export default ExpenseScreen;
