import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SalesGraph = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24;

  // Calculate the total number of pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Get the data for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = data.slice(startIndex, endIndex);

  // Group sales data by day and calculate total sale amount per day
  const salesPerDay = currentPageData.reduce((accumulator, item) => {
    const date = new Date(item.created_at);
    const day = date.toISOString().split('T')[0];
    const salesAmount = item.sales_amount;

    if (accumulator[day]) {
      accumulator[day] += salesAmount;
    } else {
      accumulator[day] = salesAmount;
    }

    return accumulator;
  }, {});

  // Prepare the data for the graph
  const graphData = Object.keys(salesPerDay).map(day => ({
    day,
    salesAmount: salesPerDay[day]
  }));

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={graphData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="salesAmount" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
      <div className="pagination">
        <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
          Previous
        </button>
        <span>&nbsp; Page &nbsp;{currentPage} of {totalPages}&nbsp;&nbsp;</span>
        <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default SalesGraph;
