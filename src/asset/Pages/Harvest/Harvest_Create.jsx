import React, { useState, useRef } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import axios from "axios";
import { Toast } from "primereact/toast";
import "./Harvest";

const emptyProduct = {
  herd: "",
  name: "",
  quantity: "",
  unit: "",
  date: "",
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
      await axios.post(`/harvests/`, {
        herd: product.herd,
        name: product.name,
        quantity: product.quantity,
        unit: product.unit,
        date: product.date,
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

    // Kiểm tra lỗi cho trường herd
    if (!product.herd.trim()) {
      newErrors.herd = "Herd is required.";
      isValid = false;
    }

    // Kiểm tra lỗi cho trường name
    if (!product.name.trim()) {
      newErrors.name = "Name is required.";
      isValid = false;
    }

    // Kiểm tra lỗi cho trường quantity
    if (!product.quantity.trim()) {
      newErrors.quantity = "Quantity is required.";
      isValid = false;
    }

    // Kiểm tra lỗi cho trường unit
    if (!product.unit.trim()) {
      newErrors.unit = "Unit is required.";
      isValid = false;
    }

    // Kiểm tra lỗi cho trường date
    if (!product.date.trim()) {
      newErrors.date = "Date is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  return (
    <div>
      <Toast className="toast" ref={toast} />
      <h4>Đàn</h4>
      <InputTextarea
        name="herd"
        value={product.herd}
        
        style={{ width: "100%" }}
        onChange={handleChange}
      />
      {errors.herd && <small className="p-error">{errors.herd}</small>}

      <h4>Tên</h4>
      <InputTextarea
        name="name"
        value={product.name}
        autoResize
        style={{ width: "100%" }}
        onChange={handleChange}
      />
      {errors.name && <small className="p-error">{errors.name}</small>}

      <h4>Số lượng</h4>
      <InputTextarea
        name="quantity"
        value={product.quantity}
        autoResize
        style={{ width: "100%" }}
        onChange={handleChange}
      />
      {errors.quantity && <small className="p-error">{errors.quantity}</small>}

      <h4>Đơn vị</h4>
      <InputTextarea
        name="unit"
        value={product.unit}
        autoResize
        style={{ width: "100%" }}
        onChange={handleChange}
      />
      {errors.unit && <small className="p-error">{errors.unit}</small>}

      <h4>Ngày</h4>
      <InputTextarea
        name="date"
        value={product.date}
        autoResize
        style={{ width: "100%" }}
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
