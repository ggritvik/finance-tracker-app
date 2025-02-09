import { PiggyBank, Wallet, ReceiptText } from 'lucide-react'
import React, { useEffect, useState } from 'react'


function CardInfo({budgetList}) {

    const [totalbudget, setTotalBudget] = useState()
    const [totalSpend, setTotalSpend] = useState()


    useEffect(() => {
        budgetList&&CalculateCardInfo()
    },[budgetList])
    const CalculateCardInfo = () => {
        console.log(budgetList)

        let totalBudget = 0;
        let totalSpend = 0;

        budgetList.forEach((budget) => {
            totalBudget += Number(budget.amount);
            totalSpend += budget.totalSpend;
        })
        console.log(totalBudget, totalSpend)
        setTotalBudget(totalBudget);
        setTotalSpend(totalSpend);

    }


  return (
    <div className='mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
      <div className='p-7 border rounded-lg flex justify-between'>
        <div>
            <h2 className='text-sm text-gray-600'>Total Budget</h2>
            <h2 className='font-bold text-2xl'> ${totalbudget}</h2>
        </div>
        <PiggyBank size={50} />
      </div>

      <div className='p-7 border rounded-lg flex justify-between'>
        <div>
            <h2 className='text-sm text-gray-600'>Total Spent</h2>
            <h2 className='font-bold text-2xl'> ${totalSpend} </h2>
        </div>
         <Wallet size={50} />
      </div>

      <div className='p-7 border rounded-lg flex justify-between'>
        <div>
            <h2 className='text-sm text-gray-600'>No. of Budgets</h2>
            <h2 className='font-bold text-2xl'> {budgetList?.length} </h2>
        </div>
        <ReceiptText size={50} />
      </div>


    </div>
  )
}

export default CardInfo
