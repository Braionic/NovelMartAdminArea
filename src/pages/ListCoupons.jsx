import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  allCoupons,
  deleteCouponCode,
  revertAll,
} from "../store/features/coupon/couponSlice";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import CustomModal from "../components/CustomModal";
import { toast } from "react-toastify";
export default function ListCoupons() {
  const [modalOpen, setModalOpen] = useState(false);
  const [couponId, setCouponId] = useState("");
  const dispatch = useDispatch();
  const { coupons, isLoading, isSuccess, deletedCoupon, isError } = useSelector(
    (state) => state.coupon
  );

  useEffect(() => {
    dispatch(allCoupons());
    dispatch(revertAll());
  }, [deletedCoupon]);

  useEffect(() => {
    if (isSuccess && deletedCoupon) {
      toast.success("deleted");
    }

    if (isError) {
      toast.error("Deleted");
    }
  }, [isSuccess, deleteCouponCode, isError]);

  console.log(coupons, "coupon state");
  

  function handleModal(id) {
    setCouponId(id);
    setModalOpen(true);
  }
  //delete coupon
  function actionFunction() {
    setModalOpen(false);
    dispatch(deleteCouponCode(couponId));
    dispatch(allCoupons());
  }

  const dataSource = [];
  for (let index = 0; index < coupons.length; index++) {
    dataSource.push({
      key: index,
      NO: index + 1,
      title: coupons[index]?.title,
      discount: coupons[index]?.discount,
      expires: coupons[index]?.expires,
      action: (
        <>
          <Link
            className="fs-4"
            to={`/admin/add-coupon/${coupons[index]?._id}`}
          >
            <FaEdit />
          </Link>
          <button
            className="border-0 bg-transparent ps-2"
            onClick={() => handleModal(coupons[index]?._id)}
          >
            <MdDelete size={28} className="fs-4 text-danger" />
          </button>
        </>
      ),
    });
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
    },
  ];

  return (
    <div>
      <h3>Available Coupons</h3>
      <Table dataSource={dataSource} columns={columns} />;
      <CustomModal
        modalOpen={modalOpen}
        actionFunction={actionFunction}
        setModalOpen={setModalOpen}
        topTitle={"Delete"}
        text={"Would you like to delete"}
      />
    </div>
  );
}
