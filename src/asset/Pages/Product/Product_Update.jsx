import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import axios from "axios";
import { Toast } from "primereact/toast";
import "./Product.css";
import { Calendar } from "primereact/calendar";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";

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
const unitOptions = [
  { label: "Đồng", value: "Đồng" },
  { label: "$", value: "$" },
  { label: "Euro", value: "Euro" },
];

function YourComponent({ data, reloadData, isProductPatchs }) {
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
  const handleUnitChange = (event) => {
    setProduct({
      ...product,
      unit: event.value,
    });
  };
  const handleCreate = async () => {
    if (!validate()) {
      return;
    }
    product.production_date = product.production_date.props
      ? product.production_date.props.originalDate
      : product.production_date;
    product.expiration_date = product.expiration_date.props
      ? product.expiration_date.props.originalDate
      : product.expiration_date;
    try {
      await axios.patch(`/products/${data._id}`, product);
      toast.current.show({
        severity: "success",
        summary: "Sửa hoàn thành",
        life: 3000,
      });
      reloadData();
      setProduct({
        ...product,
      });
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

    // Validate price
    if (!product.price || product.price <= 0) {
      newErrors.price = "Giá phải lớn hơn 0 và không được để trống";
      isValid = false;
    }

    // Validate production date and expiration date
    // const productionDate = new Date(product.production_date);
    // const expirationDate = new Date(product.expiration_date);

    // if (isNaN(productionDate.getTime())) {
    //   newErrors.production_date = "Ngày sản xuất không hợp lệ";
    //   isValid = false;
    // }

    // if (isNaN(expirationDate.getTime())) {
    //   newErrors.expiration_date = "Ngày hết hạn không hợp lệ";
    //   isValid = false;
    // }

    if (
      (isValid && productionDate >= expirationDate) ||
      productionDate === expirationDate
    ) {
      newErrors.production_date = "Ngày sản xuất phải nhỏ hơn ngày hết hạn";
      newErrors.expiration_date = "Ngày hết hạn phải lớn hơn ngày sản xuất";
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
  let expirationDate = ""; // Declare formattedDate variable

  if (
    product.expiration_date &&
    typeof product.expiration_date === "object" &&
    product.expiration_date.props
  ) {
    expirationDate = product.expiration_date.props.originalDate;
  } else {
    expirationDate = new Date(product.expiration_date);
  }
  return (
    <div>
      <Toast className="toast" ref={toast} />
      <div className="container_update">
        <div style={{ flex: 1, paddingRight: "1rem" }}>
          <h4>Tên</h4>
          <InputText  name="name" value={product.name}  autoResize style={{ width: "100%" }}
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
          <h4>Giá</h4>
          <InputText
            name="price"
            type="number"
            value={product.price}
            style={{ width: "100%" }}
            onChange={handleChange}
          />

          {errors.price && <small className="p-error">{errors.price}</small>}
          {isProductPatchs && (
            <>
              <h4>Đơn vị</h4>
              <Dropdown
                name="unit"
                value={product.unit}
                options={unitOptions}
                onChange={handleUnitChange}
                placeholder="Select a unit"
                style={{ width: "100%" }}
              />
            </>
          )}
        </div>

        {/* Cột phải */}
        <div style={{ flex: 1 }}>
          <h4>Ngày sản xuất</h4>
          <Calendar
            inputId="cal_production_date"
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
          <h4>Ngày hết hạn</h4>
          <Calendar
            inputId="cal_expiration_date"
            name="expiration_date"
            style={{ width: "100%" }}
            value={
              expirationDate instanceof Date
                ? expirationDate
                : new Date(expirationDate)
            }
            onChange={handleChange}
          />
          {errors.expiration_date && (
            <small className="p-error">{errors.expiration_date}</small>
          )}
          <h4>Phương pháp bảo quản</h4>
          <InputTextarea
            name="storage_method"
            value={product.storage_method}
            autoResize
            style={{ width: "100%" }}
            onChange={handleChange}
          />
        </div>
      </div>
      {isProductPatchs && (
        <Button
          className="button_Dia"
          id="Save"
          label="Lưu"
          severity="success"
          onClick={handleCreate}
        />
      )}
    </div>
  );
}

export default YourComponent;
