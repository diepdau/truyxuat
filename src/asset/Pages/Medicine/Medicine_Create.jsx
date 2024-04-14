import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import axios from "axios";
import { Toast } from "primereact/toast";
import "./Medicine.css";
import { InputTextarea } from "primereact/inputtextarea";

const emptyProduct = {
  name: "",
  description: "",
  ingredients: "",
  usage_instruction: "",
  toxicity: "",
  dosage: "",
  isolation: "",
  recommendation: "",
  certificate: "",
};

function YourComponent({ data, reloadData, isUpdate }) {
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

  const handleSave = async () => {
    if (!validate()) {
      return;
    }

    try {
      let response;
      if (data) {
        response = await axios.patch(`/medicines/${data._id}`, product);
        toast.current.show({
          severity: "success",
          summary: "Sửa hoàn thành",
          life: 3000,
        });
        setProduct(response.data);
      } else {
        response = await axios.post(`/medicines/`, product);
        toast.current.show({
          severity: "success",
          summary: "Thêm hoàn thành",
          life: 3000,
        });
        setProduct(emptyProduct);
      }
      reloadData();
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const validate = () => {
    let isValid = true;
    const newErrors = {};

    if (!product.name) {
      newErrors.name = "Name is required.";
      isValid = false;
    }
    if (!product.description) {
      newErrors.description = "Description is required.";
      isValid = false;
    }
    if (!product.ingredients) {
      newErrors.ingredients = "Ingredients is required.";
      isValid = false;
    }
    if (!product.usage_instruction) {
      newErrors.usage_instruction = "Usage_instruction is required.";
      isValid = false;
    }
    if (!product.toxicity) {
      newErrors.toxicity = "Toxicity is required.";
      isValid = false;
    }
    if (!product.dosage) {
      newErrors.dosage = "Dosage is required.";
      isValid = false;
    }
    if (!product.isolation) {
      newErrors.isolation = "isolation is required.";
      isValid = false;
    }
    if (!product.recommendation) {
      newErrors.recommendation = "recommendation is required.";
      isValid = false;
    }
    if (!product.certificate) {
      newErrors.certificate = "certificate is required.";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  return (
    <div>
      <div style={{ display: "flex", gap: "2rem" }}>
        {/* Cột trái */}
        <div style={{ flex: 1 }}>
          <div>
            <Toast className="toast" ref={toast} />

            <h4>Tên</h4>
            <InputText
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
            <h4>Thành phần</h4>
            <InputTextarea
              name="ingredients"
              value={product.ingredients}
              autoResize
              style={{ width: "100%" }}
              onChange={handleChange}
            />
            {errors.ingredients && (
              <small className="p-error">{errors.ingredients}</small>
            )}
            <h4>Hướng dẫn sử dụng</h4>
            <InputTextarea
              name="usage_instruction"
              value={product.usage_instruction}
              autoResize
              style={{ width: "100%" }}
              onChange={handleChange}
            />
            {errors.usage_instruction && (
              <small className="p-error">{errors.usage_instruction}</small>
            )}
          </div>
        </div>
        {/* Cột phải */}
        <div style={{ flex: 1 }}>
          <div>
            <h4>Độ độc</h4>
            <InputTextarea
              name="toxicity"
              value={product.toxicity}
              autoResize
              style={{ width: "100%" }}
              onChange={handleChange}
            />
            {errors.toxicity && (
              <small className="p-error">{errors.toxicity}</small>
            )}
            <h4>Liều lượng</h4>
            <InputTextarea
              name="dosage"
              value={product.dosage}
              autoResize
              style={{ width: "100%" }}
              onChange={handleChange}
            />
            {errors.dosage && (
              <small className="p-error">{errors.dosage}</small>
            )}
            <h4>Cách ly</h4>
            <InputTextarea
              name="isolation"
              value={product.isolation}
              autoResize
              style={{ width: "100%" }}
              onChange={handleChange}
            />
            {errors.isolation && (
              <small className="p-error">{errors.isolation}</small>
            )}
            <h4>Khuyến nghị</h4>
            <InputTextarea
              name="recommendation"
              value={product.recommendation}
              autoResize
              style={{ width: "100%" }}
              onChange={handleChange}
            />
            {errors.recommendation && (
              <small className="p-error">{errors.recommendation}</small>
            )}
            <h4>Giấy phép</h4>
            <InputTextarea
              name="certificate"
              value={product.certificate}
              autoResize
              style={{ width: "100%" }}
              onChange={handleChange}
            />
            {errors.certificate && (
              <small className="p-error">{errors.certificate}</small>
            )}
          </div>
        </div>
      </div>
      <Button
        className="button_Dia"
        id="Save"
        label={data ? "Cập nhật" : "Thêm mới"}
        severity="success"
        onClick={handleSave}
      />
    </div>
  );
}

export default YourComponent;
