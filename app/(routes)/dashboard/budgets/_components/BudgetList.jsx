"use client"
import React from 'react'
import CreateBudget from './CreateBudget'
import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { db } from '../../../../../utils/dbConfig'
import { Budgets, Expenses } from '../../../../../utils/schema'
import { getTableColumns, sql, eq, desc} from 'drizzle-orm'
import BudgetItem from './BudgetItem'



function BudgetList() {

  const[budgetList, setBudgetList] = useState([]);

  const {user} = useUser();

  useEffect(() => {
    user&&getBudgetList()
  },[user])

  const getBudgetList = async() => {
    const result = await db.select({
      ...getTableColumns(Budgets),
      totalSpend: sql `sum(${Expenses.amount})`.mapWith(Number),
      totalItem: sql `count(${Expenses.id})`.mapWith(Number)
    }).from (Budgets)
    .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
    .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
    .groupBy(Budgets.id)
    .orderBy(desc(Budgets.id));
    setBudgetList(result);
  }

  return (
    <div className='mt-5'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            <CreateBudget
            refreshData={() => getBudgetList()}
            />
            {budgetList?.length>0 ?budgetList.map((budget , index)=>(
              <BudgetItem key={index} budget={budget} />
            ))
            :[1,2,3,4,5].map((item,index)=>(
              <div key = {index} className='w-full bg-slate-200 rounded-lg h-[150px] animate-pulse'>
              </div>
            ))}
        </div>
      
    </div>
  )
}

export default BudgetList
