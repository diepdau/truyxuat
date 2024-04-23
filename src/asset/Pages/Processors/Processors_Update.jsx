import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import axios from "axios";
import { Toast } from "primereact/toast";
import "./Processors.css";
import { Calendar } from "primereact/calendar";
import ImageUploader from "../../../components/Images/Image";

const emptyProduct = {
  name: "",
  location: "",
  date: "",
};

function YourComponent({ data, reloadData, isProductPatchs }) {
  const [product, setProduct] = useState(data || emptyProduct);
  const [errors, setErrors] = useState({});
  const toast = useRef(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleCreate = async () => {
    if (!validate()) {
      return;
    }

    try {
      const response = await axios.patch(`/processors/${data._id}`, product);
      toast.current.show({
        severity: "success",
        summary: "Sửa hoàn thành",
        life: 3000,
      });
      reloadData();
      setProduct(response.data);
    } catch (error) {
      console.log("Error update:", error);
    }
  };

  const validate = () => {
    let isValid = true;
    const newErrors = {};

    setErrors(newErrors);
    return isValid;
  };

  const parsedDate = product.date ? new Date(product.date) : null;

  return (
    <div>
      <div className="container_update">
        <div style={{ flex: 1, paddingRight: "1rem" }}>
          <Toast className="toast" ref={toast} />

          <h4>Nơi xử lý đóng gói</h4>
          <InputText
            name="name"
            value={product.name}
            autoResize
            style={{ width: "100%" }}
            onChange={handleChange}
          />
          {errors.name && <small className="p-error">{errors.name}</small>}

          <h4>Địa điểm</h4>
          <InputText
            name="location"
            value={product.location}
            autoResize
            style={{ width: "100%" }}
            onChange={handleChange}
          />
          {errors.location && (
            <small className="p-error">{errors.location}</small>
          )}

          <h4>Ngày</h4>
          <Calendar
            inputId="cal_date"
            name="date"
            style={{ width: "100%" }}
            value={parsedDate}
            onChange={handleChange}
          />
          {errors.date && <small className="p-error">{errors.date}</small>}
        </div>

        {/* Cột phải */}
        <div style={{ flex: 1 }}>
        <h4>Hình ảnh</h4>
          <ImageUploader images={product.images} />
        </div>
      </div>
      {isProductPatchs && (
        <Button
          className="button_Dia"
          id="Save"
          label="Lưu"
          severity="success"
          onClick={handleCreate}
        />
      )}
    </div>
  );
}

export default YourComponent;
