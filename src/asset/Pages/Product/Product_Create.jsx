import React, { useState, useRef, useEffect } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import axios from "axios";
import { Toast } from "primereact/toast";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import "./Product.css";
import { InputText } from "primereact/inputtext";

const emptyProduct = {
  herd: "",
  name: "",
  quantity: "",
  unit: "Đồng", // Giá trị mặc định cho trường unit là "Đồng"
  date: null,
  description: "",
  price: 0,
  production_date: null,
  expiration_date: null,
  storage_method: "",
  info: "",
};

const unitOptions = [
  { label: "Đồng", value: "Đồng" },
  { label: "$", value: "$" },
  { label: "Euro", value: "Euro" },
];

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

  const handleUnitChange = (event) => {
    setProduct({
      ...product,
      unit: event.value,
    });
  };

  const handleCreate = async () => {
    try {
      await axios.post(`/products`, product);
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
  return (
    <div>
      <div style={{ display: "flex", gap: "2rem" }}>
        {/* Cột trái */}
        <div style={{ flex: 1 }}>
          <Toast className="toast" ref={toast} />
          <h4>Name</h4>
          <InputTextarea
            name="name"
            value={product.name}
            style={{ width: "100%" }}
            onChange={handleChange}
          />
          <h4>Price</h4>
          <InputText
            type="number"
            name="price"
            value={product.price}
            style={{ width: "100%" }}
            onChange={handleChange}
          />
          <h4>Quantity</h4>
          <InputText
            type="number"
            name="quantity"
            value={product.quantity}
            style={{ width: "100%" }}
            onChange={handleChange}
          />

          <h4>Unit</h4>
          <Dropdown
            name="unit"
            value={product.unit}
            options={unitOptions}
            onChange={handleUnitChange}
            placeholder="Select a unit"
            style={{ width: "100%" }}
          />

          <h4>Info</h4>
          <InputTextarea
            name="info"
            value={product.info}
            style={{ width: "100%" }}
            onChange={handleChange}
          />
        </div>

        {/* Cột phải */}
        <div style={{ flex: 1 }}>
          <h4>Description</h4>
          <InputTextarea
            name="description"
            value={product.description}
            style={{ width: "100%" }}
            onChange={handleChange}
            autoResize
          />

          <h4>Production Date</h4>
          <Calendar
            inputId="cal_production_date"
            name="production_date"
            style={{ width: "100%" }}
            value={product.production_date}
            onChange={(e) =>
              setProduct({ ...product, production_date: e.value })
            }
          />

          <h4>Expiration Date</h4>
          <Calendar
            inputId="cal_expiration_date"
            name="expiration_date"
            style={{ width: "100%" }}
            value={product.expiration_date}
            onChange={(e) =>
              setProduct({ ...product, expiration_date: e.value })
            }
          />
          <h4>Storage Method</h4>
          <InputTextarea
            name="storage_method"
            value={product.storage_method}
            style={{ width: "100%" }}
            onChange={handleChange}
            autoResize
          />
        </div>
      </div>
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
