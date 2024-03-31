import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { useForm } from "react-hook-form";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import axios from "axios";
import { Dropdown } from "primereact/dropdown";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { useLocation } from "react-router-dom";
import { Galleria } from "primereact/galleria";
import "./HerdsList.css";
const emptyProduct = {
  _id: null,
  name: "",
  birth_weight: "",
  birth_date: "",
  is_harvested: "",
  quantity: 0,
  herdId: "",
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
  const location = useLocation();
  const herdId = location.pathname.split("/")[2];
  useEffect(() => {
    getHerd();
  }, []);
  const getHerd = async () => {
    try {
      if (herdId) {
        const res = await axios.get(`/herds/${herdId}`);
        setProducts(res.data.herd.records);
      }
    } catch (error) {
      console.log(error);
    }
  };
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
        birth_date: product.birth_date,
        birth_weight: product.birth_weight,
        is_harvested: selectedIsHarvested.name,
        herdId: herdId,
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
      await axios.post(`/herds/${herdId}/generate-animals`, {
        quantity: product.quantity,
      });
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
  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _product = { ...product };

    if (name === "name") {
      _product.name = val;
    } else if (name === "birth_date") {
      _product.birth_date = val;
    } else if (name === "brith_weight") {
      _product.brith_weight = val;
    }

    setProduct(_product);
  };
  
  const Is_harvested = [{ name: "true" }, { name: "false" }];
  const [selectedIsHarvested, setSelectedIsHarvested] = useState(emptyProduct);
  const IsHarvested = () => {
    return (
      <Dropdown
        type="text"
        optionLabel="name"
        value={selectedIsHarvested}
        options={Is_harvested}
        onChange={(e) => setSelectedIsHarvested(e.value)}
        placeholder="Tình trạng thu hoạch"
      />
    );
  };
  const onRowEditComplete = async () => {
    console.log(product);
    for (const selectedProduct of selectedProducts) {
      var Id = selectedProduct._id;var herd=selectedProduct.herd
    }
    try {
      const response = await axios.patch(`/animals/${Id}`, {
        name: product.name,
        birth_date: product.birth_date,
        birth_weight: product.birth_weight,
        herdId: herd,
        is_harvested: selectedIsHarvested.name,
      });
      alert("sửa thành công");
      console.log(response);
    } catch (error) {
      console.log("Error update role:", error);
    }
  };
  //Upload hình
  const { register, handleSubmit } = useForm();

  const upLoadImage = async (data) => {
    const formData = new FormData();
    for (const file of data.file) {
      formData.append("images", file);
    }
    try {
      const responseImg = await axios.patch(
        `/animals/upload/${product._id}`,
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
  const [expandedRows, setExpandedRows] = useState(null);
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
  const rowExpansionTemplate = (data) => {
    product._id = data._id;
    return (
      <>
        <h3 style={{ color: "black" }}>Hình</h3>
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
      </>
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
          expandedRows={expandedRows}
          onRowToggle={(e) => setExpandedRows(e.data)}
          rowExpansionTemplate={rowExpansionTemplate}
          selection={selectedProducts}
          onSelectionChange={(e) => setSelectedProducts(e.value)}
          editMode="row"
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
            header="Tên"
            value={product.name}
            // editor={(options) => textEditor(options)}
            style={{ minWidth: "10rem" }}
          ></Column>

          <Column
            field="birth_date"
            header="Ngày sinh"
            value={product.birth_date}
            handleChange={(e) =>  onInputChange(e, "birth_date")}
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            field="birth_weight"
            header="Cân nặng"
            value={product.birth_weight}
            // editor={(options) => textEditor(options)}
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            field="is_harvested"
            header="Thu hoạch"
            // editor={(options) => IsHarvested(options)}
            value={product.is_harvested}
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
                    name="birth_date"
                    value={product.birth_date}
                    onChange={handleChange}
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Cân nặng</label>
                  <input
                    type="birth_weight"
                    name="birth_weight"
                    value={product.birth_weight}
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
