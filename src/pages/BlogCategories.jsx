import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getBlogCategories } from "../store/features/blogCat/blogCartSlice";
export default function BlogCategories() {
  const dispatch = useDispatch();
  const blogCats = useSelector((state) => state?.blogcat?.blogcatt);

  useEffect(() => {
    dispatch(getBlogCategories());
  }, []);

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
   ,
  ];

  let bCategoriesArray = [];
  for (let i = 0; i < blogCats.length; i++) {
    bCategoriesArray.push({
      key: i,
      NO: i + 1,
      title: blogCats[i].title,
    });
  }
  return (
    <div>
      <h4>Blog Categories</h4>

      <div>
        <Table dataSource={bCategoriesArray} columns={columns} />;
      </div>
    </div>
  );
}
