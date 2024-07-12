import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { allCoupons } from "../store/features/coupon/couponSlice";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";


export default function ListCoupons() {
  const dispatch = useDispatch();
  const couponData = useSelector((state) => state.coupon.coupons);

  useEffect(() => {
    dispatch(allCoupons());
  }, []);

  console.log(couponData, "coupon state");

  const dataSource = [];
for (let index = 0; index < couponData.length; index++) {
    dataSource.push(
        {
            key: index,
            NO: index+1,
            title: couponData[index]?.title,
            discount: couponData[index]?.discount,
            expires: couponData[index]?.expires,
            action: (
              <>
                <Link className="fs-4" to="/">
                  <FaEdit />
                </Link>
                <Link to="/">
                  <MdDelete className="fs-4 text-danger" />
                </Link>
              </>
            )
          }
    )
    
}
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
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
    },
    {
      title: "Expires",
      dataIndex: "expires",
      key: "expires",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    }
  ];

  return (
    <div>
      <h3>Available Coupons</h3>
      <Table dataSource={dataSource} columns={columns} />;
    </div>
  );
}
