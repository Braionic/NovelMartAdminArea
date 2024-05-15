import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useSelector, useDispatch } from "react-redux";


export default function Form({ handleAdmin }) {
  const { register, control, handleSubmit, formState } = useForm({
    mode: "onChange",
  });
  const {user, isLoading, error} = useSelector((state) => state.user)
  const { errors } = formState;
  //handles the submit
  function mySubmit(data) {
    console.log(data)
    handleAdmin(data);
  }
  return (
    <div>
      <form onSubmit={handleSubmit(mySubmit)} noValidate>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            {...register("email", {
              required: "bro please the emai field is required",
              pattern: {
                value:
                  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
                message: "invalid email field",
              },
              validate: {
                notAdmin: (value) => {
                  return (
                    value !== "admin@gmail.com" || "this email is not allowed"
                  );
                },
                notAdminYahoo: (value) => {
                  return (
                    value !== "admin@yahoo.com" ||
                    "this email is also reserved for admins"
                  );
                },
              },
            })}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
          <p>{errors?.email?.message}</p>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            {...register("password", {
              required: "the password field is also required",
            })}
          />
          <p className="text-danger" style={{ backgroundColor: "black" }}>
            {" "}
            {errors?.password?.message}
          </p>
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          {isLoading? "wait": "Proceed"}
        </button>
      </form>
      <DevTool control={control} />
    </div>
  );
}
