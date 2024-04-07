import React, { useEffect, useState, useRef } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import axios from "axios";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";

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
};

function YourComponent({ data, reloadData, isUpdate }) {
  const [product, setProduct] = useState(data || emptyProduct);
  const [errors, setErrors] = useState({});
  const toast = useRef(null);
  const [farm, setfarm] = useState({});
  const [categories, setcategories] = useState({});

  const [selectedCategories, setelectedCategories] = useState(null);
  const [selectedfarm, setSelectedfarm] = useState(null);
  const handleChange = (event) => {
    const { value, name } = event.target;

    setProduct({
      ...product,
      [name]: value,
    });
  };
  useEffect(() => {
    fetchDataFarm();
    fetchDataCategory();
  }, []);
  const fetchDataCategory = async () => {
    const categoryList = await axios.get("/categories");
    setcategories(categoryList.data.categories);
  };
  const fetchDataFarm = async () => {
    const farmList = await axios.get("/farm");
    setfarm(farmList.data.farms);
  };
  const onRowEditComplete = async () => {
    if (!validate()) {
      return;
    }

    try {
      if (isUpdate) {
        const response = await axios.patch(`/herds/${data._id}`, product);
        toast.current.show({
          severity: "success",
          summary: "Sửa hoàn thành",
          life: 3000,
        });
        console.log("tc");
        console.log(response);

        setProduct({
          ...product,
          start_date: response.data.start_date
            ? new Date(response.data.start_date)
            : null,
        });
      } else {
        await axios.post(`/herds`, product);
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
      newErrors.name = "Name is required.";
      isValid = false;
    }

    // Kiểm tra lỗi cho trường description
    if (!product.description) {
      newErrors.description = "Description is required.";
      isValid = false;
    }

    // Kiểm tra lỗi cho trường location
    if (!product.location) {
      newErrors.location = "Location is required.";
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
            autoResize
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
          <h4>Farm</h4>
          <Dropdown
            placeholder={farmName}
            type="text"
            options={farm}
            optionLabel="name"
            onChange={(e) => {
              setSelectedfarm(e.value);
              product.farm._id = e.value._id;
              console.log(product.farm._id);
            }}
            value={selectedfarm}
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ flex: 1 }}>
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
    </div>
  );
}

export default YourComponent;
