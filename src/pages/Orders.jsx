import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../store/features/auth/userSlice";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const data = useSelector((state) => state.user.allOrders);
  useEffect(() => {
    dispatch(getAllOrders());
  }, []);

  console.log(data);
  const columns = [
    {
      title: "NO",
      dataIndex: "NO",
      key: "NO",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Item(s)",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Prices",
      dataIndex: "prices",
      key: "prices",
    },

    {
      title: "Total",
      dataIndex: "amount",
      key: "amount",
    }, 

    {
      title: "Date Created",
      dataIndex: "createdAt",
      key: "createdAt",
    },
  ];

  let allOrders = [];
  for (let i = 0; i < data?.length; i++) {
    console.log(data[i].products.map((item)=> item?.price))
    allOrders.push({
      key: i,
      NO: i + 1,
      title: data[i].products.map((product) => {
        console.log(product.product)
       return (<><ul><li>{product.product.title}{`(${product.color})`}</li></ul></>);
      }),
      color: data[i].products.map((product) => {
        console.log(product.product)
       return (<><ul><li>{product.color}</li></ul></>);
      }),
      prices: data[i].products.map((product)=>{
        return (<><ul><li>{data[i].paymentIntent.currency + product.price}</li></ul></>);
      }),
      name: data[i].orderBy.name,

      amount: data[i].paymentIntent.currency + data[i].paymentIntent.amount,
      createdAt: new Date(data[i].createdAt).toLocaleString("en-US"),
      status: data[i].orderStatus,
    });
    console.log(allOrders);
  }
  return (
    <div>
      <h4>Orders</h4>

      <div>
        <Table dataSource={allOrders} columns={columns} />;
      </div>
    </div>
  );
}
