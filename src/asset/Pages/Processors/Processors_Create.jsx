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
  date: null,
  harvest: {
    _id:"",
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

function YourComponent({ data }) {
  const [product, setProduct] = useState(emptyProduct);
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
        harvest: {
          ...emptyProduct.harvest,
          _id: data.harvest.herd,
          name: data.harvest.name,
          quantity: data.harvest.quantity,
        },
      });
    }
  }, [data]);

  const getHerds = async () => {
    try {
      const res = await axios.get(`/harvests`);
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

  const handleUnitChange = (event) => {
    setProduct({
      ...product,
      harvest: {
        ...product.harvest,
        unit: event.value,
      },
    });
  };

  const handleCreate = async () => {
    if (!validate()) {
      return;
    }

    try {
      await axios.post(`/processors`, product);
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

    if (!product.name.trim()) {
      newErrors.name = "Name is required.";
      isValid = false;
    }

    if (!product.location.trim()) {
      newErrors.location = "Location is required.";
      isValid = false;
    }

    if (!product.date) {
      newErrors.date = "Date is required.";
      isValid = false;
    }

    if (!product.harvest.herd) {
      newErrors.herd = "Herd is required.";
      isValid = false;
    }

    if (!product.harvest.name.trim()) {
      newErrors.harvestName = "Harvest Name is required.";
      isValid = false;
    }

    if (!product.harvest.quantity.trim()) {
      newErrors.quantity = "Quantity is required.";
      isValid = false;
    } else if (isNaN(product.harvest.quantity) || parseFloat(product.harvest.quantity) < 0) {
      newErrors.quantity = "Quantity must be a non-negative number.";
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

          <h4>Name</h4>
          <InputText
            name="name"
            value={product.name}
            style={{ width: "100%" }}
            onChange={handleChange}
          />
          {errors.name && <small className="p-error">{errors.name}</small>}

          <h4>Location</h4>
          <InputTextarea
            name="location"
            value={product.location}
            style={{ width: "100%" }}
            onChange={handleChange}
          />
          {errors.location && (
            <small className="p-error">{errors.location}</small>
          )}
        </div>

        {/* Cột phải */}
        <div style={{ flex: 1 }}>
          <h4>Harvest Herd</h4>
          <Dropdown
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
                  herd: e.value.herd,
                },
              });
            }}
            style={{ width: "100%" }}
          />
          {errors.herd && <small className="p-error">{errors.herd}</small>}

          <h4>Harvest Name</h4>
          <InputText
            name="harvestName"
            value={product.harvest.name}
            style={{ width: "100%" }}
            onChange={(e) =>
              setProduct({
                ...product,
                harvest: {
                  ...product.harvest,
                  name: e.target.value,
                },
              })
            }
          />
          {errors.harvestName && (
            <small className="p-error">{errors.harvestName}</small>
          )}

          <h4>Quantity</h4>
          <InputText
            type="number"
            name="quantity"
            value={product.harvest.quantity}
            style={{ width: "100%" }}
            onChange={(e) =>
              setProduct({
                ...product,
                harvest: {
                  ...product.harvest,
                  quantity: e.target.value,
                },
              })
            }
          />
          {errors.quantity && (
            <small className="p-error">{errors.quantity}</small>
          )}

          <h4>Unit</h4>
          <Dropdown
            name="unit"
            value={product.harvest.unit}
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
            onChange={(e) => setProduct({ ...product, date: e.value })}
          />
          {errors.date && <small className="p-error">{errors.date}</small>}
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

export default YourComponent;
