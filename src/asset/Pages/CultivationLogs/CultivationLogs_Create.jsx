import React, { useState, useRef } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import axios from "axios";
import { Toast } from "primereact/toast";
import "./CultivationLogs.css";
import { Calendar } from "primereact/calendar";

const emptyProduct = {
  name: "",
  description: "",
  date: new Date(), // Lấy ngày hiện tại dưới dạng chuỗi
};

function YourComponent({ reloadData,herd_id }) {
  const [product, setProduct] = useState(emptyProduct);
  const [errors, setErrors] = useState({});
  const toast = useRef(null);

  const handleChange = (event) => {
    const { value, name } = event.target;

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
      const dateString = product.date; // Giữ nguyên giá trị ngày
      await axios.post(`https://agriculture-traceability.vercel.app/api/v1/cultivation-logs/`, {
        name: product.name,
        description: product.description,
        date: dateString,
        herd: herd_id,
      });
      toast.current.show({
        severity: "success",
        summary: "Thêm hoàn thành",
        life: 3000,
      });
      reloadData();
      setProduct(emptyProduct);
    } catch (error) {
      console.log("Error update:", error);
    }
  };

  const validate = () => {
    let isValid = true;
    const newErrors = {};

    if (!product.name.trim()) {
      newErrors.name = "Name is required.";
      isValid = false;
    }

    if (!product.description.trim()) {
      newErrors.description = "Description is required.";
      isValid = false;
    } else if (product.description.trim().length < 20) {
      newErrors.description =
        "Description must be at least 20 characters long.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  return (
    <div>
      <Toast className="toast" ref={toast} />
      <h4>Tên</h4>
      <InputTextarea
        name="name"
        value={product.name}
        style={{ width: "100%" }}
        onChange={handleChange}
      />
      {errors.name && <small className="p-error">{errors.name}</small>}

      <h4>Mô tả</h4>
      <InputTextarea
        name="description"
        value={product.description}
        autoResize
        style={{ width: "100%" }}
        onChange={handleChange}
      />
      {errors.description && (
        <small className="p-error">{errors.description}</small>
      )}

      <h4>Ngày</h4>
      <Calendar
        inputId="cal_date"
        name="date"
        style={{ width: "100%" }}
        value={product.date}
        onChange={handleChange}
      />
      {errors.date && <small className="p-error">{errors.date}</small>}

      <Button
        className="button_Dia"
        id="Luu"
        label="Lưu"
        severity="success"
        onClick={handleCreate}
      />
    </div>
  );
}

export default YourComponent;
