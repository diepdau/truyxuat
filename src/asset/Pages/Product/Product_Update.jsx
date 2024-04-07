import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import axios from "axios";
import { Toast } from "primereact/toast";
import "./Product.css";
import { Calendar } from "primereact/calendar";
import { InputTextarea } from "primereact/inputtextarea";

const emptyProduct = {
  unit: "",
  _id: "",
  name: "",
  description: "",
  price: 0,
  production_date: "",
  expiration_date: "",
  storage_method: "",
  info: "",
};

function YourComponent({ data, reloadData }) {
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
      const response = await axios.patch(`/products/${data._id}`, product);
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

    if (!product.name) {
      newErrors.name = "Name is required.";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  return (
    <div>
      <div className="container_update">
        <div style={{ flex: 1, paddingRight: "1rem" }}>
          <Toast className="toast" ref={toast} />

          <h4>Tên</h4>
          <InputText
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
          <h4>Giá</h4>
          <InputText
            name="price"
            type="number"
            value={product.price}
            autoResize
            style={{ width: "100%" }}
            onChange={handleChange}
          />
          <h4>Đơn vị</h4>
          <InputText
            name="unit"
            value={product.unit}
            autoResize
            style={{ width: "100%" }}
            onChange={handleChange}
          />
        </div>

        {/* Cột phải */}
        <div style={{ flex: 1 }}>
          <h4>Ngày sản xuất</h4>
          <Calendar
            inputId="cal_production_date"
            name="production_date"
            style={{ width: "100%" }}
            value={new Date(product.production_date)}
            onChange={handleChange}
          />

          <h4>Ngày hết hạn</h4>
          <Calendar
            inputId="cal_expiration_date"
            name="expiration_date"
            style={{ width: "100%" }}
            value={new Date(product.expiration_date)}
            onChange={handleChange}
          />

          <h4>Phương pháp bảo quản</h4>
          <InputTextarea
            name="storage_method"
            value={product.storage_method}
            autoResize
            style={{ width: "100%" }}
            onChange={handleChange}
          />

          {/* <h4>Thông tin</h4>
          <InputText
            name="info"
            value={product.info}
            autoResize
            style={{ width: "100%" }}
            onChange={handleChange}
          /> */}
        </div>
      </div>
      <Button
        className="button_Dia"
        id="Save"
        label="Lưu"
        severity="success"
        onClick={handleCreate}
      />
    </div>
  );
}

export default YourComponent;
