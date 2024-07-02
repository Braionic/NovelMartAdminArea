import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextInput from "../components/TextInput";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { createBrand } from "../store/features/brand/brandSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export default function AddBrand() {
  const form = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addedBrands = useSelector((state) => state.brand);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  const { iserror, isSuccess, addedBrand, isLoading } = addedBrands;

    useEffect(() => {
     

    if (iserror == true) {
      toast.error("somethig went wrong");
      return navigate("../add-brand", { replace: true });
    }
  }, [iserror]);
  console.log(addedBrands);

  const onsubmit = (data) => {
    dispatch(createBrand(data));
    if (isSuccess && addedBrand) {
      toast.success("Brand added successfully");
      setTimeout(() => {
        navigate("../brand-list", { replace: true });
      }, 3000);
    }
  };

  return (
    <>
      <div>Add Brand</div>
      <form onSubmit={handleSubmit(onsubmit)} noValidate>
        <div>
          <TextInput
            type="text"
            name={"title"}
            placeholder={"brand name"}
            hf={{
              ...register("title", {
                required: {
                  value: true,
                  message: "brand name is required",
                },
                validate: async (fieldValue)=>{
                  const response = await fetch(`http://localhost:1000/api/brand/single?title=${fieldValue}`)
                  const data = await response.json()
                  return data.length == 0 || `${fieldValue} already exist`
                }
              }),
            }}
          />
          <p className="text-danger">{errors?.title?.message}</p>
          <DevTool control={control} />
          <button className="btn-sm btn-primary">Submit</button>
        </div>
      </form>
    </>
  );
}
