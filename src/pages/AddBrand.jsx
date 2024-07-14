import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextInput from "../components/TextInput";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import {
  createBrand,
  getOneBrandName,
  revertAll,
  updateBrand,
} from "../store/features/brand/brandSlice";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";


export default function AddBrand() {
  const location = useLocation();
  const paramID = location.pathname?.split("/")[3]
  useEffect(() => {
    if (paramID !== undefined) {
      dispatch(
        getOneBrandName(paramID)
      );
    }else{
      dispatch(revertAll())
    }
  }, [paramID]);
  
  const brandState = useSelector((state) => state.brand.oneBrand?.title);
  const form = useForm({
    defaultValues: { title: brandState },
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addedBrands = useSelector((state) => state.brand);
  
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    control,
    formState: { errors },
  } = form;

  const {updatedBrand, iserror, isSuccess, addedBrand, isLoading } = addedBrands;
  
  useEffect(() => {
    if (isSuccess && addedBrand) {
      toast.success("Brand added successfully");
    }

    if (isSuccess && updatedBrand) {
      toast.success("Brand updated successfully");
    }

    if (iserror == true) {
      toast.error("somethig went wrong");
    }
  }, [iserror, isSuccess, isLoading]);
  
  const onsubmit = (data) => {
    if (paramID) {
      dispatch(
        updateBrand({
          id: paramID,
          title: data.title,
        })
      );
      setTimeout(() => {
        dispatch(revertAll());
        navigate("../brand-list", { replace: true });
      }, 3000);
    } else {
      dispatch(createBrand(data));
      setTimeout(() => {
        dispatch(revertAll());
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
            hf={{
              ...register("title", {
                required: {
                  value: true,
                  message: "brand name is required",
                },
                validate: async (fieldValue) => {
                  const response = await fetch(
                    `http://localhost:1000/api/brand/single?title=${fieldValue}`
                  );
                  const data = await response.json();
                  return data.length == 0 || `${fieldValue} already exist`;
                },
              }),
            }}
          />
          <p className="text-danger">{errors?.title?.message}</p>
          <DevTool control={control} />
          <button className="btn-sm btn-primary">{paramID? "Update Brand": "Submit"}</button>
        </div>
      </form>
    </>
  );
}
