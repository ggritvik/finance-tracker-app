"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "../../../../../utils/dbConfig";
import { Budgets, Expenses } from "../../../../../utils/schema";
import { getTableColumns, sql, eq, desc } from "drizzle-orm";
import BudgetItem from "../../budgets/_components/BudgetItem";
import AddExpense from "../_components/AddExpense";
import ExpenseListTable from "../_components/ExpenseListTable";
import { get } from "http";

function ExpenseScreen({ params }) {
  //const {budgetId} = await params;
  const { id } = React.use(params);

  const { user } = useUser();
  const [budgetInfo, setBudgetInfo] = useState([]);
  const [expenseList, setExpenseList] = useState([]);

  useEffect(() => {
    user && getBudgetInfo();
    getExpenseList();
  }, [user]);

  // useEffect(() => {
  //   getExpenseList();
  // }, []);

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
      <h2 className="text-3xl font-bold">My Expenses</h2>

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
