import React from "react";
import { BarChart, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";

function BarChartDashBoard({budgetList}) {
  const [client, setClient] = useState(false);

  useEffect(() => {
    setClient(true); // Set to true after component mounts
  }, []);

  if (!client) return null;
  return (
    <div className="border p-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-2"> Activity </h2>
      <ResponsiveContainer width={'90%'} height={300}>
      <BarChart 
      data={budgetList}
      margin={{ 
        top: 5,  
      }}>

        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip/>
        <Legend/>
        <Bar dataKey='totalSpend' fill="#4845d2" />
        <Bar dataKey='amount' fill="#C3C2FF" />
      </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarChartDashBoard;
