import { Paginator } from "primereact/paginator";
import React, { useState, useEffect } from "react";

export const PaginatorList = ({ setData, url }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchData();
  }, [currentPage, currentLimit]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `/${url}?limit=${currentLimit}&page=${currentPage}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if(url==="treatments")
      {
        setData(data.treatments);
      }
      if(url==="processors")
      {
        setData(data.processor);
      } if(url==="distributors")
      {
        setData(data.distributors);
      }
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const onPageChange = (event) => {
    setCurrentPage(+event.page + 1);
    setCurrentLimit(event.rows);
  };

  return (
    <div className="card">
      {totalPages > 0 && (
        <Paginator
          first={(currentPage - 1) * currentLimit}
          totalRecords={totalPages * currentLimit} // Assuming you set the correct total number of records here
          rows={currentLimit}
          rowsPerPageOptions={[5, 10, 20]}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};
