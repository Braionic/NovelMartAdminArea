import React, { useEffect, useState } from "react";
import Textinput from "../components/TextInput";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  createCoupon,
  getOneCoupon,
  revertAll,
} from "../store/features/coupon/couponSlice";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

export default function AddCoupon() {
  const couponState = useSelector((state) => state.coupon);
  const { isLoading, isSuccess, isError, createdCoupon, oneCoupon } =
    couponState;

  const form = useForm({
    defaultValues: {
      title: oneCoupon || "",
      discount: "",
      date: "",
    },
  });

  const {
    control,
    setValue,
    register,
    handleSubmit,
    formState: { isDirty, errors },
  } = form;
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split("/")[3];

  useEffect(() => {
    if (id) {
      dispatch(getOneCoupon(id));
      //dispatch(revertAll())
    } else {
      dispatch(revertAll());
    }
  }, [isSuccess]);

  console.log(oneCoupon, "trigger")
  useEffect(() => {
    if (isSuccess && createdCoupon) {
      toast.success("coupon created successully");
    }

    if (isError) {
      toast.error("an error occured");
    }
  }, [isSuccess, isLoading, isError]);

  console.log(isLoading, isSuccess, "coupon state");

  useState(() => {
    if (oneCoupon) {
      setValue("title", oneCoupon?.title);
    }
  }, [oneCoupon, isLoading]);

  function onsubmit(data) {
    console.log(data);
    dispatch(createCoupon(data));
    setTimeout(() => {
      dispatch(revertAll());
      return navigate("/admin/list-coupons", { replace: true });
    }, 4000);
  }

  return (
    <div>
      <h3>{id ? "Edit" : "Add"} Coupon</h3>

      <div className="form">
        <form onSubmit={handleSubmit(onsubmit)} noValidate>
          <Textinput
            label={"Coupon Title"}
            hf={{
              ...register("title", {
                required: {
                  value: true,
                  message: "coupon code is required",
                },
                validate: async (fieldValue) => {
                  const response = await axios.get(
                    `http://localhost:1000/api/coupon/single?title=${fieldValue}`
                  );
                  return (
                    response?.data?.length !== 0 ||
                    `${fieldValue} already exists`
                  );
                },
              }),
            }}
          />
          {<p className="text-danger">{errors?.title?.message}</p>}
          <Textinput
            label={"Discount"}
            type="number"
            hf={{ ...register("discount") }}
          />
          {<p className="text-danger">{errors?.discount?.message}</p>}
          <Textinput
            type="date"
            label={"Expiry Date"}
            hf={{
              ...register("expires", {
                required: {
                  value: true,
                  message: "date is required",
                },
              }),
            }}
          />
          {<p className="text-danger">{errors?.expires?.message}</p>}
          <button className="btn btn-success">Submit</button>
          <DevTool control={control} />
        </form>
      </div>
    </div>
  );
}
