import React, { useEffect } from "react";
import TextInput from "../components/TextInput";
import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createBCat,
  getOneBCat,
  revertAll,
  updateBlogCategoty,
} from "../store/features/blogCat/blogCartSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function AddBlogCat() {
  const bcatState = useSelector((state) => state.blogcat);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split("/")[3];

  useEffect(() => {
    if (id) {
      dispatch(getOneBCat(id));
      dispatch(revertAll())
    } else {
      dispatch(revertAll())
    }
  }, [id]);
  const { isLoading, isError, isSuccess, createdBCat, singleCat , updatedBCat } = bcatState;
  const form = useForm({
    defaultValues: {
      title: id? singleCat.title: "",
    },
  });
  
 
  useEffect(() => {
    if (isSuccess && createdBCat) {
      toast.success("created");
    }
    if (isSuccess && updatedBCat) {
      toast.success("Category updated");
    }
    if (isError) {
      toast.error("Something went wrong");
    }
  }, [isError, isSuccess, isLoading]);
  
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = form;

  
  useEffect(()=>{
    if(singleCat.title){
      setValue("title", singleCat.title)
    }else{
      setValue("title", "")
    }
      }, [singleCat])

  const onsubmit = (data) => {
    if(id){
     dispatch(updateBlogCategoty({title: data.title, id: id}))
    }else{
      dispatch(createBCat(data));
    }
    setTimeout(() => {
      dispatch(revertAll());
      return navigate("/admin/blog-categories");
    }, 3000);
  };

  return (
    <div>
      <h4>{id? "Edit": "Add"} Blog Category</h4>
      <form onSubmit={handleSubmit(onsubmit)} noValidate>
        <TextInput
          placeholder="category name"
          type="text"
          hf={{
            ...register("title", {
              required: {
                value: true,
                message: "category name is required",
              },
            }),
          }}
          label="Category title"
        />
        <p className="text-danger">{errors?.title?.message}</p>
        <button className="btn-sm btn-primary">{id? "Edit category": "Create blog"}</button>
        <DevTool control={control} />
      </form>
    </div>
  );
}

/*
  validate: async (fieldValue) => {
                const response = await axios.get(
                  `http://localhost:1000/api/blogcategory/single?title=${fieldValue}`
                );
                return (
                  response.data.length == 0 || `${fieldValue} already exists`
                );
              }
*/