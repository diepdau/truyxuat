import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import { InputTextarea } from "primereact/inputtextarea";
import { Dialog } from "primereact/dialog";
import "./CultivationLogs.css";
import { Galleria } from "primereact/galleria";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
const CultivationLogs = () => {
  const emptyProduct = {
    farmProductId: "",
    activityId: "",
    farm_product: {
      _id: "",
      name: "",
    },
    activity: {
      _id: "",
      name: "",
    },
    image: null,
    notes: "",
  };
  const [isEditing, setEditing] = useState(false);
  const [products, setProducts] = useState(null);
  const [FarmProduct, setFarmProduct] = useState([]);
  const [Activites, setActivites] = useState({
    _id: "",
    name: "",
    description: "",
  });
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [product, setProduct] = useState(emptyProduct);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);

  const navigate = useNavigate();
  const openNew = () => {
    setProduct(emptyProduct);
    setSubmitted(false);
    setProductDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
  };

  const saveProduct = () => {
    setSubmitted(false);
    setProductDialog(false);
    let _products = [...products];

    if (product._id) {
      handleUpdate(product._id, product);
      alert("Sửa thành công");
    } else {
      handleCreate(product);
      alert("Tạo thành công");
      setProducts(_products);
      setProduct(emptyProduct);
    }
  };

  const editProduct = (product) => {
    setProduct(product);
    setProductDialog(true);
  };

  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const deleteProduct = () => {
    for (const selectedProduct of selectedProducts) {
      handleDelete(selectedProduct);
      setDeleteProductsDialog(false);
    }
  };

  const confirmDeleteSelected = () => {
    setDeleteProductsDialog(true);
  };
  const navigator = () => {
    navigate("/activities");
  };
  const deleteSelectedProducts = () => {
    let _products = products.filter((val) => !selectedProducts.includes(val));
    setProducts(_products);
    setDeleteProductsDialog(false);
    setSelectedProducts(null);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Products Deleted",
      life: 3000,
    });
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _product = { ...product };

    if (name === "farmProductId") {
      _product.farmProductId = val;
    } else if (name === "notes") {
      _product.notes = val;
    } else if (name === "activityId") {
      _product.activityId = val;
    }

    setProduct(_product);
  };

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button label="Tạo mới" severity="success" onClick={openNew} />
        <Button
          label="Xóa"
          severity="danger"
          onClick={confirmDeleteSelected}
          disabled={!selectedProducts || !selectedProducts.length}
        />
        <Button label="Hoạt động" severity="success" onClick={navigator} />
        <Button
          className="btn_get"
          severity="success"
          label="Xem"
          onClick={(e) => {
            getCultivationFarmProduct(selectedFarm.farmProductID._id);
          }}
        />
      </div>
    );
  };
  const rightToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          label="Xem toàn bộ"
          severity="success"
          onClick={cultivationLogs}
        />
      </div>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <div className="iconpage">
          <i className="fa fa-pencil" onClick={() => editProduct(rowData)}></i>
          <i
            className="fa fa-trash"
            onClick={() => confirmDeleteProduct(rowData)}
          ></i>
        </div>
      </React.Fragment>
    );
  };

  const productDialogFooter = (
    <React.Fragment>
      <Button className="btn_top" label="Thoát" outlined onClick={hideDialog} />
      <Button className="btn_top" label="Lưu" onClick={saveProduct} />
    </React.Fragment>
  );
  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button
        label="Không"
        className="btn_top"
        outlined
        onClick={hideDeleteProductDialog}
      />
      <Button
        label="Đồng ý"
        className="btn_top"
        severity="danger"
        onClick={deleteProduct}
      />
    </React.Fragment>
  );
  const deleteProductsDialogFooter = (
    <React.Fragment>
      <Button
        label="Không"
        outlined
        className="btn_top"
        onClick={hideDeleteProductsDialog}
      />
      <Button
        label="Đồng ý"
        severity="danger"
        className="btn_top"
        onClick={deleteSelectedProducts}
      />
    </React.Fragment>
  );

  const [expandedRows, setExpandedRows] = useState(null);
  const cultivationLogs = async () => {
    try {
      const response = await axios.get("/cultivation-logs");
      const farmingAreasData = response.data.cultivationLogs;
      setProducts(farmingAreasData);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  useEffect(() => {
    const fetchFarmingAreas = async () => {
      try {
        const response = await axios.get("/cultivation-logs");
        const farmingAreasData = response.data.cultivationLogs;
        setProducts(farmingAreasData);
        console.log("cultivationLog ALL", farmingAreasData);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchFarmingAreas();
  }, []);

  const getCultivationFarmProduct = async (id) => {
    try {
      const response = await axios.get(`cultivation-logs/farm-product/${id}`);
      const productData = response.data.cultivationLogs;
      console.log("data", productData);
      setProducts(productData);
    } catch (error) {
      console.error("Error 99999:", error);
    }
  };

  useEffect(() => {
    const getFamProduct = async () => {
      try {
        const response = await axios.get("/farm-products");
        const productData = response.data.farmProducts;
        console.log("data farm_product", productData);
        setFarmProduct(productData);
      } catch (error) {
        console.error("Error fetching product detail:", error);
      }
    };
    getFamProduct();
  }, []);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/activities");
        const productData = response.data.activities;
        console.log("data", productData);
        setActivites(productData);
      } catch (error) {
        console.error("Error fetching activites detail:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (product) => {
    try {
      await axios.delete(`/cultivation-logs/${product._id}`, product);
      alert("xóa thành công");
    } catch (error) {
      console.log("Error during registration:", error);
    }
  };

  const handleUpdate = async (id, product) => {
    try {
      const response = await axios.patch(`/cultivation-logs/${id}`, product);
      console.log("Product updated successfully:", response.data);
    } catch (error) {
      console.log("Error updating product:", error);
    }
  };
  const handleCreate = async (product) => {
    console.log(product);
    try {
      const response = await axios.post("/cultivation-logs", product);
      console.log("Product Create successfully:", response.data);
    } catch (error) {
      console.log("Error craete product:", error);
    }
  };
  const onRowCollapse = (event) => {
    toast.current.show({
      severity: "success",
      summary: "Product Collapsed",
      detail: event.farm_product,
      life: 3000,
    });
  };
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
      style={{ maxWidth: "12rem", overflow: "hidden", maxHeight: "10rem" }}
    />
  );
  const thumbnail1 = (item) => (
    <img
      src={item.path}
      alt={item.name}
      style={{ maxWidth: "20rem", overflow: "hidden", maxHeight: "160rem" }}
    />
  );
  const imageBodyTemplate = (rowData) => {
    return (
      <Galleria
        className="image1"
        value={rowData.images}
        numVisible={5}
        circular
        showThumbnails={false}
        showItemNavigators
        item={thumbnail}
        thumbnail={thumbnailTemplate}
      />
    );
  };

  const allowExpansion = (rowData) => {
    return rowData.activity;
  };
  const { register, handleSubmit } = useForm();

  const upLoadImage = async (data) => {
    const formData = new FormData();
    for (const file of data.file) {
      formData.append("images", file);
    }
    try {
      const responseImg = await axios.patch(
        `/cultivation-logs/upload/${iid}`,
        formData
      );
      console.log("Product updated img successfully:", responseImg.data);
      alert("Chỉnh sửa thành công!");
    } catch (error) {
      console.log("Error updating product:", error);
    }
  };
  let iid = "";
  const spID = (id) => {
    iid = id;
  };

  const rowExpansionTemplate = (data) => {
    return (
      <div className="p-3">
        <h3 style={{ color: "#0D955C" }}> Hoạt động</h3>
        <div>
          <strong>Tên hoạt động:</strong> {data.activity.name}
          <br />
          <strong>Số lượng:</strong> {data.activity.amount}
          <br />
          <strong>Đơn vị:</strong> {data.activity.unit}
          <br />
        </div>
      </div>
    );
  };
  const [selectedFarm, setSelectedFarm] = useState({
    farm: "",
    activitySe: "",
    farmProductID: "",
  });
  return (
    <div>
      {!product || !FarmProduct ? (
        <div>Loading...</div>
      ) : (
        <div className="card">
          <div className="btn_chon">
            <Dropdown
              options={FarmProduct}
              onChange={(e) => {
                onInputChange(e, "farmProductId");
                setSelectedFarm((prev) => ({
                  ...prev,
                  farmProductID: e.target.value,
                }));
              }}
              value={selectedFarm.farmProductID}
              optionLabel="name"
              placeholder="Chọn giống cây trồng"
              className="btn_drop md:w-100rem"
            />
          </div>
          <Toast ref={toast} />
          <div className=" containerCulLog">
            <Toolbar
              className="mb-4"
              left={leftToolbarTemplate}
              right={rightToolbarTemplate}
            ></Toolbar>
            <DataTable
              className="table"
              ref={dt}
              value={products}
              selection={selectedProducts}
              onSelectionChange={(e) => setSelectedProducts(e.value)}
              dataKey="_id"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
              globalFilter={globalFilter}
              expandedRows={expandedRows}
              onRowToggle={(e) => setExpandedRows(e.data)}
              onRowCollapse={onRowCollapse}
              rowExpansionTemplate={rowExpansionTemplate}
              tableStyle={{ maxWidth: "20rem" }}
            >
              <Column selectionMode="multiple" exportable={false}></Column>
              <Column expander={allowExpansion} style={{ width: "5rem" }} />
              <Column
                field="farm_product.name"
                header="Nông sản"
                filterField="farm_product._id"
                showFilterMatchModes={false}
                filterMenuStyle={{ width: "14rem" }}
                style={{ minWidth: "14rem" }}
              ></Column>
              <Column
                field="activity.name"
                header="Hoạt động"
                filterField="activity._id"
                showFilterMenu={false}
                filterMenuStyle={{ width: "14rem" }}
                style={{ minWidth: "12rem" }}
              ></Column>
              <Column
                field="notes"
                header="Lưu ý"
                style={{ minWidth: "14rem" }}
              ></Column>
              <Column
                field="images"
                header="Hình ảnh"
                body={imageBodyTemplate}
              ></Column>
              <Column
                body={actionBodyTemplate}
                exportable={false}
                style={{ minWidth: "10rem" }}
              ></Column>
            </DataTable>
          </div>
          <Dialog
            visible={productDialog}
            style={{ width: "50%" }}
            breakpoints={{ "960px": "75vw", "641px": "90vw" }}
            header="Thêm/ Sửa"
            modal
            className="p-fluid"
            footer={productDialogFooter}
            onHide={hideDialog}
          >
            {product.images ? (
              <>
                <Galleria
                  className="image11"
                  value={product.images}
                  numVisible={5}
                  style={{
                    width: "100%",
                  }}
                  item={thumbnail1}
                  thumbnail={thumbnailTemplate}
                  showThumbnails={false}
                  showIndicators
                />
                <div className="card updateimage">
                  <form
                    encType="multipart/formdata"
                    onSubmit={handleSubmit(upLoadImage)}
                  >
                    <input type="file" multiple {...register("file")} />
                    <p
                      onClick={(e) => {
                        spID(product._id);
                      }}
                    >
                      <input type="submit" value="Chọn" />
                    </p>
                  </form>
                </div>
              </>
            ) : null}
            <label htmlFor="farm_product" className="font-bold">
              Nông sản
            </label>
            <div className="iconpage" style={{ left: "0" }}>
              <i className="fa fa-pencil" onClick={() => setEditing(true)}></i>
            </div>
            {isEditing ? (
              <>
                <Dropdown
                  options={FarmProduct}
                  onChange={(e) => {
                    onInputChange(e, "farmProductId");
                    setSelectedFarm((prev) => ({
                      ...prev,
                      farm: e.target.value,
                    }));
                  }}
                  value={selectedFarm.farm}
                  optionLabel="name"
                  placeholder="Chọn giống cây trồng"
                  className="w-full md:w-100rem"
                />
              </>
            ) : (
              <>
                <InputTextarea
                  id="farm_product"
                  name="farm_product"
                  value={JSON.stringify(product.farm_product.name)}
                  required
                  rows={3}
                  cols={20}
                />
              </>
            )}
            <div className="field">
              <label htmlFor="notes" className="font-bold">
                Lưu ý
              </label>
              <InputTextarea
                id="notes"
                value={product.notes}
                onChange={(e) => onInputChange(e, "notes")}
                required
                rows={3}
                cols={20}
              />
            </div>
            <label htmlFor="activity" className="font-bold">
              Hoạt động
            </label>
            <div className="iconpage" style={{ left: "0" }}>
              <i className="fa fa-pencil" onClick={() => setEditing(true)}></i>
            </div>
            {isEditing ? (
              <>
                <Dropdown
                  type="text"
                  options={Activites}
                  optionLabel="name"
                  value={selectedFarm.activitySe}
                  onChange={(e) => {
                    onInputChange(e, "activityId");
                    setSelectedFarm((prev) => ({
                      ...prev,
                      activitySe: e.target.value,
                    }));
                  }}
                  name="activityId"
                  placeholder="Chọn hoạt động"
                  className="w-full md:w-100rem"
                />
              </>
            ) : (
              <>
                <InputTextarea
                  id="activity"
                  name="activity"
                  value={JSON.stringify(product.activity.name)}
                  required
                  rows={3}
                  cols={20}
                />
              </>
            )}
          </Dialog>

          <Dialog
            visible={deleteProductDialog}
            style={{ width: "32rem" }}
            breakpoints={{ "960px": "75vw", "641px": "90vw" }}
            header="Thông báo"
            modal
            footer={deleteProductDialogFooter}
            onHide={hideDeleteProductDialog}
          >
            <div className="confirmation-content">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: "2rem" }}
              />
              {product && (
                <span>
                  Bạn có chắc chắn muốn xóa {"  "}
                  <b>{JSON.stringify(product.farm_product.name)}</b>?
                </span>
              )}
            </div>
          </Dialog>

          <Dialog
            visible={deleteProductsDialog}
            style={{ width: "32rem" }}
            breakpoints={{ "960px": "75vw", "641px": "90vw" }}
            header="Thông báo"
            modal
            footer={deleteProductsDialogFooter}
            onHide={hideDeleteProductsDialog}
          >
            <div className="confirmation-content">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: "2rem" }}
              />
              {product && (
                <span>Bạn có chắc chắn muốn xóa những lựa chọn này?</span>
              )}
            </div>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default CultivationLogs;
