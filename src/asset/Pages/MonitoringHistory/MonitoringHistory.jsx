import React, { useState, useEffect, useRef, useContext } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import "./MonitoringHistory.css";
import { AuthContext } from "../../service/user_service.js";
import { handleGet } from "../../service/Herd_data.js";
import { classNames } from "primereact/utils";
import {
  SearchBar,
  CustomPaginator,
} from "../../../components/Total_Interface/index.jsx";
const emptyProduct = {
  _id: null,
};

export default function MonitoringHistory() {
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(emptyProduct);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const toast = useRef(null);
  const { token } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [input, setInput] = useState("");

  useEffect(() => {
    handleGet(token, currentLimit, currentPage, input)
      .then((data) => {
        setProducts(data.herds);
        setTotalPages(data.totalPages);
      })
      .catch((error) => console.log("Error fetching data:", error));
  }, [token, currentLimit, currentPage, input]);

  const onPageChange = (event) => {
    setCurrentPage(+event.page + 1);
    setCurrentLimit(event.rows);
  };


  
  const navigate = useNavigate();
 

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

  const stockBodyTemplate = (rowData) => {
    const stockClassName = classNames(
      "border-circle w-2rem h-2rem inline-flex font-bold justify-content-center align-items-center text-sm",
      {
        "bg-teal-100 text-teal-900": rowData.farm.name > 6,
      }
    );

    return <div className={stockClassName}>{rowData.farm.name}</div>;
  };
  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Lịch sử giám sát</h4>
      <SearchBar value={input} onChange={setInput} />
    </div>
  );
  return (
    <div>
      <Toast className="toast" ref={toast} />
      <div className="">
        <DataTable value={products} selectionMode={"row"}selection={selectedProducts}onSelectionChange={(e) => setSelectedProducts(e.value)} 
          editMode="row" dataKey="_id" header={header} >
          <Column selectionMode="multiple" exportable={true}></Column>
          <Column field="name"  header="Cá thể" sortable style={{ minWidth: "10rem" }}></Column>
          <Column field="member_count"  header="Ngày cách ly" sortable  style={{ minWidth: "6rem" }} ></Column>
          <Column field="status" header= "Trạng thái" dataType="boolean" bodyClassName="text-center"style={{ minWidth: "5rem" }} body={isProcessedBodyTemplate} />
          <Column field="farm.name" sortable header="Khu vực cách ly" style={{ minWidth: "6rem" }}body={stockBodyTemplate} ></Column>
          <Column header="Chuồng cách ly" sortable sortField="category.name" filterField="category" style={{ minWidth: "14rem" }} body={representativeBodyTemplate} />
          <Column body={actionBodyTemplate} headerStyle={{ width: "10%", minWidth: "4rem" }}bodyStyle={{ left: "0" }} ></Column>
        </DataTable>
        <CustomPaginator currentPage={currentPage}  totalRecords={totalPages * currentLimit}rows={currentLimit} onPageChange={onPageChange} />
      </div>
    </div>
  );
}
