import {
  Card
} from "react-bootstrap";

import { Block } from "../../../../components/Block/Block.js";
import DataTableComponent from "../../../../components/DataTable/DataTable.js";
import { AuthContext } from "../../../../context/AuthContextProvider.js";
import { useEffect, useState, useContext } from "react";
import { ReportsAPI } from "../../../../services/apis/ReportsAPI.js";
import SubscriptionGraph from "./SubscriptionExpiryGraph.jsx";
import SubscriptionPerDayGraph from "./SubscriptionPerDayGraph.jsx";
import TotalSubscriptionsGraph from "./TotalSubscriptionsGraph.jsx";
const SubscriptionReport = () => {

  const [subData, setSubData] = useState([])
  const [chartData, setChartData] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    async function fetchData() {
      // You can await here
      if (user.userId) {
        var dataReponse = await ReportsAPI.getSubscriptionReport();
        setSubData(dataReponse?.data?.data)
      }
    }
    fetchData();
  }, [user]);

  const subColumns = [
    {
      name: "Student Name",
      selector: (row) => row.studentname,
      cell: (row) => <span>{row.studentname}</span>,
      sortable: true
    },
    {
      name: "Email",
      selector: (row) => row.email,
      cell: (row) => <span>{row.email}</span>,
      sortable: true,
      hide: "lg",
    },
    {
      name: "Mobile",
      selector: (row) => row.mobile,
      cell: (row) => <span>{row.mobile}</span>,
      sortable: true,
      hide: "lg"
    },

    {
      name: "Course",
      selector: (row) => row.course,
      cell: (row) => <span>{row.course}</span>,
      sortable: true,
    },
    {
      name: "Course Type",
      selector: (row) => row.course_type,
      cell: (row) => <span>{row.course_type}</span>,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => row.course_amt,
      cell: (row) => <span>{row.course_amt}</span>,
      sortable: true,
      hide: "md",
    },
    {
      name: "Start Date",
      selector: (row) => row.start_date,
      cell: (row) => <span>{row.start_date?.substring(0, 10)}</span>,
      sortable: true,
    },
    {
      name: "End Date",
      selector: (row) => row.end_date,
      cell: (row) => <span>{row.end_date?.substring(0, 10)}</span>,
      sortable: true,
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
            {subData ?
              <>
                <div className="row">
             
                <div className="col">
                  <h5>Total Subscriptions </h5>
                  <TotalSubscriptionsGraph data={subData} />
                </div>
                <div className="col">
                  <h5>Subscriptions Nearing Expiry</h5>
                  <SubscriptionGraph data={subData} />
                </div>
                </div>
                <h5>Day Wise Subscriptions </h5>
                <SubscriptionPerDayGraph data={subData} itemsPerPage={10} />
              </> : <></>
            }
          </Card.Body>
        </Card>
      </Block>




      <Block>
        <Card>
          <Card.Body>
            <Card.Title>Subscription Report</Card.Title>

            <DataTableComponent
              tableClassName="data-table-head-light table-responsive"
              data={subData}
              columns={subColumns}
              searchFields={["course", "course_type", "studentname", "start_date", "end_date"]}
            />

          </Card.Body>
        </Card>
      </Block>
    </>
  );
};

export default SubscriptionReport;
