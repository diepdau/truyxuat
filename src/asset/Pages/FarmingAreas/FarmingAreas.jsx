import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import axios from "axios";
import { Dropdown } from "primereact/dropdown";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { Tag } from "primereact/tag";
import "../Home/HerdsList.css";
import { InputTextarea } from "primereact/inputtextarea";
import Map123 from "../../../components/Map/Map.jsx";
const emptyProduct = {
  _id: null,
  name: "",
  description: "",
  area: "",
  address: "",
  coordinates: [0, 0],
};
export default function SizeDemo() {
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(emptyProduct);
  const [productDialog, setProductDialog] = useState(false);
  const [productDialogNewAuto, setProductDialogNewAuto] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const toast = useRef(null);

  
  useEffect(() => {
    const getHerd = async () => {
      try {
        const res = await axios.get(`/farm`);
        setProducts(res.data.farms);
      } catch (error) {
        console.log(error);
      }
    };
    getHerd();
  });

  const openNew = () => {
    setProductDialog(true);
  };
  const openNewAuto = () => {
    setProductDialogNewAuto(true);
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
      const a = await axios.post("/animals", {
        name: product.name,
        area: product.area,
        description: product.description,
        address: selectedIsHarvested.name,
      });
      setProductDialog(false);
      toast.current.show({
        severity: "success",
        summary: "Tạo đàn",
        life: 3000,
      });
      console.log(a);
      reloadData();
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const handleCreateNewAuto = async () => {
    try {
      // await axios.post(`/farm/${herdId}/generate-animals`, {
      //   quantity: product.quantity,
      // });
      setProductDialogNewAuto(false);
      reloadData();
      toast.current.show({
        severity: "success",
        summary: "Tạo con trong đàn thành công",
        life: 3000,
      });
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
        <Button label="Tạo tự động" severity="success" onClick={openNewAuto} />
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
      navigate(`/farm/${selectedProduct._id}`);
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
            className="pi pi-trash"
            onClick={() => confirmDeleteProduct(rowData)}
          ></i>
        </div>
      </React.Fragment>
    );
  };
  const handleDeleteUser = async (product) => {
    try {
      await axios.delete(`/animals/${product._id}`, product);
      reloadData();
    } catch (error) {
      console.log("Error:", error);
    }
  };
  //Xóa hết record
  // const handleDeleteAllRecord = async () => {
  //   try {
  //     await axios.delete(`/animals/herd/${herdId}`);
  //     reloadData();
  //   } catch (error) {
  //     console.log("Error:", error);
  //   }
  // };
  const statusBodyTemplate = (rowData) => {
    return <Tag value={rowData.address} severity={getSeverity(rowData)}></Tag>;
  };
  const getSeverity = (product) => {
    const color = product.address === "true" ? "success" : "warning";
    return color;
    // switch (product.address) {

    //   case "true":
    //     return "success";
    //   case "false":
    //     return "warning";
    //   default:
    //     return null;
    // }
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
  const Is_harvested = [{ name: "true" }, { name: "false" }];
  const [selectedIsHarvested, setSelectedIsHarvested] = useState(emptyProduct);
  const IsHarvested = () => {
    return (
      <Dropdown
        options={Is_harvested}
        onChange={(e) => setSelectedIsHarvested(e.value)}
        value={selectedIsHarvested}
        placeholder="Tình trạng thu hoạch"
        itemTemplate={(option) => {
          return <Tag value={option} severity={getSeverity(option)}></Tag>;
        }}
      />
    );
  };
  const onRowEditComplete = async () => {
    for (const selectedProduct of selectedProducts) {
      var Id = selectedProduct._id;
    }
    try {
      const response = await axios.patch(`/animals/${Id}`, {
        name: product.name,
        area: product.area,
        description: product.description,
        //address: selectedIsHarvested.name,
      });
      alert("sửa vai trò thành công");
      console.log(response);
    } catch (error) {
      console.log("Error update role:", error);
    }
  };
  const [expandedRows, setExpandedRows] = useState(null);
  const rowExpansionTemplate = (data) => {
    const coo = data.coordinates;
    return (
      <div className="p-3">
        <h3 style={{ color: "black" }}>Mô tả</h3>
        <InputTextarea
          value={data.description}
          autoResize
          style={{
            width: "100%",
          }}
        />
        <h3 style={{ color: "black" }}>Bản đồ</h3>
        <InputTextarea
          value={data.coordinates}
          style={{
            width: "100%",
          }}
          autoResize
        />
        <Map123 coordinates={coo} nameAres={data.address} />
      </div>
    );
  };
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
            header="Tên trang trại"
            value={product.name}
            editor={(options) => textEditor(options)}
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            field="area"
            header="Vùng"
            value={product.area}
            editor={(options) => textEditor(options)}
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            field="address"
            header="Địa chỉ"
            // body={statusBodyTemplate}
            //editor={(options) => IsHarvested(options)}
            value={product.address}
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
                  <label>Ngày sinh</label>
                  <input
                    type="text"
                    name="area"
                    value={product.area}
                    onChange={handleChange}
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Cân nặng</label>
                  <input
                    type="description"
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    className="userUpdateInput"
                  />
                </div>

                <div className="userUpdateItem">
                  <label>Thu hoạch</label>
                  <Dropdown
                    type="text"
                    options={Is_harvested}
                    optionLabel="name"
                    value={selectedIsHarvested}
                    onChange={(e) => setSelectedIsHarvested(e.value)}
                    className="userUpdateInput"
                  />
                </div>
              </div>
            </form>

            <Button
              className="button_Dia"
              label="Lưu"
              severity="success"
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

        <Dialog
          style={{ width: "50%" }}
          visible={productDialogNewAuto}
          onHide={() => setProductDialogNewAuto(false)}
        >
          <h3>Thêm mới tự động</h3>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Số lượng</label>
                <input
                  type="number"
                  name="quantity"
                  value={product.quantity}
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
            onClick={handleCreateNewAuto}
          />
          <Button
            className="button_Dia"
            label="Hủy"
            severity="secondary"
            outlined
            onClick={() => setProductDialogNewAuto(false)}
          />
        </Dialog>
      </div>
    </div>
  );
}
