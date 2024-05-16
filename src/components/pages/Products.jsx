import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { productGet } from "../../store/features/product/productSlice";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function Products() {
  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productGet());
  }, []);
  console.log(products);

  const columns = [
    {
      title: "NO",
      dataIndex: "NO",
      key: "NO",
    },

    {
      sorter: (a, b) => a.title.length - b.title.length,
      title: "title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "createdat",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "action",
      dataIndex: "action",
      key: "action",
    },
  ];
  const data = [];
  for (let i = 0; i < products.length; i++) {
    data.push({
      NO: i + 1,
      title: products[i].title,
      description: products[i].description,
      price: products[i].price,
      quantity: products[i].quantity,
      createdAt: products[i].createdAt,
      brand: products[i].brand,
      action: (
        <>
          <Link className="fs-4" to="/">
            <FaEdit />
          </Link>
          <Link to="/">
            <MdDelete className="fs-4 text-danger" />
          </Link>
        </>
      ),
    });
  }
  return (
    <div>
      <h4>Product List</h4>

      <div>
        <Table dataSource={data} columns={columns} />;
      </div>
    </div>
  );
}
