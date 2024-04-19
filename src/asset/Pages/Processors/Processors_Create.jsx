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
    _id: "",
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
    const newValue = name === "date" ? value.toISOString() : value;
    setProduct({
      ...product,
      [name]: newValue,
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
      if (isUpdate) {
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

    if (!product.name.trim()) {
      newErrors.name = "Tên ?";
      isValid = false;
    }

    if (!product.location.trim()) {
      newErrors.location = "Vị trí ?.";
      isValid = false;
    }

    if (!product.date) {
      product.date = new Date();
      isValid = true;
    }

    if (!product.harvest.herd) {
      newErrors.herd = "Thu hoạch từ đàn ?";
      isValid = false;
    }

    if (!product.harvest.name.trim()) {
      newErrors.harvestName = "Tên sản phẩm ?";
      isValid = false;
    }

    if (!product.harvest.quantity) {
      newErrors.quantity = "Số lượng ?";
      isValid = false;
    } else if (
      isNaN(product.harvest.quantity) ||
      parseFloat(product.harvest.quantity) < 0
    ) {
      newErrors.quantity = "Số lượng là phải dương ?";
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
                  herd: e.value.herd,
                },
              });
            }}
            style={{ width: "100%" }}
          />
          {errors.herd && <small className="p-error">{errors.herd}</small>}
          {isUpdate && (
            <>
              <h4>Tên sản phẩm</h4>
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

              <h4>Số lượng</h4>
              <InputText
                disabled
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

              <h4>Đơn vị</h4>
              <Dropdown
                disabled
                name="unit"
                value={product.harvest.unit}
                options={unitOptions}
                onChange={handleUnitChange}
                placeholder={data ? data.harvest.unit : ""}
                style={{ width: "100%" }}
              />
              {errors.unit && <small className="p-error">{errors.unit}</small>}

              {/* <h4>Ngày</h4>
          <Calendar
            inputId="cal_date"
            name="date"
            style={{ width: "100%" }}
            value={product.date}
            onChange={(e) => setProduct({ ...product, date: e.value })}
          /> */}
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
