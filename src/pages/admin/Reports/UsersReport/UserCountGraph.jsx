import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const UserCountGraph = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;

  // Calculate the total number of pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Get the data for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = data.slice(startIndex, endIndex);

  // Group user count data by day
  const userCountPerDay = currentPageData.reduce((accumulator, item) => {
    const date = new Date(item.created_at);
    const day = date.toISOString().split('T')[0];

    if (accumulator[day]) {
      accumulator[day] += 1;
    } else {
      accumulator[day] = 1;
    }

    return accumulator;
  }, {});

  // Prepare the data for the graph
  const graphData = Object.keys(userCountPerDay).map(day => ({
    day,
    userCount: userCountPerDay[day]
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
          <Line type="monotone" dataKey="userCount" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
      <div className="pagination">
        <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
          Previous
        </button>
        <span>&nbsp;Page {currentPage} of {totalPages}&nbsp;</span>
        <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
          Next
        </button>
        </div>
    </div>
  );
};

export default UserCountGraph;
