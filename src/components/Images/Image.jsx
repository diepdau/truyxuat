import React, { useRef ,useContext} from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Galleria } from "primereact/galleria";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { AuthContext } from "../../asset/service/user_service.js";
import "./Image.css";
const ImageUploader = ({ uploadUrl, images, reloadData }) => {
  const { token } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const toast = useRef(null);
  const upLoadImage = async (data) => {
    const formData = new FormData();
    for (const file of data.file) {
      formData.append("images", file);
    }
    try {
      await axios.patch(uploadUrl, formData,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
      toast.current.show({
        severity: "success",
        summary: "Đã thêm hình",
        life: 3000,
      });
      reloadData();
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
      <Toast className="toast" ref={toast} />
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
      <form
        className="input_file"
        encType="multipart/formdata"
        onSubmit={handleSubmit(upLoadImage)}
      >
        <InputText className="input_file2"  type="file" multiple {...register("file")} />
        <InputText className="input_file1" type="submit" value="Thêm" />
      </form>
    </div>
  );
};

export default ImageUploader;

