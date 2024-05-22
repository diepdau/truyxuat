import React, { useState, useEffect, useRef, useContext } from "react";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Toast } from "primereact/toast";
import "../Home/HerdsList.css";
import Categories_Create from "./Categories_Create.jsx";
import { TabPanel, TabView } from "primereact/tabview";
import {
  CustomDialog,
  SearchBar,
  CustomPaginator,
} from "../../../components/Total_Interface/index.jsx";
import { handleGet, handleDelete } from "../../service/categories_data.js";
import { AuthContext } from "../../service/user_service.js";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import DecoratedCounter from "../../Design/Bright.jsx";
const emptyProduct = {
  _id: null,
};

export default function Category() {
  const { token } = useContext(AuthContext);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(emptyProduct);
  const [productDialog, setProductDialog] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const toast = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [input, setInput] = useState("");
  const [expandedRows, setExpandedRows] = useState(null);

  useEffect(() => {
    handleGet(token, currentLimit, currentPage, input).then((data) => {
      setProducts(data.categories);
      setTotalPages(data.totalPages);
    });
  }, [token, currentLimit, currentPage, input]);

  const onPageChange = (event) => {
    setCurrentPage(+event.page + 1);
    setCurrentLimit(event.rows);
  };

  const openNew = () => {
    setProductDialog(true);
  };

  const reloadData = () => {
    handleGet(token, currentLimit, currentPage, input).then((data) => {
      setProducts(data.categories);
      setTotalPages(data.totalPages);
    });
  };

  const leftToolbarTemplate = () => (
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

  const deleteSelectedProducts = async () => {
    for (const selectedProduct of selectedProducts) {
      await handleDelete(selectedProduct._id, token);
    }
    setDeleteProductsDialog(false);
    reloadData();
    toast.current.show({ severity: "success", summary: "Đã xóa", life: 3000 });
  };

  const deleteProduct = async () => {
    await handleDelete(product._id, token);
    setDeleteProductDialog(false);
    reloadData();
    toast.current.show({ severity: "success", summary: "Đã xóa", life: 3000 });
  };

  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const actionBodyTemplate = (rowData) => (
    <i
      className="pi pi-trash"
      onClick={() => confirmDeleteProduct(rowData)}
    ></i>
  );

  const rowExpansionTemplate = (data) => (
    <TabView>
      <TabPanel header="Thông tin">
        {/* eslint-disable-next-line react/jsx-pascal-case */}
        <Categories_Create
          data={data}
          isUpdate={true}
          reloadData={reloadData}
        />
      </TabPanel>
    </TabView>
  );

  const allowExpansion = (rowData) => rowData;

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Quản lý nhóm</h4>
      <SearchBar value={input} onChange={setInput} />
    </div>
  );

  return (
    <div className="div_main">
      <DecoratedCounter count={5} />

      <Toast className="toast" ref={toast} />
      <div className="card">
        <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
        <DataTable
          value={products}
          selectionMode={"row"}
          selection={selectedProducts}
          onSelectionChange={(e) => setSelectedProducts(e.value)}
          editMode="row"
          expandedRows={expandedRows}
          onRowToggle={(e) => setExpandedRows(e.data)}
          rowExpansionTemplate={rowExpansionTemplate}
          dataKey="_id"
          header={header}
        >
          <Column expander={allowExpansion} style={{ width: "5rem" }} />
          <Column selectionMode="multiple" exportable={true}></Column>
          <Column
            sortable
            field="name"
            header="Tên nhóm"
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            body={actionBodyTemplate}
            headerStyle={{ width: "10%", minWidth: "4rem" }}
            bodyStyle={{ left: "0" }}
          ></Column>
        </DataTable>

        <CustomPaginator
          currentPage={currentPage}
          totalRecords={totalPages * currentLimit}
          rows={currentLimit}
          onPageChange={onPageChange}
        />
        <CustomDialog
          visible={deleteProductsDialog}
          header="Confirm"
          type="deleteMany"
          onHide={hideDeleteProductsDialog}
          deleteSelectedProducts={deleteSelectedProducts}
        />
        <CustomDialog
          visible={deleteProductDialog}
          header="Confirm"
          type="deleteOne"
          onHide={hideDeleteProductDialog}
          deleteProduct={deleteProduct}
          productName={product.name}
        />
        <Dialog
          header="Thêm mới"
          style={{ width: "50%" }}
          visible={productDialog}
          onHide={() => setProductDialog(false)}
        >
          {/* eslint-disable-next-line react/jsx-pascal-case */}
          <Categories_Create reloadData={reloadData} isUpdate={false} />
        </Dialog>
      </div>
    </div>
  );
}
