import React, { useState, useEffect, useRef,useContext } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { handleUpdateAnimal,createNewAutoHerd, handleDeleteAnimal } from '../../service/Herd_data.js';
import { Toast } from "primereact/toast";
import "./HerdsList.css";
import Record_Create from "./Record_Create.jsx";
import { Calendar } from "primereact/calendar";
import ImageUploader from "../../../components/Images/Image";
import DateConverter from "../../../components/Date/Date";
import { AuthContext } from "../../service/user_service.js";
const emptyProduct = {
  _id: null,
  name: "",
  birth_weight: "",
  // birth_date: new Date().toISOString().slice(0, 10),
  birth_date: new Date(),
  is_harvested: "",
  quantity: 0,
  herd: "",
};
export default function SizeDemo({ herdId }) {
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(emptyProduct);
  const [productDialog, setProductDialog] = useState(false);
  const [productDialogNewAuto, setProductDialogNewAuto] = useState(false);
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
        `https://agriculture-traceability.vercel.app/api/v1/herds/${herdId}?limit=${currentLimit}&page=${currentPage}&searchQuery=${encodeURIComponent(
          value
        )}`
      );
      const data = await response.json();
      data.herd.records.forEach((element) => {
        element.birth_date = (
          <DateConverter originalDate={element.birth_date} />
        );
      });
      setProducts(data.herd.records);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.log("There was a problem with the fetch operation:", error);
    }
  };
  const reloadData = () => {
    fetchData();
  };
  const onPageChange = (event) => {
    setCurrentPage(+event.page + 1);
    setCurrentLimit(event.rows);
  };

  const openNew = () => {
    setProductDialog(true);
  };
  const openNewAuto = () => {
    setProductDialogNewAuto(true);
  };
  const handleChange = (event) => {
    const { value, name } = event.target;
    if (name === "birth_weight" && parseFloat(value) < 0) {
      return;
    }
    setProduct({
      ...product,
      [name]: value,
    });
  };

  //Hàm tạo con trong đàn tự động
  const handleCreateNewAuto = async () => {
    try {
      await createNewAutoHerd(herdId,product.quantity,token);
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
  // const reloadData = () => {
  //   handleCreateNewAuto();
  // };
  //Button xóa, thêm tự động
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
  // Xử lý và thông báo xóa
  const deleteSelectedProducts = () => {
    for (const selectedProduct of selectedProducts) {
      handleDeleteUser(selectedProduct);
    }
    reloadData();
    toast.current.show({
      severity: "success",
      summary: "Đã xóa 1 số đàn",
      life: 3000,
    });
    setDeleteProductsDialog(false);
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
  //Xử lý xóa hàng trong bảng
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
      await handleDeleteAnimal(product._id,token);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  //Xử lý thu hoạch chưa
  
  const Birth_weight = (options) => {
    return (
      <InputText
        type="number"
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
        style={{ minWidth: "100%" }}
      />
    );
  };
  const Name = (options) => {
    return (
      <InputText
        type="text"
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    );
  };
  const Birth_date = (options) => {
    return (
      <Calendar
        type="text"
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    );
  };
  const onRowEditComplete = async (e) => {
    let _products = [...products];
    let { newData, index } = e;
    _products[index] = newData;
    if (selectedProducts.length === 0) {
      console.log("Vui lòng chọn ít nhất một sản phẩm trước khi tiếp tục.");
    } else {
      var hasSelectedProduct = false;
      for (const selectedProduct of selectedProducts) {
        var Id = selectedProduct._id;
        hasSelectedProduct = true;
        break;
      }
    }

    if (!hasSelectedProduct) {
      alert("Bạn phải chọn 1 con trong đàn.");
    }
    let formattedDate = "";
    if (newData.birth_date.props) {
      formattedDate = newData.birth_date.props.originalDate;
    } else {
      formattedDate = newData.birth_date;
    }
    console.log("birth_day", formattedDate);
    try {
       await handleUpdateAnimal(Id, {  
       name: newData.name,
      birth_date: formattedDate,
      birth_weight: newData.birth_weight,
      herd: herdId,
    },token);
      reloadData();
      toast.current.show({
        severity: "success",
        summary: "Đã chỉnh sửa",
        life: 3000,
      });
    } catch (error) {
      console.log("Error update:", error);
    }
  };
  const [expandedRows, setExpandedRows] = useState(null);
  const rowExpansionTemplate = (data) => {
    product._id = data._id;
    var url = `https://agriculture-traceability.vercel.app/api/v1/animals/upload/${product._id}`;
    return (
      <>
        <h3 style={{ color: "black" }}>Hình</h3>
        <ImageUploader
          uploadUrl={url}
          images={data.images}
          reloadData={reloadData}
        />
      </>
    );
  };
  const allowExpansion = (rowData) => {
    return rowData;
  };
  const [input, setInput] = useState("");
  const handleChangeSearch = (value) => {
    setInput(value);
    fetchData(value);
  };
  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Quản lý danh sách con</h4>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          value={input}
          onChange={(e) => handleChangeSearch(e.target.value)}
          placeholder="Tìm kiếm..."
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
          editMode="row"
          selectionMode={"row"}
          onRowEditComplete={onRowEditComplete}
          expandedRows={expandedRows}
          onRowToggle={(e) => setExpandedRows(e.data)}
          rowExpansionTemplate={rowExpansionTemplate}
          selection={selectedProducts}
          onSelectionChange={(e) => setSelectedProducts(e.value)}
          dataKey="_id"
          tableStyle={{ minWidth: "64rem" }}
          // header={header}
        >
          <Column expander={allowExpansion} style={{ width: "5rem" }} />

          <Column selectionMode="multiple" exportable={true}></Column>
          <Column
            sortable
            field="name"
            header="Tên"
            value={product.name}
            editor={(options) => Name(options)}
            style={{ minWidth: "10rem" }}
          ></Column>

          <Column
            sortable
            field="birth_date"
            header="Ngày sinh"
            value={product.birth_date}
            editor={(options) => Birth_date(options)}
            style={{ minWidth: "5rem" }}
          ></Column>
          {/* <Column
            sortable
            field="birth_date"
            header="Tháng tuổi"
            value={}
            editor={(options) => Birth_date(options)}
            style={{ minWidth: "5rem" }}
          ></Column> */}
          <Column
            sortable
            field="birth_weight"
            header="Cân nặng"
            value={product.birth_weight}
            editor={(options) => Birth_weight(options)}
            style={{ minWidth: "5rem" }}
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
        {/* <Paginator
          first={(currentPage - 1) * currentLimit}
          totalRecords={totalPages * currentLimit} // Assuming you set the correct total number of records here
          rows={currentLimit}
          rowsPerPageOptions={[5, 10, 20]}
          onPageChange={onPageChange}
        /> */}
        
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
            {product && <span>Bạn có chắc chắn xóa những con này?</span>}
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

        {/* Them va them tu dong */}

        <Dialog
          header="Thêm mới"
          style={{ width: "50%" }}
          visible={productDialog}
          onHide={() => setProductDialog(false)}
          modal
        >
          <Record_Create
            herdId={herdId}
            reloadData={reloadData}
            isUpdate={false}
          />
        </Dialog>

        <Dialog
          header="Thêm mới tự động"
          style={{ width: "20%" }}
          visible={productDialogNewAuto}
          onHide={() => setProductDialogNewAuto(false)}
          modal
        >
          <div>
            <h4 className="quantity_auto">Số lượng</h4>
            <InputText
              type="number"
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
              style={{ width: "100%", marginBottom: "2vh" }}
            />
          </div>
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
