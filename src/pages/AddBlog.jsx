import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Stepper } from "react-form-stepper";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { getBlogCategories } from "../store/features/blogCat/blogCartSlice";
import { useForm } from "react-hook-form";
import { MdDelete } from "react-icons/md";
import { removeImage, uploadImg } from "../store/features/image/imageSlice";
import { DevTool } from "@hookform/devtools";
import { blogPost, revertAll } from "../store/features/blog/blogSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function AddBlog() {
  const form = useForm();
  const [value, setQValue] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const images = useSelector((state) => state.image.images);
  const blogCats = useSelector((state) => state?.blogcat?.blogcatt);
  const newBlogState = useSelector((state) => state.blog);
  const {
    register,
    reset,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = form;
  const { isSuccesfull, isError, createdBlog, isLoading } = newBlogState;
  useEffect(() => {
    dispatch(getBlogCategories());
  }, []);
  useEffect(() => {
    dispatch(revertAll());
  }, []);
  useEffect(() => {
    if (isSuccesfull && createdBlog) {
      toast.success("success");
    }

    if (isError) {
      toast.error("something went wrong");
    }
  }, [isSuccesfull, isError, isLoading]);
  
  useEffect(() => {
    setValue("description", value);
    setValue("images", images);
  }, [value, images]);
  const handleDelete = (id) => {
    dispatch(removeImage(id));
  };
  const onsubmit = (data) => {
    dispatch(blogPost(data));
    reset();
    setValue("images", "");
    setQValue("");
    setValue("description", "");
    handleDelete(data.images.public_id);
    setTimeout(() => {
      dispatch(revertAll());
      return navigate("/admin/blogs", { replace: true });
    }, 3000);
  };

  console.log(blogCats)
  return (
    <>
      <h4>AddBlog</h4>
      <Stepper
        steps={[
          { label: "Add Blog details" },
          { label: "Upload Images" },
          { label: "Finish" },
        ]}
        activeStep={1}
      />
      <div className="form">
        <form onSubmit={handleSubmit(onsubmit)} noValidate>
          <div className="mb-3">
            <label for="exampleInputtitle1" className="form-label">
              Blog title
            </label>
            <input
              type="text"
              name="title"
              {...register("title", {
                required: {
                  value: true,
                  message: "please select your blog category",
                },
              })}
              className="form-control"
              id="exampleInputtitle1"
              aria-describedby="titleHelp"
            />
            <p className="text-danger">{errors?.title?.message}</p>
          </div>
          <div className="mb-3">
            <label className="form-check-label">Select category</label>
            <select
              defaultValue={"default"}
              className="form-select"
              aria-label="Default select example"
              {...register("category", {
                required: {
                  value: false,
                  message: "please select your blog category",
                },
              })}
            >
              <option value={"default"} disabled>
                select category
              </option>
              {Object.values(blogCats).map((blogCat, index) => (
                <option value={blogCat?.title} key={index}>
                  {blogCat.title}
                </option>
              ))}
            </select>
            <p className="text-danger">{errors?.brand?.message}</p>
          </div>
          <div className="mb-3">
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
                          message: "blog images in required",
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
            <p className="text-red">{errors?.images?.message}</p>
          </div>

          <div className="mb-3">
            <ReactQuill
              theme="snow"
              name="description"
              value={value}
              onChange={setQValue}
            />
            ;
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <DevTool control={control} />
        </form>
      </div>
    </>
  );
}
