import React, { useState, useRef, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import axios from "axios";
import { Toast } from "primereact/toast";
import "./ProductPatchs.css";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import Processors_Update from "../Processors/Processors_Update.jsx"

const emptyProduct = {
  name: "",
  location: "",
  date: "",
  product: {
    name: "",
    description: "",
    price: "",
    production_date: "",
    expiration_date: "",
    storage_method: "",
    qrcode: ""
  },
  quantity: "",
  description: "",
  production_date: "",
  release_date: ""
};

const unitOptions = [
  { label: "Cân", value: "Cân" },
  { label: "Kg", value: "Kg" },
  { label: "Túi", value: "Túi" }
];

function YourComponent({ data, reloadData }) {
  const d=data.processor;
  console.log(data.processor);
  const [product, setProduct] = useState(data || emptyProduct);
  const [errors, setErrors] = useState({});
  const toast = useRef(null);
  const [herds, setHerds] = useState([]);
  useEffect(() => {
    getHerds();
  }, []);
  const getHerds = async () => {
    try {
      const res = await axios.get(`/processors`);
      setHerds(res.data.processors);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct({
      ...product,
      [name]: value
    });
  };

  const handleCreate = async () => {
    if (!validate()) {
      return;
    }

    try {
      const response = await axios.patch(`/product-patchs/${data._id}`, product);
      toast.current.show({
        severity: "success",
        summary: "Sửa hoàn thành",
        life: 3000
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

    // Add validation logic here

    setErrors(newErrors);
    return isValid;
  };

  const parsedDate = product.production_date ? new Date(product.production_date) : null;
  const parsedProductionDate = product.product.production_date ? new Date(product.product.production_date) : null;
  const parsedExpirationDate = product.product.expiration_date ? new Date(product.product.expiration_date) : null;
  const parsedDate1 = product.release_date ? new Date(product.release_date) : null;
  return (
    <div>
      <div className="container_update">
        <div style={{ flex: 1, paddingRight: "1rem" }}>
          <Toast className="toast" ref={toast} />

          <h4>Tên</h4>
          <InputText
            name="_id"
            value={product._id}
            autoResize
            style={{ width: "100%" }}
            onChange={handleChange}
          />

          <h4>Số lượng</h4>
          <InputText
            name="quantity"
            value={product.quantity}
            autoResize
            style={{ width: "100%" }}
            onChange={handleChange}
          />
        <h4>Mô tả</h4>
          <InputText
            name="description"
            value={product.description}
            autoResize
            style={{ width: "100%" }}
            onChange={handleChange}
          />
          <h4>Ngày sản xuất</h4>
          <Calendar
            inputId="cal_date"
            name="date"
            style={{ width: "100%" }}
            value={parsedDate}
            onChange={handleChange}
          />
          <h4>Ngày phát hành</h4>
          <Calendar
            inputId="cal_date"
            name="date"
            style={{ width: "100%" }}
            value={parsedDate1}
            onChange={handleChange}
          />
        </div>

        <div style={{ flex: 1 }}>
          <h4>Tên sản phẩm</h4>
          <InputText
            name="productName"
            value={product.product.name}
            autoResize
            style={{ width: "100%" }}
            onChange={handleChange}
          />

          <h4>Mô tả</h4>
          <InputText
            name="description"
            value={product.product.description}
            autoResize
            style={{ width: "100%" }}
            onChange={handleChange}
          />

          <h4>Giá</h4>
          <InputText
            name="price"
            value={product.product.price}
            autoResize
            style={{ width: "100%" }}
            onChange={handleChange}
          />

          <h4>Ngày sản xuất</h4>
          <Calendar
            inputId="cal_production_date"
            name="production_date"
            style={{ width: "100%" }}
            value={parsedProductionDate}
            onChange={handleChange}
          />

          <h4>Ngày hết hạn</h4>
          <Calendar
            inputId="cal_expiration_date"
            name="expiration_date"
            style={{ width: "100%" }}
            value={parsedExpirationDate}
            onChange={handleChange}
          />

          <h4>Phương pháp bảo quản</h4>
          <InputText
            name="storage_method"
            value={product.product.storage_method}
            autoResize
            style={{ width: "100%" }}
            onChange={handleChange}
          />

          <h4>Mã QR</h4>
          <img
          alt=""
            src={product.product.qrcode}
          />
        </div>
      </div>
      <Button
        className="button_Dia"
        id="Save"
        label="Lưu"
        severity="success"
        onClick={handleCreate}
      />
      {/* eslint-disable-next-line react/jsx-pascal-case */}
      <Processors_Update data={d} reloadData={reloadData}/>
    </div>
  );
}

export default YourComponent;
