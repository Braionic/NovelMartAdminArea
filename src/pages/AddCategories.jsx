import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import TextInput from "../components/TextInput";
import { DevTool } from "@hookform/devtools";
import { useDispatch, useSelector } from "react-redux";
import { addProductCategory } from "../store/features/category/categorySlice";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function AddCategories() {
  const form = useForm({
    defaultValues: {
      title: "",
    },
  });
  const dispatch = useDispatch();
  const addCatState = useSelector((state) => state.category);
  const navigate = useNavigate();
  const { isLoading, isSuccess, isError } = addCatState;
  const {
    control,
    register,
    handleSubmit,
    formState: { isDirty, errors, createdCategory, isSuccesfull },
  } = form;

  useEffect(() => {
    if (addCatState.isSuccesfull) {
      toast.success("product added successfully!");
      setTimeout(() => {
        
        return navigate("/admin/categories");
      }, 3000);
    }
  }, [addCatState.isError, addCatState.isLoading, addCatState.isSuccesfull]);
  console.log(addCatState, "add cate state");

  const onsubmit = (data) => {
    dispatch(addProductCategory(data));
  };
  return (
    <div>
      <h1>AddCategories</h1>

      <div>
        <form onSubmit={handleSubmit(onsubmit)} noValidate>
          <TextInput
            name="title"
            placeholder={"category name"}
            hf={{
              ...register("title", {
                required: {
                  value: true,
                  message: "category is required",
                },
                validate: async (fieldValue) => {
                  const response = await axios.get(
                    `http://localhost:1000/api/productcategory/single?title=${fieldValue}`
                  );
                  return (
                    response?.data?.length == 0 ||
                    `${fieldValue} already exists`
                  );
                },
              }),
            }}
          />
          <p className="text-danger">{errors?.title?.message}</p>
          <button className="btn-sm btn-primary">Create</button>
          <DevTool control={control} />
        </form>
        <button
          onClick={() => navigate("/admin/categories")}
          className="btn-sm btn-primary"
        >
          next
        </button>
      </div>
    </div>
  );
}
