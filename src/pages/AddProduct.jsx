import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import UploadBox from "../components/UploadBox";
import { Stepper } from "react-form-stepper";
import TextInput from "../components/TextInput";
import { Multiselect } from "react-widgets";
import { set, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useDispatch, useSelector } from "react-redux";
import { CategoryThunk } from "../store/features/category/categorySlice";
import { getBrands } from "../store/features/brand/brandSlice";
import { message } from "antd";
import { getColors } from "../store/features/color/colorSlice";
import Dropzone from "react-dropzone";
import { removeImage, uploadImg } from "../store/features/image/imageSlice";
import { MdDelete } from "react-icons/md";
import { Select, Space } from "antd";
import { addProduct } from "../store/features/product/productSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function AddProduct() {
  const {
    register,
    handleSubmit,
    control,
    formState,
    setValue,
    getValues,
    reset,
  } = useForm();
  const [value, setQValue] = useState("");
  const [selectted, setSelect] = useState();
  const [mycolor, setColor] = useState("");
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const brands = useSelector((state) => state.brand.brands);
  const colors = useSelector((state) => state.color.color);
  const images = useSelector((state) => state.image.images);
  const addedProduct = useSelector((state) => state.product);
  const navigate = useNavigate();

  console.log(images);
  const { errors, isDirty } = formState;
  useEffect(() => {
    dispatch(getBrands());
    dispatch(CategoryThunk());
    dispatch(getColors());
  }, []);

  useEffect(() => {
    if (addedProduct.isError) {
      toast.error("something went wrong !", {
        position: "top-right",
      });
    }
  }, [addedProduct?.isError]);

  useEffect(() => {
    setValue("images", images);
    setValue("description", value);
  }, [images, value]);

  const handleDelete = (id) => {
    dispatch(removeImage(id));
  };
  const handleChange = (value) => {
    setValue("color", value);

    console.log(`selected ${value}`);
  };

  const onsubmit = (data) => {
   
    dispatch(addProduct(data));
    if (addedProduct.isSUccessful && addedProduct.addedProduct) {
      toast.success("uploaded!", {
        position: "top-right",
      });
      reset();
    setValue("images", "");
    setValue("description", "");
    handleDelete(data.images.public_id);
    }
    setTimeout(() => {
      return navigate("/admin/products");
    }, 3000);

    if (addedProduct.isError) {
      toast.error("something went wrong !", {
        position: "top-right",
      });
    }

    return alert(JSON.stringify(data));
  };

  console.log(addedProduct);

  let colorSelect = [];
  for (let index = 0; index < colors?.length; index++) {
    //const element = array[index];
    colorSelect.push({
      label: colors[index].title,
      value: colors[index].title,
    });
  }
  console.log(colorSelect);

  let quantity = [];
  for (let index = 1; index < 10; index++) {
    quantity.push(index);
  }
  console.log(quantity);
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
        <form onSubmit={handleSubmit(onsubmit)} noValidate>
          <TextInput
            label="Product Name"
            type="text"
            placeholder="Enter product name"
            hf={{
              ...register("title", {
                required: {
                  value: true,
                  message: "this field is required",
                },
              }),
            }}
          />
          <p className="text-danger">{errors?.Pname?.message}</p>
          <div className="mb-3">
            <label className="form-check-label" htmlFor="exampleCheck1">
              Upload Product Image
            </label>
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input
                      {...getInputProps()}
                      {...register("images", {
                        required: {
                          value: false,
                          message: "product images in required",
                        },
                      })}
                    />
                    <p className="p-5 bg-info rounded m-2">
                      Drag 'n' drop some images here, or click to select files
                    </p>
                  </div>

                  {images?.map((image, index) => (
                    <div className="position-relative" key={index}>
                      <img
                        src={image.res}
                        className="w-25 h-25 m-1"
                        alt="uploaded pic"
                      />
                      <MdDelete
                        onClick={() => handleDelete(image.public_id)}
                        size={20}
                        className="position-absolute start-0 top-0 m-2"
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  ))}
                </section>
              )}
            </Dropzone>
            <p className="text-danger">{errors?.pImage?.message}</p>
          </div>
          <TextInput
            type="number"
            placeholder="Enter Price"
            label="Price"
            hf={{
              ...register("price", {
                required: {
                  value: true,
                  message: "this field is required",
                },
              }),
            }}
          />
          <p className="text-danger">{errors?.price?.message}</p>
          <div className="mb-3">
            <label className="form-check-label" htmlFor="exampleCheck1">
              Product Discription
            </label>
            <ReactQuill
              id="exampleCheck1"
              theme="snow"
              value={value}
              onChange={setQValue}
              name="description"
            />
          </div>
          <div className="mb-3">
            <label className="form-check-label" htmlFor="exampleCheck1">
              Product Category
            </label>
            <select
              className="form-select"
              aria-label="Default select example"
              defaultValue={"default"}
              {...register("category", {
                required: {
                  value: false,
                  message: "this field is required",
                },
              })}
            >
              <option value={"default"} disabled>
                Open this select menu
              </option>

              {categories?.map((category, index) => (
                <option value={category.title} key={index}>
                  {category.title}
                </option>
              ))}
            </select>
            <p className="text-danger">{errors?.pc?.message}</p>
          </div>
          <div className="mb-3">
            <label className="form-check-label">Select Brand</label>
            <select
              defaultValue={"default"}
              className="form-select"
              aria-label="Default select example"
              {...register("brand", {
                required: {
                  value: true,
                  message: "please select a product brand",
                },
              })}
            >
              <option value={"default"} disabled>
                Choose a brand
              </option>
              {brands?.map((brand, index) => (
                <option value={brand.title} key={index}>
                  {brand.title}
                </option>
              ))}
            </select>
            <p className="text-danger">{errors?.brand?.message}</p>
          </div>
          <div className="mb-3">
            <label className="form-check-label">Quantity</label>
            <select
              className="form-select"
              aria-label="Default select example"
              defaultValue={"default"}
              {...register("quantity", {
                required: {
                  value: true,
                  message: "stock number is required",
                },
              })}
            >
              <option value={"default"} disabled>
                Stock number
              </option>
              {quantity?.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3 form-check w-100">
            <Space
              style={{
                width: "100%",
              }}
              direction="vertical"
            >
              <Select
                {...register("color", {
                  required: {
                    value: true,
                    message: "please select at least one color",
                  },
                })}
                mode="multiple"
                allowClear
                style={{
                  width: "100%",
                }}
                placeholder="Please select"
                onChange={handleChange}
                options={colorSelect}
                className="w-100"
              />
            </Space>
          </div>
          <p className="text-danger">{errors?.colors?.message}</p>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <DevTool control={control} />
        </form>
      </div>
    </>
  );
}
