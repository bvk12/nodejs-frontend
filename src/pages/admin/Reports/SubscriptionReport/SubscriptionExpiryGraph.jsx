import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { CSVLink } from 'react-csv';

const SubscriptionExpiryGraph = ({ data }) => {

  if(data && data.length===0) return <></> 
  // Calculate subscription counts for the next five days, next 10 days, next month, and next year
  const currentDate = new Date();
  const fiveDaysLater = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 7);
  const tenDaysLater = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 14);
  const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());
  const nextYear = new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), currentDate.getDate());

  const counts = {
    'Next 7 days': 0,
    'Fortnight': 0,
    'Next Month': 0,
    'Next Year': 0
  };
  
  const mobiles = {
    'Next 7 Days': 0,
    'Fotnight': 0,
    'Next Month': 0,
    'Next Year': 0
  };
 
  const names = {
    'Next 7 Days': 0,
    'Fortnight': 0,
    'Next Month': 0,
    'Next Year': 0
  };

//  console.log("subData to expiry graph",data)

  data.forEach(item => {
    const endDate = new Date(item.end_date);
    if (endDate <= fiveDaysLater) {
      counts['Next 7 Days']++;
      mobiles['Next 7 Days']= mobiles['Next 7 Days']+","+item.mobile
    } else if (endDate <= tenDaysLater) {
      counts['Fotnight']++;
      mobiles['Fotnight']= mobiles['Fotnight']+","+item.mobile
    } else if (endDate <= nextMonth) {
      counts['Next Month']++;     
      //mobiles['Next Month']= mobiles['Next Month']+","+item.mobile
    } else if (endDate <= nextYear) {
      counts['Next Year']++;    
    //  mobiles['Next Year']= mobiles['Next Year']+","+item.mobile
    }
  });

  // Prepare the data for the graph
  const graphData = Object.keys(counts).map(label => ({
    label,
    count: counts[label]
  }));
 
  // Prepare data for export CSV
  const csvData = graphData.map((item) => ({
    label: item.label,
    count: item.count ,
    mobile: mobiles[item.label] 
  }));

  return (
    <>
    <BarChart width={600} height={300} data={graphData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="label" />     
      <Tooltip />
      <Legend />
      <Bar dataKey="count" fill="#8884d8" />
    </BarChart>
    <div style={{ marginTop: '10px', textAlign: 'center' }}>
        {/* ...existing code... */}
        <CSVLink data={csvData} filename="chart_data.csv">
          Export CSV
        </CSVLink>
      </div>
   </>
  );
};

export default SubscriptionExpiryGraph;
