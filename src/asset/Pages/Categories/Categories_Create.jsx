import React, { useState, useRef } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import axios from "axios";
import { Toast } from "primereact/toast";
import ImageUploader from "../../../components/Images/Image";

const emptyData = {
  name: "",
  description: "",
  slug: "",
};

function YourNewComponent({ reloadData, data, isUpdate }) {
  const [formData, setFormData] = useState(data || emptyData);
  const [errors, setErrors] = useState({});
  const toast = useRef(null);
  const images = isUpdate ? data.images : [];
  var url = isUpdate ? `/categories/upload/${data._id}`: "";
  const handleChange = (event) => {
    const { value, name } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleCreate = async () => {
    if (!validate()) {
      return;
    }
    try {
      if (data) {
        const res = await axios.patch(`/categories/${data._id}`, formData);
        toast.current.show({
          severity: "success",
          summary: "Sửa hoàn thành",
          life: 3000,
        });

        setFormData(res.data);
      } else {
        await axios.post(`/categories`, formData);
        toast.current.show({
          severity: "success",
          summary: "Thêm hoàn thành",
          life: 3000,
        });
        setFormData(emptyData);
      }
      reloadData();
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const validate = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = "Name is required.";
      isValid = false;
    }

    if (!formData.description) {
      newErrors.description = "Description is required.";
      isValid = false;
    }

    if (!formData.slug) {
      newErrors.slug = "Slug is required.";
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
          <h4>Slug</h4>
          <InputTextarea
            name="slug"
            value={formData.slug}
            style={{ width: "100%" }}
            onChange={handleChange}
          />
          {errors.slug && <small className="p-error">{errors.slug}</small>}
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
        onClick={handleCreate}
      />
        </div>
       
        {isUpdate ?
        <>
        <div style={{ flex: 1 }}>
        <h4 style={{fontWeight:"bold"}}>Hình ảnh</h4>
           <ImageUploader uploadUrl={url} images={images} reloadData={reloadData} /> 
        </div></>: ""}
      </div>
      
    </div>
  );
}

export default YourNewComponent;
