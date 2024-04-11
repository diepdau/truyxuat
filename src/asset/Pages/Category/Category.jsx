import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Category.css";
import { Button } from "primereact/button";
import axios from "axios";
import ImageUploader from "../../../components/Images/Image";
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
                <ImageUploader uploadUrl={`/categories/upload/${userId}`} images={user.category.images}/>
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
