import { useState } from "react";
import { InputText } from "primereact/inputtext";

export const SearchBar = ({ setResults, isSearch }) => {
  const [input, setInput] = useState("");
  const fetchData = async (value) => {
    try {
      const response = await fetch(
        `https://agriculture-traceability.vercel.app/api/v1/products?limit=5&page=1&searchQuery=${encodeURIComponent(
          value
        )}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setResults(data.products);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
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
};
