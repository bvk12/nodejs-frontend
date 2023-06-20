import React from 'react';
import { BarChart, Bar, XAxis, YAxis, LabelList, CartesianGrid, Tooltip, Legend } from 'recharts';
import { CSVLink } from 'react-csv';
import { useState, useEffect } from 'react';
import { startOfWeek, endOfWeek, startOfMonth, startOfYear, startOflastYear } from '../dateUtils'


const FilterComponent = ({ filterDuration, setFilterDuration }) => {
  const handleFilterChange = (duration) => {
    setFilterDuration(duration);
  };

  return (
    <div>
      <label>Select Filter Duration:</label>
      <div>
        <button
          onClick={() => handleFilterChange('all')}
          style={{ marginRight: '10px', fontWeight: filterDuration === 'all' ? 'bold' : 'normal' }}
        >
          All
        </button>
        <button
          onClick={() => handleFilterChange('day')}
          style={{ marginRight: '10px', fontWeight: filterDuration === 'day' ? 'bold' : 'normal' }}
        >
          1 Day
        </button>
        <button
          onClick={() => handleFilterChange('week')}
          style={{ marginRight: '10px', fontWeight: filterDuration === 'week' ? 'bold' : 'normal' }}
        >
          1 Week
        </button>
        <button
          onClick={() => handleFilterChange('month')}
          style={{ marginRight: '10px', fontWeight: filterDuration === 'month' ? 'bold' : 'normal' }}
        >
          1 Month
        </button>
        <button
          onClick={() => handleFilterChange('threeMonths')}
          style={{ marginRight: '10px', fontWeight: filterDuration === 'threeMonths' ? 'bold' : 'normal' }}
        >
          3 Months
        </button>
        <button
          onClick={() => handleFilterChange('sixMonths')}
          style={{ marginRight: '10px', fontWeight: filterDuration === 'sixMonths' ? 'bold' : 'normal' }}
        >
          6 Months
        </button>
        <button
          onClick={() => handleFilterChange('year')}
          style={{ fontWeight: filterDuration === 'year' ? 'bold' : 'normal' }}
        >
          1 Year
        </button>
      </div>
    </div>
  );
};



const SalesSummaryGraph = ({ data }) => {

  const [filteredData, setFilteredData] = useState([]);
  const [filterDuration, setFilterDuration] = useState('all'); // Default value 'all'

  const filterData = (duration) => {
    const currentDate = new Date();

    const filterFunctions = {
      day: (item) => {
        const endDate = new Date(item.end_date);
        const diffTime = Math.abs(endDate - currentDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays === 1;
      },
      week: (item) => {
        const endDate = new Date(item.end_date);
        const diffTime = Math.abs(endDate - currentDate);
        const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));
        return diffWeeks <= 1;
      },
      month: (item) => {
        const endDate = new Date(item.end_date);
        const diffTime = Math.abs(endDate - currentDate);
        const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
        return diffMonths <= 1;
      },
      threeMonths: (item) => {
        const endDate = new Date(item.end_date);
        const diffTime = Math.abs(endDate - currentDate);
        const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
        return diffMonths <= 3;
      },
      sixMonths: (item) => {
        const endDate = new Date(item.end_date);
        const diffTime = Math.abs(endDate - currentDate);
        const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
        return diffMonths <= 6;
      },
      year: (item) => {
        const endDate = new Date(item.end_date);
        return endDate <= currentDate;
      },
      all: () => true,
    };

    const filtered = data.filter(filterFunctions[duration]);
    setFilteredData(filtered);
  };


  const handleFilterChange = (duration) => {
    setFilterDuration(duration);
  };

  if (data && data.length === 0) return <></>
  // Calculate subscription counts for the next five days, next 10 days, next month, and next year
  const currentDate = new Date();
  // console.log("Current date",currentDate.toString().substring(0,10))
  const thisWeek = startOfWeek(new Date());
  const eow = endOfWeek(new Date());
  const lastFortNight = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 14);
  const thisMonth = startOfMonth(new Date())
  const thisYear = startOfYear(new Date())
  const startOfLastYear = startOflastYear(new Date())


  const counts = {
    'This Week': 0,
    'Fortnight': 0,
    'This Month': 0,
    'This Year': 0,
    'Last Year': 0
  };
  // console.log("subData to expiry graph",data)


  const sales = {
    'This Week': 0,
    'Fortnight': 0,
    'This Month': 0,
    'This Year': 0,
    'Last Year': 0
  };

  data.forEach(item => {


    const createdDate = new Date(item.created_at);
    const cd = new Date();
    //console.log(item,createdDate.toString().substring(0,10),
    //thisYear.toString().substring(0,15),
    //cd.toString().substring(0,10))//,createdDate,thisWeek,lastFortNight,thisMonth,thisYear)
    if (createdDate >= thisWeek && createdDate <= eow) {
      counts['This Week']++;
      sales['This Week'] = item.sales_amount + sales['This Week'];
    } if (createdDate >= lastFortNight && createdDate <= cd) {
      counts['Fortnight']++;
      sales['Fortnight'] = item.sales_amount + sales['Fortnight'];
    } if (createdDate >= thisMonth && createdDate <= cd) {
      counts['This Month']++;
      sales['This Month'] = item.sales_amount + sales['This Month'];
    } if (createdDate >= thisYear) {
      counts['This Year']++;
      sales['This Year'] = item.sales_amount + sales['This Year'];
    } if (createdDate <= thisYear && createdDate >= startOfLastYear) {
      counts['Last Year']++;
      sales['Last Year'] = item.sales_amount + sales['Last Year'];
    }
  });

  // Prepare the data for the graph
  const graphData = Object.keys(counts).map(label => ({
    label,
    count: counts[label],
    amount: sales[label]
  }));

  //console.log("counts",counts)

  // Prepare data for export CSV
  const csvData = graphData.map((item) => ({
    label: item.label,
    count: item.count,
    //mobile: mobiles[item.label] 
  }));

  // useEffect(() => {
  //   filterData(filterDuration);
  // }, [filterDuration]);

  return (
    <>
      {/* <FilterComponent filterDuration={filterDuration} onFilterChange={handleFilterChange} /> */}
      <br />
      <h5>Sales Summary Graph</h5>
      <div className='row'>

        <div className='col'>
          <BarChart width={600} height={400} data={graphData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill="#8884d8" >
              <LabelList dataKey="amount" position="top" />

            </Bar>
            {/* <Bar dataKey="amount" fill="#88848" /> */}
          </BarChart></div>
        <div className='col'>
          <BarChart width={600} height={400} data={graphData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#4884d8" style={{color:"#FFF"}} >
              <LabelList   stroke="#FFF" style={{color:"#FFF"}} dataKey="count" color='#FFF' position="center" />
            </Bar>
            {/* <Bar dataKey="amount" fill="#88848" /> */}
          </BarChart>
        </div>
      </div>


      {/* <div style={{ marginTop: '10px', textAlign: 'center' }}>       
        <CSVLink data={csvData} filename="chart_data.csv">
          Export CSV
        </CSVLink>
      </div> */}
    </>
  );
};

export default SalesSummaryGraph;
