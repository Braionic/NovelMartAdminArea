import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getColors } from "../store/features/color/colorSlice";
import TextInput from "../components/TextInput";
import { useForm } from "react-hook-form";

export default function Color() {
  const form = useForm();
  const dispatch = useDispatch();
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
    return window.alert(JSON.stringify(data));
  };
  return (
    <div>
      <h3>Add color</h3>

      <div className="form-container">
        <form onSubmit={handleSubmit(onsubmit)} noValidate>
          <div className="title-input">
            <TextInput
              type="color"
              hf={{
                ...register("color", {
                  required: {
                    value: true,
                    message: "color is required",
                  },
                }),
              }}
            />
            <p className="text-danger">{errors?.color?.message}</p>
            <button className="btn-sm btn-primary">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}
