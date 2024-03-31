import React, { useState, useRef } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import axios from "axios";
import { Toast } from "primereact/toast";
import "./Diseases.css"
const emptyProduct = {
  name: "",
  description: "",
  symptoms: "",
  preventive_measures: "",
};

function YourComponent() {
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
      await axios.post(`/diseases/`, {
        name: product.name,
        description: product.description,
        symptoms: product.symptoms,
        preventive_measures: product.preventive_measures,
      });

      toast.current.show({
        severity: "success",
        summary: "Thêm hoàn thành",
        life: 3000,
      });

      setProduct(emptyProduct);
    } catch (error) {
      console.log("Error update:", error);
    }
  };

  const validate = () => {
    let isValid = true;
    const newErrors = {};

    // Kiểm tra lỗi cho trường name
    if (!product.name.trim()) {
      newErrors.name = "Name is required.";
      isValid = false;
    } else if (product.name.trim().length < 10) {
      newErrors.symptoms = "Name must be at least 10 characters long.";
      isValid = false;
    }

    // Kiểm tra lỗi cho trường description
    if (!product.description.trim()) {
      newErrors.description = "Description is required.";
      isValid = false;
    } else if (product.description.trim().length < 20) {
      newErrors.description =
        "Description must be at least 20 characters long.";
      isValid = false;
    }

    // Kiểm tra lỗi cho trường symptoms
    if (!product.symptoms.trim()) {
      newErrors.symptoms = "Symptoms is required.";
      isValid = false;
    } else if (product.symptoms.trim().length < 20) {
      newErrors.symptoms = "Symptoms must be at least 20 characters long.";
      isValid = false;
    }

    // Kiểm tra lỗi cho trường preventive_measures
    if (!product.preventive_measures.trim()) {
      newErrors.preventive_measures = "Preventive measures is required.";
      isValid = false;
    } else if (product.preventive_measures.trim().length < 20) {
      newErrors.preventive_measures =
        "Preventive measures must be at least 20 characters long.";
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
        autoResize
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

      <h4>Triệu chứng</h4>
      <InputTextarea
        name="symptoms"
        value={product.symptoms}
        autoResize
        style={{ width: "100%" }}
        onChange={handleChange}
      />
      {errors.symptoms && <small className="p-error">{errors.symptoms}</small>}

      <h4>Biện pháp phòng ngừa</h4>
      <InputTextarea
        name="preventive_measures"
        value={product.preventive_measures}
        autoResize
        style={{ width: "100%" }}
        onChange={handleChange}
      />
      {errors.preventive_measures && (
        <small className="p-error">{errors.preventive_measures}</small>
      )}

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
