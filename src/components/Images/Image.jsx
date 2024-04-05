import React, { useRef } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Galleria } from "primereact/galleria";

const ImageUploader = ({ uploadUrl, images }) => {
  const { register, handleSubmit } = useForm();
  const toast = useRef(null);

  const upLoadImage = async (data) => {
    const formData = new FormData();
    for (const file of data.file) {
      formData.append("images", file);
    }
    console.log(formData);
    try {
      await axios.patch(uploadUrl, formData);
      // toast.current.show({
      //   severity: "success",
      //   summary: "Đã thêm hình",
      //   life: 3000,
      // });
    } catch (error) {
      console.log("Error img:", error);
    }
  };

  const thumbnailTemplate = (item) => (
    <img
      src={item.path}
      alt={item.name}
      style={{ width: "50%", overflow: "hidden", maxHeight: "200px" }}
    />
  );

  const thumbnail = (item) => (
    <img
      src={item.path}
      alt={item.name}
      style={{ width: "100%", overflow: "hidden", maxHeight: "400px" }}
    />
  );

  return (
    <div>
      <Galleria
        className="Image_animals"
        value={images}
        numVisible={5}
        circular
        showItemNavigators
        showItemNavigatorsOnHover
        showIndicators
        showThumbnails={false}
        style={{ maxWidth: "640px" }}
        item={thumbnail}
        thumbnail={thumbnailTemplate}
      />
      <div className=" updateimage">
        <form encType="multipart/formdata" onSubmit={handleSubmit(upLoadImage)}>
          <input type="file" multiple {...register("file")} />
          <input type="submit" />
        </form>
      </div>
    </div>
  );
};

export default ImageUploader;