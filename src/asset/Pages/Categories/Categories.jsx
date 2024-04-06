import React, { useState, useEffect, useContext } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { AuthContext } from "../../service/user_service.js";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const emptyProduct = {
  _id: null,
  name: "",
  slug: "",
  description: "",
};
export default function Categories() {
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(emptyProduct);
  const [productDialog, setProductDialog] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState(null);
  useEffect(() => {
    const fetchFarmingAreas = async () => {
      try {
        const response = await axios.get("/categories");
        const farmingAreasData = response.data.categories;
        setProducts(farmingAreasData);
        console.log(farmingAreasData);
      } catch (error) {
        console.log("Error fetching farming areas:", error);
      }
    };
    fetchFarmingAreas();
  });
  const textEditor = (options) => {
    return (
      <InputText
        type="text"
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    );
  };
  const emailEditor = (options) => {
    return (
      <InputText
        type="description"
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    );
  };
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
  const handleCreateUser = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/categories", {
        name: product.name,
        slug: product.slug,
        description: product.description,
      });
      alert("tạo thành công");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button label="Tạo nhóm" severity="success" onClick={openNew} />
        <Button
          label="Xóa"
          severity="danger"
          onClick={confirmDeleteSelected}
          disabled={!selectedProducts || !selectedProducts.length}
        />
        <Button
          label="Xem chi tiết"
          severity="success"
          onClick={onRowDoubleClick}
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
  };
  const deleteSelectedProducts = () => {
    for (const selectedProduct of selectedProducts) {
      handleDeleteUser(selectedProduct);
      setDeleteProductsDialog(false);
    }
  };
  const deleteProduct = () => {
    let _products = products.filter((val) => val._id === product._id);
    const firstObject = _products[0];
    handleDeleteUser(firstObject);
    setDeleteProductDialog(false);
  };
  const navigate = useNavigate();
  const onRowDoubleClick = () => {
    for (const selectedProduct of selectedProducts) {
      navigate(`/categories/${selectedProduct._id}`);
    }
  }; ///////////////////////////////////

  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteProductsDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        onClick={deleteSelectedProducts}
        severity="danger"
      />
    </React.Fragment>
  );
  const deleteoneProductDialogFooter = (
    <React.Fragment>
      <Button label="Không" outlined onClick={hideDeleteProductDialog} />
      <Button label="Đồng ý" severity="danger" onClick={deleteProduct} />
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
            className="pi pi-trash"
            onClick={() => confirmDeleteProduct(rowData)}
          ></i>
        </div>
      </React.Fragment>
    );
  };
  const handleDeleteUser = async (product) => {
    try {
      await axios.delete(`/categories/${product._id}`, product);
      alert("xóa thành công");
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const onRowEditComplete = async () => {
    for (const selectedProduct of selectedProducts) {
      var userId = selectedProduct._id;
    }
    try {
      const response = await axios.patch(`/categories/${userId}`, {
        name: product.name,
        slug: product.slug,
        description: product.description,
      });
      alert("sửa thành công");
      console.log(response);
    } catch (error) {
      console.log("Error update:", error);
    }
  };
  return (
    <div className="card">
      <div className="card">
        <Toolbar
          className="mb-4"
          left={leftToolbarTemplate}
          //   right={rightToolbarTemplate}
        ></Toolbar>
        <DataTable
          value={products}
          selectionMode={"row"}
          selection={selectedProducts}
          onSelectionChange={(e) => setSelectedProducts(e.value)}
          editMode="row"
          dataKey="_id"
          onRowEditComplete={onRowEditComplete}
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column selectionMode="multiple" exportable={true}></Column>
          <Column
            field="name"
            header="Tên"
            value={product.name}
            editor={(options) => textEditor(options)}
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            field="slug"
            header="Slug"
            value={product.slug}
            editor={(options) => textEditor(options)}
            style={{ minWidth: "10rem" }}
          ></Column>
          {/* <Column
            field="description"
            header="Mô tả"
            value={product.description}
            editor={(options) => emailEditor(options)}
            style={{ width: "20%" }}
          ></Column>
       */}
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
            {product && <span>Bạn có chắc chắn xóa những nhóm này?</span>}
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

        <Dialog visible={productDialog} onHide={() => setProductDialog(false)}>
          <h3>Thêm mới</h3>
          <div>
            <form className="userUpdateForm">
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Tên nhóm</label>
                  <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>slug</label>
                  <input
                    type="text"
                    name="Slug"
                    value={product.slug}
                    onChange={handleChange}
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Mô tả</label>
                  <input
                    type="text"
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    className="userUpdateInput"
                  />
                </div>
              </div>
            </form>

            <Button
              label="Lưu"
              icon="pi pi-check"
              severity="danger"
              onClick={handleCreateUser}
            />
            <Button
              label="Hủy"
              icon="pi pi-times"
              outlined
              onClick={() => setProductDialog(false)}
            />
          </div>
        </Dialog>
      </div>
    </div>
  );
}
