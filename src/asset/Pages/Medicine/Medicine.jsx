import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import "../Home/HerdsList.css";
import { InputTextarea } from "primereact/inputtextarea";
import { useForm } from "react-hook-form";
import { TabView, TabPanel } from "primereact/tabview";
import { Galleria } from "primereact/galleria";

const emptyProduct = {
  _id: null,
  name: "",
  description: "",
  ingredients: "",
  usage_instruction: "",
  toxicity: "",
  dosage: "",
  isolation: "",
  recommendation: "",
  certificate: "",
};
export default function SizeDemo() {
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(emptyProduct);
  const [productDialog, setProductDialog] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const toast = useRef(null);

  useEffect(() => {
    const getHerd = async () => {
      try {
        const res = await axios.get(`/medicines`);
        setProducts(res.data.medicines);
      } catch (error) {
        console.log(error);
      }
    };
    getHerd();
  });

  const openNew = () => {
    setProductDialog(true);
  };
  const handleChange = (event) => {
    const { value, name } = event.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };
  const handleCreate = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/medicines", {
        name: product.name,
        description: product.description,
        ingredients: product.ingredients,
        usage_instruction: product.usage_instruction,
        toxicity: product.toxicity,
        dosage: product.dosage,
        isolation: product.isolation,
        recommendation: product.recommendation,
        certificate: product.certificate,
      });
      setProductDialog(false);
      toast.current.show({
        severity: "success",
        summary: "Đã tạo thuốc",
        life: 3000,
      });
      reloadData();
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const reloadData = () => {
    // eslint-disable-next-line no-undef
    getHerd();
  };
  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button label="Tạo" severity="success" onClick={openNew} />
        <Button
          label="Xóa"
          severity="danger"
          onClick={confirmDeleteSelected}
          disabled={!selectedProducts || !selectedProducts.length}
        />
      </div>
    );
  };

  const confirmDeleteSelected = () => {
    setDeleteProductsDialog(true);
  };
  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
  };
  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
    setDeleteProductsDialog(false);
  };
  const deleteSelectedProducts = () => {
    for (const selectedProduct of selectedProducts) {
      handleDeleteUser(selectedProduct);
      setDeleteProductsDialog(false);
      toast.current.show({
        severity: "success",
        summary: "Đã xóa",
        life: 3000,
      });
    }
  };
  const deleteProduct = () => {
    let _products = products.filter((val) => val._id === product._id);
    const firstObject = _products[0];
    handleDeleteUser(firstObject);
    setDeleteProductDialog(false);
    toast.current.show({
      severity: "success",
      summary: "Đã xóa",
      life: 3000,
    });
  };
  const navigate = useNavigate();
  const onRowDoubleClick = () => {
    for (const selectedProduct of selectedProducts) {
      navigate(`/medicines/${selectedProduct._id}`);
    }
  };

  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button
        label="Thoát"
        severity="secondary"
        outlined
        onClick={hideDeleteProductsDialog}
        className="button_Dia"
      />
      <Button
        label="Đồng ý"
        onClick={deleteSelectedProducts}
        severity="danger"
        className="button_Dia"
      />
    </React.Fragment>
  );
  const deleteoneProductDialogFooter = (
    <React.Fragment>
      <Button
        className="button_Dia"
        label="Thoát"
        severity="secondary"
        outlined
        onClick={hideDeleteProductDialog}
      />
      <Button
        className="button_Dia"
        label="Đồng ý"
        severity="danger"
        onClick={deleteProduct}
      />
    </React.Fragment>
  );
  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };
  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <div className="iconpage">
          <i
            className="fa fa-trash"
            onClick={() => confirmDeleteProduct(rowData)}
          ></i>
        </div>
      </React.Fragment>
    );
  };
  const handleDeleteUser = async (product) => {
    try {
      await axios.delete(`/medicines/${product._id}`, product);
      reloadData();
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const textEditor = (options) => {
    return (
      <InputText
        type="text"
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    );
  };
  const { register, handleSubmit } = useForm();

  const upLoadImage = async (data) => {
    const formData = new FormData();
    for (const file of data.file) {
      formData.append("images", file);
    }
    try {
      const responseImg = await axios.patch(
        `/medicines/upload/${product._id}`,
        formData
      );
      console.log("Product updated img successfully:", responseImg.data);
      reloadData();
      toast.current.show({
        severity: "success",
        summary: "Đã thêm hình",
        life: 3000,
      });
    } catch (error) {
      console.log("Error img:", error);
    }
  };

  const onRowEditComplete = async () => {
    for (const selectedProduct of selectedProducts) {
      var Id = selectedProduct._id;
    }
    try {
      const a = await axios.patch(`/medicines/${Id}`, {
        name: product.name,
        description: product.description,
        ingredients: product.ingredients,
        usage_instruction: product.usage_instruction,
        toxicity: product.toxicity,
        dosage: product.dosage,
        isolation: product.isolation,
        recommendation: product.recommendation,
        certificate: product.certificate,
      });
      setProductDialog(false);
      toast.current.show({
        severity: "success",
        summary: "Sửa hoàn thành",
        life: 3000,
      });
      console.log(a);
      reloadData();
    } catch (error) {
      console.log("Error update role:", error);
    }
  };
  const [expandedRows, setExpandedRows] = useState(null);
  const rowExpansionTemplate = (data) => {
    product._id = data._id;
    return (
      <>
        <TabView>
          <TabPanel header="Thông tin">
            {/* <div className="p-3">
              <h4>Mô tả</h4>
              <InputTextarea
                value={data.description}
                autoResize
                style={{
                  width: "100%",
                }}
                onChange={handleChange}
              />
              <h4>Thành phần</h4>
              <InputTextarea
                value={data.ingredients}
                style={{
                  width: "100%",
                }}
                autoResize
                onChange={handleChange}
              />
              <h4>Hướng dẫn sử dụng</h4>
              <InputTextarea
                value={data.usage_instruction}
                style={{
                  width: "100%",
                }}
                autoResize
                onChange={handleChange}
              />
              <h4>Độ độc</h4>
              <InputTextarea
                value={data.toxicity}
                style={{
                  width: "100%",
                }}
                autoResize
                onChange={handleChange}
              />
              <h4>Liều lượng</h4>
              <InputTextarea
                value={data.dosage}
                style={{
                  width: "100%",
                }}
                autoResize
                onChange={handleChange}
              />
              <h4>Cách ly</h4>
              <InputTextarea
                value={data.isolation}
                style={{
                  width: "100%",
                }}
                autoResize
                onChange={handleChange}
              />
              <h4>Khuyến nghị</h4>
              <InputTextarea
                value={data.recommendation}
                style={{
                  width: "100%",
                }}
                autoResize
                onChange={handleChange}
              />
              <h4>Giấy phép sử dụng</h4>
              <InputTextarea
                value={data.certificate}
                style={{
                  width: "100%",
                }}
                autoResize
                onChange={handleChange}
              />
            </div> */}

            <form className="userUpdateForm">
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Tên</label>
                  <input
                    type="text"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Mô tả</label>
                  <input
                    type="description"
                    name="description"
                    value={data.description}
                    onChange={handleChange}
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Thành phần</label>
                  <input
                    type="ingredients"
                    name="ingredients"
                    value={data.ingredients}
                    onChange={handleChange}
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Hướng dẫn sử dụng</label>
                  <input
                    type="usage_instruction"
                    name="usage_instruction"
                    value={data.usage_instruction}
                    onChange={handleChange}
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Độ độc</label>
                  <input
                    type="toxicity"
                    name="toxicity"
                    value={data.toxicity}
                    onChange={handleChange}
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Liều lượng</label>
                  <input
                    type="dosage"
                    name="dosage"
                    value={data.dosage}
                    onChange={handleChange}
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Cách ly</label>
                  <input
                    type="isolation"
                    name="isolation"
                    value={data.isolation}
                    onChange={handleChange}
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Khuyến nghị</label>
                  <input
                    type="recommendation"
                    name="recommendation"
                    value={data.recommendation}
                    onChange={handleChange}
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Giấy phép</label>
                  <input
                    type="certificate"
                    name="certificate"
                    value={data.certificate}
                    onChange={handleChange}
                    className="userUpdateInput"
                  />
                </div>
              </div>
            </form>

            <Button
              label="Chỉnh sửa"
              security="success"
              onClick={onRowEditComplete}
            />
          </TabPanel>
          <TabPanel header="Hình ảnh">
            <Galleria
              className="Image_animals"
              value={data.images}
              numVisible={5}
              circular
              showItemNavigators
              showItemNavigatorsOnHover
              showIndicators
              showThumbnails={false}
              style={{ maxWidth: "640px" }}
              item={thumbnail}
              thumbnail={thumbnailTemplate}
            />
            <div className=" updateimage">
              <form
                encType="multipart/formdata"
                onSubmit={handleSubmit(upLoadImage)}
              >
                <input type="file" multiple {...register("file")} />
                <input type="submit" />
              </form>
            </div>
          </TabPanel>
        </TabView>
      </>
    );
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
      style={{ width: "100%", overflow: "hidden", maxHeight: "400px" }}
    />
  );
  const allowExpansion = (rowData) => {
    return rowData;
  };
  const [globalFilter, setGlobalFilter] = useState(null);
  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Manage Records</h4>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  );
  return (
    <div>
      <Toast className="toast" ref={toast} />
      <div className="card">
        <Toolbar
          className="mb-4"
          left={leftToolbarTemplate}
          // right={rightToolbarTemplate}
        ></Toolbar>
        <DataTable
          value={products}
          selectionMode={"row"}
          onRowEditComplete={onRowEditComplete}
          selection={selectedProducts}
          onSelectionChange={(e) => setSelectedProducts(e.value)}
          editMode="row"
          expandedRows={expandedRows}
          onRowToggle={(e) => setExpandedRows(e.data)}
          rowExpansionTemplate={rowExpansionTemplate}
          dataKey="_id"
          paginator
          rows={8}
          tableStyle={{ minWidth: "50rem" }}
          globalFilter={globalFilter}
          header={header}
        >
          <Column expander={allowExpansion} style={{ width: "5rem" }} />
          <Column selectionMode="multiple" exportable={true}></Column>
          <Column
            field="name"
            header="Tên thuốc"
            value={product.name}
            editor={(options) => textEditor(options)}
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            rowEditor
            headerStyle={{ width: "10%", minWidth: "4rem" }}
            bodyStyle={{ textAlign: "center" }}
          ></Column>
          <Column
            body={actionBodyTemplate}
            headerStyle={{ width: "10%", minWidth: "4rem" }}
            bodyStyle={{ left: "0" }}
          ></Column>
        </DataTable>

        <Dialog
          visible={deleteProductsDialog}
          style={{ width: "32rem" }}
          breakpoints={{ "960px": "75vw", "641px": "90vw" }}
          header="Thông báo"
          modal
          footer={deleteProductDialogFooter}
          onHide={hideDeleteProductsDialog}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle mr-3"
              style={{ fontSize: "2rem" }}
            />
            {product && <span>Bạn có chắc chắn xóa những đàn này?</span>}
          </div>
        </Dialog>
        <Dialog
          visible={deleteProductDialog}
          style={{ width: "32rem" }}
          breakpoints={{ "960px": "75vw", "641px": "90vw" }}
          header="Thông báo"
          modal
          footer={deleteoneProductDialogFooter}
          onHide={hideDeleteProductDialog}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle mr-3"
              style={{ fontSize: "2rem" }}
            />
            {product && (
              <span>
                Bạn có chắc chắn muốn xóa <b>{product.name}</b>?
              </span>
            )}
          </div>
        </Dialog>

        <Dialog
          style={{ width: "50%" }}
          visible={productDialog}
          onHide={() => setProductDialog(false)}
        >
          <h4>Thêm mới</h4>
          <div>
            <form className="userUpdateForm">
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Tên</label>
                  <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Mô tả</label>
                  <input
                    type="description"
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Thành phần</label>
                  <input
                    type="ingredients"
                    name="ingredients"
                    value={product.ingredients}
                    onChange={handleChange}
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Hướng dẫn sử dụng</label>
                  <input
                    type="usage_instruction"
                    name="usage_instruction"
                    value={product.usage_instruction}
                    onChange={handleChange}
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Độ độc</label>
                  <input
                    type="toxicity"
                    name="toxicity"
                    value={product.toxicity}
                    onChange={handleChange}
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Liều lượng</label>
                  <input
                    type="dosage"
                    name="dosage"
                    value={product.dosage}
                    onChange={handleChange}
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Cách ly</label>
                  <input
                    type="isolation"
                    name="isolation"
                    value={product.isolation}
                    onChange={handleChange}
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Khuyến nghị</label>
                  <input
                    type="recommendation"
                    name="recommendation"
                    value={product.recommendation}
                    onChange={handleChange}
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Giấy phép</label>
                  <input
                    type="certificate"
                    name="certificate"
                    value={product.certificate}
                    onChange={handleChange}
                    className="userUpdateInput"
                  />
                </div>
              </div>
            </form>

            <Button
              className="button_Dia"
              label="Lưu"
              severity="success"
              onClick={handleCreate}
            />
            <Button
              className="button_Dia"
              label="Hủy"
              severity="secondary"
              outlined
              onClick={() => setProductDialog(false)}
            />
          </div>
        </Dialog>
      </div>
    </div>
  );
}
