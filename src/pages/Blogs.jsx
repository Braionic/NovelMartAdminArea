import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BlogsThunk } from "../store/features/blog/blogSlice";

export default function Blogs() {
  const blogs = useSelector((state) => state.blog.blogs);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(BlogsThunk());
  }, []);
  console.log(blogs);

  const columns = [
    {
      title: "NO",
      dataIndex: "Key",
      key: "Key",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Date Created",
      dataIndex: "createdAt",
      key: "createdAt",
      
    },
    {
      title: "Page Views",
      dataIndex: "pageViews",
      key: "pageViews",
    }
  ];

  let data = [];
  for (let i = 0; i < blogs.length; i++) {
    data.push({
      Key: i + 1,
      title: blogs[i].title,
      description: blogs[i].description,
      author: blogs[i].author,
      createdAt: blogs[i].createdAt,
      pageViews: blogs[i].pageViews
    });
  }
  return (
    <div>
      <h4>Blog List</h4>

      <div>
        <Table dataSource={data} columns={columns} />;
      </div>
    </div>
  );
}
