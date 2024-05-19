import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../store/features/brand/brandSlice";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

export default function BrandList() {
  const dispatch = useDispatch();
  const brands = useSelector((state) => state.brand.brands);
  useEffect(() => {
    dispatch(getBrands());
  }, []);


  const columns = [
    {
      title: "NO",
      dataIndex: "NO",
      key: "NO",
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
  let brand = [];
  for (let i = 0; i < brands.length; i++) {
    brand.push({
      key: i,
      NO: i + 1,
      title: brands[i].title,
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
      <h4>Brand List</h4>

      <div>
        <Table dataSource={brand} columns={columns} />;
      </div>
    </div>
  );
}
