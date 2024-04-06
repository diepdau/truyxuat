import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import axios from 'axios';

export default function BasicDemo() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/harvests?limit=29");
                const harvests = response.data.harvests;

                // Tạo mảng chứa các nhãn (labels) và dữ liệu (data) cho biểu đồ
                const labels = [];
                const data = [];

                // Lặp qua mỗi mục trong mảng harvests và thêm nhãn và dữ liệu tương ứng
                harvests.forEach((harvest) => {
                    labels.push(harvest.herd.name); // Nhãn là tên của đàn (herd)
                    data.push(harvest.quantity); // Dữ liệu là số lượng (quantity)
                });

                // Định dạng dữ liệu cho biểu đồ
                const chartData = {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Số lượng', // Nhãn cho dữ liệu
                            data: data, // Dữ liệu số lượng
                            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Màu nền cho cột
                            borderColor: 'rgba(75, 192, 192, 1)', // Màu viền cho cột
                            borderWidth: 1 // Độ rộng viền cho cột
                        }
                    ]
                };

                // Định dạng tùy chọn cho biểu đồ
                const chartOptions = {
                    scales: {
                        y: {
                            beginAtZero: true // Bắt đầu từ 0 trên trục y
                        }
                    }
                };

                // Cập nhật trạng thái của biểu đồ và tùy chọn
                setChartData(chartData);
                setChartOptions(chartOptions);
            } catch (error) {
                console.log("Error fetching data:", error);
            }
        };

        // Gọi hàm fetchData để lấy dữ liệu từ server khi component được render
        fetchData();
    }, []);

    return (
        <div className="card">
             <h5>Biểu đồ tổng số lượng theo đàn</h5>
            <Chart type="bar" data={chartData} options={chartOptions} />
        </div>
    )
}
