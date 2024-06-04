import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getEnquiries } from "../store/features/enquiry/EnquirySlice";

export default function Enquiry() {
  const dispatch = useDispatch();
  const { enquiries } = useSelector((state) => state.enquiry);
  useEffect(() => {
    dispatch(getEnquiries());
  }, []);

  

  const columns = [
    {
      title: "No",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Mobile Number",
      dataIndex: "mobileNumber",
      key: "mobileNumber",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    }
  ];

  let data = []
  for (let i = 0; i < enquiries.length; i++) {
    const obj = {
      key: i+1,
      title: enquiries[i].title,
      email: enquiries[i].email,
      mobileNumber: enquiries[i].mobileNumber,
      status: enquiries[i].status
    }
    data.push(obj)
  }
  return (
    <div>
      <h4>Enquiries List</h4>

      <div>
        <Table dataSource={data} columns={columns} />;
      </div>
    </div>
  );
}
