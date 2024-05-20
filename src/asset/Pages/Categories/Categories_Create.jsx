import React, { useState, useRef, useContext } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import ImageUploader from "../../../components/Images/Image";
import { handleCreate, handleUpdate } from "../../service/categories_data.js";
import { AuthContext } from "../../service/user_service.js";
const emptyData = {
  name: "",
  description: "",
};

function YourNewComponent({ reloadData, data, isUpdate }) {
  const { token } = useContext(AuthContext);
  const [formData, setFormData] = useState(data || emptyData);
  const [errors, setErrors] = useState({});
  const toast = useRef(null);
  const images = isUpdate ? data.images : [];
  var url = isUpdate
    ? `https://agriculture-traceability.vercel.app/api/v1/categories/upload/${data._id}`
    : "";
  const handleChange = (event) => {
    const { value, name } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handle = async () => {
    if (!validate()) {
      return;
    }
    try {
      if (data) {
        const res = handleUpdate(data._id, formData, token);
        reloadData();
        toast.current.show({
          severity: "success",
          summary: "Sửa hoàn thành",
          life: 3000,
        });
        setFormData(res);
      } else {
        handleCreate(formData, token);
        reloadData();
        toast.current.show({
          severity: "success",
          summary: "Thêm hoàn thành",
          life: 3000,
        });
        setFormData(emptyData);
      }
      reloadData();
      reloadData();
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const validate = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.name && formData.name === "") {
      newErrors.name = "Tên nhóm là bắt buộc.";
      isValid = false;
    }

    if (!formData.description && formData.description === "") {
      newErrors.description = "Mô tả là bắt buộc.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  return (
    <div>
      <Toast className="toast" ref={toast} />
      <div className="container_update_areas">
        <div style={{ flex: 1, paddingRight: "1rem" }}>
          {/* Cột trái */}

          <h4>Tên nhóm</h4>
          <InputTextarea
            name="name"
            value={formData.name}
            style={{ width: "100%" }}
            onChange={handleChange}
          />
          {errors.name && <small className="p-error">{errors.name}</small>}
          <h4>Mô tả</h4>
          <InputTextarea
            name="description"
            value={formData.description}
            style={{ width: "100%" }}
            onChange={handleChange}
            autoResize
          />
          {errors.description && (
            <small className="p-error">{errors.description}</small>
          )}
          <Button
            className="button_Dia"
            id="Save"
            label={isUpdate ? "Cập nhật" : "Lưu"}
            severity="success"
            onClick={handle}
          />
        </div>

        {isUpdate ? (
          <>
            <div style={{ flex: 1 }}>
              <h4 style={{ fontWeight: "bold" }}>Hình ảnh</h4>
              <ImageUploader
                uploadUrl={url}
                images={images}
                reloadData={reloadData}
              />
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default YourNewComponent;
