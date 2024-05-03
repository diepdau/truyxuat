import React, { useState, useRef, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import axios from "axios";
import { Toast } from "primereact/toast";
import "./ProductPatchs.css";
import { Calendar } from "primereact/calendar";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import Harvest_Update from "../Harvest/Harvest_Update.jsx";
import Product_Infos_Actives from "../Product_Infos/Product_Infos_Active.jsx"

const emptyProduct = {
  name: "",
  price: "",
  net_weight: "",
  unit: "",
  dte: "",
  location: "",
  quantity: "",
  harvest: "",
  product_info: new Date(),
  // production_date: "",
};
const unitOptions = [
  { label: "Đồng", value: "Đồng" },
  { label: "VND", value: "VND" },
];
function YourComponent({ data, reloadData, isUpdate }) {
  const [product, setProduct] = useState(data || emptyProduct);
  const [errors, setErrors] = useState({});
  const [ProductInfos, setProductInfos] = useState({});
  const [selectedProductInfos, setSelectedProductInfos] = useState(null);
  const [productDescription, setProductDescription] = useState("");


  const [Farms, setFarms] = useState({});
  const [selectedFarm, setSelectedFarm] = useState(null);
  const toast = useRef(null);

  useEffect(() => {
    getProductInfos();
    getFarm();
  }, []);

  const getProductInfos = async () => {
    try {
      const res = await axios.get(`https://agriculture-traceability.vercel.app/api/v1/product-infos?limit=60`);
      setProductInfos(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const getFarm = async () => {
    try {
      const res = await axios.get(`https://agriculture-traceability.vercel.app/api/v1/farm?limit=80&searchQuery=Nhà`);
      setFarms(res.data.farms);
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
  const handleUnitChange = (event) => {
    setProduct({
      ...product,
      unit: event.value,
    });
  };
  const handleProductChange = (e) => {
    setSelectedProductInfos(e.value);
    product.product_info = e.value._id;
    setProductDescription(e.value.description); // Cập nhật mô tả khi chọn sản phẩm
  };
  const handle = async () => {
    if (!validate()) {
      return;
    }
    console.log(product.production_date.props);
    product.production_date = product.production_date.props
      ? product.production_date.props.originalDate
      : product.production_date;
    try {
      const res = await axios.patch(`https://agriculture-traceability.vercel.app/api/v1/processors/${data._id}`, product);
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
    if (!product.price || product.price <= 0) {
      newErrors.price = "giá phải lớn hơn 0 và không được để trống";
      isValid = false;
    }
    if (!product.quantity || product.quantity <= 0) {
      newErrors.quantity = "Số lượng phải lớn hơn 0 và không được để trống";
      isValid = false;
    }
    if (!product.net_weight || product.net_weight <= 0) {
      newErrors.quantity = "Số lượng phải lớn hơn 0 và không được để trống";
      isValid = false;
    }
    if (!isUpdate) {
      if (!selectedFarm) {
        newErrors.location = "location is required.";
        isValid = false;
      }
      if (!selectedProductInfos) {
        newErrors.processor = "ProductInfos is required.";
        isValid = false;
      }
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
  const ProductInfosName =
    product.product_info && product.product_info
      ? product.product_info
      : "";
  const FarmName =
    product.location && product.location ? product.location : "";
  return (
    <div>
      <div className="container_update">
        <div style={{ flex: 1, paddingRight: "1rem" }}>
          <Toast className="toast" ref={toast} />
          {/* <h4>Tên</h4>
          <InputText
            name="name"
            value={product.name}
            style={{ width: "100%" }}
            onChange={handleChange}
          />
          {errors.name && <small className="p-error">{errors.name}</small>} */}
          <h4>Giá</h4>
          <InputText
            name="price"
            type="number"
            value={product.price}
            autoResize
            style={{ width: "100%" }}
            onChange={handleChange}
          />
          {errors.price && <small className="p-error">{errors.price}</small>}
          <h4>Khối lượng tịnh</h4>
          <InputText
            name="net_weight"
            type="number"
            value={product.net_weight}
            autoResize
            style={{ width: "100%" }}
            onChange={handleChange}
          />
          {errors.net_weight && (
            <small className="p-error">{errors.net_weight}</small>
          )}
           {/* <h4>Đơn vị giá</h4>
          <InputText
            name="VND"
            value={product.current_unit}
            style={{ width: "100%" }}
            onChange={handleChange}
          />
          {errors.current_unit && (
            <small className="p-error">{errors.current_unit}</small>
          )} */}
          <h4>ĐVT</h4>
          <Dropdown
            name="Đơn vị tính"
            value={product.unit}
            options={unitOptions}
            onChange={handleUnitChange}
            placeholder="Chọn đơn vị tính"
            style={{ width: "100%" }}
          />
          {errors.unit && <small className="p-error">{errors.unit}</small>}
          <h4>Vị trí</h4>
          <Dropdown
            placeholder={FarmName}
            type="text"
            value={selectedFarm}
            options={Farms}
            optionLabel="name"
            onChange={(e) => {
              setSelectedFarm(e.value);
              product.location = e.value._id;
            }}
            style={{ width: "100%" }}
          />

          {errors.location && (
            <small className="p-error">{errors.location}</small>
          )}
          
          {/* <h4>Thông tin</h4>
          <Dropdown
            placeholder={ProductInfosName}
            type="text"
            value={selectedProductInfos}
            options={ProductInfos}
            optionLabel="name"
            onChange={handleProductChange}
            style={{ width: "100%" }}
          />
          {errors.productInfos && (
            <small className="p-error">{errors.productInfos}</small>
          )}
          <h4>Mô tả</h4>
          <InputTextarea
            readOnly
            autoResize
            value={productDescription}
            style={{ width: "100%" }}
          />
          {errors.product && (
            <small className="p-error">{errors.product}</small>
          )} */}
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
          {/* <h4>Ngày sản xuất</h4>
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
          )} */}
          <h4>Hạn sử dụng</h4>
          <InputTextarea
            type="number"
            name="dte"
            value={product.dte}
            style={{ width: "100%" }}
            onChange={handleChange}
          />
          {errors.dte && <small className="p-error">{errors.dte}</small>}
        </div>
      </div>
      <Button
        className="button_Dia"
        id="Save"
        label={isUpdate ? "Lưu" : "Tạo mới"}
        severity="success"
        onClick={handle}
      />
    </div>
  );
}

export default YourComponent;
