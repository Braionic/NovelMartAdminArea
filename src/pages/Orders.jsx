import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../store/features/cart/cartSlice";

export default function Orders() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state?.orders);
  useEffect(() => {
    dispatch(getAllOrders());
  }, []);

  console.log(data);
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
      <h4>Orders</h4>

      <div>
   
      </div>
    </div>
  );
}
