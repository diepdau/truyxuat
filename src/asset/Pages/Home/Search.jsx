import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import axios from "axios";

function YourComponent({ data }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getHerd();
  }, [search]); // Đảm bảo useEffect được gọi lại mỗi khi search thay đổi

  const getHerd = async () => {
    try {
      const res = await axios.get(`/herds?searchQuery=${search}`);
      setProducts(res.data.herds);
      console.log(res.data.herds);
      console.log(products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Manage Herds</h4>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  );
}

export default YourComponent;
