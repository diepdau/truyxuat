import React, { useState, useRef, useEffect } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import axios from "axios";
import { Toast } from "primereact/toast";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import "./Harvest.css";

const emptyProduct = {
  herd: {
    _id: "",
    name: "",
  },
  name: "",
  quantity: "",
  unit: null,
  date: null,
};

const unitOptions = [
  { label: "Cân", value: "Cân" },
  { label: "Kg", value: "Kg" },
];

function YourComponent() {
  const [product, setProduct] = useState(emptyProduct);
  const [errors, setErrors] = useState({});
  const [herds, setHerds] = useState({});
  const [selectedHerd, setSelectedHerd] = useState(emptyProduct);
  const toast = useRef(null);
  useEffect(() => {
    getHerd();
  }, []);
  const getHerd = async () => {
    try {
      const res = await axios.get(`/herds`);
      setHerds(res.data.herds);
      console.log(res.data.herds);
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

    try {
      await axios.post(`/harvests`, product);
      toast.current.show({
        severity: "success",
        summary: "Thêm hoàn thành",
        life: 3000,
      });
      setProduct(emptyProduct);
    } catch (error) {
      console.log("Error update:", error);
    }
  };

  const validate = () => {
    let isValid = true;
    const newErrors = {};

    // if (!product.herd._id.trim()) {
    //   newErrors.herd = "Herd is required.";
    //   isValid = false;
    // }

    if (!product.name.trim()) {
      newErrors.name = "Name is required.";
      isValid = false;
    }

    if (!product.quantity.trim()) {
      newErrors.quantity = "Quantity is required.";
      isValid = false;
    } else if (isNaN(product.quantity)) {
      newErrors.quantity = "Quantity must be a number.";
      isValid = false;
    }

    if (!product.unit) {
      newErrors.unit = "Unit is required.";
      isValid = false;
    }

    if (!product.date) {
      newErrors.date = "Date is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  return (
    <div>
      <Toast className="toast" ref={toast} />
      <h4>Herds</h4>
      <Dropdown
        type="text"
        options={herds}
        optionLabel="name"
        onChange={(e) => {
          setSelectedHerd({ name: e.label, _id: e.value });
          selectedHerd.name = e.value.name;
          selectedHerd._id = e.value._id;
        }}
        value={product.herd._id}
        className="userUpdateInput"
      />
      {errors.herd._id && <small className="p-error">{errors.herd._id}</small>}

      <h4>Name</h4>
      <InputTextarea
        name="name"
        value={product.name}
        style={{ width: "100%" }}
        onChange={handleChange}
      />
      {errors.name && <small className="p-error">{errors.name}</small>}

      <h4>Quantity</h4>
      <InputTextarea
        name="quantity"
        value={product.quantity}
        type="number"
        style={{ width: "100%" }}
        onChange={handleChange}
      />
      {errors.quantity && <small className="p-error">{errors.quantity}</small>}

      <h4>Unit</h4>
      <Dropdown
        name="unit"
        value={product.unit}
        options={unitOptions}
        onChange={handleUnitChange}
        placeholder="Select a unit"
      />
      {errors.unit && <small className="p-error">{errors.unit}</small>}

      <h4>Date</h4>
      <Calendar
        inputId="cal_date"
        name="date"
        style={{ width: "100%" }}
        value={product.date}
        onChange={(e) => setProduct({ ...product, date: e.value })}
      />
      {errors.date && <small className="p-error">{errors.date}</small>}

      <Button
        className="button_Dia"
        id="Luu"
        label="Lưu"
        severity="success"
        onClick={handleCreate}
      />
    </div>
  );
}

export default YourComponent;