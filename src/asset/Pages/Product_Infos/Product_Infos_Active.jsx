import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import axios from "axios";
import { Toast } from "primereact/toast";
import "./Product_Infos.css";
import { InputTextarea } from "primereact/inputtextarea";

const emptyProduct = {
  _id: "",
  name: "",
  description: "",
  storage_method: "",
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
  const handleCreate = async () => {
    if (!validate()) {
      return;
    }

    try {
      if (data) {
        await axios.patch(`/product-infos/${data._id}`, product);
        toast.current.show({
          severity: "success",
          summary: "Sửa hoàn thành",
          life: 3000,
        });
        setProduct({
          ...product,
        });
      } else {
        await axios.post(`/product-infos`, product);
        toast.current.show({
          severity: "success",
          summary: "Thêm hoàn thành",
          life: 3000,
        });
        setProduct(emptyProduct);
      }
      reloadData();
    } catch (error) {
      console.log("Error update:", error);
    }
  };

  const validate = () => {
    let isValid = true;
    const newErrors = {};

    // Validate name
    if (!product.name || product.name.trim() === "") {
      newErrors.name = "Tên không được để trống";
      isValid = false;
    }

    // Validate description
    if (!product.description || product.description.trim() === "") {
      newErrors.description = "Mô tả không được để trống";
      isValid = false;
    }

    // Validate storage method
    if (!product.storage_method || product.storage_method.trim() === "") {
      newErrors.storage_method = "Phương pháp bảo quản không được để trống";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  return (
    <div>
      <Toast className="toast" ref={toast} />
      <div className="container_update">
        <div style={{ flex: 1, paddingRight: "1rem" }}>
          <h4>Thông tin sản phẩm</h4>
          <InputText
            name="name" value={product.name}
            autoResize
            style={{ width: "100%" }}
            onChange={handleChange}
          />
          {errors.name && <small className="p-error">{errors.name}</small>}

          <h4>Phương pháp bảo quản</h4>
          <InputTextarea
         
            name="storage_method" value={product.storage_method}
            autoResize
            style={{ width: "100%" }}
            onChange={handleChange}
          />
          {errors.storage_method && (
            <small className="p-error">{errors.storage_method}</small>
          )}
          <Button
            className="button_Dia"
            id="Save"
            label={isUpdate ? "Cập nhật" : "Lưu"}
            severity="success"
            onClick={handleCreate}
          />
        </div>
        <div style={{ flex: 1 }}>
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
        </div>
      </div>
    </div>
  );
}

export default YourComponent;
