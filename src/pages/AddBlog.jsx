import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import UploadBox from "../components/UploadBox";
import { Stepper } from "react-form-stepper";

export default function AddBlog() {
  const [value, setValue] = useState("");
  return (
    <>
      <h4>AddBlog</h4>
      <Stepper
        steps={[{ label: "Add Blog details" }, { label: "Upload Images" }, { label: "Finish" }]}
        activeStep={1}
      />
      <div className="form">
        <form>
        <div className="mb-3">
            <UploadBox />
          </div>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3">
            <ReactQuill theme="snow" value={value} onChange={setValue} />;
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" for="exampleCheck1">
              Check me out
            </label>
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
