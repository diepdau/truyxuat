import React, { useState, useRef} from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import axios from "axios";
import { Toast } from "primereact/toast";
import "./ProductPatchs.css";
import { Calendar } from "primereact/calendar";
import { InputTextarea } from "primereact/inputtextarea";

const emptyProduct = {
  quantity: "",
  description: "",
  production_date: "",
  release_date: "",
};

function YourComponent({ data, reloadData }) {
  const [product, setProduct] = useState(data || emptyProduct);
  const [errors, setErrors] = useState({});
  const toast = useRef(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handle = async () => {
    if (!validate()) {
      return;
    }
    try {
      const response = await axios.patch( `/product-patchs/${data._id}`, product );
      toast.current.show({severity: "success",summary: "Sửa hoàn thành", life: 3000, });
      reloadData();
      setProduct(response.data);
    } catch (error) {
      console.log("Error update:", error);
    }
  };

  const validate = () => {
    let isValid = true;
    const newErrors = {};

    // Add validation logic here

    setErrors(newErrors);
    return isValid;
  };

  const parsedDate = product.production_date
    ? new Date(product.production_date)
    : null;
  const parsedDate1 = product.release_date
    ? new Date(product.release_date)
    : null;
  return (
    <div>
      <div className="container_update">
        <div style={{ flex: 1, paddingRight: "1rem" }}>
          <Toast className="toast" ref={toast} />
          <h4>[Id lô hàng]</h4>
          <InputText
            name="_id"
            value={product._id}
            autoResize
            style={{ width: "100%" }}
            onChange={handleChange}
          />

          <h4>Mô tả</h4>
          <InputTextarea
            name="description"
            value={product.description}
            autoResize
            style={{ width: "100%" }}
            onChange={handleChange}
          />
        </div>
        <div style={{ flex: 1 }}>
          <h4>Số lượng</h4>
          <InputText
          type="number"
            name="quantity"
            value={product.quantity}
            autoResize
            style={{ width: "100%" }}
            onChange={handleChange}
          />
          <h4>Ngày sản xuất</h4>
          <Calendar
            inputId="cal_date"
            name="date"
            style={{ width: "100%" }}
            value={parsedDate}
            onChange={handleChange}
          />
          <h4>Ngày phát hành</h4>
          <Calendar
            inputId="cal_date"
            name="date"
            style={{ width: "100%" }}
            value={parsedDate1}
            onChange={handleChange}
          />
        </div>
      </div>
      <Button
        className="button_Dia"
        id="Save"
        label="Lưu"
        severity="success"
        onClick={handle}
      />
    </div>
  );
}

export default YourComponent;
