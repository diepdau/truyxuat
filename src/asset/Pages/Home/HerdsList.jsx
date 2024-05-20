import React, { useState, useEffect, useRef, useContext } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import Infor_Create from "./Infor_Create.jsx";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import "./HerdsList.css";
import { Paginator } from "primereact/paginator";
import {DateConverter} from "../../../components/Date/Date.jsx";
import { AuthContext } from "../../service/user_service.js";
import { handleDelete } from "../../service/Herd_data.js";
import { calculateAgeInMonths } from "./DateBirth.jsx";
import { classNames } from "primereact/utils";
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
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(emptyProduct);
  const [productDialog, setProductDialog] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const toast = useRef(null);
  const { token } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchData();
  }, [currentPage, currentLimit]);

  const fetchData = async (value = "") => {
    try {
      const response = await fetch(
        `https://agriculture-traceability.vercel.app/api/v1/herds?limit=${currentLimit}&page=${currentPage}&searchQuery=${encodeURIComponent(
          value
        )}`
      );
      const data = await response.json();
      data.herds.forEach((element) => {
        element.farm.name = calculateAgeInMonths(element.start_date);
      });

      data.herds.forEach((element) => {
        // element.date = <DateConverter originalDate={element.start_date} />;
        element.date = DateConverter(element.date); 
      });
      setProducts(data.herds);
      setTotalPages(data.totalPages);
      console.log(data.herds);
    } catch (error) {
      console.log("Error", error);
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
          label="Xem chi tiết"
          severity="success"
          onClick={onRowDoubleClick}
        />
        <Button label="Nhóm" severity="success" onClick={onClickCategories} />
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
    if (!selectedProducts) {
      toast.current.show({
        severity: "warn",
        detail: "Bạn phải chọn 1 đàn",
        life: 3000,
      });
    } else {
      for (const selectedProduct of selectedProducts) {
        navigate(`/herds/${selectedProduct._id}`);
      }
    }
  };
  const onClickCategories = () => {
    navigate(`/categories`);
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
      await handleDelete(product, token);
      reloadData();
      reloadData();

    } catch (error) {
      console.log("Error:", error);
    }
  };

  const representativeBodyTemplate = (rowData) => {
    const representative = rowData.category;

    return (
      <div className="flex align-items-center gap-2">
        <span>{representative.name}</span>
      </div>
    );
  };
  const isProcessedBodyTemplate = (rowData) => {
    let iconClass = "pi";
    if (rowData.status === "Chưa thu hoạch") {
      iconClass += " text-red-500 pi-times-circle";
    } else if (rowData.status === "Đang thu hoạch") {
      iconClass += " text-yellow-500 pi-circle";
    } else if (rowData.status === "Thu hoạch xong") {
      iconClass += " text-green-500 pi-check-circle";
    }

    return <i className={iconClass}></i>;
  };

  const [input, setInput] = useState("");
  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };
  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Quản lý đàn</h4>
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
  const stockBodyTemplate = (rowData) => {
    const stockClassName = classNames(
      "border-circle w-2rem h-2rem inline-flex font-bold justify-content-center align-items-center text-sm",
      {
        "bg-teal-100 text-teal-900": rowData.farm.name > 6,
      }
    );

    return <div className={stockClassName}>{rowData.farm.name}</div>;
  };

  return (
    <div >
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
          dataKey="_id"
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
            style={{ minWidth: "6rem" }}
          ></Column>
          <Column
            field="status"
            header="Trạng thái"
            dataType="boolean"
            bodyClassName="text-center"
            style={{ minWidth: "5rem" }}
            body={isProcessedBodyTemplate}
          />

          {/* <Column field="date" sortable header="Ngày tạo" value={product.start_date}style={{ width: "10%" }}></Column> */}
          <Column
            field="farm.name"
            sortable
            header="Tháng tuổi"
            style={{ minWidth: "6rem" }}
            body={stockBodyTemplate}
          ></Column>

          <Column
            header="Nhóm"
            sortable
            sortField="category.name"
            filterField="category"
            style={{ minWidth: "14rem" }}
            body={representativeBodyTemplate}
          />
          <Column
            body={actionBodyTemplate}
            headerStyle={{ width: "10%", minWidth: "4rem" }}
            bodyStyle={{ left: "0" }}
          ></Column>
        </DataTable>
        <Paginator
          first={(currentPage - 1) * currentLimit}
          totalRecords={totalPages * currentLimit}
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
          <Infor_Create isUpdate={false} reloadData={reloadData} />
        </Dialog>
      </div>
    </div>
  );
}
