import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import axios from "axios";
import { Toast } from "primereact/toast";
import "../Home/HerdsList.css";
import { TabView, TabPanel } from "primereact/tabview";
import Harvest_Update from "./Harvest_Update.jsx";
import Harvest_Create from "./Harvest_Create.jsx";
import Image from "../../../components/Images/Image.jsx";
import Chart_Herds from "./Chart_Herds.jsx";
import Chart_Products from "./Chart_Products.jsx";
import "./Harvest.css";
import { Paginator } from "primereact/paginator";
import DateConverter from "../../../components/Date/Date.jsx";
const emptyProduct = {
  _id: null,
  name: "",
  herd: "",
  quantity: "",
  unit: "",
  date: "",
};
function Harvest({ isherdharvest }) {
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [harvests, setHarvests] = useState([]);
  const [product, setProduct] = useState(emptyProduct);
  const [productDialog, setProductDialog] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const toast = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchData();
  }, [currentPage, currentLimit]);

  const fetchData = async (value = "") => {
    if (isherdharvest) {
      try {
        // const response = await fetch(
        //   `/harvests/herd/${isherdharvest}&limit=${currentLimit}&page=${currentPage}&searchQuery=${encodeURIComponent(
        //     value
        //   )}`
        // );
        const response = await fetch(`/harvests/herd/${isherdharvest}`);
        const data = await response.json();
        data.harvests.forEach((element) => {
          element.date = <DateConverter originalDate={element.date} />;
        });
        setHarvests(data.harvests);
        // setTotalPages(data.totalPages);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    } else {
      try {
        const response = await fetch(
          `/harvests?limit=${currentLimit}&page=${currentPage}&searchQuery=${encodeURIComponent(
            value
          )}`
        );
        const data = await response.json();
        data.harvests.forEach((element) => {
          element.date = <DateConverter originalDate={element.date} />;
        });
        setHarvests(data.harvests);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    }
  };
  const onPageChange = (event) => {
    setCurrentPage(+event.page + 1);
    setCurrentLimit(event.rows);
  };
  const openNew = () => {
    setProductDialog(true);
  };
  const reloadData = () => {
    fetchData();
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
    let _products = harvests.filter((val) => val._id === product._id);
    const firstObject = _products[0];
    handleDeleteUser(firstObject);
    setDeleteProductDialog(false);
    toast.current.show({
      severity: "success",
      summary: "Đã xóa",
      life: 3000,
    });
    reloadData();
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
        <i
          className="pi pi-trash"
          onClick={() => confirmDeleteProduct(rowData)}
        ></i>
      </React.Fragment>
    );
  };

  const handleDeleteUser = async (product) => {
    try {
      await axios.delete(`/harvests/${product._id}`, product);
      reloadData();
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const [expandedRows, setExpandedRows] = useState(null);
  const rowExpansionTemplate = (data) => {
    product._id = data._id;
    var url = `/harvests/upload/${product._id}`;
    return (
      <>
        <TabView>
          <TabPanel header="Thông tin">
            <Harvest_Update data={data} reloadData={reloadData} />
          </TabPanel>
          <TabPanel header="Hình ảnh">
            <Image
              uploadUrl={url}
              images={data.images}
              reloadData={reloadData}
            />
          </TabPanel>
        </TabView>
      </>
    );
  };
  const allowExpansion = (rowData) => {
    return rowData;
  };
  const [input, setInput] = useState("");
  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };
  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Manage Records</h4>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          value={input}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  );
  return (
    <div>
      <Toast className="toast" ref={toast} />

      {!isherdharvest && (
        <>
          {/* <Chart_Herds /> */}
          <Chart_Products />
        </>
      )}

      <div className="card">
        <Toolbar
          className="mb-4"
          left={leftToolbarTemplate}
          // right={rightToolbarTemplate}
        ></Toolbar>
        <DataTable
          header={header}
          value={harvests}
          selectionMode={"row"}
          selection={selectedProducts}
          onSelectionChange={(e) => setSelectedProducts(e.value)}
          editMode="row"
          expandedRows={expandedRows}
          onRowToggle={(e) => setExpandedRows(e.data)}
          rowExpansionTemplate={rowExpansionTemplate}
          dataKey="_id"
          tableStyle={{ minWidth: "68rem" }}
        >
          <Column expander={allowExpansion} style={{ width: "5rem" }} />
          <Column selectionMode="multiple" exportable={true}></Column>
          <Column
            field="name"
            header="Tên sản phẩm"
            value={product.name}
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            field="quantity"
            header="Số lượng"
            value={product.quantity}
            style={{ minWidth: "5rem" }}
          ></Column>

          <Column
            field="unit"
            header="ĐVT"
            value={product.unit}
            style={{ minWidth: "5rem" }}
          ></Column>
          <Column
            field="herd.name"
            header="Tên đàn"
            value={product.herd.name}
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            field="date"
            header="Ngày thu hoạch"
            value={product.date}
            style={{ minWidth: "10rem" }}
          ></Column>

          <Column
            field="isProcessed"
            header="Trạng thái"
            value={product.isProcessed}
            style={{ minWidth: "5rem" }}
          ></Column>
          <Column
            body={actionBodyTemplate}
            headerStyle={{ width: "10%", minWidth: "4rem" }}
            bodyStyle={{ left: "0" }}
          ></Column>
        </DataTable>
        <Paginator
          first={(currentPage - 1) * currentLimit}
          totalRecords={totalPages * currentLimit} // Assuming you set the correct total number of records here
          rows={currentLimit}
          rowsPerPageOptions={[5, 10, 20]}
          onPageChange={onPageChange}
        />
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
          header="Thêm mới"
          style={{ width: "50%" }}
          visible={productDialog}
          onHide={() => setProductDialog(false)}
        >
          <Harvest_Create reloadData={reloadData} idherd={isherdharvest} />
        </Dialog>
      </div>
    </div>
  );
}
export default Harvest;
