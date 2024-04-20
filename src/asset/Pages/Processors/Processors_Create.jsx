import React, { useState, useRef, useEffect } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import axios from "axios";
import { Toast } from "primereact/toast";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import "./Processors.css";
import { InputText } from "primereact/inputtext";

const emptyProduct = {
  name: "",
  location: "",
  date: new Date(),
  harvest: "",
};
function YourComponent({ data, reloadData, isUpdate }) {
  const [product, setProduct] = useState(data || emptyProduct);
  const [errors, setErrors] = useState({});
  const [herds, setHerds] = useState({});
  const [selectedHerd, setSelectedHerd] = useState(null);
  const toast = useRef(null);

  useEffect(() => {
    getHerds();
    if (data) {
      setProduct({
        ...emptyProduct,
        name: data.name,
        location: data.location,
        date: data.date ? new Date(data.date) : null,
        harvest: data.harvest,
      });
    }
  }, [data]);

  const getHerds = async () => {
    try {
      const res = await axios.get(`/harvests?&limit=50`);
      setHerds(res.data.harvests);
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

  const handleCreate = async () => {
    if (!validate()) {
      return;
    }
    console.log(product);
    try {
      if (isUpdate) {
        product.date = product.date.props
          ? product.date.props.originalDate
          : product.date;
        await axios.patch(`/processors/${data._id}`, product);
        toast.current.show({
          severity: "success",
          summary: "Sửa hoàn thành",
          life: 3000,
        });
      } else {
        await axios.post(`/processors`, product);
        toast.current.show({
          severity: "success",
          summary: "Thêm hoàn thành",
          life: 3000,
        });
        setProduct(emptyProduct);
      }
      reloadData();
    } catch (error) {
      console.log("Error :", error);
    }
  };

  const validate = () => {
    let isValid = true;
    const newErrors = {};

    if (!product.name.trim() === "") {
      newErrors.name = "Tên ?";
      isValid = false;
    }

    if (!product.location.trim() === "") {
      newErrors.location = "Vị trí ?.";
      isValid = false;
    }

    if (!product.harvest.herd === "") {
      newErrors.herd = "Thu hoạch từ đàn ?";
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
      <div style={{ display: "flex", gap: "2rem" }}>
        {/* Cột trái */}
        <div style={{ flex: 1 }}>
          <Toast className="toast" ref={toast} />

          <h4>Tên</h4>
          <InputText
            name="name"
            value={product.name}
            style={{ width: "100%" }}
            onChange={handleChange}
          />
          {errors.name && <small className="p-error">{errors.name}</small>}

          <h4>Vị trí</h4>
          <InputTextarea
            name="location"
            value={product.location}
            style={{ width: "100%" }}
            onChange={handleChange}
          />
          {errors.location && (
            <small className="p-error">{errors.location}</small>
          )}
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
        </div>

        {/* Cột phải */}
        <div style={{ flex: 1 }}>
          <h4>Thu hoạch sản phẩm</h4>
          <Dropdown
            placeholder={data ? data.harvest.name : ""}
            type="text"
            value={selectedHerd}
            options={herds}
            optionLabel="name"
            onChange={(e) => {
              setSelectedHerd(e.value);
              setProduct({
                ...product,
                harvest: {
                  ...product.harvest,
                  _id: e.value._id,
                },
              });
            }}
            style={{ width: "100%" }}
          />
          {errors.herd && <small className="p-error">{errors.herd}</small>}
          {isUpdate && (
            <>
              <h4>Số lượng</h4>
              <InputText
                disabled
                type="number"
                name="quantity"
                value={product.harvest.quantity}
                style={{ width: "100%" }}
              />

              <h4>Đơn vị</h4>
              <Dropdown
                disabled
                name="unit"
                value={product.harvest.unit}
                placeholder={data ? data.harvest.unit : ""}
                style={{ width: "100%" }}
              />
            </>
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
