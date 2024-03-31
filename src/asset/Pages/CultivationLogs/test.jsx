// import React, { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";

// import { DataTable } from "primereact/datatable";
// import { InputSwitch } from "primereact/inputswitch";
// import { Column } from "primereact/column";
// import CustomerService from "./test.json";
// import { Galleria } from "primereact/galleria";
// import { Button } from "primereact/button";

// import { Dialog } from "primereact/dialog";
// import { Calendar } from "primereact/calendar";
// import { InputTextarea } from "primereact/inputtextarea";
// import { Toolbar } from "primereact/toolbar";
// import axios from "axios";

// // Renamed the component to Test and capitalized the first letter
// export default function Test() {
//   const emptyProduct = {
//     _id: "",
//     farm_product: {
//       _id: "",
//       name: "",
//     },
//     name: "",
//     description: "",
//     activity: "",
//     notes: "",
//     createdAt: "",
//   };
//   const [customers, setCustomers] = useState([]);
//   const [expandedRows, setExpandedRows] = useState([]);
//   const [selectedProducts, setSelectedProducts] = useState(null);
//   useEffect(() => {
//     setCustomers(CustomerService.cultivationLogs);
//   }, []);
//   const [submitted, setSubmitted] = useState(false);
//   const [productDialog, setProductDialog] = useState(false);
//   const [product, setProduct] = useState(emptyProduct);
//   const [products, setProducts] = useState(null);

//   const [deleteProductDialog, setDeleteProductDialog] = useState(false);
//   const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);

//   const hideDialog = () => {
//     setSubmitted(false);
//     setProductDialog(false);
//   };
//   //==============
//   const thumbnailTemplate = (item) => (
//     <img
//       src={item.path}
//       alt={item.name}
//       style={{ width: "50%", overflow: "hidden", maxHeight: "200px" }}
//     />
//   );
//   const thumbnail = (item) => (
//     <img
//       src={item.path}
//       alt={item.name}
//       style={{ maxWidth: "12rem", overflow: "hidden", maxHeight: "10rem" }}
//     />
//   );
//   const thumbnail1 = (item) => (
//     <img
//       src={item.path}
//       alt={item.name}
//       style={{ maxWidth: "20rem", overflow: "hidden", maxHeight: "160rem" }}
//     />
//   );
//   const imageBodyTemplate = (rowData) => {
//     return (
//       <Galleria
//         className="image1"
//         value={rowData.images}
//         numVisible={5}
//         circular
//         showThumbnails={false}
//         showItemNavigators
//         item={thumbnail}
//         thumbnail={thumbnailTemplate}
//       />
//     );
//   };
//   //======================================
//   const headerTemplate = (data) => {
//     return (
//       <React.Fragment>
//         <span className="vertical-align-middle ml-2 font-bold line-height-3">
//           {data.farm_product.name}
//         </span>
//       </React.Fragment>
//     );
//   };
//   const saveProduct = () => {
//     setSubmitted(true);
//     setProductDialog(false);
//     // let _products = [...products];

//     // if (product._id) {
//     //   handleUpdate(product._id, product);
//     //   alert("Sửa thành công");
//     //   alert(product._id);
//     // } else {
//     //   handleCreate(product);
//     //   alert("Tạo thành công");
//     //   setProducts(_products);
//     //   setProduct(emptyProduct);
//     // }
//   };
//   const editProduct = (product) => {
//     setProduct({ ...product });
//     setProductDialog(true);
//   };
//   const productDialogFooter = (
//     <React.Fragment>
//       <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
//       <Button label="Save" icon="pi pi-check" onClick={saveProduct} />
//     </React.Fragment>
//   );
//   const { register, handleSubmit } = useForm();

//   const upLoadImage = async (data) => {
//     const formData = new FormData();
//     console.log(iid);
//     for (const file of data.file) {
//       formData.append("images", file);
//     }
//     try {
//       const responseImg = await axios.patch(
//         `/cultivation-logs/upload/${iid}`,
//         formData
//       );
//       console.log("Product updated img successfully:", responseImg.data);
//       alert("Chỉnh sửa thành công!");
//     } catch (error) {
//       console.log("Error updating product:", error);
//     }
//   };
//   //===================sửa xóa
//   const handleUpdate = async (id, product) => {
//     try {
//       const response = await axios.patch(`/cultivation-logs/${id}`, product);
//       console.log("Product updated successfully:", response.data);
//     } catch (error) {
//       console.log("Error updating product:", error);
//     }
//   };
//   const handleCreate = async (product) => {
//     console.log(product);
//     try {
//       const response = await axios.post("/cultivation-logs", product);
//       console.log("Product Create successfully:", response.data);
//     } catch (error) {
//       console.log("Error craete product:", error);
//     }
//   };
//   let iid = "";
//   const spID = (id) => {
//     iid = id;
//   };
//   const openNew = () => {
//     setProduct(emptyProduct);
//     setSubmitted(false);
//     setProductDialog(true);
//   };
//   const confirmDeleteSelected = () => {
//     setDeleteProductsDialog(true);
//   };
//   const hideDeleteProductDialog = () => {
//     setDeleteProductDialog(false);
//   };
//   const hideDeleteProductsDialog = () => {
//     setDeleteProductsDialog(false);
//   };
//   const deleteProduct = () => {};
//   const confirmDeleteProduct = (product) => {
//     setProduct(product);
//     setDeleteProductDialog(true);
//   };
//   const deleteSelectedProducts = () => {
//     let _products = products.filter((val) => !selectedProducts.includes(val));
//     setProducts(_products);
//     setDeleteProductsDialog(false);
//     setSelectedProducts(null);
//   };

//   const leftToolbarTemplate = () => {
//     return (
//       <div className="flex flex-wrap gap-2">
//         <Button label="Tạo mới" severity="success" onClick={openNew} />
//         <Button
//           label="Xóa"
//           severity="danger"
//           onClick={confirmDeleteSelected}
//           disabled={!selectedProducts || !selectedProducts.length}
//         />
//       </div>
//     );
//   };
//   const actionBodyTemplate = (rowData) => {
//     return (
//       <React.Fragment>
//         <Button
//           icon="pi pi-pencil"
//           rounded
//           outlined
//           className="mr-2"
//           onClick={() => editProduct(rowData)}
//         />
//         <Button
//           icon="pi pi-trash"
//           rounded
//           outlined
//           severity="danger"
//           onClick={() => confirmDeleteProduct(rowData)}
//         />
//       </React.Fragment>
//     );
//   };
//   const deleteProductDialogFooter = (
//     <React.Fragment>
//       <Button
//         label="Không"
//         className="btn_top"
//         outlined
//         onClick={hideDeleteProductDialog}
//       />
//       <Button
//         label="Đồng ý"
//         className="btn_top"
//         severity="danger"
//         onClick={deleteProduct}
//       />
//     </React.Fragment>
//   );
//   const deleteProductsDialogFooter = (
//     <React.Fragment>
//       <Button
//         label="Không"
//         outlined
//         className="btn_top"
//         onClick={hideDeleteProductsDialog}
//       />
//       <Button
//         label="Đồng ý"
//         severity="danger"
//         className="btn_top"
//         onClick={deleteSelectedProducts}
//       />
//     </React.Fragment>
//   );
//   const onInputChange = (e, name) => {
//     const val = (e.target && e.target.value) || "";
//     let _product = { ...product };

//     if (name === "farmProductId") {
//       _product.farmProductId = val;
//     } else if (name === "notes") {
//       _product.notes = val;
//     } else if (name === "description") {
//       _product.description = val;
//     } else if (name === "farm_product") {
//       _product.farm_product = val;
//     } else if (name === "createdAt") {
//       _product.createdAt = val;
//     }

//     setProduct(_product);
//   };

//   return (
//     <div className="card">
//       <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
//       <DataTable
//         value={customers}
//         rowGroupMode="subheader"
//         groupRowsBy="farm_product._id"
//         sortMode="single"
//         sortField="farm_product.name"
//         sortOrder={1}
//         expandableRowGroups
//         expandedRows={expandedRows}
//         onRowToggle={(e) => setExpandedRows(e.data)}
//         rowGroupHeaderTemplate={headerTemplate}
//         tableStyle={{ minWidth: "50rem" }}
//         selection={selectedProducts}
//         onSelectionChange={(e) => setSelectedProducts(e.value)}
//       >
//         <Column selectionMode="multiple" exportable={false}></Column>
//         <Column
//           field="name"
//           header="Hoạt động"
//           style={{ minWidth: "12rem" }}
//         ></Column>
//         <Column
//           field="description"
//           header="Mô tả"
//           style={{ minWidth: "24rem" }}
//         ></Column>
//         <Column
//           field="images"
//           body={imageBodyTemplate}
//           header="Hình ảnh"
//           style={{ minWidth: "12rem" }}
//         ></Column>
//         <Column
//           field="notes"
//           header="Lưu ý"
//           style={{ minWidth: "12rem" }}
//         ></Column>
//         <Column
//           field="createdAt"
//           header="Ngày tiến hành"
//           style={{ minWidth: "12rem" }}
//         ></Column>
//         <Column
//           body={actionBodyTemplate}
//           exportable={false}
//           style={{ minWidth: "12rem" }}
//         ></Column>
//       </DataTable>

//       <Dialog
//         visible={productDialog}
//         style={{ width: "50%" }}
//         breakpoints={{ "960px": "75vw", "641px": "90vw" }}
//         header="Thêm/ Sửa"
//         modal
//         className="p-fluid"
//         footer={productDialogFooter}
//         onHide={hideDialog}
//       >
//         {product.images ? (
//           <>
//             <Galleria
//               className="image11"
//               value={product.images}
//               numVisible={5}
//               style={{
//                 width: "100%",
//               }}
//               item={thumbnail1} ///
//               thumbnail={thumbnailTemplate}
//               showThumbnails={false}
//               showIndicators
//             />
//             <div className="card updateimage">
//               <form
//                 encType="multipart/formdata"
//                 onSubmit={handleSubmit(upLoadImage)}
//               >
//                 <input type="file" multiple {...register("file")} />
//                 <p
//                   onClick={(e) => {
//                     spID(product._id);
//                   }}
//                 >
//                   <input type="submit" value="Chọn" />
//                 </p>
//               </form>
//             </div>
//           </>
//         ) : null}
//         {/* {submitted ? (
//               <>
//                 <Dropdown
//                   // options={FarmProduct}
//                   onChange={(e) => {
//                     onInputChange(e, "farmProductId");
//                     // setSelectedFarm((prev) => ({
//                     //   ...prev,
//                     //   farm: e.target.value,
//                     // }));
//                   }}
//                   value={product.farm_product.name)}
//                   optionLabel="name"
//                   placeholder="Chọn giống cây trồng"
//                   className="w-full md:w-100rem"
//                 />
//               </>
//             ) : (
//               <>
//                 <InputTextarea
//                   id="farm_product"
//                   name="farm_product"
//                   value={JSON.stringify(product.farm_product.name)}
//                   required
//                   rows={3}
//                   cols={20}
//                 />
//               </>
//             )} */}
//         <label htmlFor="farm_product" className="font-bold">
//           Nông sản
//         </label>
//         <div className="iconpage" style={{ left: "0" }}></div>

//         <InputTextarea
//           id="farm_product"
//           name="farm_product"
//           onChange={(e) => onInputChange(e, "farm_product")}
//           value={product.farm_product.name}
//           required
//           rows={3}
//           cols={20}
//         />
//         <div className="field">
//           <label htmlFor="notes" className="font-bold">
//             Lưu ý
//           </label>
//           <InputTextarea
//             id="notes"
//             value={product.notes}
//             onChange={(e) => onInputChange(e, "notes")}
//             required
//             rows={3}
//             cols={20}
//           />
//         </div>
//         <label htmlFor="activity" className="font-bold">
//           Hoạt động
//         </label>
//         <div className="iconpage" style={{ left: "0" }}></div>
//         <InputTextarea
//           id="activity"
//           name="activity"
//           value={product.description}
//           onChange={(e) => onInputChange(e, "description")}
//           required
//           rows={3}
//           cols={20}
//         />
//         <label htmlFor="createdAt" className="font-bold">
//           Ngày tiến hành
//         </label>
//         <div className="iconpage" style={{ left: "0" }}></div>
//         <Calendar
//           id="createdAt"
//           name="createdAt"
//           onChange={(e) => onInputChange(e, "createdAt")}
//           value={product.createdAt}
//           required
//           rows={3}
//           cols={20}
//           showTime
//           hourFormat="24"
//           dateFormat="dd/mm/yy"
//         />
//       </Dialog>
//       <Dialog
//         visible={deleteProductDialog}
//         style={{ width: "32rem" }}
//         breakpoints={{ "960px": "75vw", "641px": "90vw" }}
//         header="Thông báo"
//         modal
//         footer={deleteProductDialogFooter}
//         onHide={hideDeleteProductDialog}
//       >
//         <div className="confirmation-content">
//           <i
//             className="pi pi-exclamation-triangle mr-3"
//             style={{ fontSize: "2rem" }}
//           />
//           {product && (
//             <span>
//               Bạn có chắc chắn muốn xóa {"  "}
//               <b>{JSON.stringify(product.farm_product.name)}</b>?
//             </span>
//           )}
//         </div>
//       </Dialog>

//       <Dialog
//         visible={deleteProductsDialog}
//         style={{ width: "32rem" }}
//         breakpoints={{ "960px": "75vw", "641px": "90vw" }}
//         header="Thông báo"
//         modal
//         footer={deleteProductsDialogFooter}
//         onHide={hideDeleteProductsDialog}
//       >
//         <div className="confirmation-content">
//           <i
//             className="pi pi-exclamation-triangle mr-3"
//             style={{ fontSize: "2rem" }}
//           />
//           {product && (
//             <span>Bạn có chắc chắn muốn xóa những lựa chọn này?</span>
//           )}
//         </div>
//       </Dialog>
//     </div>
//   );
// }



import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Dropdown } from "primereact/dropdown";
import { Galleria } from "primereact/galleria";
import { InputTextarea } from "primereact/inputtextarea";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../Home/Home.css";
import Map123 from "../../../components/Map/Map.jsx";

const FarmingArea = () => {
  const [co, setCo] = useState({
    coordinates1: [0, 0],
  });
  const [coo, setCoo] = useState([11.950709, 108.442511]);
  const navigate = useNavigate();
  const [farmingAreas, setFarmingAreas] = useState([]);
  const [selectedFarmingArea, setSelectedFarmingArea] = useState({
    _id: "",
    name: "",
    description: "",
    area: "",
    address: "",
    coordinates: [0, 0],
    images: [
      {
        path: "",
        filename: "",
      },
    ],
  });
  const [isEditing, setEditing] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

  // Lấy hình ảnh
  const thumbnailTemplate = (item) => (
    <img
      src={item.path}
      alt={item.name}
      style={{ width: "50%", overflow: "hidden", maxHeight: "200px" }}
    />
  );

  const thumbnail = (item) => (
    <img
      src={item.path}
      alt={item.name}
      style={{ width: "100%", overflow: "hidden", maxHeight: "400px" }}
    />
  );

  // ScrollTo...
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const areaRef = useRef(null);
  const addressRef = useRef(null);
  const coordinatesRef = useRef(null);
  const imagesRef = useRef(null);

  const scrollToRef = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navigateTo = (ref) => () => scrollToRef(ref);

  const navItems = [
    { label: "Tên", ref: nameRef },
    { label: "Mô tả", ref: descriptionRef },
    { label: "Vùng", ref: areaRef },
    { label: "Địa chỉ", ref: addressRef },
    { label: "Tọa độ", ref: coordinatesRef },
  ];

  // Kết nối API
  useEffect(() => {
    const fetchFarmingAreas = async () => {
      try {
        const response = await axios.get("/farming-areas");
        const farmingAreasData = response.data.farmingAreas;
        setFarmingAreas(farmingAreasData);
        console.log(farmingAreasData);
      } catch (error) {
        console.log("Error fetching farming areas:", error);
      }
    };

    fetchFarmingAreas();
  }, []);

  const handlePatchFarmingArea = async () => {
    try {
      const response = await axios.patch(
        `/farming-areas/${selectedFarmingArea._id}`,
        {
          name: nameRef.current.value,
          description: descriptionRef.current.value,
          area: areaRef.current.value,
          address: addressRef.current.value,
          coordinates: convertStringArrayToNumberArray(
            coordinatesRef.current.value
          ),
          // images: [],
        }
      );
      console.log("Farming area updated successfully:", response.data);
      setEditing(false);
      alert("Chỉnh sửa thành công!");
      navigate("/trang-trai");
    } catch (error) {
      console.log("Error updating farming area:", error);
      alert("Đã có lỗi xảy ra khi chỉnh sửa!");
    }
  };

  const handleDeleteFarmingArea = async () => {
    try {
      const response = await axios.delete(
        `/farming-areas/${selectedFarmingArea._id}`
      );
      console.log("Farming area deleted successfully:", response.data);
      setDeleting(false);
      alert("Xóa thành công!");
      navigate("/trang-trai");
    } catch (error) {
      console.log("Error deleting farming area:", error);
      alert("Đã có lỗi xảy ra khi xóa!");
    }
  };

  const handleCreateFarmingArea = async () => {
    try {
      const response = await axios.post("/farming-areas", {
        name: nameRef.current.value,
        description: descriptionRef.current.value,
        area: areaRef.current.value,
        address: addressRef.current.value,
        coordinates: convertStringArrayToNumberArray(
          coordinatesRef.current.value
        ),
      });

      handleIconDelete(1);
      console.log("Farming area created successfully:", response.data);
      setFarmingAreas([...farmingAreas, response.data.farmingArea]);
      setSelectedFarmingArea(response.data.farmingArea);
      alert("tạo thành công!");
      navigate("/trang-trai");
    } catch (error) {
      console.log("Error creating farming area:", error);
      alert("Đã có lỗi xảy ra");
    }
  };

  const { register, handleSubmit } = useForm();

  const upLoadImage = async (data) => {
    const formData = new FormData();

    for (const file of data.file) {
      formData.append("images", file);
    }
    try {
      const responseImg = await axios.patch(
        `/farming-areas/upload/${selectedFarmingArea._id}`,
        formData
      );

      console.log("Product updated img successfully:", responseImg.data);
      setEditing(false);
      alert("Chỉnh sửa thành công!");
      navigate("/vung-trong");
    } catch (error) {
      console.log("Error updating product:", error);
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
      areaRef.current.value = "";
      addressRef.current.value = "";
      coordinatesRef.current.value = "";
    }
  };
  const handleEditClick = () => {
    setEditing(true);
  };

  function convertStringArrayToNumberArray(arr) {
    return arr.split(",").map((item) => parseFloat(item, 10));
  }
  useEffect(() => {
    setCoo(selectedFarmingArea.coordinates || [11.941862, 108.443818]);
  }, [selectedFarmingArea.coordinates]);

  return (
    <div>
      {!farmingAreas ? (
        <div>Loading...</div>
      ) : (
        <div>
          <Dropdown
            value={selectedFarmingArea}
            onChange={(e) => setSelectedFarmingArea(e.value)}
            options={farmingAreas}
            optionLabel="name"
            placeholder="Chọn vùng nuôi trồng"
            className="w-full md:w-25rem mar"
          />
          {selectedFarmingArea && (
            <div className="card mar">
              <h1>Thông tin</h1>
              <div>
                {isEditing ? (
                  <>
                    <Button severity="success" onClick={handlePatchFarmingArea}>
                      Lưu
                    </Button>
                    <Button severity="danger" onClick={() => setDeleting(true)}>
                      Hủy
                    </Button>
                  </>
                ) : (
                  <Button severity="success" onClick={() => setEditing(true)}>
                    Chỉnh sửa
                  </Button>
                )}
                {/* {!isEditing && (
                  <> */}
                <Button severity="success" onClick={handleCreateFarmingArea}>
                  Tạo mới
                </Button>
                <Button severity="success" onClick={() => handleIconDelete(1)}>
                  Xóa toàn bộ
                </Button>
                <Button severity="success" onClick={() => setDeleting(true)}>
                  Xóa
                </Button>
                {/* </>
                )} */}
              </div>
              <div>
                <div className="product-names">
                  <h2
                    onClick={() =>
                      setSelectedFarmingArea(selectedFarmingArea.id)
                    }
                  >
                    {selectedFarmingArea.name}
                  </h2>
                  <ul>
                    {navItems.map((item, index) => (
                      <li key={item.label} onClick={navigateTo(item.ref)}>
                        {item.label}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="acc">
                    <div className="inforpage">
                      <h3 ref={nameRef}>Tên</h3>
                      <div className="iconpage">
                        <i
                          onClick={() => handleIconDelete(nameRef)}
                          className="fa fa-trash-o"
                        ></i>
                        <i
                          onClick={handleEditClick}
                          className="fa fa-pencil"
                        ></i>
                      </div>
                    </div>

                    <InputTextarea
                      autoResize
                      ref={nameRef}
                      onChange={(e) =>
                        setSelectedFarmingArea((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      value={selectedFarmingArea.name}
                      style={{
                        width: "100%",
                      }}
                      rows={3}
                      colums={300}
                    />
                  </div>
                  <div className="acc">
                    <div className="inforpage">
                      <h3 ref={descriptionRef}>Mô tả</h3>
                      <div className="iconpage">
                        <i
                          onClick={() => handleIconDelete(descriptionRef)}
                          className="fa fa-trash-o"
                        ></i>
                        <i
                          onClick={handleEditClick}
                          className="fa fa-pencil"
                        ></i>
                      </div>
                    </div>

                    <InputTextarea
                      autoResize
                      ref={descriptionRef}
                      onChange={(e) =>
                        setSelectedFarmingArea((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      value={selectedFarmingArea.description}
                      required
                      rows={3}
                      cols={300}
                      style={{ width: "100%" }}
                    />
                  </div>

                  <div className="acc">
                    <div className="inforpage">
                      <h3 ref={areaRef}>Vùng</h3>
                      <div className="iconpage">
                        <i
                          onClick={() => handleIconDelete(areaRef)}
                          className="fa fa-trash-o"
                        ></i>
                        <i
                          onClick={handleEditClick}
                          className="fa fa-pencil"
                        ></i>
                      </div>
                    </div>

                    <InputTextarea
                      autoResize
                      ref={areaRef}
                      onChange={(e) =>
                        setSelectedFarmingArea((prev) => ({
                          ...prev,
                          area: e.target.value,
                        }))
                      }
                      value={selectedFarmingArea.area}
                      style={{
                        width: "100%",
                      }}
                      rows={3}
                    />
                  </div>

                  <div className="acc">
                    <div className="inforpage">
                      <h3 ref={addressRef}>Địa chỉ</h3>
                      <div className="iconpage">
                        <i
                          onClick={() => handleIconDelete(addressRef)}
                          className="fa fa-trash-o"
                        ></i>
                        <i
                          onClick={handleEditClick}
                          className="fa fa-pencil"
                        ></i>
                      </div>
                    </div>

                    <InputTextarea
                      autoResize
                      ref={addressRef}
                      onChange={(e) =>
                        setSelectedFarmingArea((prev) => ({
                          ...prev,
                          address: e.target.value,
                        }))
                      }
                      value={selectedFarmingArea.address}
                      style={{
                        width: "100%",
                      }}
                      rows={3}
                    />
                  </div>

                  <div className="acc">
                    <div className="inforpage">
                      <h3 ref={coordinatesRef}>Tọa độ</h3>
                      <div className="iconpage">
                        <i
                          onClick={() => handleIconDelete(coordinatesRef)}
                          className="fa fa-trash-o"
                        ></i>
                        <i
                          onClick={handleEditClick}
                          className="fa fa-pencil"
                        ></i>
                      </div>
                    </div>
                    {isEditing ? (
                      <InputTextarea
                        keyfilter="money"
                        ref={coordinatesRef}
                        onChange={(e) => {
                          setCo({
                            coordinates1: e.value,
                          });
                          co.coordinates1 = e.value;
                        }}
                        style={{
                          width: "100%",
                        }}
                        rows={3}
                      />
                    ) : (
                      <InputTextarea
                        value={selectedFarmingArea.coordinates}
                        style={{
                          width: "100%",
                        }}
                        rows={3}
                      />
                    )}
                    <Map123
                      coordinates={coo}
                      nameAres={selectedFarmingArea.address}
                    />
                  </div>
                  <h3 className="acc" ref={imagesRef}>
                    Hình ảnh
                  </h3>
                  <div className="infor">
                    <Galleria
                      className="image1"
                      value={selectedFarmingArea.images}
                      numVisible={5}
                      style={{ maxWidth: "600px" }}
                      item={thumbnail}
                      thumbnail={thumbnailTemplate}
                    />
                    <div className="card updateimage">
                      <form
                        encType="multipart/formdata"
                        onSubmit={handleSubmit(upLoadImage)}
                      >
                        <input type="file" multiple {...register("file")} />
                        <input type="submit" />
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <Dialog visible={isDeleting} onHide={() => setDeleting(false)}>
        <h3>Thông báo xóa</h3>
        <p>Bạn có chắc chắn xóa {selectedFarmingArea?.name}?</p>
        <div>
          <Button
            label="Xóa"
            severity="danger"
            onClick={handleDeleteFarmingArea}
          />
          <Button label="Hủy" outlined onClick={() => setDeleting(false)} />
        </div>
      </Dialog>
    </div>
  );
};

export default FarmingArea;



