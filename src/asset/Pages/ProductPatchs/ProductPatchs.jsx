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
import ProductPatchs_Update from "./ProductPatchs_Update.jsx";
import ProductPatchs_Create from "./ProductPatchs_Create.jsx";
import Processors_Update from "../Processors/Processors_Update.jsx";
import { Image } from "primereact/image";
import ImageComponent from "../../../components/Images/Image.jsx";
import Product_Update from "../Product/Product_Update.jsx";
import "./ProductPatchs.css";
import { Paginator } from "primereact/paginator";
import DateConverter from "../../../components/Date/Date.jsx";

const emptyProduct = {
  _id: null,
  processor: {
    _id: "",
    name: "",
  },
  product: {
    _id: "",
    name: "",
  },
  quantity: "",
  description: "",
  production_date: null,
  release_date: null,
};
export default function SizeDemo() {
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

  useEffect(() => {
    fetchData();
  }, [currentPage, currentLimit]);

  const fetchData = async (value = "") => {
    try {
      const response = await fetch(
        `/product-patchs?limit=${currentLimit}&page=${currentPage}&searchQuery=${encodeURIComponent(
          value
        )}`
      );
      const data = await response.json();
      data.productPatchs.forEach((element) => {
        element.production_date = <DateConverter originalDate={element.production_date} />;
        element.release_date = <DateConverter originalDate={element.release_date} />;

      });
      setProducts(data.productPatchs);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
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
      await axios.delete(`/product-patchs/${product._id}`, product);
      reloadData();
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const imageBodyTemplate = (rowData) => {
    return (
      <Image src={rowData.product.qrcode}className="shadow-2 border-round" height="60"preview/>
    );
  };
  const [expandedRows, setExpandedRows] = useState(null);
  const rowExpansionTemplate = (data) => {
    product._id = data._id;
    var url = `/product-patchs/upload/${product._id}`;
    return (
      <>
        <TabView>
          <TabPanel header="Thông tin">
            {/* eslint-disable-next-line react/jsx-pascal-case */}
            <ProductPatchs_Update data={data} reloadData={reloadData} isUpdate={true} />
          </TabPanel>
          <TabPanel header="Xử lý/đóng gói">
            {/* eslint-disable-next-line react/jsx-pascal-case */}
            <Processors_Update data={data.processor} reloadData={reloadData} isProductPatchs={false}/>
          </TabPanel>
          <TabPanel header="Sản phẩm">
            {/* eslint-disable-next-line react/jsx-pascal-case */}
            <Product_Update data={data.product} reloadData={reloadData} isProductPatchs={false} />
          </TabPanel>
          <TabPanel header="Hình ảnh">
            <ImageComponent uploadUrl={url} images={data.images} reloadData={reloadData}  />
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
      <div className="card">
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
          expandedRows={expandedRows}
          onRowToggle={(e) => setExpandedRows(e.data)}
          rowExpansionTemplate={rowExpansionTemplate}
          dataKey="_id"
          tableStyle={{ minWidth: "68rem" }}
          header={header}
        >
          <Column expander={allowExpansion} style={{ width: "5rem" }} />
          <Column selectionMode="multiple" exportable={true}></Column>
          <Column field="product.qrcode" header="Qrcode" body={imageBodyTemplate}
          ></Column>
          <Column
            field="processor.name"
            header="Nơi xử lí đóng gói"
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            field="product.name"
            header="Sản phẩm"
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            field="quantity"
            header="Số lượng"
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            field="release_date"
            header="Ngày phát hành"
            style={{ minWidth: "14rem" }}
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
          {/* eslint-disable-next-line react/jsx-pascal-case */}
          <ProductPatchs_Update reloadData={reloadData} isUpdate={false}  />
        </Dialog>
      </div>
    </div>
  );
}
