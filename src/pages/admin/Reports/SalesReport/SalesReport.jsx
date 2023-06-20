import {
  Card
} from "react-bootstrap";

import { Block } from "../../../../components/Block/Block.js";
import DataTableComponent from "../../../../components/DataTable/DataTable";
import { AuthContext } from "../../../../context/AuthContextProvider";
import { useEffect, useState, useContext } from "react";
import { ReportsAPI } from "../../../../services/apis/ReportsAPI.js";
import SalesGraph from "./SalesGraph.jsx";
import SalesSummaryGraph from "./SalesSummaryGraph.jsx";

const SalesReport = () => {

  const [subData, setSubData] = useState([])
  const [salesData, setSalesData] = useState([])

  const { user } = useContext(AuthContext);
  useEffect(() => {
    async function fetchData() {
      // You can await here
      if (user.userId) {
        var salesReport = await ReportsAPI.getSalesReport();
        console.log("Sales Report", salesReport);
        setSalesData(salesReport?.data?.data)
      }
    }
    fetchData();
  }, [user]);

  const salesColumns = [
    {
      name: "Student Name",
      selector: (row) => row.studentname,
      cell: (row) => <span>{row.studentname}</span>,
      sortable: true
    },
    {
      name: "Order Id",
      selector: (row) => row.order_id,
      cell: (row) => <span>{row.order_id}</span>,
      sortable: true,
      hide: "md",
    },
    {
      name: "Course Title",
      selector: (row) => row.course_title,
      cell: (row) => <span>{row.course_title}</span>,
      sortable: true,
    },

    {
      name: "Course Category",
      selector: (row) => row.course_type,
      cell: (row) => <span>{row.course_type}</span>,
      sortable: true,
    },
    {
      name: "Sales Amount",
      selector: (row) => row.sales_amount,
      cell: (row) => <span>{row.sales_amount}</span>,
      sortable: true,
    },
    {
      name: "PG Order Id",
      selector: (row) => row.payment_gateway_order_id,
      cell: (row) => <span>{row.payment_gateway_order_id}</span>,
      sortable: true,
      hide: "md",
    },
    {
      name: "Created At",
      selector: (row) => row.created_at,
      cell: (row) => <span>{row.created_at.substring(0, 10)}</span>,
      sortable: true,
    },
  ];

  return (
    <>
    <Block>
        <Card>
          <Card.Body>
            <Card.Title>Sales Trend</Card.Title>
            <SalesGraph data={salesData} />
            <SalesSummaryGraph data={salesData}/>
          </Card.Body>
        </Card>
      </Block>
      <Block>
        <Card>
          <Card.Body>
            <Card.Title>Sales Report</Card.Title>

            <DataTableComponent
              tableClassName="data-table-head-light table-responsive"
              data={salesData}
              columns={salesColumns}
              searchFields={["studentname", "course_type", "course_title", "payment_gateway_order_id"]}
            />

          </Card.Body>
        </Card>
      </Block>
      
    </>
  );
};

export default SalesReport;
