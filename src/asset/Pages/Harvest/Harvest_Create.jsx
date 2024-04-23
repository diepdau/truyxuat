import React, { useState, useRef, useEffect } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import axios from "axios";
import { Toast } from "primereact/toast";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import "./Harvest.css";
import { InputText } from "primereact/inputtext";

const emptyProduct = {
  herd: "",
  name: "",
  quantity: "",
  unit: null,
  date: new Date(),
};
const unitOptions = [
  { label: "Cân", value: "Cân" },
  { label: "Kg", value: "Kg" },
  { label: "Túi", value: "Túi" },
  { label: "Lít", value: "Lít" },
];

function Harvest_Create({ reloadData, idherd }) {
  const [product, setProduct] = useState(emptyProduct);
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
      if (idherd) {
        setProduct((prevProduct) => ({
          ...prevProduct,
          herd: idherd,
        }));
      }
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
    console.log(product);
    if (!validate()) {
      return;
    }
    console.log("xxxxx", product);
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
    reloadData();
  };

  const validate = () => {
    let isValid = true;
    const newErrors = {};
    // Validate herd
    if (!product.herd.trim()) {
      newErrors.herd = "Herd is required.";
      isValid = false;
    }

    // Validate name
    if (!product.name.trim()) {
      newErrors.name = "Name is required.";
      isValid = false;
    }

    // Validate quantity
    if (!product.quantity || product.quantity <= 0) {
      newErrors.quantity = "Quantity must be greater than 0 and not empty.";
      isValid = false;
    }

    // Validate unit
    if (!product.unit) {
      newErrors.unit = "Unit is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  return (
    <div>
      <div style={{ display: "flex", gap: "2rem" }}>
        {/* Cột trái */}
        <div style={{ flex: 1 }}>
          <Toast className="toast" ref={toast} />

          <h4>Herds</h4>
          {idherd ? (
            <InputText
              disabled
              type="text"
              name="herd"
              placeholder={idherd}
              style={{ width: "100%" }}
            />
          ) : (
            <>
              <Dropdown
                type="text"
                value={selectedHerd}
                options={herds}
                optionLabel="name"
                onChange={(e) => {
                  setSelectedHerd(e.value);
                  product.herd = e.value._id;
                }}
                style={{ width: "100%" }}
              />
              {errors.herd && <small className="p-error">{errors.herd}</small>}
            </>
          )}
          <h4>Name</h4>
          <InputTextarea
            name="name"
            value={product.name}
            style={{ width: "100%" }}
            onChange={handleChange}
          />
          {errors.name && <small className="p-error">{errors.name}</small>}
        </div>

        {/* Cột phải */}
        <div style={{ flex: 1 }}>
          <h4>Quantity</h4>
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

          <h4>Unit</h4>
          <Dropdown
            name="unit"
            value={product.unit}
            options={unitOptions}
            onChange={handleUnitChange}
            placeholder="Select a unit"
            style={{ width: "100%" }}
          />
          {errors.unit && <small className="p-error">{errors.unit}</small>}

          <h4>Date</h4>
          <Calendar
            inputId="cal_date"
            name="date"
            style={{ width: "100%" }}
            value={product.date}
            onChange={handleChange}
          />
        </div>
      </div>
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

export default Harvest_Create;
