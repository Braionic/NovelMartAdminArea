import React, { useEffect } from "react";
import { Table } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { allCustomers } from "../../store/features/customers/customersSlice";

export default function Customers() {
  const dispatch = useDispatch()
  const {customer, isLoading, error} = useSelector((state)=> state.customer)
  useEffect(()=>{
dispatch(allCustomers())
  }, [])
  console.log(customer, isLoading, error)
  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  return (
    <div>
      <h4>Customers</h4>

      <div>
        <Table dataSource={dataSource} columns={columns} />;
      </div>
    </div>
  );
}
