import React, { useState, useRef,useContext } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { handleUpdate} from "../../service/disease_data.js";
import { AuthContext } from "../../service/user_service.js";
const emptyProduct = {
  name: "",
  description: "",
  symptoms: "",
  preventive_measures: "",
};

function YourComponent({ data, reloadData }) {
  const [product, setProduct] = useState(data || emptyProduct);
  const [errors, setErrors] = useState({});
  const toast = useRef(null);
  const { token } = useContext(AuthContext);

  const handleChange = (event) => {
    const { value, name } = event.target;

    setProduct({
      ...product,
      [name]: value,
    });
  };

  const onRowEditComplete = async () => {
    if (!validate()) {
      return;
    }

    try {
      const dataUpdate= {
        name: product.name,
        description: product.description,
        symptoms: product.symptoms,
        preventive_measures: product.preventive_measures,
      };
     const response= handleUpdate(data._id,dataUpdate,token)
      toast.current.show({
        severity: "success",
        summary: "Sửa hoàn thành",
        life: 3000,
      });
      setProduct({
        ...product,
        name: response.data.name,
        description: response.data.description,
        symptoms: response.data.symptoms,
        preventive_measures: response.data.preventive_measures,
      });
      reloadData();
    } catch (error) {
      console.log("Error update:", error);
    }
  };

  const validate = () => {
    let isValid = true;
    const newErrors = {};
    if (!product.name.trim()) {
      newErrors.name = "Tên là bắt buộc.";
      isValid = false;
    }
    // Kiểm tra lỗi cho trường description
    if (!product.description.trim()) {
      newErrors.description = "Mô tả là bắt buộc.";
      isValid = false;
    } else if (product.description.trim().length < 20) {
      newErrors.description =
        "Mô tả hơn 20 kí tự.";
      isValid = false;
    }

    // Kiểm tra lỗi cho trường symptoms
    if (!product.symptoms.trim()) {
      newErrors.symptoms = "Triệu chứng là bắt buộc.";
      isValid = false;
    } else if (product.symptoms.trim().length < 20) {
      newErrors.symptoms = "Triệu chứng hơn 20 kí tự.";
      isValid = false;
    }

    // Kiểm tra lỗi cho trường preventive_measures
    if (!product.preventive_measures.trim()) {
      newErrors.preventive_measures = "Biện pháp phòng ngừa.";
      isValid = false;
    } 

    setErrors(newErrors);
    return isValid;
  };

  return (
    <div>
      <Toast className="toast" ref={toast} />
      <div className="container_update_areas">
        <div style={{ flex: 1, paddingRight: "1rem" }}>
          <h4>Tên bệnh</h4>
          <InputTextarea
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
        <div style={{ flex: 1 }}>
          <h4>Triệu chứng</h4>
          <InputTextarea
            name="symptoms"
            value={product.symptoms}
            autoResize
            style={{ width: "100%" }}
            onChange={handleChange}
          />
          {errors.symptoms && (
            <small className="p-error">{errors.symptoms}</small>
          )}

          <h4>Biện pháp phòng ngừa</h4>
          <InputTextarea
            name="preventive_measures"
            value={product.preventive_measures}
            autoResize
            style={{ width: "100%" }}
            onChange={handleChange}
          />
          {errors.preventive_measures && (
            <small className="p-error">{errors.preventive_measures}</small>
          )}
        </div>
      </div>
      <Button
        className="button_Dia"
        id="Save"
        label="Lưu"
        severity="success"
        onClick={onRowEditComplete}
      />
    </div>
  );
}

export default YourComponent;
