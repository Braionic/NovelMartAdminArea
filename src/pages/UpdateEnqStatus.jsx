import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAnEnquiry,
  getEnquiries,
  revertAll,
  singleEnquiry,
  updateStatus,
} from "../store/features/enquiry/EnquirySlice";
import { Select, Space } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import CustomModal from "../components/CustomModal";

export default function UpdateEnqStatus() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const enqId = location?.pathname.split("/")[3];
  console.log(enqId);
  const {
    singleEnq,
    isError,
    updatedStatus,
    isSuccess,
    isLoading,
  } = useSelector((state) => state.enquiry);

//ensure the enquir is displayed on first render
//and rerenders when it has been updated
  useEffect(() => {
    dispatch(singleEnquiry(enqId));
  }, [isSuccess]);



  useEffect(() => {
    if (isSuccess && updatedStatus) {
      toast.success("updated successfully");
    }
    if (isError) {
      toast.error("something went wrong");
    }
  }, [isSuccess, isError, updatedStatus]);

  console.log(updatedStatus, isSuccess, "test test")
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
    },
  ];
  const handleSubmit = (data) => {
    const dataObj = {
      id: enqId,
      status: data,
    };

    dispatch(updateStatus(dataObj));
    setTimeout(() => {
      dispatch(revertAll());
      navigate("/admin/enquiries");
    }, 3000);
  };
 

 

  const obj = [
    {
      key: 1,
      title: singleEnq?.title,
      email: singleEnq?.email,
      mobileNumber: singleEnq?.mobileNumber,
      status: (
        <Select
          defaultValue={singleEnq?.status}
          style={{
            width: 120,
          }}
          onChange={(data) => handleSubmit(data)}
          loading={isLoading}
          options={[
            {
              value: "responded",
              label: "Responded",
            },
            {
              value: "pending",
              label: "Pending",
            },
            {
              value: "sent",
              label: "Sent",
            },
          ]}
        />
      ),
    },
  ];

  return (
    <div>
      <h4 className="text-center mb-5">Enquiries List</h4>

      <div>
        <Table dataSource={obj} columns={columns} />;
      </div>
  
    </div>
  );
}
