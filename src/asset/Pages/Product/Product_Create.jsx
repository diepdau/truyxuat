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

function YourComponent(reloadData) {
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
  const validate = () => {
    let isValid = true;
    const newErrors = {};

    if (!product.name) {
      newErrors.name = "Name is required.";
      isValid = false;
    }
    if (!product.price || product.price < 0) {
      newErrors.name =
        "Product price must be a non-negative value/ is required";
      isValid = false;
    }
    if (!product.quantity || product.quantity < 0) {
      newErrors.quantity =
        "Quantity price must be a non-negative value/ is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  const handleUnitChange = (event) => {
    setProduct({
      ...product,
      unit: event.value,
    });
  };
  const handleProductionDateChange = (e) => {
    const newProductionDate = e.value;
    const newExpirationDate = product.expiration_date;

    if (newExpirationDate && newProductionDate > newExpirationDate) {
      // Nếu ngày sản xuất mới lớn hơn ngày hết hạn, bạn có thể thực hiện xử lý tương ứng ở đây.
      // Ví dụ: hiển thị thông báo lỗi hoặc thực hiện hành động khác.
      console.log("Ngày sản xuất không được lớn hơn ngày hết hạn");
    } else {
      setProduct({ ...product, production_date: newProductionDate });
    }
  };

  const handleExpirationDateChange = (e) => {
    const newExpirationDate = e.value;
    const newProductionDate = product.production_date;

    if (newProductionDate && newProductionDate > newExpirationDate) {
      // Nếu ngày sản xuất lớn hơn ngày hết hạn mới, bạn có thể thực hiện xử lý tương ứng ở đây.
      // Ví dụ: hiển thị thông báo lỗi hoặc thực hiện hành động khác.
      console.log("Ngày sản xuất không được lớn hơn ngày hết hạn");
    } else {
      setProduct({ ...product, expiration_date: newExpirationDate });
    }
  };

  const handleCreate = async () => {
    if (!validate()) {
      return;
    }
    try {
      const a = await axios.post(`/products`, product);

      toast.current.show({
        severity: "success",
        summary: "Thêm hoàn thành",
        life: 3000,
      });
      reloadData();
      setProduct(emptyProduct);
      console.log(product, a);
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
          <h4>Tên sản phẩm</h4>
          <InputTextarea
            name="name"
            value={product.name}
            style={{ width: "100%" }}
            onChange={handleChange}
          />
          {errors.name && <small className="p-error">{errors.name}</small>}
          <h4>Giá</h4>
          <InputText
            type="number"
            name="price"
            value={product.price}
            style={{ width: "100%" }}
            onChange={handleChange}
          />
          {errors.price && <small className="p-error">{errors.price}</small>}
          <h4>Số lượng</h4>
          <InputText
            type="number"
            name="quantity"
            value={product.quantity}
            style={{ width: "100%" }}
            onChange={handleChange}
          />{" "}
          {errors.quantity && (
            <small className="p-error">{errors.quantity}</small>
          )}
          <h4>Đơn vị</h4>
          <Dropdown
            name="unit"
            value={product.unit}
            options={unitOptions}
            onChange={handleUnitChange}
            placeholder="Select a unit"
            style={{ width: "100%" }}
          />
          {/* <h4>Info</h4>
          <InputTextarea
            name="info"
            value={product.info}
            style={{ width: "100%" }}
            onChange={handleChange}
          /> */}
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

          <h4>Ngày sản xuất</h4>
          <Calendar
            inputId="cal_production_date"
            name="production_date"
            style={{ width: "100%" }}
            value={product.production_date}
            onChange={handleProductionDateChange}
          />

          <h4>Ngày hết hạn</h4>
          <Calendar
            inputId="cal_expiration_date"
            name="expiration_date"
            style={{ width: "100%" }}
            value={product.expiration_date}
            onChange={handleExpirationDateChange}
          />
          <h4>Phương thức lưu trữ</h4>
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
