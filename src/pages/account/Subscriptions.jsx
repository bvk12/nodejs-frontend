import {
  Card
} from "react-bootstrap";

import Block from "../../components/Block/Block";
import DataTableComponent from "../../components/DataTable/DataTable";
import { AuthContext } from "../../context/AuthContextProvider";
import { useEffect, useState,useContext } from "react";
import { SubscriptionAPI } from "../../services/apis/SubscriptionAPI";
const Subscriptions = () => {

  const [subData, setSubData] = useState([])
  const { user } = useContext(AuthContext);
  useEffect(()=>{
    async function fetchData() {
      // You can await here
      if (user.userId) {
        var subApiResponse = await SubscriptionAPI.getSub(user.userId);
        console.log("Recieved subs...", subApiResponse);
        setSubData(subApiResponse?.data?.data) 
      }
    }
    fetchData();
  },[user]);

  const userColumns = [
    // {
    //   name: "Sub Id",
    //   grow: 2,
    //   selector: (row) => row.id,    
    //   cell: (row) => <span>{row.id}</span>,
    //   sortable: true,
    // },
    //  {
    //   name: "Course Id",
    //   grow: 2,
    //   selector: (row) => row.courseProgBundleId,    
    //   cell: (row) => <span>{row.courseProgBundleId}</span>,
    //   sortable: true,
    // },
    {
      name: "Name",  
      selector: (row) => row.name,   
      cell: (row) => <span>{row.name}</span>,
      sortable: true
    },
    {
      name: "Type",
      selector: (row) => row.courseType,
      cell: (row) => <span>{row.courseType}</span>,
      sortable: true,
      hide: "md",
    },
    {
      name: "Amount",
      cell: (row) => <span>{row.courseAmt}</span>,
      sortable: false,
    },
    {
      name: "Start Date",
      selector: (row) => row.startDate,
      cell: (row) => <span>{row.startDate.substring(0,10)}</span>,
      sortable: true,
    },
    {
      name: "End Date",
      selector: (row) => row.endDate,
      cell: (row) => <span>{row.endDate.substring(0,10)}</span>,
      sortable: true,
    },
  ];

  return (
    <>
      <Block>
        <Card>
        <Card.Body>
        <Card.Title>Subscriptions</Card.Title>
          <DataTableComponent
            tableClassName="data-table-head-light table-responsive"
            data={subData}
            columns={userColumns}            
            searchFields={[ "name","courseType"]}
          />
          </Card.Body>
        </Card>
      </Block>
    </>
  );
};

export default Subscriptions;
