import React, { useState, useEffect, useRef, useContext } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import "../Home/HerdsList.css";
import { TabView, TabPanel } from "primereact/tabview";
import ProductPatchs_Update from "./ProductPatchs_Update.jsx";
import ImageComponent from "../../../components/Images/Image.jsx";
import "./ProductPatchs.css";
import { Paginator } from "primereact/paginator";
import { DateConverter } from "../../../components/Date/Date.jsx";
import Harvest_Update from "../Harvest/Harvest_Update.jsx";
import ProductPatchs_Create from "./ProductPatchs_Create.jsx";
import { Image } from "primereact/image";
import { handleDelete } from "../../service/productPatchs_data.js";
import { AuthContext } from "../../service/user_service.js";
const emptyProduct = {
  _id: null,
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
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [currentPage, currentLimit]);

  const fetchData = async (value = "") => {
    try {
      const response = await fetch(
        `https://agriculture-traceability.vercel.app/api/v1/processors?limit=${currentLimit}&page=${currentPage}&searchQuery=${encodeURIComponent(
          value
        )}`
      );
      const data = await response.json();
      data.processors.forEach((element) => {
        // element.production_date = (
        //   <DateConverter originalDate={element.production_date} />
        // );

        element.production_date = DateConverter(element.production_date);
      });
      console.log(data);
      setProducts(data.processors);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.log("There was a problem with the fetch operation:", error);
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
        <Button
          label="Thông tin loại"
          severity="success"
          onClick={onClickInforProduct}
        />
        <Button
          label="Danh sách sản phẩm"
          severity="success"
          onClick={onClickProcessorProduct}
        />
      </div>
    );
  };
  const onClickInforProduct = () => {
    navigate(`/thong-tin`);
  };
  const onClickProcessorProduct = () => {
    navigate(`/processors/products`);
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
      handleDelete(product._id, token);
      reloadData();
      reloadData();
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const [expandedRows, setExpandedRows] = useState(null);
  const rowExpansionTemplate = (data) => {
    product._id = data._id;
    var url = `https://agriculture-traceability.vercel.app/api/v1/processors/upload/${product._id}`;
    return (
      <>
        <TabView>
          <TabPanel header="Thông tin đóng gói">
            {/* eslint-disable-next-line react/jsx-pascal-case */}
            <ProductPatchs_Update
              data={data}
              reloadData={reloadData}
              isUpdate={true}
            />
          </TabPanel>
          <TabPanel header="Chi tiết tổng sản phẩm">
            {/* eslint-disable-next-line react/jsx-pascal-case */}
            <Harvest_Update
              data={data.harvest}
              reloadData={reloadData}
              isProcessors={true}
            />
          </TabPanel>

          <TabPanel header="Hình ảnh">
            <ImageComponent
              uploadUrl={url}
              images={data.images}
              reloadData={reloadData}
            />
          </TabPanel>
        </TabView>
      </>
    );
  };
  const imageBodyTemplate = (rowData) => {
    return (
      <>
        <Image
          src={rowData.qr_code}
          className="shadow-2 border-round"
          height="80"
          preview
        />
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
      <h4 className="m-0">Quản lý đóng gói</h4>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          value={input}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Tìm kiếm..."
        />
      </span>
    </div>
  );
  return (
    <div className="div_main">
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
          header={header}
        >
          <Column expander={allowExpansion} style={{ width: "5rem" }} />
          <Column selectionMode="multiple" exportable={true}></Column>
          <Column
            field="product.qrcode"
            header="Qrcode"
            body={imageBodyTemplate}
          ></Column>
          {/* <Column
            sortable
            field="name"
            header="Nơi xử lí đóng gói"
            style={{ minWidth: "10rem" }}
          ></Column> */}
          <Column
            sortable
            field="harvest.name"
            header="Sản phẩm"
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            sortable
            field="quantity"
            header="Số lượng"
            style={{ minWidth: "10rem" }}
          ></Column>

          <Column
            field="production_date"
            header="Ngày sản xuất"
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
            {product && <span>Bạn có chắc chắn xóa những đóng gói này?</span>}
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
          <ProductPatchs_Create reloadData={reloadData} isUpdate={false} />
        </Dialog>
      </div>
    </div>
  );
}
