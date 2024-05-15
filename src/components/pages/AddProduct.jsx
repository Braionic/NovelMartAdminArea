import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import UploadBox from "../UploadBox";
import { Stepper } from "react-form-stepper";
import TextInput from "../TextInput";

export default function AddProduct() {
  const [value, setValue] = useState("");
  return (
    <>
      <h4>Add a Product</h4>
      <Stepper
        steps={[
          { label: "Add Product Details" },
          { label: "Upload Images" },
          { label: "Finish" },
        ]}
        activeStep={1}
      />
      <div className="form">
        <form>
          <TextInput
            label="Product Name"
            type="text"
            placeholder="Enter Price"
          />
          <div className="mb-3">
            <label className="form-check-label" for="exampleCheck1">
              Upload Product Image
            </label>
            <UploadBox id="form-check-label" />
          </div>
          <TextInput type="text" placeholder="Enter Price" label="Price" />
          <div className="mb-3">
            <label className="form-check-label" for="exampleCheck1">
              Product Discription
            </label>
            <ReactQuill
              id="exampleCheck1"
              theme="snow"
              value={value}
              onChange={setValue}
            />
            ;
          </div>
          <div className="mb-3">
            <label className="form-check-label" for="exampleCheck1">
              Product Category
            </label>
            <select class="form-select" aria-label="Default select example">
              <option selected>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-check-label">Select Brand</label>
            <select class="form-select" aria-label="Default select example">
              <option selected>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div className="mb-3 form-check">
            <TextInput type="color" label="Color" />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
