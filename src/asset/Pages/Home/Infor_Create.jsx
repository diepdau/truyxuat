import { useEffect, useState, useContext, useRef } from "react";
import "../Category/Category.css";
import { Button } from "primereact/button";
import axios from "axios";
import { Toast } from "primereact/toast";
import { HerdsContext } from "../../service/Herd_data.js";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import ImageUploader from "../../../components/Images/Image.jsx";
import { Calendar } from "primereact/calendar";
const initFormValue = {
  name: "",
  member_count: 0,
  category: "",
  description: "",
  quantity: 0,
  farm: "",
  start_date: "",
  location: "",
};
function Infor_Herd({idherd, data, isUpdate, reloadData }) {
  const [formData, setFormData] = useState(initFormValue);
  const [categories, setcategories] = useState([]);
  const [farm, setfarm] = useState([]);
  const [selectedCategories, setelectedCategories] = useState(null);
  const [selectedfarm, setSelectedfarm] = useState(null);
  const { handleGetCategory, handleGetFarm } = useContext(HerdsContext);
  const [errors, setErrors] = useState({});
  const toast = useRef(null);
  useEffect(() => {
    fetchDataFarm();
    fetchDataCategory();
  }, []);

  const fetchDataCategory = async () => {
    const categoryList = await handleGetCategory();
    setcategories(categoryList);
  };
  const fetchDataFarm = async () => {
    const farmList = await handleGetFarm();
    setfarm(farmList);
  };
  const handleChange = (event) => {
    const { value, name } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async () => {
    if (!validate()) {
      return;
    }
    try {
      if (data && isUpdate) {
        const res = await axios.patch(`/herds/${data._id}`, formData);
        toast.current.show({
          severity: "success",
          summary: "Sửa hoàn thành",
          life: 3000,
        });
        reloadData();
        setFormData(res.data);
      } else {
        await axios.post(`/herds/`, formData);
        toast.current.show({
          severity: "success",
          summary: "Thêm hoàn thành",
          life: 3000,
        });
        reloadData();
        setFormData(initFormValue); 
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const validate = () => {
    let isValid = true;
    const newErrors = {};

    // Kiểm tra lỗi cho trường description
    if (!formData.description) {
      newErrors.description = "Description is required.";
      isValid = false;
    } else if (formData.description.trim().length < 20) {
      newErrors.description =
        "Description must be at least 20 characters long.";
      isValid = false;
    }

    // Kiểm tra lỗi cho trường name
    if (!formData.name) {
      newErrors.name = "Name is required.";
      isValid = false;
    }

    // Kiểm tra lỗi cho trường location
    if (!formData.location) {
      newErrors.location = "Location is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  const parsedDate = formData ? new Date(formData.start_date) : null;

  return (
    <div>
      <div className="container_update">
        <div style={{ flex: 1, paddingRight: "1rem" }}>
          <Toast className="toast" ref={toast} />
          <div className="userUpdateItem">
            <label>Tên</label>
            <InputText
              type="text"
              name="name"
              autoResize
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <small className="p-error">{errors.name}</small>}
          </div>

          <div className="userUpdateItem">
            <label>Số lượng</label>
            <InputText
              type="number"
              name="member_count"
              value={formData.member_count}
              onChange={handleChange}
            />
          </div>
          <div className="userUpdateItem">
            <label>Quantity</label>
            <InputText
              disabled
              type="number"
              name="quantity"
              value={formData.quantity}
              autoResize
              onChange={handleChange}
            />
          </div>
        </div>
        <div style={{ flex: 1, paddingRight: "1rem" }}>
          <div className="userUpdateItem">
            <label>Vị trí</label>
            <InputTextarea
              name="location"
              value={formData.location}
              autoResize
              onChange={handleChange}
            />
            {errors.location && (
              <small className="p-error">{errors.location}</small>
            )}
          </div>
          <div className="userUpdateItem">
            <label>Nhóm</label>
            <Dropdown
              placeholder={formData.category.name}
              type="text"
              value={selectedCategories}
              options={categories}
              optionLabel="name"
              onChange={(e) => {
                setelectedCategories(e.value);
                formData.categoryId = e.value._id;
              }}
              style={{ width: "100%" }}
            />
          </div>
          <div className="userUpdateItem">
            <label>farm</label>
            <Dropdown
              type="text"
              options={farm}
              optionLabel="name"
              onChange={(e) => {
                setSelectedfarm(e.value);
                formData.farmId = e.value._id;
              }}
              value={selectedfarm}
            />
          </div>
          <div className="userUpdateItem">
            <label>Start day</label>
            <Calendar
              inputId="cal_date"
              name="start_date"
              style={{ width: "100%" }}
              value={parsedDate}
              // value={formData.start_date}
              onChange={handleChange}
            />
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <div className="userUpdateItem">
            <label>Mô tả</label>
            <InputTextarea
              name="description"
              value={formData.description}
              autoResize
              onChange={handleChange}
            />
            {errors.description && (
              <small className="p-error">{errors.description}</small>
            )}
          </div>
        </div>
      </div>

      <Button
        className="button_Dia"
        id="Save"
        label={isUpdate ? "Cập nhật" : "Thêm mới"}
        severity="success"
        onClick={handleSubmit}
      />
    
    </div>
  );
}
export default Infor_Herd;
