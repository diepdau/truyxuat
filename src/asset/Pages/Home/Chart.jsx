// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Chart } from "primereact/chart";
// import "./Home.css";

// const FarmProduct = ({ reloadData }) => {
//   const [herds, setHerds] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchHerds = async () => {
//       try {
//         const response = await axios.get("https://agriculture-traceability.vercel.app/api/v1/herds?limit=50");
//         setHerds(response.data.herds);
//         setLoading(false);
//       } catch (error) {
//         console.log("Error fetching herds:", error);
//       }
//     };

//     fetchHerds();
//   }, []);

//   useEffect(() => {
//     if (!loading && herds) {
//       const data = {
//         labels: herds.map((herd) => herd.name),
//         datasets: [
//           {
//             data: herds.map((herd) => herd.member_count),
//             backgroundColor: ["#5092de", "#dbc267", "#63c078", "#c07e52"], // Example colors
//             hoverBackgroundColor: ["#5092de", "#dbc267", "#63c078", "#c07e52"], // Example colors
//           },
//         ],
//       };
//       setChartData(data);
//     }
//   }, [herds, loading]);

//   const [chartData, setChartData] = useState({});

//   const chartOptions = {
//     plugins: {
//       legend: {
//         labels: {
//           usePointStyle: true,
//         },
//       },
//     },
//   };
//   return (
//     <div>
//       <div className="card flex justify-content-center">
//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           <>
//             <h5>Biểu đồ số lượng</h5>
//             <div className="chart-container">
//               <Chart
//                 type="pie"
//                 data={chartData}
//                 options={chartOptions}
//                 className="w-50% md:w-20rem"
//               />
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FarmProduct;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Chart } from "primereact/chart";
import "./Home.css";

const FarmProduct = () => {
  const [herds, setHerds] = useState([]);
  const [chartData, setChartData] = useState({});
  const [viewMode, setViewMode] = useState("byAnimal"); // Chế độ xem (byAnimal / byMonth)
  const [selectedAnimal, setSelectedAnimal] = useState(null); // Con vật được chọn
  const [selectedMonth, setSelectedMonth] = useState(null); // Tháng được chọn
  const [loading, setLoading] = useState(true);

  const months = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"];

  useEffect(() => {
    const fetchHerds = async () => {
      try {
        const response = await axios.get("https://agriculture-traceability.vercel.app/api/v1/herds?limit=50");
        setHerds(response.data.herds);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching herds:", error);
      }
    };

    fetchHerds();
  }, []);

  const handleAnimalClick = (animal) => {
    setSelectedAnimal(animal);
    setSelectedMonth(null); // Reset tháng khi chuyển chế độ
    setViewMode("byAnimal");

    // Tạo dữ liệu số lượng con theo từng tháng
    const mockData = {
      "Tháng 1": Math.floor(Math.random() * 100),
      "Tháng 2": Math.floor(Math.random() * 100),
      "Tháng 3": Math.floor(Math.random() * 100),
      "Tháng 4": Math.floor(Math.random() * 100),
      "Tháng 5": Math.floor(Math.random() * 100),
      "Tháng 6": Math.floor(Math.random() * 100),
      "Tháng 7": Math.floor(Math.random() * 100),
      "Tháng 8": Math.floor(Math.random() * 100),
      "Tháng 9": Math.floor(Math.random() * 100),
      "Tháng 10": Math.floor(Math.random() * 100),
      "Tháng 11": Math.floor(Math.random() * 100),
      "Tháng 12": Math.floor(Math.random() * 100),
    };

    setChartData({
      labels: Object.keys(mockData),
      datasets: [
        {
          label: `Số lượng (${animal})`,
          data: Object.values(mockData),
          borderColor: "#42A5F5",
          backgroundColor: "rgba(66, 165, 245, 0.2)",
          fill: true,
        },
      ],
    });
  };

  const handleMonthClick = (month) => {
    setSelectedMonth(month);
    setSelectedAnimal(null); // Reset con vật khi chuyển chế độ
    setViewMode("byMonth");

    // Tạo dữ liệu so sánh các con vật trong tháng
    const mockData = herds.map((herd) => ({
      animal: herd.name,
      count: Math.floor(Math.random() * 100),
    }));

    setChartData({
      labels: mockData.map((item) => item.animal),
      datasets: [
        {
          label: `Số lượng (${month})`,
          data: mockData.map((item) => item.count),
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        },
      ],
    });
  };

  const chartOptions = {
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <div className="card flex justify-content-center">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <h4>Biểu đồ số lượng con vật</h4>

            {/* Chọn con vật */}
            <div className="button-container">
              <h4>Chọn con vật:</h4>
              {herds.map((herd) => (
                <button
                  key={herd.name}
                  className={`animal-button ${selectedAnimal === herd.name ? "active" : ""}`}
                  onClick={() => handleAnimalClick(herd.name)}
                >
                  {herd.name}
                </button>
              ))}
            </div>

            {/* Chọn tháng */}
            <div className="button-container">
              <h4>Chọn tháng:</h4>
              {months.map((month, index) => (
                <button
                  key={index}
                  className={`month-button ${selectedMonth === month ? "active" : ""}`}
                  onClick={() => handleMonthClick(month)}
                >
                  {month}
                </button>
              ))}
            </div>

            <div className="card">
              <Chart
                type={viewMode === "byAnimal" ? "line" : "bar"} // Line chart cho chế độ byAnimal, Bar chart cho chế độ byMonth
                data={chartData}
                options={chartOptions}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FarmProduct;
