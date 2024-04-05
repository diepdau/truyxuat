import React, { useState, useRef, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import axios from "axios";
import { Toast } from "primereact/toast";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
const emptyProduct = {

  unit: "",
  date: null,
};

function YourComponent({ data }) {
  const [product, setProduct] = useState(data || emptyProduct);
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
      const response = await axios.patch(`/harvests/${product._id}`, product);
      toast.current.show({
        severity: "success",
        summary: "Sửa hoàn thành",
        life: 3000,
      });
      setProduct(response.data);
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
    }

    // Kiểm tra lỗi cho trường description
    if (!product.description.trim()) {
      newErrors.description = "Description is required.";
      isValid = false;
    }

    // Kiểm tra lỗi cho trường quantity
    if (!product.quantity || isNaN(product.quantity)) {
      newErrors.quantity = "Quantity must be a number.";
      isValid = false;
    }

    // Kiểm tra lỗi cho trường unit
    if (!product.unit.trim()) {
      newErrors.unit = "Unit is required.";
      isValid = false;
    }

    // Kiểm tra lỗi cho trường date
    if (!product.date) {
      newErrors.date = "Date is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  return (
    <div className="card">
      <Toast className="toast" ref={toast} />
      <h4>Tên</h4>
      <InputText name="name" value={product.name} onChange={handleChange} />
      {errors.name && <small className="p-error">{errors.name}</small>}

      <h4>Mô tả</h4>
      <InputTextarea
        name="description"
        value={product.description}
        autoResize
        onChange={handleChange}
      />
      {errors.description && (
        <small className="p-error">{errors.description}</small>
      )}
      <h4>Số lượng</h4>
      <InputText
        type="number"
        name="quantity"
        value={product.quantity}
        onChange={handleChange}
      />
      {errors.quantity && <small className="p-error">{errors.quantity}</small>}

      <h4>Đơn vị</h4>
      <Dropdown
        name="unit"
        value={product.unit}
        options={[
          { label: "Kg", value: "Kg" },
          { label: "Cân", value: "Cân" },
          { label: "Túi", value: "Túi" },
        ]}
        onChange={handleChange}
        placeholder="Select a unit"
      />
      {errors.unit && <small className="p-error">{errors.unit}</small>}

      <h4>Ngày</h4>
      <Calendar
        inputId="cal_date"
        name="date"
        value={product.date}
        onChange={(e) => setProduct({ ...product, date: e.value })}
      />
      {errors.date && <small className="p-error">{errors.date}</small>}
      <Button label="Lưu" className="p-button-success" onClick={handleCreate} />
    </div>
  );
}

export default YourComponent;
