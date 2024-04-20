import React, { useState, useRef, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import axios from "axios";
import { Toast } from "primereact/toast";
import "./ProductPatchs.css";
import { Calendar } from "primereact/calendar";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";

const emptyProduct = {
  quantity: "",
  description: "",
  production_date: "",
  release_date: "",
};

function YourComponent({ data, reloadData }) {
  const [product, setProduct] = useState(data || emptyProduct);
  const [errors, setErrors] = useState({});
  const [Processors, setProcessors] = useState({});
  const [selectedProcessors, setSelectedProcessors] = useState(null);
  const [Products, setProducts] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const toast = useRef(null);

  useEffect(() => {
    getProcessors();
    getProduct();
  }, []);

  const getProcessors = async () => {
    try {
      const res = await axios.get(`/processors?limit=60`);
      setProcessors(res.data.processor);
    } catch (error) {
      console.log(error);
    }
  };

  const getProduct = async () => {
    try {
      const res = await axios.get(`/products?limit=60`);
      setProduct(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handle = async () => {
    if (!validate()) {
      return;
    }

    console.log(product.production_date.props);
    product.production_date = product.production_date.props
      ? product.production_date.props.originalDate
      : product.production_date;
    product.release_date = product.release_date.props
      ? product.release_date.props.originalDate
      : product.release_date;
    try {
      const res = await axios.patch(`/product-patchs/${data._id}`, product);
      toast.current.show({
        severity: "success",
        summary: "Sửa hoàn thành",
        life: 3000,
      });
      console.log(res);
      reloadData();
      setProduct(product);
    } catch (error) {
      console.log("Error update:", error);
    }
  };

  const validate = () => {
    let isValid = true;
    const newErrors = {};
    if (!product.description || product.description.trim() === "") {
      newErrors.description = "Mô tả không được để trống";
      isValid = false;
    }
    if (!product.quantity || product.quantity <= 0) {
      newErrors.quantity = "quantity phải lớn hơn 0 và không được để trống";
      isValid = false;
    }
    if (product.product.trim() === "") {
      newErrors.product = "product is required.";
      isValid = false;
    }

    if (product.processor.trim() === "") {
      newErrors.processor = "processor is required.";
      isValid = false;
    }
    if (
      (isValid && productionDate >= releaseDate) ||
      productionDate === releaseDate
    ) {
      newErrors.production_date = "Ngày sản xuất phải nhỏ hơn ngày hết hạn";
      newErrors.release_date = "Ngày hết hạn phải lớn hơn ngày sản xuất";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  let productionDate = ""; // Declare formattedDate variable

  if (
    product.production_date &&
    typeof product.production_date === "object" &&
    product.production_date.props
  ) {
    productionDate = product.production_date.props.originalDate;
  } else {
    productionDate = new Date(product.production_date);
  }
  let releaseDate = ""; // Declare formattedDate variable

  if (
    product.release_date &&
    typeof product.release_date === "object" &&
    product.release_date.props
  ) {
    releaseDate = product.release_date.props.originalDate;
  } else {
    releaseDate = new Date(product.release_date);
  }
  const ProductName =
    product.product && product.product.name ? product.product.name : "";
  const ProcessorsName =
    product.processor && product.processor.name ? product.processor.name : "";
  return (
    <div>
      <div className="container_update">
        <div style={{ flex: 1, paddingRight: "1rem" }}>
          <Toast className="toast" ref={toast} />
          <h4>[Id lô hàng]</h4>
          <InputText
            name="_id"
            value={product._id}
            autoResize
            style={{ width: "100%" }}
            onChange={handleChange}
          />

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
          <h4>Xử lý đóng gói</h4>
          <Dropdown
            placeholder={ProcessorsName}
            type="text"
            value={selectedProcessors}
            options={Processors}
            optionLabel="name"
            onChange={(e) => {
              setSelectedProcessors(e.value);
              product.processor = e.value._id;
            }}
            style={{ width: "100%" }}
          />
          {errors.processor && (
            <small className="p-error">{errors.processor}</small>
          )}
          <h4>Sản phẩm</h4>
          <Dropdown
            placeholder={ProductName}
            type="text"
            value={selectedProduct}
            options={Products}
            optionLabel="name"
            onChange={(e) => {
              setSelectedProduct(e.value);
              product.product = e.value._id;
            }}
            style={{ width: "100%" }}
          />
          {errors.product && (
            <small className="p-error">{errors.product}</small>
          )}
        </div>
        <div style={{ flex: 1 }}>
          <h4>Số lượng</h4>
          <InputText
            type="number"
            name="quantity"
            value={product.quantity}
            style={{ width: "100%" }}
            onChange={handleChange}
          />
          {errors.quantity && (
            <small className="p-error">{errors.quantity}</small>
          )}
          <h4>Ngày sản xuất</h4>
          <Calendar
            inputId="cal_date"
            name="production_date"
            style={{ width: "100%" }}
            value={
              productionDate instanceof Date
                ? productionDate
                : new Date(productionDate)
            }
            onChange={handleChange}
          />
          {errors.production_date && (
            <small className="p-error">{errors.production_date}</small>
          )}
          <h4>Ngày phát hành</h4>
          <Calendar
            inputId="cal_date"
            name="release_date"
            style={{ width: "100%" }}
            value={
              releaseDate instanceof Date ? releaseDate : new Date(releaseDate)
            }
            onChange={handleChange}
          />
          {errors.release_date && (
            <small className="p-error">{errors.release_date}</small>
          )}
        </div>
      </div>
      <Button
        className="button_Dia"
        id="Save"
        label="Lưu"
        severity="success"
        onClick={handle}
      />
    </div>
  );
}

export default YourComponent;
