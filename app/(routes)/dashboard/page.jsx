"use client";
import React from "react";
import CardInfo from "./_components/CardInfo";
import BarChartDashBoard from "./_components/BarChartDashBoard";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { db } from "../../../utils/dbConfig";
import { Budgets, Expenses } from "../../../utils/schema";
import { getTableColumns, sql, eq, desc } from "drizzle-orm";
import BudgetItem from "../dashboard/budgets/_components/BudgetItem";
import { get } from "http";
import ExpenseListTable from "./expenses/_components/ExpenseListTable";
import { date } from "drizzle-orm/mysql-core";

function Dashboard() {
  const { user } = useUser();
  const [budgetList, setBudgetList] = useState([]);

  const [expenseList, setExpenseList] = useState([]);

  useEffect(() => {
    user && getBudgetList();
  }, [user]);

  const getBudgetList = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id));

    setBudgetList(result);
    getAllExpenses();
  };

  const getAllExpenses = async () => {
    const result = await db.select({
      id: Expenses.id,
      name: Expenses.name,
      amount: Expenses.amount,
      createdBy: Expenses.createdBy,
    }).from(Budgets)
    .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
    .where(eq(Budgets.createdBy, user?.primaryEmailAddress.emailAddress))
    .orderBy(desc(Expenses.id));


    setExpenseList(result);
    console.log(result);
  };

  return (
    <div className="p-8 ">
      <h2 className="font-bold text-3xl">Hi! , {user?.firstName}🔥 </h2>
      <p className="text-sm text-gray-500">
        Let's get back to managing your finances
      </p>

      <CardInfo budgetList={budgetList} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-4">
        <div className="md:col-span-2">
          <BarChartDashBoard budgetList={budgetList} />

          <h2 className="text-2xl font-bold mt-5">Latest Expenses</h2>
          <ExpenseListTable
            expenseList={expenseList}
            refreshData={() => getBudgetList()}
          />
        </div>
        <div className="grid grid-cols-1 gap-5">
          <h2 className="text-2xl font-bold">Latest Budgets</h2>
          {budgetList.map((budget, index) => (
            <BudgetItem key={index} budget={budget} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
