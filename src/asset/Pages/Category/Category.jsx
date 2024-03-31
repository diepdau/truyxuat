import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Category.css";
import { Button } from "primereact/button";
import axios from "axios";
import { Galleria } from "primereact/galleria";
import { useForm } from "react-hook-form";
const initFormValue = {
  _id: null,
  name: "",
  slug: "",
  description: "",
};
export default function User() {
  const [user, setuser] = useState([]);
  const [formValue, setFormValue] = useState(initFormValue);
  const location = useLocation();
  const userId = location.pathname.split("/")[2];

  useEffect(() => {
    const getCategory = async () => {
      console.log(userId);
      try {
        if (userId) {
          const res = await axios.get(`/categories/${userId}`);
          console.log("lấy 1 Category thanh cong");
          setuser(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
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
    try {
      const res = await axios.patch(`/categories/${userId}`, {
        name: formValue.name,
        slug: formValue.slug,
        description: formValue.description,
      });
      console.log("Sửa thanh cong");
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
        `/categories/upload/${userId}`,
        formData
      );
      console.log("Product updated img successfully:", responseImg.data);
      alert("Chỉnh sửa thành công!");
    } catch (error) {
      console.log("Error updating product:", error);
    }
  };

  return (
    <div className="user">
      {user && Object.keys(user).length > 0 && (
        <>
          <div className="userUpdate card">
            <span className="userUpdateTitle">Chỉnh sửa</span>
            <form className="userUpdateForm" onSubmit={handleSubmitUpdate}>
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Tên</label>
                  <input
                    type="text"
                    name="name"
                    placeholder={user.category.name}
                    className="userUpdateInput"
                    value={formValue.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Slug</label>
                  <input
                    type="text"
                    name="slug"
                    placeholder={user.category.slug}
                    className="userUpdateInput"
                    value={formValue.slug}
                    onChange={handleChange}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>description</label>
                  <input
                    type="text"
                    name="description"
                    placeholder={user.category.description}
                    className="userUpdateInput"
                    value={formValue.description}
                    onChange={handleChange}
                  />
                </div>
                {/* <Galleria
                  className="image1"
                  value={user.category.image}
                  numVisible={5}
                  style={{ maxWidth: "600px" }}
                  item={thumbnail}
                  thumbnail={thumbnailTemplate}
                /> */}
                <img
                  className="image1"
                  src={user.category.image}
                  alt="Hình ảnh"
                  style={{ maxWidth: "600px" }}
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
              <div className="userUpdateRight">
                <Button
                  type="submit"
                  className="userUpdateButton"
                  label="Chỉnh sửa"
                  severity="success"
                  raised
                />
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
