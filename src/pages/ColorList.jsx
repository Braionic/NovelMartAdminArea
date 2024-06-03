import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getColors } from "../store/features/color/colorSlice";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

export default function ColorList() {
  const {color} = useSelector((state) => state.color);
  console.log(color);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getColors());
  }, []);

  const columns = [
    {
      title: "NO",
      dataIndex: "Key",
      key: "Key",
    },
    {
      title: "Name",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Action",
      dataIndex: "Action",
      key: "Action",
    },
  ];
  console.log(color[0])
  let data = [];
  
  for (let i = 0; i < color.length; i++) {
    const content = {
      Key: i+1,
      title: color[i].title,
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
    };
    data.push(content);
  }

  return (
    <div>
      <h4>Color List</h4>

      <div>
        <Table dataSource={data} columns={columns} />;
      </div>
    </div>
  );
}
