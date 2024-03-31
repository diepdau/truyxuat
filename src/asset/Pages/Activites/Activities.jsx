import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import "../Home/Home.css";

const Activities = () => {
  const navigate = useNavigate();
  const [farmProducts, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({
    _id: "",
    name: "",
    description: "",
    amount: 9,
    unit: "",

   
  });
  const [isEditing, setEditing] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

  //ScrollTo...
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const amountRef = useRef(null);
  const unitRef = useRef(null);


  //Kết nối API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/activities");

        const productData = response.data.activities;
        console.log("data", productData);
        setProducts(productData);
      } catch (error) {
        console.error("Error fetching product detail:", error);
      }
    };

    fetchProducts();
  }, []);
  useEffect(() => {
    const fetchPestsCategory = async () => {
      try {
        const responsesFarmingArea = await axios.get("/activities");

        const FarmingArea = responsesFarmingArea.data.activities;
        console.log("activites090");
        console.log("data", FarmingArea);
      } catch (error) {
        console.log("Error fetching detail:", error);
      }
    };
    fetchPestsCategory();
  }, []);

  const handlePatchProduct = async () => {
    try {
      const response = await axios.patch(
        `/activities/${selectedProduct._id}`,
        {
            name: nameRef.current.value,
            description: descriptionRef.current.value,
            amount: amountRef.current.value,
            unit: unitRef.current.value,
        }
      );
      console.log("Product updated successfully:", response.data);
      setEditing(false);
      alert("Chỉnh sửa thành công!");
      navigate("/activities");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Đã có lỗi xảy ra khi chỉnh sửa!");
    }
  };

  const handleDeleteProduct = async () => {
    try {
      const response = await axios.delete(
        `/activities/${selectedProduct._id}`
      );
      console.log("Product deleted successfully:", response.data);
      setDeleting(false);
      alert("Xóa thành công!");
      navigate("/activities");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Đã có lỗi xảy ra khi xóa!", JSON.stringify(error));
    }
  };
  const handleCreatePest = async () => {
    try {
      const response = await axios.post("/activities", {
        name: nameRef.current.value,
        description: descriptionRef.current.value,
        amount: amountRef.current.value,
        unit: unitRef.current.value,
      });

      handleIconDelete(1);
      console.log("Created successfully:", response.data);
      setProducts([...farmProducts, response.data.activities]);
      setSelectedProduct(response.data.ctivities);
      alert("Created successfully!");
      navigate("/activities");
    } catch (error) {
      console.log("Error creating:", error);
      alert("An error occurred while creating the.");
    }
  };


  //Xoá từng nội dung
  const handleIconDelete = (ref) => {
    if (ref && ref.current) {
      ref.current.value = "";
    }
    if (ref === 1) {
      nameRef.current.value = "";
      descriptionRef.current.value = "";
      amountRef.current.value = "";
      unitRef.current.value = "";
    }
  };
  return (
    <div>
      {!farmProducts ? (
        <div>Loading...</div>
      ) : (
        <div>
          <Dropdown
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.value)}
            options={farmProducts}
            optionLabel="name"
            placeholder="Select a FarmProduct"
            className="w-full md:w-25rem mar"
          />
          {selectedProduct && (
            <div className="card mar">
              <h1>Hoạt động</h1>
              <div>
                {isEditing ? (
                  <>
                    <Button severity="success" onClick={handlePatchProduct}>Lưu</Button>
                    <Button severity="danger" onClick={() => setDeleting(true)}>Hủy</Button>
                  </>
                ) : (
                  <Button severity="success" onClick={() => setEditing(true)}>Chỉnh sửa</Button>
                )}
                {/* {!isEditing && (
                  <> */}
                <Button severity="success" onClick={handleCreatePest}>Tạo mới</Button>
                <Button severity="success" onClick={() => handleIconDelete(1)}>Xóa toàn bộ</Button>
                <Button severity="success" onClick={() => setDeleting(true)}>Xóa</Button>
                {/* </>
                )} */}
              </div>
              <div>
                <div className="product-names" style={{}}>
                <h2 >
                    {selectedProduct.name}
                  </h2>
                  
                </div>
                <div>
                  <div className="acc">
                    <div className="inforpage">
                      <h3 ref={nameRef}>Tên</h3>
                      <div className="iconpage">
                        <i
                          className="fa fa-trash-o"
                          onClick={() => handleIconDelete(nameRef)}
                        ></i>
                        <i className="fa fa-pencil"></i>
                      </div>
                    </div>
                    <InputTextarea
                      ref={nameRef}
                      onChange={(e) =>
                        setSelectedProduct((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      value={selectedProduct.name}
                      required
                      rows={3}
                      cols={300}
                      style={{ width: "100%" }}
                    />
                  </div>

                  
                   
                  <div className="acc">
                    <div className="inforpage">
                      <h3 ref={descriptionRef}>Mô tả</h3>
                      <div className="iconpage">
                        <i
                          className="fa fa-trash-o"
                          onClick={() => handleIconDelete(descriptionRef)}
                        ></i>
                        <i className="fa fa-pencil"></i>
                      </div>
                    </div>
                    <InputTextarea
                      autoResize
                      ref={descriptionRef}
                      onChange={(e) =>
                        setSelectedProduct((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      value={selectedProduct.description}
                      required
                      rows={3}
                      cols={20}
                      style={{ width: "100%" }}
                    />
                  </div>

                  <div className="acc">
                    <div className="inforpage">
                      <h3 ref={amountRef}>Nguồn gốc</h3>
                      <div className="iconpage">
                        <i
                          className="fa fa-trash-o"
                          onClick={() => handleIconDelete(amountRef)}
                        ></i>
                        <i className="fa fa-pencil"></i>
                      </div>
                    </div>
                    <InputTextarea
                      ref={amountRef}
                      onChange={(e) =>
                        setSelectedProduct((prev) => ({
                          ...prev,
                          amount: e.target.value,
                        }))
                      }
                      value={selectedProduct.amount}
                      required
                      rows={3}
                      cols={20}
                      style={{ width: "100%" }}
                    />
                  </div>

                  <div className="acc">
                    <div className="inforpage">
                      <h3 ref={unitRef}>
                        Unit
                      </h3>
                      <div className="iconpage">
                        <i
                          className="fa fa-trash-o"
                          onClick={() => handleIconDelete(unitRef)}
                        ></i>
                        <i className="fa fa-pencil"></i>
                      </div>
                    </div>
                    <InputTextarea
                      ref={unitRef}
                      onChange={(e) =>
                        setSelectedProduct((prev) => ({
                          ...prev,
                          unit: e.target.value,
                        }))
                      }
                      value={selectedProduct.unit}
                      required
                      rows={3}
                      cols={20}
                      style={{ width: "100%" }}
                    />
                  </div>
                  
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      
      <Dialog visible={isDeleting} onHide={() => setDeleting(false)}>
        <h3>Thông báo xóa</h3>
        <p>Bạn có chắc chắn xóa {selectedProduct?.name}?</p>
        <div>
          <Button
            label="Yes"
            icon="pi pi-check"
            severity="danger"
            onClick={handleDeleteProduct}
          />
          <Button
            label="No"
            icon="pi pi-times"
            outlined
            onClick={() => setDeleting(false)}
          />
        </div>
      </Dialog>
    </div>
  );
};

export default Activities;
