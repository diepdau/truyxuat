// import React, { useState, useEffect } from "react";
// import { Chart } from "primereact/chart";
// import axios from "axios";
// import "./Harvest.css";
// export default function BasicDemo() {
//   const [chartData, setChartData] = useState({});
//   const [chartOptions, setChartOptions] = useState({});

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("https://agriculture-traceability.vercel.app/api/v1/harvests?limit=100");
//         const harvests = response.data.harvests;

//         // Tính tổng số lượng sản phẩm theo tên
//         const productTotals = {};
//         harvests.forEach((harvest) => {
//           const productName = harvest.name;
//           const quantity = harvest.quantity;
//           if (productTotals[productName]) {
//             productTotals[productName] += quantity;
//           } else {
//             productTotals[productName] = quantity;
//           }
//         });

//         // Tạo mảng chứa các nhãn (labels) và dữ liệu (data) cho biểu đồ theo tên sản phẩm
//         const labels = Object.keys(productTotals);
//         const data = Object.values(productTotals);

//         // Định dạng dữ liệu cho biểu đồ
//         const chartData = {
//           labels: labels,
//           datasets: [
//             {
//               label: "Số lượng", // Nhãn cho dữ liệu
//               data: data, // Dữ liệu số lượng
//               backgroundColor: "rgba(75, 192, 192, 0.2)", // Màu nền cho cột
//               borderColor: "rgba(75, 192, 192, 1)", // Màu viền cho cột
//               borderWidth: 1, // Độ rộng viền cho cột
//             },
//           ],
//         };

//         // Định dạng tùy chọn cho biểu đồ
//         const chartOptions = {
//           scales: {
//             y: {
//               beginAtZero: true, // Bắt đầu từ 0 trên trục y
//             },
//           },
//         };

//         // Cập nhật trạng thái của biểu đồ và tùy chọn
//         setChartData(chartData);
//         setChartOptions(chartOptions);
//       } catch (error) {
//         console.log("Error fetching data:", error);
//       }
//     };
//     // Gọi hàm fetchData để lấy dữ liệu từ server khi component được render
//     fetchData();
//   }, []);

//   return (
//     <div>
//       <div className="card">
//         <h5>Biểu đồ tổng số lượng sản phẩm</h5>
//         <div className="card chart-container">
//           <Chart type="bar" data={chartData} options={chartOptions} />
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { Dropdown } from "primereact/dropdown"; 
import "./Harvest.css";

export default function BasicDemo() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]); // Danh sách sản phẩm
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const mockData = {
    "Sữa dê": {
      "Tháng 1": 120, "Tháng 2": 150, "Tháng 3": 170,
      "Tháng 4": 140, "Tháng 5": 160, "Tháng 6": 80,
      "Tháng 7": 2, "Tháng 8": 20, "Tháng 9": 240,
      "Tháng 10": 60, "Tháng 11": 280, "Tháng 12": 30,
    },
    "Da": {
      "Tháng 1": 80, "Tháng 2": 95, "Tháng 3": 110,
      "Tháng 4": 90, "Tháng 5": 105, "Tháng 6": 115,
      "Tháng 7": 125, "Tháng 8": 130, "Tháng 9": 35,
      "Tháng 10": 40, "Tháng 11": 10, "Tháng 12": 160,
    },
    "Lông": {
      "Tháng 1": 200, "Tháng 2": 220, "Tháng 3": 240,
      "Tháng 4": 230, "Tháng 5": 20, "Tháng 6": 270,
      "Tháng 7": 300, "Tháng 8": 30, "Tháng 9": 140,
      "Tháng 10": 360, "Tháng 11": 80, "Tháng 12": 400,
    },
    "Thịt cừu": {
      "Tháng 1": 50, "Tháng 2": 60, "Tháng 3": 70,
      "Tháng 4": 85, "Tháng 5": 75, "Tháng 6": 85,
      "Tháng 7": 90, "Tháng 8": 95, "Tháng 9": 100,
      "Tháng 10": 105, "Tháng 11": 110, "Tháng 12": 120,
    },
    "Thịt vai": {
      "Tháng 1": 50, "Tháng 2": 60, "Tháng 3": 70,
      "Tháng 4": 65, "Tháng 5": 75, "Tháng 6": 15,
      "Tháng 7": 90, "Tháng 8": 95, "Tháng 9": 100,
      "Tháng 10": 15, "Tháng 11": 10, "Tháng 12": 120,
    },
    "Thịt đùi": {
      "Tháng 1": 50, "Tháng 2": 60, "Tháng 3": 70,
      "Tháng 4": 65, "Tháng 5": 75, "Tháng 6": 85,
      "Tháng 7": 90, "Tháng 8": 95, "Tháng 9": 100,
      "Tháng 10": 105, "Tháng 11": 110, "Tháng 12": 120,
    },
  };
  

  useEffect(() => {
    const productNames = Object.keys(mockData);
    setProducts(productNames);

    setChartOptions({
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    });
  }, []);

  const handleProductChange = (product) => {
    setSelectedProduct(product);

    const productData = mockData[product];
    const labels = Object.keys(productData); 
    const data = Object.values(productData); 

    setChartData({
      labels: labels,
      datasets: [
        {
          label: `Số lượng (${product})`, 
          data: data, 
          backgroundColor: "rgba(75, 192, 192, 0.2)", 
          borderColor: "rgba(75, 192, 192, 1)", 
          borderWidth: 1,
        },
      ],
    });
  };

  return (
    <div>
      <div className="card">
        <h4>Biểu đồ số lượng thu hoạch theo sản phẩm</h4>

        {/* <div className="dropdown-container">
          <Dropdown
            value={selectedProduct}
            options={products}
            onChange={(e) => handleProductChange(e.value)}
            placeholder="Chọn sản phẩm"
          />
        </div> */}
         <div className="button-container">
          {products.map((product, index) => (
            <button
              key={index}
              className={`product-button ${selectedProduct === product ? "active" : ""}`}
              onClick={() => handleProductChange(product)}
            >
              {product}
            </button>
          ))}
        </div>

        {selectedProduct && (
          <div className="card chart-container">
            <Chart type="bar" data={chartData} options={chartOptions} />
          </div>
        )}
      </div>
    </div>
  );
}
