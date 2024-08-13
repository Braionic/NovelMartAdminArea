import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteTag,
  getTags,
  revertAll,
} from "../store/features/tag/tagSlice";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CustomModal from "../components/CustomModal";
import { toast } from "react-toastify";

export default function TagList() {
  const [modalOpen, setModalOpen] = useState(false);
  const [tagId, setTagId] = useState("");
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.tag.tags);
  const deletedTagState = useSelector((state) => state.tag);
  useEffect(() => {
  
    dispatch(getTags());
  }, [deletedTagState.deletedTag]);


  useEffect(() => {
    if (deletedTagState.isSuccess && deletedTagState.deletedTag) {
      toast.success("deleted successfully");
    }

    if (deletedTagState.isError) {
      toast.error("An error occured");
    }
  }, [deletedTagState.isLoading, deletedTagState.isError]);

  
  const handleAction = (id) => {
    setModalOpen(true);
    setTagId(id);
  };

  const deleteTagItem = () => {
    setModalOpen(false);
    dispatch(deleteTag(tagId));
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
  let tag = [];
  for (let i = 0; i < tags.length; i++) {
    tag.push({
      key: i,
      NO: i + 1,
      title: tags[i].title,
      Action: (
        <>
          <Link className="fs-4" to={`/admin/add-tag/${tags[i]._id}`}>
            <FaEdit />
          </Link>
          <button
            className="bg-transparent border-0"
            onClick={() => handleAction(tags[i]._id)}
          >
            <MdDelete className="fs-4 text-danger" />
          </button>
        </>
      ),
    });
  }
  return (
    <div>
      <h4>Product Tag List</h4>

      <div>
        <Table dataSource={tag} columns={columns} />;
      </div>
      <CustomModal
        text={`Are you sure you'd like to delete`}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        actionFunction={deleteTagItem}
      />
    </div>
  );
}
