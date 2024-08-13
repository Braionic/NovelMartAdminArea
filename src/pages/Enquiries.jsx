import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAnEnquiry,
  getEnquiries,
  revertAll,
  singleEnquiry,
} from "../store/features/enquiry/EnquirySlice";
import { Select, Space } from 'antd';
import { Link, useLocation } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import CustomModal from "../components/CustomModal";

export default function Enquiry() {
  const [modalOpen, setModalOpen] = useState(false);
  const [enquiryId, setEnquiryId] = useState("");
  const dispatch = useDispatch();
  const location = useLocation()
  const enqId = location?.pathname.split("/")[3]
  console.log(enqId)
  const {singleEnq, isError, enquiries, deletedEnquiry, isSuccess, isLoading } =
    useSelector((state) => state.enquiry);
const enquiry = enquiries?enquiries: singleEnq
    console.log(enquiry)

  useEffect(() => {
    if(enqId){
      dispatch(singleEnquiry(enqId))
    }else{
      dispatch(getEnquiries());
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isSuccess && deletedEnquiry) {
      toast.success("deleted successfully");
    }
    if (isError) {
      toast.error("something went wrong");
    }
  }, [isSuccess, isError]);

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
    { title: "Action", dataIndex: "action", key: "action" },
  ];
const handleSubmit = (data, enq)=>{
  window.alert(JSON.stringify(data, enq))

}
  const actionFunction = () => {
    dispatch(deleteAnEnquiry(enquiryId));
    dispatch(revertAll());
    setModalOpen(false);
  };

  const handleAction = (id) => {
    setEnquiryId(id);
    setModalOpen(true);
  };


  let data = [];
  for (let i = 0; i < enquiry.length; i++) {
    const obj = {
      key: i + 1,
      title: enquiry[i].title,
      email: enquiry[i].email,
      mobileNumber: enquiry[i].mobileNumber,
      status: enqId? <form><Select
      defaultValue={enquiry[i].status? enquiry[i].status: "received"}
      style={{
        width: 120,
      }}
      onChange={(data)=> handleSubmit(data)}
      loading={false}
      options={[
        {
          value: 'lucy',
          label: 'Lucy',
        },
        {
          value: 'mark',
          label: 'Mark',
        }
      ]}
    /> </form>: enquiry[i].status,
      action: (
        <>
          <Link className="fs-4" to={`/admin/enquiries/${enquiry[i]._id}`}>
            <FaEdit />
          </Link>
          <button
            className="bg-transparent border-0"
            onClick={() => handleAction(enquiry[i]?._id)}
          >
            <MdDelete className="fs-4 text-danger" />
          </button>
        </>
      ),
    };
    data.push(obj);
  }
  return (
    <div>
      <h4 className="text-center mb-5">Enquiries List</h4>

      <div>
        <Table dataSource={data} columns={columns} />;
      </div>
      <CustomModal
        topTitle="Delete Message"
        actionFunction={actionFunction}
        setModalOpen={setModalOpen}
        modalOpen={modalOpen}
        text="would you like to delete?"
      />
    </div>
  );
}
