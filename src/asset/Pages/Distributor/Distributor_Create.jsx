import React, { useState, useRef, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import axios from "axios";
import { Toast } from "primereact/toast";
import { Calendar } from "primereact/calendar";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";

const emptyProduct = {
  warehouse_name: "",
  warehouse_address: "",
  delivery_date: null,
  stores: "",
  product_patch: "",
  received_date: null,
};

function YourComponent({ data, reloadData, isUpdate }) {
  console.log(data);
  const [product, setProduct] = useState(data || emptyProduct);
  const [errors, setErrors] = useState({});
  const toast = useRef(null);
  const [ProductPatchs, setProductPatchs] = useState({});
  const [selectedProductPatchs, setSelectedProductPatchs] = useState(null);
  const handleChange = (event) => {
    const { value, name } = event.target;
    const newValue =
      name === "delivery_date" || name === "received_date"
        ? value.toISOString()
        : value;
    setProduct({
      ...product,
      [name]: newValue,
    });
  };
  useEffect(() => {
    getProductPatchs();
  }, []);
  const getProductPatchs = async () => {
    try {
      const res = await axios.get(`https://agriculture-traceability.vercel.app/api/v1/product-patchs?&limit=50`);
      setProductPatchs(res.data.productPatchs);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCreate = async () => {
    if (!validate()) {
      return;
    }

    try {
      if (isUpdate) {
        await axios.patch(`https://agriculture-traceability.vercel.app/api/v1/distributors/${data._id}`, product);
        toast.current.show({
          severity: "success",
          summary: "Sửa hoàn thành",
          life: 3000,
        });
      } else {
        await axios.post(`/distributors`, product);
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

    if (!product.warehouse_name.trim()) {
      newErrors.warehouse_name = "Name is required.";
      isValid = false;
    }

    if (!product.warehouse_address.trim()) {
      newErrors.warehouse_address = "warehouse_address is required.";
      isValid = false;
    }
    // if (!product.product_patch) {
    //   newErrors.product_patch = "Lô hàng ?";
    //   isValid = false;
    // }
    if (!product.stores) {
      newErrors.stores = "stores is required.";
      isValid = false;
    }
    if (!product.delivery_date) {
      newErrors.delivery_date = new Date();
    }
    if (
      (isValid && product.delivery_date === product.received_date) ||
      product.delivery_date >= product.received_date
    ) {
      newErrors.delivery_date = "Ngày giao phải nhỏ hơn ngày hết hạn";
      newErrors.received_date = "Ngày nhận phải lớn hơn ngày sản xuất";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const parsedDeliveryDate = product.delivery_date
    ? new Date(product.delivery_date)
    : null;
  const parsedReceivedDate = product.received_date
    ? new Date(product.received_date)
    : null;

  return (
    <div>
      <div className="container_update">
        <div style={{ flex: 1, paddingRight: "1rem" }}>
          <Toast className="toast" ref={toast} />

          <h4>Tên nhà</h4>
          <InputTextarea
            name="warehouse_name"
            value={product.warehouse_name}
            autoResize
            style={{ width: "100%" }}
            onChange={handleChange}
          />
          {errors.warehouse_name && (
            <small className="p-error">{errors.warehouse_name}</small>
          )}

          <h4>Địa chỉ nhà kho</h4>
          <InputTextarea
            name="warehouse_address"
            value={product.warehouse_address}
            autoResize
            style={{ width: "100%" }}
            onChange={handleChange}
          />
          {errors.warehouse_address && (
            <small className="p-error">{errors.warehouse_address}</small>
          )}
          <h4>Lô hàng</h4>
          {/* <InputText
            name="product_patch"
            value={product.product_patch}
            autoResize
            style={{ width: "100%" }}
            onChange={handleChange}
          /> */}

          <Dropdown
            placeholder={data ? data.product_patch : ""}
            type="text"
            value={selectedProductPatchs}
            options={ProductPatchs}
            optionLabel="_id"
            onChange={(e) => {
              setSelectedProductPatchs(e.value);
              setProduct({
                ...product,
                product_patch: {
                  ...product.product_patch,
                  _id: e.value._id,
                },
              });
            }}
            style={{ width: "100%" }}
          />

          {errors.product_patch && (
            <small className="p-error">{errors.product_patch}</small>
          )}
        </div>

        {/* Cột phải */}
        <div style={{ flex: 1 }}>
          <h4>Cửa hàng</h4>
          <InputText
            name="stores"
            type="text"
            value={product.stores}
            autoResize
            style={{ width: "100%" }}
            onChange={handleChange}
          />
          {errors.stores && <small className="p-error">{errors.stores}</small>}

          <h4>Ngày Giao Hàng</h4>
          <Calendar
            inputId="cal_delivery_date"
            name="delivery_date"
            style={{ width: "100%" }}
            value={parsedDeliveryDate}
            onChange={handleChange}
          />
          {errors.delivery_date && (
            <small className="p-error">{errors.delivery_date}</small>
          )}

          <h4>Ngày Nhận</h4>
          <Calendar
            inputId="cal_received_date"
            name="received_date"
            style={{ width: "100%" }}
            value={parsedReceivedDate}
            onChange={handleChange}
          />
          {errors.received_date && (
            <small className="p-error">{errors.received_date}</small>
          )}
        </div>
      </div>
      <Button
        className="button_Dia"
        id="Save"
        label={isUpdate ? "Cập nhật" : "Lưu"}
        severity="success"
        onClick={handleCreate}
      />
    </div>
  );
}

export default YourComponent;
