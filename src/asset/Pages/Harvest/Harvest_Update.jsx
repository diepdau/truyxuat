import React, { useState, useRef, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import axios from "axios";
import { Toast } from "primereact/toast";
import "./Harvest.css";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";

const emptyProduct = {
  herd: {
    _id: "",
    name: "",
  },
  // name: "",
  // quantity: "",
  unit: null,
  date: "",
};

const unitOptions = [
  { label: "Cân", value: "Cân" },
  { label: "Kg", value: "Kg" },
  { label: "Túi", value: "Túi" },
];
function YourComponent({ data, reloadData }) {
  const [product, setProduct] = useState(data || emptyProduct);
  const [errors, setErrors] = useState({});
  const [herds, setHerds] = useState({});
  const [selectedHerd, setSelectedHerd] = useState(null);
  const toast = useRef(null);
  useEffect(() => {
    getHerd();
  }, []);
  const getHerd = async () => {
    try {
      const res = await axios.get(`/herds`);
      setHerds(res.data.herds);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };
  // const handleChangeDate = (event) => {
  //   const { value, name } = event.target;
  //   let updatedDate = value;
  //   updatedDate = product.date.props ? product.date.props.originalDate : value;

  //   setProduct({
  //     ...product,
  //     [name]: updatedDate,
  //   });
  //   console.log(product);
  // };

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
    product.date = product.date.props
      ? product.date.props.originalDate
      : product.date;
    try {
      await axios.patch(`/harvests/${data._id}`, product);
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

    // Kiểm tra lỗi cho trường herd
    // if (!product.herd.trim()) {
    //   newErrors.herd = "Herd is required.";
    //   isValid = false;
    // }

    // Kiểm tra lỗi cho trường name
    if (!product.name.trim() === "") {
      newErrors.name = "Name is required.";
      isValid = false;
    }
    if (!product.description.trim() === "") {
      newErrors.description = "Description is required.";
      isValid = false;
    }
    // Kiểm tra lỗi cho trường quantity
    if (!product.quantity || product.quantity <= 0) {
      newErrors.quantity = "quantity phải lớn hơn 0 và không được để trống";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };
  let formattedDate = ""; // Declare formattedDate variable

  if (product.date && typeof product.date === "object" && product.date.props) {
    formattedDate = product.date.props.originalDate;
  } else {
    formattedDate = new Date(product.date);
  }
  return (
    <div>
      <div className="container_update">
        <div style={{ flex: 1, paddingRight: "1rem" }}>
          <Toast className="toast" ref={toast} />

          <h4>Đàn</h4>
          <Dropdown
            placeholder={data.herd.name}
            type="text"
            value={selectedHerd} //
            options={herds}
            optionLabel="herds.name"
            onChange={(e) => {
              setSelectedHerd(e.value);
              product.herd = e.value._id;
            }}
            style={{ width: "100%" }}
          />
          {errors.herd && <small className="p-error">{errors.herd}</small>}

          <h4>Tên sản phẩm</h4>
          <InputText
            name="name"
            value={product.name}
            autoResize
            style={{ width: "100%" }}
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
        </div>

        {/* Cột phải */}
        <div style={{ flex: 1 }}>
          <h4>Số lượng</h4>
          <InputText
            name="quantity"
            type="number"
            value={product.quantity}
            autoResize
            style={{ width: "100%" }}
            onChange={handleChange}
          />
          {errors.quantity && (
            <small className="p-error">{errors.quantity}</small>
          )}

          <h4>Đơn vị</h4>
          <Dropdown
            name="unit"
            value={product.unit}
            options={unitOptions}
            optionLabel="label"
            onChange={handleUnitChange}
            placeholder="Select a unit"
            style={{ width: "100%" }}
          />

          <h4>Ngày</h4>
          <Calendar
            inputId="cal_date"
            name="date"
            style={{ width: "100%" }}
            value={
              formattedDate instanceof Date
                ? formattedDate
                : new Date(formattedDate)
            }
            onChange={handleChange}
          />
          {errors.date && <small className="p-error">{errors.date}</small>}
        </div>
      </div>
      <Button
        className="button_Dia"
        id="Save"
        label="Lưu"
        severity="success"
        onClick={handleCreate}
      />
    </div>
  );
}

export default YourComponent;
