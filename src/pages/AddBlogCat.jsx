import React, { useEffect } from "react";
import TextInput from "../components/TextInput";
import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createBCat, revertAll} from "../store/features/blogCat/blogCartSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddBlogCat() {
  const bcatState = useSelector((state) => state.blogcat);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      title: "",
    },
  });
  //console.log(bcatState.createdBCat, "what is tthis");
  const { isLoading, isError, isSuccess, createdBCat } = bcatState;

  useEffect(() => {
    if (isSuccess && createdBCat) {
      toast.success("created");
    }

    if (isError) {
      toast.error("Something went wrong");
    }
  }, [isError, isSuccess, isLoading]);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  const onsubmit = (data) => {
    dispatch(createBCat(data));
    
    setTimeout(() => {
      dispatch(revertAll());
      return navigate("/admin/blog-categories");
    }, 3000);
  };
  console.log(isSuccess, createdBCat, "testing")
  return (
    <div>
      <h4>Add Blog Category</h4>
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
              validate: async (fieldValue) => {
                const response = await axios.get(
                  `http://localhost:1000/api/blogcategory/single?title=${fieldValue}`
                );
                return (
                  response.data.length == 0 || `${fieldValue} already exists`
                );
              },
            }),
          }}
          label="Yello My Guy"
        />
        <p className="text-danger">{errors?.title?.message}</p>
        <button className="btn-sm btn-primary">Create blog</button>
        <DevTool control={control} />
      </form>
    </div>
  );
}
