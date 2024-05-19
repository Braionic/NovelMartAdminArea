import React, { useEffect } from "react";
import { Table } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { CategoryThunk } from "../store/features/category/categorySlice";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

export default function Categories() {
  const categories = useSelector((state) => state.category.categories);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(CategoryThunk());
  }, []);

  const columns = [
    {
      title: "NO",
      dataIndex: "Key",
      key: "Key",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Action",
      dataIndex: "Action",
      key: "Action",
    },
  ];
  let data = [];
  for (let i = 0; i < categories.length; i++) {
    data.push({
      Key: i + 1,
      title: categories[i].title,
      Action: (
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
      <h4>Categories</h4>

      <div>
        <Table dataSource={data} columns={columns} />;
      </div>
    </div>
  );
}
