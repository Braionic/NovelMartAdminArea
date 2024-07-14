import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteBCat, getBlogCategories, revertAll } from "../store/features/blogCat/blogCartSlice";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import CustomModal from "../components/CustomModal";
import { toast } from "react-toastify";
export default function BlogCategories() {
  const [modalOpen, setModalOpen] = useState(false);
  const [brandId, setBrandId] = useState("");

  const dispatch = useDispatch();
  const blogCatState = useSelector((state) => state?.blogcat);
const {isSuccess, isLoading, blogcatt, deletedBCat} = blogCatState
  useEffect(() => {
    
    dispatch(getBlogCategories());
  }, []);

  useEffect(()=>{
if(isSuccess && deletedBCat){
 toast.success("deleted successfully")
}
  }, [isLoading])
  const columns = [
    {
      title: "NO",
      dataIndex: "NO",
      key: "NO",
    },
    {
      title: "title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    }
   ,
  ];

  const handleDelete = ()=>{
    dispatch(deleteBCat(brandId))
    setModalOpen(false)
    setTimeout(() => {
      dispatch(getBlogCategories());
    }, 1000);
  }

  const handleAction = (id) => {
    setModalOpen(true);
    setBrandId(id);
  };

  let bCategoriesArray = [];
  for (let i = 0; i < blogcatt.length; i++) {
    bCategoriesArray.push({
      key: i,
      NO: i + 1,
      title: blogcatt[i].title,
      action: (<>
      <Link className="fs-4" to={`/admin/add-blog-cat/${blogcatt[i]._id}`}>
            <FaEdit />
          </Link>
          <button
            className="bg-transparent border-0"
            onClick={() => handleAction(blogcatt[i]?._id)}
          >
            <MdDelete className="fs-4 text-danger" />
          </button>
      </>)
    });
  }
  return (
    <div>
      <h4>Blog Categories</h4>

      <div>
        <Table dataSource={bCategoriesArray} columns={columns} />;
        <CustomModal text="are you suru" setModalOpen={setModalOpen} modalOpen={modalOpen} actionFunction={handleDelete} />
      </div>
    </div>
  );
}
