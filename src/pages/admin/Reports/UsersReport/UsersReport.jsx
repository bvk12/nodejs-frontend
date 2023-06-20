import {
  Card
} from "react-bootstrap";

import { Block } from "../../../../components/Block/Block.js";
import DataTableComponent from "../../../../components/DataTable/DataTable";
import { AuthContext } from "../../../../context/AuthContextProvider";
import { useEffect, useState, useContext } from "react";
import { ReportsAPI } from "../../../../services/apis/ReportsAPI.js";
import UserCountGraph from "./UserCountGraph.jsx";

const UserReport = () => {

  const [userData, setUserData] = useState([])

  const { user } = useContext(AuthContext);
  useEffect(() => {
    async function fetchData() {
      // You can await here
      if (user.userId) {
        var dataResponse = await ReportsAPI.getUserReport();
        console.log("Report", dataResponse);
        setUserData(dataResponse?.data?.data)
      }
    }
    fetchData();
  }, [user]);

  const userColumns = [
    {
      name: "Student Name",
      selector: (row) => row.studentname,
      cell: (row) => <span>{row.studentname}</span>,
      sortable: true
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
      cell: (row) => <span>{row.gender}</span>,
      sortable: true,
      hide: "md",
    },
    {
      name: "Role Name",
      selector: (row) => row.rolename,
      cell: (row) => <span>{row.rolename}</span>,
      sortable: true,
    },

    {
      name: "Email",
      selector: (row) => row.email,
      cell: (row) => <span>{row.email}</span>,
      sortable: true,
    },
    {
      name: "Mobile",
      selector: (row) => row.mobile,
      cell: (row) => <span>{row.mobile}</span>,
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
            <Card.Title>User Count Graph</Card.Title>
            <UserCountGraph data={userData} />
          </Card.Body>
        </Card>
      </Block>
      <Block>
        <Card>
          <Card.Body>
            <Card.Title>User Report</Card.Title>

            <DataTableComponent
              tableClassName="data-table-head-light table-responsive"
              data={userData}
              columns={userColumns}
              searchFields={["studentname", "email", "mobile", "rolename"]}
            />

          </Card.Body>
        </Card>
      </Block>
    </>
  );
};

export default UserReport;
