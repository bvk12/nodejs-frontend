import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { useState, useEffect } from 'react';


const calculateSubscriptionStatus = (data) => {
    const currentDate = new Date();
    const totalSubscriptions = data.length;
    let expiredSubscriptions = 0;
  
    data.forEach((item) => {
      const endDate = new Date(item.end_date);
  
      if (endDate < currentDate) {
        expiredSubscriptions++;
      }
    });
  
    const activeSubscriptions = totalSubscriptions - expiredSubscriptions;
  
    return [
      { name: 'Active', value: activeSubscriptions },
      { name: 'Expired', value: expiredSubscriptions },
    ];
  };

  const TotalSubscriptionsGraph = ({ data }) => {
    const [chartData, setChartData] = useState([]);
    // Calculate the subscription status
    const subscriptionStatus = calculateSubscriptionStatus(data);
  
    // Update the chart data state
    useEffect(() => {
      setChartData(subscriptionStatus);
    }, [data]);
  
    return (
      <div>
        <PieChart width={400} height={300}>
          <Pie
            dataKey="value"
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={index === 0 ? '#82ca9d' : '#8884d8'} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    );
  };
  
export default TotalSubscriptionsGraph;
  