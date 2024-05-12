import React, { useState, useRef, useEffect,useContext } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import "./ProductPatchs.css";
import { Calendar } from "primereact/calendar";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { handleCreate,getProductInfos,getProduct,getFarm} from "../../service/productPatchs_data.js";
import { AuthContext } from "../../service/user_service.js";
const emptyProduct = {
  name: "",
  price: "",
  net_weight: "",
  unit: "",
  dte: "",
  location: "",
  quantity: "",
  harvest: "",
  product_info: "",
  production_date: new Date(),
};
const unitOptions = [
  { label: "VND", value: "VND" },
  { label: "Kg", value: "Kg" },
  { label: "Túi", value: "Túi" },
  { label: "Lít", value: "Lít" },
];
function YourComponent({ reloadData, isUpdate }) {
  const { token } = useContext(AuthContext);
  const [product, setProduct] = useState(emptyProduct);
  const [errors, setErrors] = useState({});
  const [ProductInfos, setProductInfos] = useState({});
  const [selectedProductInfos, setSelectedProductInfos] = useState(null);
  const [productDescription, setProductDescription] = useState("");

  const [Products, setProducts] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [Farms, setFarms] = useState({});
  const [selectedFarm, setSelectedFarm] = useState(null);
  const toast = useRef(null);

  useEffect(() => {getAllData();}, []);

  const getAllData = async () => {
      setProductInfos(await getProductInfos());
      setProducts(await getProduct());
      setFarms(await getFarm());
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

    try {
      const res =handleCreate(product,token);
      toast.current.show({
        severity: "success",
        summary: "Thêm hoàn thành",
        life: 3000,
      });
      console.log(res);
      reloadData();
      setProduct(emptyProduct);
    } catch (error) {
      console.log("Error update:", error);
    }
  };

  const validate = () => {
    let isValid = true;
    const newErrors = {};
    if (!product.price || product.price <= 0) {
      newErrors.price = "Giá phải lớn hơn 0 và không được để trống";
      isValid = false;
    }
    if (!product.quantity || product.quantity <= 0) {
      newErrors.quantity = "Số lượng phải lớn hơn 0 và không được để trống";
      isValid = false;
    }
    if (!product.net_weight || product.net_weight <= 0) {
      newErrors.quantity =
        "Khối lượng tịnh phải lớn hơn 0 và không được để trống";
      isValid = false;
    }
    if (!isUpdate) {
      if (!selectedProduct) {
        newErrors.product = "Sản phẩm là bắt nuộc.";
        isValid = false;
      }
      if (!selectedFarm) {
        newErrors.location = "Vị trí là bắt buộc.";
        isValid = false;
      }
      if (!selectedProductInfos) {
        newErrors.processor = "Thông tin là bắt buộc.";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  // let productionDate = ""; // Declare formattedDate variable

  // if (
  //   product.production_date &&
  //   typeof product.production_date === "object" &&
  //   product.production_date.props
  // ) {
  //   productionDate = product.production_date.props.originalDate;
  // } else {
  //   productionDate = new Date(product.production_date);
  // }
  const ProductName =
    product.product && product.product.name ? product.product.name : "";
  const ProductInfosName =
    product.productInfos && product.productInfos.name
      ? product.productInfos.name
      : "";
  const FarmName =
    product.location && product.location.name ? product.location.name : "";
  return (
    <div>
      <div className="container_update">
        <div style={{ flex: 1, paddingRight: "1rem" }}>
          <Toast className="toast" ref={toast} />
          {/* <h4>Name</h4>
          <InputText
            name="name"
            value={product.name}
            autoResize
            style={{ width: "100%" }}
            onChange={handleChange}
          />
          {errors.name && <small className="p-error">{errors.name}</small>} */}
          <h4>Sản phẩm</h4>
          <Dropdown
            placeholder={ProductName}
            type="text"
            value={selectedProduct}
            options={Products}
            optionLabel="name"
            onChange={(e) => {
              setSelectedProduct(e.value);
              product.harvest = e.value._id;
            }}
            style={{ width: "100%" }}
          />
          {errors.product && (
            <small className="p-error">{errors.product}</small>
          )}
          <div className="input-container">
            <div style={{ width: "100%", marginRight: "2vh" }}>
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
            </div>
            <div style={{ width: "100%" }}>
              <h4>Khối lượng tịnh</h4>
              <InputText
                name="net_weight"
                type="number"
                value={product.net_weight}
                style={{ width: "100%" }}
                onChange={handleChange}
              />
              {errors.net_weight && (
                <small className="p-error">{errors.net_weight}</small>
              )}
            </div>
          </div>
          <div className="input-container">
            <div style={{ width: "100%", marginRight: "2vh" }}>
              <h4>Giá</h4>
              <InputText
                type="number"
                name="price"
                value={product.price}
                style={{ width: "100%" }}
                onChange={handleChange}
              />
              {errors.price && (
                <small className="p-error">{errors.price}</small>
              )}
            </div>
            <div style={{ width: "100%" }}>
              <h4>ĐVT</h4>
              <Dropdown
                name="Đơn vị tính"
                value={product.unit}
                options={unitOptions}
                onChange={handleUnitChange}
                placeholder="Đơn vị tính"
                style={{ width: "100%" }}
              />
              {errors.unit && <small className="p-error">{errors.unit}</small>}
            </div>
          </div>
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
        </div>
        <div style={{ flex: 1 }}>
          <div className="input-container">
            <div style={{ width: "100%", marginRight: "2vh" }}>
              <h4>Ngày sản xuất</h4>
              <Calendar
                // inputId="cal_date"
                name="production_date"
                style={{ width: "100%" }}
                // value={
                //   productionDate instanceof Date
                //     ? productionDate
                //     : new Date(productionDate)
                // }
                value={product.production_date}
                onChange={handleChange}
              />
              
              {errors.production_date && (
                <small className="p-error">{errors.production_date}</small>
              )}
            </div>
            {/* <div style={{ width: "100%" }}>
              <h4>Ngày hết hạn</h4>
              <Calendar
                inputId="cal_date"
                name="dte"
                style={{ width: "100%" }}
                // value={
                //   releaseDate instanceof Date ? releaseDate : new Date(releaseDate)
                // }
                onChange={handleChange}
              />
            </div> */}
          </div>
          <h4>Hạn sử dụng</h4>
          <InputText
            name="dte"
            value={product.dte}
            style={{ width: "100%" }}
            onChange={handleChange}
          />
          {errors.dte && <small className="p-error">{errors.dte}</small>}
          <div className="Product_info">
            <h4>Thông tin</h4>
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
              disabled
              autoResize
              value={productDescription}
              style={{ width: "100%" }}
            />
          </div>
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
