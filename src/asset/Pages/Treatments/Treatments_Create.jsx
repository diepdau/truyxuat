import React, { useState, useRef, useEffect } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import axios from "axios";
import { Toast } from "primereact/toast";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import "./Treatments.css";
import typeOptions from "./Type.jsx";

const emptyProduct = {
  herd: "",
  type: "",
  product: "",
  amount: "",
  mode: "",
  description: "",
  date: null,
  retreat_date: "",
  site: "",
  technician: "",
};
const modeOptions = [
  "Tiêm bắp (trong cơ)",
  "Intrammary (trong bầu vú)",
  "Trong tử cung",
  "Tiêm tĩnh mạch",
  "Miệng (trong miệng)",
  "Tiêm dưới da",
  "Bôi ngoài (trên da)",
  "Khác",
];
const siteOptions = ["Mông", "Sườn", "Cổ", "Khác"];

function YourComponent({ data, reloadData, isUpdate }) {
  const [product, setProduct] = useState(data || emptyProduct);
  const [errors, setErrors] = useState({});
  const [herds, setHerds] = useState({});
  const [selectedHerd, setSelectedHerd] = useState(null);
  const toast = useRef(null);

  useEffect(() => {
    getHerd();
  }, []);

  const getHerd = async () => {
    try {
      const res = await axios.get(`/herds`);
      setHerds(res.data.herds);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTypeChange = (event) => {
    setProduct({
      ...product,
      type: event.value,
    });
  };
  const handleModeChange = (event) => {
    setProduct({
      ...product,
      mode: event.value,
    });
  };
  const handleChange = (event) => {
    const { value, name } = event.target;
    const newValue = name === "retreat_date" ? value.toISOString() : value;
    setProduct({
      ...product,
      [name]: newValue,
    });
  };

  const handleCreate = async () => {
    if (!validate()) {
      return;
    }

    try {
      if (isUpdate) {
        const response = await axios.patch(`/treatments/${data._id}`, product);
        toast.current.show({
          severity: "success",
          summary: "Cập nhật hoàn thành",
          life: 3000,
        });
        setProduct({
          ...product,
          date: response.data.date ? new Date(response.data.date) : null,
        });
      } else {
        await axios.post(`/treatments`, product);
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

    if (!product.type.trim()) {
      newErrors.type = "Type is required.";
      isValid = false;
    }

    if (!product.description.trim()) {
      newErrors.description = "Description is required.";
      isValid = false;
    }

    if (!product.amount.trim()) {
      newErrors.amount = "amount is required.";
      isValid = false;
    }

    if (!product.product.trim()) {
      newErrors.product = "product is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const parsedDate = product.retreat_date
    ? new Date(product.retreat_date)
    : null;
  const herdName = product.herd && product.herd.name ? product.herd.name : "";

  return (
    <div>
      <div className="container_update">
        <Toast className="toast" ref={toast} />
        <div style={{ flex: 1, paddingRight: "1rem" }}>
          <h4>Đàn</h4>
          <Dropdown
            placeholder={herdName}
            type="text"
            value={selectedHerd}
            options={herds}
            optionLabel="name"
            onChange={(e) => {
              setSelectedHerd(e.value);
              product.herd = e.value._id;
            }}
            style={{ width: "100%" }}
          />
          {errors.farm_product && (
            <small className="p-error">{errors.farm_product}</small>
          )}

          <h4>Loại</h4>
          <Dropdown
            name="type"
            value={product.type}
            options={typeOptions}
            onChange={handleTypeChange}
            placeholder={product.type}
            style={{ width: "100%" }}
          />
          {errors.type && <small className="p-error">{errors.type}</small>}
          <h4>Thuốc sử dụng</h4>
          <InputTextarea
            name="product"
            value={product.product}
            style={{ width: "100%" }}
            onChange={handleChange}
            autoResize
          />
          {errors.product && (
            <small className="p-error">{errors.product}</small>
          )}
          <h4>Liều lượng</h4>
          <InputTextarea
            name="amount"
            value={product.amount}
            style={{ width: "100%" }}
            onChange={handleChange}
          />
          {errors.amount && <small className="p-error">{errors.amount}</small>}
          <h4>Hình thức điều trị</h4>
          <Dropdown
            name="mode"
            value={product.mode}
            options={modeOptions}
            onChange={handleModeChange}
            placeholder={product.mode}
            style={{ width: "100%" }}
          />

          {errors.mode && <small className="p-error">{errors.mode}</small>}
        </div>

        {/* Cột phải */}
        <div style={{ flex: 1 }}>
          <h4>Mô tả</h4>
          <InputTextarea
            name="description"
            value={product.description}
            style={{ width: "100%" }}
            onChange={handleChange}
            autoResize
          />
          {errors.description && (
            <small className="p-error">{errors.description}</small>
          )}
          <h4>Vị trí</h4>
          <Dropdown
            name="site"
            value={product.site}
            style={{ width: "100%" }}
            onChange={handleChange}
            options={siteOptions}
            placeholder={product.site}
          />
          {errors.site && <small className="p-error">{errors.site}</small>}

          <h4>Kĩ thuật</h4>
          <InputTextarea
            name="technician"
            value={product.technician}
            style={{ width: "100%" }}
            onChange={handleChange}
            autoResize
          />
          {errors.technician && (
            <small className="p-error">{errors.technician}</small>
          )}

          <h4>Ngày</h4>
          <Calendar
            inputId="cal_date"
            name="retreat_date"
            style={{ width: "100%" }}
            value={parsedDate}
            onChange={handleChange}
          />
        </div>
      </div>
      <Button
        className="button_Dia"
        id="Luu"
        label={isUpdate ? "Cập nhật" : "Lưu"}
        severity="success"
        onClick={handleCreate}
      />
    </div>
  );
}

export default YourComponent;
