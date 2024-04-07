import React, { useState, useRef } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import axios from "axios";
import { Toast } from "primereact/toast";
import "./FarmingAreas.css";
import { InputText } from "primereact/inputtext";
import Map123 from "../../../components/Map/Map";

const emptyData = {
  name: "",
  description: "",
  area: "",
  address: "",
  coordinates: [0, 0],
};

function YourNewComponent({ reloadData, data, isUpdate }) {
  const [formData, setFormData] = useState(data || emptyData);
  const [errors, setErrors] = useState({});
  const toast = useRef(null);
  const coo = isUpdate ? data.coordinates : [];

  const handleChange = (event) => {
    const { value, name } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  function convertStringArrayToNumberArray(arr) {
    return arr.split(",").map((item) => parseFloat(item, 10));
  }
  const handleCreate = async () => {
    if (!validate()) {
      return;
    }
    formData.coordinates = convertStringArrayToNumberArray(
      formData.coordinates
    );
    try {
      if (data) {
        const res = await axios.patch(`/farm/${data._id}`, formData);
        toast.current.show({
          severity: "success",
          summary: "Sửa hoàn thành",
          life: 3000,
        });
        reloadData();
        setFormData(res.data);
      } else {
        await axios.post(`/farm`, formData);
        toast.current.show({
          severity: "success",
          summary: "Thêm hoàn thành",
          life: 3000,
        });
        setFormData(emptyData);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const validate = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
      isValid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required.";
      isValid = false;
    }

    if (!formData.area) {
      newErrors.area = "Area is required.";
      isValid = false;
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required.";
      isValid = false;
    }

    if (!formData.coordinates) {
      newErrors.coordinates = "Coordinates are required.";
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

          <h4>Trang trại</h4>
          <InputTextarea
            name="name"
            value={formData.name}
            style={{ width: "100%" }}
            onChange={handleChange}
          />
          {errors.name && <small className="p-error">{errors.name}</small>}
          <h4>Diện tích</h4>
          <InputText
            type="number"
            name="area"
            value={formData.area}
            style={{ width: "100%" }}
            onChange={handleChange}
          />
          {errors.area && <small className="p-error">{errors.area}</small>}
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
        </div>
        {/* Cột phải */}
        <div style={{ flex: 1 }}>
          <h4>Địa chỉ</h4>
          <InputTextarea
            name="address"
            value={formData.address}
            style={{ width: "100%" }}
            onChange={handleChange}
          />
          {errors.address && (
            <small className="p-error">{errors.address}</small>
          )}

          <h4>Tọa độ</h4>
          <InputText
            type="text"
            name="coordinates"
            value={formData.coordinates}
            style={{ width: "100%" }}
            onChange={handleChange}
          />
          {errors.coordinates && (
            <small className="p-error">{errors.coordinates}</small>
          )}
          {isUpdate ? <Map123 coordinates={coo} nameAres={data.address} /> : ""}
        </div>
      </div>
      <Button
        className="button_Dia"
        id="Save"
        label={isUpdate ? "Cập nhật" : "Lưu"}
        severity="success"
        onClick={handleCreate}
      />
    </div>
  );
}

export default YourNewComponent;
