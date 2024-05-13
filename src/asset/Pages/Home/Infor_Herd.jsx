import React, { useEffect, useState, useRef, useContext } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import ImageUploader from "../../../components/Images/Image";
import {
  handleUpdate,
  handleGetCategory,
  handleGetFarm,
  handleCreate,
} from "../../service/Herd_data.js";
import { AuthContext } from "../../service/user_service.js";
const emptyProduct = {
  name: "",
  member_count: 0,
  category: {
    _id: "",
    name: "",
  },
  description: "",
  farm: {
    _id: "",
    name: "",
  },
  start_date: "",
  location: "",
  status: "",
};
const statusOptions = [
  { label: "Chưa thu hoạch", value: "Chưa thu hoạch" },
  { label: "Đang thu hoạch", value: "Đang thu hoạch" },
  { label: "Đã thu hoạch", value: "Đã thu hoạch" },
];
function YourComponent({ data, reloadData, isUpdate }) {
  const [product, setProduct] = useState(data || emptyProduct);
  const [errors, setErrors] = useState({});
  const toast = useRef(null);
  const { token } = useContext(AuthContext);
  const [farm, setfarm] = useState({});
  const [categories, setcategories] = useState({});
  var url = data
    ? `https://agriculture-traceability.vercel.app/api/v1/herds/upload/${data._id}`
    : "";
  const [selectedCategories, setelectedCategories] = useState(null);
  const [selectedfarm, setSelectedfarm] = useState(null);
  const handleChange = (event) => {
    const { value, name } = event.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };
  const handleStatusChange = (event) => {
    setProduct({
      ...product,
      status: event.value,
    });
  };
  useEffect(() => {
    fetchDataFarm();
    fetchDataCategory();
  }, []);

  const fetchDataCategory = async () => {
    const categoryList = await handleGetCategory(token);
    setcategories(categoryList);
  };
  const fetchDataFarm = async () => {
    const farmList = await handleGetFarm(token);
    setfarm(farmList);
  };
  const onRowEditComplete = async () => {
    if (!validate()) {
      return;
    }
    try {
      if (isUpdate) {
        const a = await handleUpdate(data._id, product, token);
        toast.current.show({
          severity: "success",
          summary: "Sửa hoàn thành",
          life: 3000,
        });
        setProduct({
          ...product,
        });
        console.log(a);
      } else {
        await handleCreate(product, token);
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

    // Kiểm tra lỗi cho trường name
    if (!product.name) {
      newErrors.name = "Tên là bắt buộc.";
      isValid = false;
    }

    // Kiểm tra lỗi cho trường description
    if (!product.description) {
      newErrors.description = "Mô tả là bắt buộc.";
      isValid = false;
    }

    // Kiểm tra lỗi cho trường location
    if (!product.location) {
      newErrors.location = "Vị trí là bắt buộc.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  const parsedDate = product.start_date ? new Date(product.start_date) : null;
  const categoryName =
    product.category && product.category.name ? product.category.name : "";
  const farmName = product.farm && product.farm.name ? product.farm.name : "";
  return (
    <div>
      <div className="container_update">
        <div style={{ flex: 1, paddingRight: "1rem" }}>
          <Toast className="toast" ref={toast} />

          <h4>Tên</h4>
          <InputText
            name="name"
            value={product.name}
            style={{ width: "100%" }}
            onChange={handleChange}
          />
          {errors.name && <small className="p-error">{errors.name}</small>}

          <h4>Số lượng</h4>
          <InputText
            disabled
            type="number"
            name="member_count"
            value={product.member_count}
            style={{ width: "100%" }}
            onChange={handleChange}
          />
          <h4>Ngày</h4>
          <Calendar
            name="start_date"
            value={parsedDate}
            style={{ width: "100%" }}
            onChange={handleChange}
          />
        </div>
        <div style={{ flex: 1, paddingRight: "1rem" }}>
          <h4>Vị trí</h4>
          <InputTextarea
            name="location"
            value={product.location}
            autoResize
            style={{ width: "100%" }}
            onChange={handleChange}
          />
          {errors.location && (
            <small className="p-error">{errors.location}</small>
          )}

          <h4>Nhóm</h4>
          <Dropdown
            placeholder={categoryName}
            type="text"
            value={selectedCategories}
            options={categories}
            optionLabel="name"
            onChange={(e) => {
              setelectedCategories(e.value);
              product.category._id = e.value._id;
              console.log(product.category._id);
            }}
            style={{ width: "100%" }}
          />
          <h4>Trang trại</h4>
          <Dropdown
            placeholder={farmName}
            type="text"
            options={farm}
            optionLabel="name"
            onChange={(e) => {
              setSelectedfarm(e.value);
              product.farm._id = e.value._id;
            }}
            value={selectedfarm}
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ flex: 1 }}>
          <h4>Trạng thái</h4>
          <Dropdown
            name="status"
            value={product.status}
            options={statusOptions}
            onChange={handleStatusChange}
            placeholder={data ? data.status : ""}
            style={{ width: "100%" }}
            optionLabel="label"
            optionValue="value"
            ClassName={(option) => {
              switch (option.value) {
                case "Chưa thu hoạch":
                  return "text-red";
                case "Đang thu hoạch":
                  return "text-yellow";
                case "Đã thu hoạch":
                  return "text-green";
                default:
                  return "";
              }
            }}
          />

          <h4>Mô tả</h4>
          <InputTextarea
            name="description"
            value={product.description}
            autoResize
            style={{ width: "100%" }}
            onChange={handleChange}
          />
          {errors.location && (
            <small className="p-error">{errors.location}</small>
          )}
        </div>
      </div>
      <Button
        className="button_Dia"
        id="Save"
        label="Cập nhật"
        severity="success"
        onClick={onRowEditComplete}
      />
      <hr style={{ margin: "1rem 0rem" }} />
      {isUpdate && (
        <ImageUploader
          uploadUrl={url}
          images={product.images}
          reloadData={reloadData}
        />
      )}
    </div>
  );
}

export default YourComponent;
