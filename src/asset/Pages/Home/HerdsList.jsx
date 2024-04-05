import React, { useState, useEffect, useContext, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { HerdsContext } from "../../service/Herd_data.js";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import axios from "axios";
import { Dropdown } from "primereact/dropdown";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import Search from "./Search.jsx";
import "./HerdsList.css";
import { MultiSelect } from "primereact/multiselect";
const emptyProduct = {
  _id: null,
  name: "",
  start_date: "",
  category: {
    _id: "",
    name: "",
  },
  description: "",
  location: "",
  farm: {
    _id: "",
    name: "",
  },
};
export default function SizeDemo() {
  const { handleGet, handleGetCategory, handleGetFarm } =
    useContext(HerdsContext);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setcategories] = useState([]);
  const [farm, setfarm] = useState([]);
  const [product, setProduct] = useState(emptyProduct);
  const [selectedRole, setSelectedRole] = useState(emptyProduct.category);
  const [selectedfarm, setSelectedfarm] = useState(emptyProduct.farm);
  const [productDialog, setProductDialog] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const toast = useRef(null);
  const [search, setSearch] = useState("");
  const [limit, setlimit] = useState("");
  const [page, setpage] = useState("");
  const [name, setname] = useState("");
  useEffect(() => {
    fetchDataFarm();
    fetchDataCategory();
    fetchData();
  }, [search]);
  const fetchData = async () => {
    const userList = await handleGet(name, "32", "", search);
    setProducts(userList);
  };
  const fetchDataCategory = async () => {
    const categoryList = await handleGetCategory();
    setcategories(categoryList);
  };
  const fetchDataFarm = async () => {
    const farmList = await handleGetFarm();
    setfarm(farmList);
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
  const reloadData = () => {
    // eslint-disable-next-line no-undef
    fetchData();
  };
  const handleCreateUser = async (event) => {
    event.preventDefault();
    try {
      const a = await axios.post("/herds", {
        name: product.name,
        start_date: product.start_date,
        categoryId: selectedRole._id._id,
        description: product.description,
        location: product.location,
        farmId: selectedfarm._id._id,
      });
      setProductDialog(false);
      reloadData();
      toast.current.show({
        severity: "success",
        summary: "Successful",
        detail: "Tạo đàn",
        life: 3000,
      });
      console.log(a);
    } catch (error) {
      console.log("Error:", error);
    }
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
    setDeleteProductsDialog(false);
  };
  const deleteSelectedProducts = () => {
    for (const selectedProduct of selectedProducts) {
      handleDeleteUser(selectedProduct);
      reloadData();
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
    reloadData();
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
      navigate(`/herds/${selectedProduct._id}`);
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
      await axios.delete(`/herds/${product._id}`, product);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const representativeFilterTemplate = (options) => {
    return <MultiSelect value={options.value} options={categories} itemTemplate={representativesItemTemplate} onChange={(e) => options.filterCallback(e.value)} optionLabel="name" placeholder="Any" className="p-column-filter" />;
};
const representativeBodyTemplate = (rowData) => {
  const representative = rowData.category;

  return (
      <div className="flex align-items-center gap-2">
          <span>{representative.name}</span>
      </div>
  );
};
const representativesItemTemplate = (option) => {
    return (
        <div className="flex align-items-center gap-2">
            <span>{option.name}</span>
        </div>
    );
};


  const [globalFilter, setGlobalFilter] = useState(null);
  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Manage Herds</h4>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  );
  return (
    <div>
      <Toast className="toast" ref={toast} />
      <div className="card">
        {/* <Search /> */}
        <Toolbar
          className="mb-4"
          left={leftToolbarTemplate}
          // right={rightToolbarTemplate}
        ></Toolbar>
        <DataTable
          value={products}
          selectionMode={"row"}
          selection={selectedProducts}
          onSelectionChange={(e) => setSelectedProducts(e.value)}
          editMode="row"
          rowsPerPageOptions={[5, 10, 25]}
          dataKey="_id"
          paginator
          rows={10}
          tableStyle={{ minWidth: "50rem" }}
          globalFilter={globalFilter}
          header={header}
        >
          <Column selectionMode="multiple" exportable={true}></Column>
          <Column
            field="name"
            header="Tên đàn"
            sortable
            value={product.name}
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            field="member_count"
            header="Số lượng"
            sortable
            value={product.member_count}
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            field="start_date"
            header="Ngày tạo"
            value={product.start_date}
            style={{ width: "20%" }}
          ></Column>
          <Column
            field="category.name"
            header="Nhóm"
            value={product.category._id}
            style={{ width: "20%" }}
            sortable
          ></Column>
           <Column header="Nhóm"sortable sortField="category.name" filterField="category" showFilterMatchModes={false} 
        style={{ minWidth: '14rem' }} body={representativeBodyTemplate} filter filterElement={representativeFilterTemplate} />
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
          <h3>Thêm mới</h3>
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
                  <label>Ngày bắt đầu</label>
                  <input
                    type="text"
                    name="start_date"
                    value={product.start_date}
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
                  <label>Nhóm</label>
                  <Dropdown
                    type="text"
                    options={categories}
                    optionLabel="name"
                    onChange={(e) => {
                      setSelectedRole({ name: e.label, _id: e.value });
                      selectedRole.name = e.value.name;
                      selectedRole._id = e.value._id;
                    }}
                    value={selectedRole._id}
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Farm</label>
                  <Dropdown
                    type="text"
                    options={farm}
                    optionLabel="name"
                    onChange={(e) => {
                      setSelectedfarm({ name: e.label, _id: e.value });
                      selectedfarm.name = e.value.name;
                      selectedfarm._id = e.value._id;
                    }}
                    value={selectedfarm._id}
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Vị trí</label>
                  <input
                    type="location"
                    name="location"
                    value={product.location}
                    onChange={handleChange}
                    className="userUpdateInput"
                  />
                </div>
              </div>
            </form>

            <Button
              className="button_Dia"
              label="Lưu"
              severity="danger"
              onClick={handleCreateUser}
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