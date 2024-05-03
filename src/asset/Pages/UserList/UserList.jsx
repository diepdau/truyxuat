import React, { useState, useEffect, useContext } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { AuthContext } from "../../service/user_service.js";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import axios from "axios";
import { Dropdown } from "primereact/dropdown";
import { useNavigate } from "react-router-dom";
const emptyProduct = {
  _id: null,
  first_name: "",
  last_name: "",
  email: "",
  role: "",
  password: "",
};
export default function SizeDemo() {
  const { getuserList } = useContext(AuthContext);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(emptyProduct);
  const [selectedRole, setSelectedRole] = useState(emptyProduct);
  const [productDialog, setProductDialog] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const userList = await getuserList();
      setProducts(userList);
    };

    fetchData();
  });

  const roles = [{ name: "user" }, { name: "manager" }];

  const roleEditor = () => {
    return (
      <Dropdown
        type="text"
        options={roles}
        optionLabel="name"
        value={selectedRole}
        onChange={(e) => setSelectedRole(e.value)}
        className="userUpdateInput"
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
      await axios.post(
        "https://agriculture-traceability.vercel.app/api/v1/users",
        {
          first_name: product.first_name,
          last_name: product.last_name,
          email: product.email,
          role: selectedRole.name,
          password: product.password,
        }
      );
      alert("tạo tài khoản thành công");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button label="Tạo tài khoản" severity="success" onClick={openNew} />
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
      navigate(`/user/${selectedProduct._id}`);
    }
  };

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
      await axios.delete(
        `https://agriculture-traceability.vercel.app/api/v1/users/${product._id}`,
        product
      );
      alert("xóa tài khoản thành công");
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const onRowEditComplete = async () => {
    for (const selectedProduct of selectedProducts) {
      var userId = selectedProduct._id;
    }
    try {
      const response = await axios.patch(
        `https://agriculture-traceability.vercel.app/api/v1/users/${userId}`,
        {
          role: selectedRole.name,
        }
      );
      alert("sửa vai trò thành công");
      console.log(response);
    } catch (error) {
      console.log("Error update role:", error);
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
          tableStyle={{ minWidth: "68rem" }}
        >
          <Column selectionMode="multiple" exportable={true}></Column>
          <Column
            sortable
            field="first_name"
            header="Họ"
            value={product.first_name}
            // editor={(options) => textEditor(options)}
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            sortable
            field="last_name"
            header="Tên"
            value={product.last_name}
            // editor={(options) => textEditor(options)}
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            sortable
            field="email"
            header="Email"
            value={product.email}
            // editor={(options) => emailEditor(options)}
            style={{ width: "20%" }}
          ></Column>
          <Column
            field="role"
            header="Vai trò"
            value={product.role}
            editor={(options) => roleEditor(options)}
            style={{ width: "20%" }}
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
            {product && <span>Bạn có chắc chắn xóa những tài khoản này?</span>}
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
                Bạn có chắc chắn muốn xóa <b>{product.first_name}</b>?
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
                  <label>Họ</label>
                  <input
                    type="text"
                    name="first_name"
                    value={product.first_name}
                    onChange={handleChange}
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Tên</label>
                  <input
                    type="text"
                    name="last_name"
                    value={product.last_name}
                    onChange={handleChange}
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Email</label>
                  <input
                    type="text"
                    name="email"
                    value={product.email}
                    onChange={handleChange}
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Mật khẩu</label>
                  <input
                    type="password"
                    name="password"
                    value={product.password}
                    onChange={handleChange}
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Vai trò</label>
                  <Dropdown
                    type="text"
                    options={roles}
                    optionLabel="name"
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.value)}
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
