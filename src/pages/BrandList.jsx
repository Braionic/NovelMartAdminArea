import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBrand,
  getBrands,
  revertAll,
} from "../store/features/brand/brandSlice";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CustomModal from "../components/CustomModal";
import { toast } from "react-toastify";

export default function BrandList() {
  const [modalOpen, setModalOpen] = useState(false);
  const [brandId, setBrandId] = useState("");
  const dispatch = useDispatch();
  const brands = useSelector((state) => state.brand.brands);
  const deletedBrandState = useSelector((state) => state.brand);
  useEffect(() => {
    dispatch(getBrands());
  }, [deletedBrandState.deletedBrand]);
  useEffect(() => {
    if (deletedBrandState.isSuccess && deletedBrandState.deletedBrand) {
      toast.success("deleted successfully");
    }

    if (deletedBrandState.isError) {
      toast.error("An error occured");
    }
  }, [deletedBrandState.isLoading, deletedBrandState.isError]);
  console.log(deletedBrandState, "deletedbrandstate");
  const handleAction = (id) => {
    setModalOpen(true);
    setBrandId(id);
  };

  const deleteBrandItem = () => {
    setModalOpen(false);
    dispatch(deleteBrand(brandId));
    dispatch(revertAll());
  };

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
          <Link className="fs-4" to={`/admin/add-brand/${brands[i]._id}`}>
            <FaEdit />
          </Link>
          <button
            className="bg-transparent border-0"
            onClick={() => handleAction(brands[i]._id)}
          >
            <MdDelete className="fs-4 text-danger" />
          </button>
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
      <CustomModal
        text={`Are you sure you'd like to delete`}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        actionFunction={deleteBrandItem}
      />
    </div>
  );
}
