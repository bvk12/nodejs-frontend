import { useState } from 'react';
import { CSVLink } from 'react-csv';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SubscriptionPerDayGraph = ({ data, itemsPerPage=20 }) => {

  // Define colors for program and course types
  const colors = {
    program: '#8884d8',
    course: '#82ca9d'
  };

  // Group purchases by day and course type
  const purchasesPerDay = data.reduce((accumulator, item) => {
    const date = new Date(item.created_at);
    const day = date.toISOString().split('T')[0];
    const courseType = item.course_type;

    if (!accumulator[day]) {
      accumulator[day] = {};
      //accumulator[day]['mobile']='';
    }
    //accumulator[day]['mobile'] = accumulator[day]['mobile']+","+ item.mobile;

    if (accumulator[day][courseType]) {
      accumulator[day][courseType]++;
    } else {
      accumulator[day][courseType] = 1;
    }

    return accumulator;
  }, {});

  console.log("PurchasesPerDay",purchasesPerDay)

  // Prepare the data for the graph
  const graphData = Object.keys(purchasesPerDay).map(day => ({
    day,
    ...purchasesPerDay[day]
  }));

 // console.log("Data,Paginated,graphData",data,purchasesPerDay,graphData)

  // Pagination
  const [currentPage, setCurrentPage] = useState(0);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = graphData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  
  // Prepare data for export CSV
  const csvData = graphData.map((item) => ({
    day: item.day,
    program: item.program || 0,
    course: item.course || 0,    
  }));


  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
      {paginatedData.length && purchasesPerDay?
        <BarChart data={paginatedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip /> 
           <Legend /> 
          {Object.keys(purchasesPerDay[Object.keys(purchasesPerDay)[0]]).map(courseType => (
            <Bar
              key={courseType}
              dataKey={courseType}
              fill={colors[courseType]}
            />
          ))}
        </BarChart>
        :<></>
      }
      </ResponsiveContainer>
      <div style={{ marginTop: '10px', textAlign: 'center' }}>
        {graphData.length > itemsPerPage && (
          Array.from({ length: Math.ceil(graphData.length / itemsPerPage) }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index)}
              style={{
                padding: '5px 10px',
                margin: '0 5px',
                fontWeight: currentPage === index ? 'bold' : 'normal',
                backgroundColor: currentPage === index ? '#888' : '#EEE',
                color: currentPage === index ? '#FFF' : '#000',
              }}
            >
              {index + 1}
            </button>
          ))
        )}
      </div>
      <div style={{ marginTop: '10px', textAlign: 'center' }}>
        {/* ...existing code... */}
        {/* <CSVLink data={csvData} filename="chart_data.csv">
          Export CSV
        </CSVLink> */}
      </div>
      
    </div>
  );
};

export default SubscriptionPerDayGraph;
