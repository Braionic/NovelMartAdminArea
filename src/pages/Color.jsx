import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createColor, getColors } from "../store/features/color/colorSlice";
import TextInput from "../components/TextInput";
import { useForm } from "react-hook-form";
import axios from "axios"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Color() {
  const form = useForm({
    defaultValues:{
      title: ""
    }
  });
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const color = useSelector((state) => state.color);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  console.log(color);
  useEffect(() => {
    dispatch(getColors());
  }, []);

  const onsubmit = (data) => {
    dispatch(createColor(data))
    if(color.isSuccessfull && color.createdColor
    ){
      toast.success("color created successfully")
      navigate("/admin/color-list", {replace: true})
    }
  
    return 
  };
  return (
    <div>
      <h3>Add color</h3>

      <div className="form-container">
        <form onSubmit={handleSubmit(onsubmit)} noValidate>
          <div className="title-input">
            <TextInput
              type="color"
              name={"title"}
              hf={{
                ...register("title", {
                  required: {
                    value: true,
                    message: "color is required",
                  },
                  validate: async (fieldValue) => {
                    const response = await fetch(`http://localhost:1000/api/color/single?title=${fieldValue}`)
                    const data = await response.json()
                    return !data?.length == 0 || `${fieldValue} already exists`
                  },
                }),
              }}
            />
            <p className="text-danger">{errors?.title?.message}</p>
            <button className="btn-sm btn-primary">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}
