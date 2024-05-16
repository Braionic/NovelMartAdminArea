import React, { useEffect } from "react";
import { Table } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { allCustomers } from "../../store/features/customers/customersSlice";

export default function Customers() {
  const dispatch = useDispatch();
  const { customer, isLoading, error } = useSelector((state) => state.customer);

  useEffect(() => {
    dispatch(allCustomers());
  }, []);
  console.log(customer, isLoading, error);
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
      title: "key",
      dataIndex: "key",
      key: "key",
    },

    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "mobile",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "createAt",
      dataIndex: "createdAt",
      key: "createdAt",
    },
  ];
  let customersArry = [];
  for (let i = 0; i < customer?.length; i++) {
    if (customer[i].role !== "admin") {
      customersArry.push({
        key: i + 1,
        name: customer[i].name,
        email: customer[i].email,
        address: customer[i].address,
        mobile: customer[i].mobile,
        createdAt: customer[i].createdAt,
      });
    }
  }
  return (
    <div>
      <h4>Customers</h4>

      <div>
        <Table dataSource={customersArry} columns={columns} />;
      </div>
    </div>
  );
}
