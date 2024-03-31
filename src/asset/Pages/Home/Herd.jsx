import { useEffect, useState, useContext,useRef } from "react";
import { useLocation } from "react-router-dom";
import "../Category/Category.css";
import { Button } from "primereact/button";
import axios from "axios";
import { Galleria } from "primereact/galleria";
import { useForm } from "react-hook-form";
import { Dialog } from "primereact/dialog";
import { useNavigate } from "react-router-dom";
import { HerdsContext } from "../../service/Herd_data.js";
import { Dropdown } from "primereact/dropdown";
import RecordsList from "./RecordsList.jsx";
const initFormValue = {
  _id: null,
  name: "",
  member_count: 0,
  category: {
    _id: "",
    name: "",
  },
  description: "",
  quantity: 0,
  farm: {
    _id: "",
    name: "",
  },
  start_date: "",
  location: "",
};
export default function User() {
  const toast = useRef(null);
  const [user, setuser] = useState([]);
  const [formValue, setFormValue] = useState(initFormValue);
  const location = useLocation();
  const [categories, setcategories] = useState([]);
  const [farm, setfarm] = useState([]);
  const [selectedRole, setSelectedRole] = useState(initFormValue.category);
  const [selectedfarm, setSelectedfarm] = useState(initFormValue.farm);
  const userId = location.pathname.split("/")[2];
  const { handleGetCategory, handleGetFarm } = useContext(HerdsContext);
  const navigate = useNavigate();
  useEffect(() => {
    const getCategory = async () => {
      try {
        if (userId) {
          const res = await axios.get(`/herds/${userId}`);
          setuser(res.data.herd);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const fetchDataCategory = async () => {
      const categoryList = await handleGetCategory();
      setcategories(categoryList);
    };
    const fetchDataFarm = async () => {
      const farmList = await handleGetFarm();
      setfarm(farmList);
    };
    fetchDataFarm();
    fetchDataCategory();
    getCategory();
  }, []);

  const handleChange = (event) => {
    const { value, name } = event.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };
  const handleSubmitUpdate = async (event) => {
    event.preventDefault();
    try { await axios.patch(`/herds/${userId}`, {
        name: formValue.name,
        description: formValue.description,
        member_count: formValue.member_count,
        quantity: formValue.quantity,
        location: formValue.location,
        start_date: formValue.quantity,
        categoryId: selectedRole._id._id,
        farmId: selectedfarm._id._id,
      });
      toast.current.show({severity: "success", summary: "Sửa hoàn thành",life: 3000, });
    } catch (error) {
      console.log(error);
    }
  };
  const { register, handleSubmit } = useForm();
  const upLoadImage = async (data) => {
    const formData = new FormData();
    for (const file of data.file) {
      formData.append("images", file);
    }
    try {
      const responseImg = await axios.patch(
        `/herds/upload/${userId}`,
        formData
      );
      console.log("Product updated img successfully:", responseImg.data);
      alert("Chỉnh sửa thành công!");
    } catch (error) {
      console.log("Error ", error);
    }
  };
  //Lấy hình ảnh
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
  const [qrCodeDialogVisible, setQrCodeDialogVisible] = useState(false);

  return (
    <div className="user">
      {user && Object.keys(user).length > 0 && (
        <>
          <div className="userUpdate card">
            <span className="userUpdateTitle">Thông tin {user.name}</span>
            <form className="userUpdateForm" onSubmit={handleSubmitUpdate}>
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Tên</label>
                  <input
                    type="text"
                    name="name"
                    placeholder={user.name}
                    className="userUpdateInput"
                    value={formValue.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Số lượng</label>
                  <input
                    type="text"
                    name="member_count"
                    placeholder={user.member_count}
                    className="userUpdateInput"
                    value={formValue.member_count}
                    onChange={handleChange}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Mô tả</label>
                  <input
                    type="text"
                    name="description"
                    placeholder={user.description}
                    className="userUpdateInput"
                    value={formValue.description}
                    onChange={handleChange}
                  />
                </div>

                <div className="userUpdateItem">
                  <label>Quantity</label>
                  <input
                    type="text"
                    name="quantity"
                    placeholder={user.quantity}
                    className="userUpdateInput"
                    value={formValue.quantity}
                    onChange={handleChange}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Vị trí</label>
                  <input
                    type="text"
                    name="location"
                    placeholder={user.location}
                    className="userUpdateInput"
                    value={formValue.location}
                    onChange={handleChange}
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
                  <label>farm</label>
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
                  <label>Start day</label>
                  <input
                    type="text"
                    name="start_date"
                    placeholder={user.start_date}
                    className="userUpdateInput"
                    value={formValue.start_date}
                    onChange={handleChange}
                  />
                </div>

                <div className="userUpdateItem">
                  <label>Hình ảnh</label>
                  
                    <Galleria
                      className="image1"
                      value={user.images}
                      numVisible={5}
                      style={{ maxWidth: "600px" }}
                      item={thumbnail}
                      thumbnail={thumbnailTemplate}
                    />
                    <div className="card updateimage">
                      <form
                        encType="multipart/formdata"
                        onSubmit={handleSubmit(upLoadImage)}
                      >
                        <input type="file" multiple {...register("file")} />
                        <input type="submit" />
                      </form>
                    </div>
                </div>

                <Button
                  type="submit"
                  className="userUpdateButton"
                  label="Chỉnh sửa"
                  severity="success"
                  raised
                />
                <Button
                  severity="success"
                  label="QR Code"
                  onClick={() => setQrCodeDialogVisible(true)}
                />
              </div>
            </form>
          </div>
        </>
      )}
      <Dialog
        visible={qrCodeDialogVisible}
        onHide={() => setQrCodeDialogVisible(false)}
      >
        <h3>Mã QR</h3>
        <div style={{ textAlign: "center" }}>
          <img
            src={user?.qrcode}
            style={{ height: "200px" }}
            alt="Product QR Code"
          />
        </div>
      </Dialog>
      <RecordsList/>
    </div>
  );
}
