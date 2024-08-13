import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextInput from "../components/TextInput";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import {
  createTag,
  getOneTagName,
  revertAll,
  updateTag,
} from "../store/features/tag/tagSlice";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";


export default function AddTag() {
  const location = useLocation();
  const paramID = location.pathname?.split("/")[3]
  useEffect(() => {
    if (paramID !== undefined) {
      dispatch(
        getOneTagName(paramID)
      );
    }else{
      dispatch(revertAll())
    }
  }, [paramID]);
  
  const tagState = useSelector((state) => state.tag.oneTag?.title);
  const form = useForm({
    defaultValues: { title: "" },
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addedTags = useSelector((state) => state.tag);
  
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    control,
    formState: { errors },
  } = form;

  const {updatedTag, iserror, isSuccess, addedTag, isLoading } = addedTags;
  
  useEffect(() => {
    if (isSuccess && addedTag) {
      toast.success("Tag added successfully");
    }

    if (isSuccess && updatedTag) {
      toast.success("Tag updated successfully");
    }

    if (iserror == true) {
      toast.error("somethig went wrong");
    }
  }, [iserror, isSuccess, isLoading]);
  
  const onsubmit = (data) => {
    if (paramID) {
      dispatch(
        updateTag({
          id: paramID,
          title: data.title,
        })
      );
      setTimeout(() => {
        dispatch(revertAll());
        navigate("../tag-list", { replace: true });
      }, 3000);
    } else {
      dispatch(createTag(data));
      setTimeout(() => {
        dispatch(revertAll());
        navigate("../tag-list", { replace: true });
      }, 3000);
      
    }
    
  };

  return (
    <>
      <h3 className="text-center">Add Product Tag</h3>
      <form onSubmit={handleSubmit(onsubmit)} noValidate>
        <div>
          <TextInput
            type="text"
            label={"Title"}
            name={"title"}
            hf={{
              ...register("title", {
                required: {
                  value: true,
                  message: "Tag name is required",
                },
                validate: async (fieldValue) => {
                  const response = await fetch(
                    `http://localhost:1000/api/tag/single?title=${fieldValue}`
                  );
                  const data = await response.json();
                  return data.length == 0 || `${fieldValue} already exist`;
                },
              }),
            }}
          />
          <p className="text-danger">{errors?.title?.message}</p>
          <DevTool control={control} />
          <button className="btn-sm btn-primary">{paramID? "Update Tag": "Submit"}</button>
        </div>
      </form>
    </>
  );
}
