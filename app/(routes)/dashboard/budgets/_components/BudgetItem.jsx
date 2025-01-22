import React from 'react'


function BudgetItem({budget}) {
  return (
    <div className='p-5 border rounded-lg flex flex-col justify-between 
      hover:shadow-md hover:cursor-pointer'>
      <div className='flex gap-2 items-center justify-between'>
      <div className='flex gap-2 items-center '>
        <h2 className='text-2xl p-3 bg-slate-100 rounded-full'>
            {budget.icon}
        </h2>
        <div>
            <h2 className='font-bold'>{budget?.name}</h2>
            <h2 className='text-sm text-gray-500'>{budget.totalItem} Items </h2>
        </div>
      </div>
      <h2 className=' font-bold text-lg'> ${budget.amount} </h2>
      </div>

        <div className='mt-5'>
            <div className='flex justify-between items-center'>
                <h2 className='text-xs text-slate-400'> Spent :${budget.totalSpend?budget.totalSpend:0}</h2>
                <h2 className='text-xs text-slate-400'> Remaining : ${budget.amount - budget.totalSpend}</h2>
            </div>

            <div className='w-full bg-slate-300 h-2 rounded-full'>
                <div className='w-[40%] bg-primary h-2 rounded-full'></div>
            </div>

    </div>

    </div>
  )
}

export default BudgetItem