import React, { useState, useRef, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import axios from "axios";
import { Toast } from "primereact/toast";
import "./Processors.css";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";

const emptyProduct = {
  name: "",
  location: "",
  date: "",
  harvest: {
    herd: "",
    name: "",
    quantity: "",
  },
};

const unitOptions = [
  { label: "Cân", value: "Cân" },
  { label: "Kg", value: "Kg" },
  { label: "Túi", value: "Túi" },
];

function YourComponent({ data, reloadData }) {
  const [product, setProduct] = useState(data || emptyProduct);
  const [errors, setErrors] = useState({});
  const [herds, setHerds] = useState([]);
  const [selectedHerd, setSelectedHerd] = useState(null);
  const toast = useRef(null);
  useEffect(() => {
    getHerds();
  }, []);

  const getHerds = async () => {
    try {
      const res = await axios.get(`/herds`);
      setHerds(res.data.herds);
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
  const handleHarvestChange = (event) => {
    const { name, value } = event.target;
    setProduct({
      ...product,
      harvest: {
        ...product.harvest,
        [name]: value,
      },
    });
  };

  const handleCreate = async () => {
    if (!validate()) {
      return;
    }

    try {
      const response = await axios.patch(`/processors/${data._id}`, product);
      toast.current.show({
        severity: "success",
        summary: "Sửa hoàn thành",
        life: 3000,
      });
      reloadData();
      setProduct(response.data);
    } catch (error) {
      console.log("Error update:", error);
    }
  };

  const validate = () => {
    let isValid = true;
    const newErrors = {};

    // if (!product.name.trim()) {
    //   newErrors.name = "Name is required.";
    //   isValid = false;
    // }

    // if (!product.location.trim()) {
    //   newErrors.location = "Location is required.";
    //   isValid = false;
    // }

    // if (!product.date) {
    //   newErrors.date = "Date is required.";
    //   isValid = false;
    // }

    // if (!product.harvest.name.trim()) {
    //   newErrors.harvestName = "Harvest name is required.";
    //   isValid = false;
    // }

    // if (!product.harvest.quantity) {
    //   newErrors.harvestQuantity = "Harvest quantity is required.";
    //   isValid = false;
    // } else if (isNaN(product.harvest.quantity)) {
    //   newErrors.harvestQuantity = "Harvest quantity must be a number.";
    //   isValid = false;
    // }

    setErrors(newErrors);
    return isValid;
  };

  const parsedDate = product.date ? new Date(product.date) : null;

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

          <h4>Địa điểm</h4>
          <InputText
            name="location"
            value={product.location}
            autoResize
            style={{ width: "100%" }}
            onChange={handleChange}
          />
          {errors.location && <small className="p-error">{errors.location}</small>}

          <h4>Ngày</h4>
          <Calendar
            inputId="cal_date"
            name="date"
            style={{ width: "100%" }}
            value={parsedDate}
            onChange={handleChange}
          />
          {errors.date && <small className="p-error">{errors.date}</small>}
        </div>

        {/* Cột phải */}
        <div style={{ flex: 1 }}>
          <h4>Đàn</h4>
          <Dropdown
            placeholder="Select herd"
            value={selectedHerd}
            options={herds}
            optionLabel="name"
            onChange={(e) => {
              setSelectedHerd(e.value);
              handleHarvestChange({ target: { name: "herd", value: e.value._id } });
            }}
            style={{ width: "100%" }}
          />
          {errors.harvestHerd && <small className="p-error">{errors.harvestHerd}</small>}

          {/* <h4>Tên sản phẩm</h4>
          <InputText
            name="name"
            value={product.harvest.name}
            autoResize
            style={{ width: "100%" }}
            onChange={handleHarvestChange}
          />
          {errors.harvestName && <small className="p-error">{errors.harvestName}</small>}

          <h4>Số lượng</h4>
          <InputText
            name="quantity"
            type="number"
            value={product.harvest.quantity}
            autoResize
            style={{ width: "100%" }}
            onChange={handleHarvestChange}
          />
          {errors.harvestQuantity && <small className="p-error">{errors.harvestQuantity}</small>} */}

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
