import React, { useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { Chart } from "primereact/chart";
import { Dropdown } from "primereact/dropdown";
import "./Statistical.css";

function Statistical() {
    const [selectedMonthYear, setSelectedMonthYear] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedTreatment, setSelectedTreatment] = useState(null);

    const months = [
        { label: "Tháng 1", value: "01" },
        { label: "Tháng 2", value: "02" },
        { label: "Tháng 3", value: "03" },
        { label: "Tháng 4", value: "04" },
        { label: "Tháng 5", value: "05" },
        { label: "Tháng 6", value: "06" },
        { label: "Tháng 7", value: "07" },
        { label: "Tháng 8", value: "08" },
        { label: "Tháng 9", value: "09" },
        { label: "Tháng 10", value: "10" },
        { label: "Tháng 11", value: "11" },
        { label: "Tháng 12", value: "12" },
    ];

    const products = [
        { label: "Thịt", value: "meat" },
        { label: "Len", value: "wool" },
        { label: "Sữa", value: "milk" },
    ];

    const treatments = [
        { label: "Thụ tinh nhân tạo", value: "artificial_insemination" },
        { label: "Thiến", value: "castration" },
        { label: "Khử sừng", value: "dehorning" },
        { label: "Nha khoa", value: "dental_procedure" },
        { label: "Tẩy giun", value: "deworming" },
        { label: "Bấm lỗ tai", value: "ear_notching" },
        { label: "An tử", value: "euthanasia" },
        { label: "Chải chuốt", value: "grooming" },
        { label: "Cắt móng", value: "hoof_trim" },
        { label: "Thuốc", value: "medication" },
        { label: "Ve", value: "mites" },
        { label: "Điều trị ký sinh trùng", value: "parasite_treatment" },
        { label: "Phẫu thuật", value: "surgical_procedure" },
        { label: "Gắn thẻ", value: "tagging" },
        { label: "Xăm hình", value: "tattoo" },
        { label: "Tiêm chủng", value: "vaccination" },
        { label: "Khác", value: "other_procedure" },
    ];

        const animalDataByMonth = {
            "01": [2000, 2100, 1200, 1500, 1800],
            "02": [200, 210, 120, 180, 240],
            "03": [300, 310, 220, 270, 330],
            "04": [400, 500, 300, 350, 450],
            "05": [250, 350, 150, 200, 300],
            "06": [450, 550, 350, 400, 500],
            "07": [300, 400, 200, 250, 350],
            "08": [500, 600, 400, 450, 550],
            "09": [350, 450, 250, 300, 400],
            "10": [400, 500, 300, 350, 450],
            "11": [450, 550, 350, 400, 500],
            "12": [500, 600, 400, 600, 400],
    };

    const productData = {
        meat: [300, 200, 250,220, 20],
        milk: [400, 350, 300, 200, 250],
        wool: [100, 150, 120,350, 300],
    };

    const treatmentData = {
        artificial_insemination: [100, 200, 150, 200, 150],
        castration: [300, 400, 250, 200, 150],
        dehorning: [2000, 4000, 1500, 200, 150],
        dental_procedure: [500, 700, 300, 200, 150],
        deworming: [800, 1200, 600, 200, 150],
        ear_notching: [300, 500, 200, 200, 150],
        euthanasia: [100, 200, 50, 200, 150],
        grooming: [150, 300, 100, 200, 150],
        hoof_trim: [400, 600, 350, 200, 150],
        medication: [600, 800, 400, 200, 150],
        mites: [200, 300, 150, 200, 150],
        parasite_treatment: [700, 1000,  200, 150,500],
        surgical_procedure: [100,  200, 150,150, 80],
        tagging: [500, 200, 150, 700, 300],
        tattoo: [200, 150,50, 100, 70],
        vaccination: [ 200, 150,900, 1200, 800],
        other_procedure: [100, 150, 200, 150,100],
    };
    const convertAnimalDataToFarmData = (animalData) => {
        const farmCount = animalData["01"].length; // Số lượng trang trại (dựa vào tháng đầu tiên)
        const farmLabels = [
            "Lạc Dương, Lâm Đồng",
            "Trang trại An Hòa",
            "Trang trại Đại Phú, Bảo Lộc",
            "Trang trại Thiên Sơn, Đà Lạt",
            "Trang trại Bình Minh, Đức Trọng",
        ];
    
        // Chuyển đổi dữ liệu: Mỗi trang trại là một key chứa dữ liệu qua các tháng
        const farmData = farmLabels.reduce((result, label, index) => {
            result[label] = Object.keys(animalData).map((month) => animalData[month][index]);
            return result;
        }, {});
    
        return farmData;
    };
    
    const farmDataByMonth = convertAnimalDataToFarmData(animalDataByMonth);
    
    
    const monthsLabels = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"];
    const getLineChartData = () => {
        return {
            labels: monthsLabels,
            datasets: Object.keys(farmDataByMonth).map((farm, index) => ({
                label: farm,
                data: farmDataByMonth[farm],
                fill: false,
                borderColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"][index], // Màu sắc cho từng đường
                tension: 0.4, 
            })),
        };
    };
    
    
    const getChartData = (labels, data, label) => {
        return {
            labels,
            datasets: [
                {
                    label,
                    backgroundColor: "#42A5F5",
                    data,
                },
            ],
        };
    };

    const farmLabels = [
        "Lạc Dương, Lâm Đồng",
        "Trang trại An Hòa",
        "Trang trại Đại Phú, Bảo Lộc",
        "Trang trại Thiên Sơn, Đà Lạt",
        "Trang trại Bình Minh, Đức Trọng",
        "Lạc Dương, Lâm Đồng",
        "Trang trại An Hòa",
        "Trang trại Đại Phú, Bảo Lộc",
        "Trang trại Thiên Sơn, Đà Lạt",
        "Trang trại Bình Minh, Đức Trọng"
    ];
    
    const getMinMaxComment = (labels, data) => {
        const max = Math.max(...data);
        const min = Math.min(...data);
    
        const maxLabel = labels[data.indexOf(max)];
        const minLabel = labels[data.indexOf(min)];
    
        return {
            maxLabel,
            maxValue: max,
            minLabel,
            minValue: min,
        };
    };
    const productDataByFarm = Object.keys(productData).reduce((result, product) => {
        // Chia dữ liệu của từng sản phẩm đều cho các trang trại
        const productValues = productData[product];
        productValues.forEach((value, index) => {
            if (!result[farmLabels[index]]) {
                result[farmLabels[index]] = {};
            }
            result[farmLabels[index]][product] = value;
        });
        return result;
    }, {});
    const getProductComparisonChartData = () => {
        const productLabels = Object.keys(productData); // ["meat", "milk", "wool"]
    
        return {
            labels: farmLabels,
            datasets: productLabels.map((product, index) => ({
                label: product.charAt(0).toUpperCase() + product.slice(1), // Capitalize tên sản phẩm
                data: farmLabels.map((farm) => productDataByFarm[farm][product]),
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"][index], // Màu sắc cho từng sản phẩm
            })),
        };
    };
    const convertTreatmentDataToMonthly = (treatmentData) => {
        const treatmentTypes = Object.keys(treatmentData); // Các loại điều trị
        const numFarms = farmLabels.length; // Số trang trại
    
        // Tạo dữ liệu giả định số lượng điều trị được chia đều cho 12 tháng
        const result = treatmentTypes.reduce((acc, treatment) => {
            acc[treatment] = farmLabels.map(() => {
                const monthlyData = Array(12).fill(0);
                const total = treatmentData[treatment].reduce((a, b) => a + b, 0);
                const perMonth = Math.floor(total / 12);
    
                for (let i = 0; i < 12; i++) {
                    monthlyData[i] = perMonth; // Phân phối đều theo tháng
                }
                return monthlyData;
            });
            return acc;
        }, {});
        return result;
    };
    
    const treatmentDataByMonth = convertTreatmentDataToMonthly(treatmentData);
    const getTreatmentLineChartData = () => {
        const treatmentTypes = Object.keys(treatmentData); // Các loại điều trị
    
        return {
            labels: monthsLabels, // Các tháng (Tháng 1 -> Tháng 12)
            datasets: treatmentTypes.map((treatment, index) => ({
                label: treatment.replace(/_/g, " ").charAt(0).toUpperCase() + treatment.slice(1), // Capitalize tên điều trị
                data: treatmentDataByMonth[treatment][0], // Chọn dữ liệu theo trang trại (nếu cần tùy chỉnh)
                fill: false,
                borderColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"][index % 5], // Màu sắc khác nhau
                tension: 0.4, // Đường cong mượt mà
            })),
        };
    };
    
    return (
        <div className="card container">
            <TabView className="tabview">
                <TabPanel header="TK số lượng">
                    <div>
                        <label htmlFor="monthYear">Chọn tháng:</label>
                        <Dropdown
                            id="monthYear"
                            value={selectedMonthYear}
                            options={months}
                            onChange={(e) => setSelectedMonthYear(e.value)}
                            placeholder="Chọn tháng"
                        />
                        <div className="card" >
                            
                        {selectedMonthYear && (
                            <>
                                <Chart
                                    type="bar"
                                    data={getChartData(
                                        farmLabels,
                                        animalDataByMonth[selectedMonthYear],
                                        "Số lượng động vật"
                                    )}
                                />
                                <div className="comments">
                                    {(() => {
                                        const { maxLabel, maxValue, minLabel, minValue } = getMinMaxComment(
                                            farmLabels,
                                            animalDataByMonth[selectedMonthYear]
                                        );
                                        return (
                                            <p>
                                                Trang trại có số lượng động vật nhiều nhất là <strong>{maxLabel}</strong> với <strong>{maxValue}</strong> con. 
                                                <br></br>Trang trại ít nhất là <strong>{minLabel}</strong> với <strong>{minValue}</strong> con.
                                            </p>
                                        );
                                    })()}
                                </div>
                            </>
                        )}

                        </div>
                    </div>
                </TabPanel>
                <TabPanel header="TK sản phẩm">
                    <div>
                        <label htmlFor="product">Chọn sản phẩm:</label>
                        <Dropdown
                            id="product"
                            value={selectedProduct}
                            options={products}
                            onChange={(e) => setSelectedProduct(e.value)}
                            placeholder="Chọn sản phẩm"
                        />
                        <div className="card" >
                        {selectedProduct && (
                        <>
                            <Chart
                                type="bar"
                                data={getChartData(
                                    farmLabels,
                                    productData[selectedProduct],
                                    `Số lượng ${selectedProduct}`
                                )}
                            />
                            <div className="comments">
                                {(() => {
                                    const { maxLabel, maxValue, minLabel, minValue } = getMinMaxComment(
                                        farmLabels,
                                        productData[selectedProduct]
                                    );
                                    return (
                                        <p>
                                            Trang trại sản xuất nhiều <strong>{selectedProduct}</strong> nhất là <strong>{maxLabel}</strong> với <strong>{maxValue}</strong> đơn vị. 
                                            <br></br> Ít nhất là <strong>{minLabel}</strong> với <strong>{minValue}</strong> đơn vị.
                                        </p>
                                    );
                                })()}
                            </div>
                        </>
                    )}

                        </div>
                    </div>
                </TabPanel>
                <TabPanel header="TK số lượng điều trị">
                    <div>
                        <label htmlFor="treatment">Chọn loại điều trị:</label>
                        <Dropdown
                            id="treatment"
                            value={selectedTreatment}
                            options={treatments}
                            onChange={(e) => setSelectedTreatment(e.value)}
                            placeholder="Chọn loại điều trị"
                        />
                        <div className="card" >
                        {selectedTreatment && (
                        <>
                            <Chart
                                type="bar"
                                data={getChartData(
                                    farmLabels,
                                    treatmentData[selectedTreatment],
                                    `Số lượng ${selectedTreatment.replace(/_/g, " ")}`
                                )}
                            />
                            <div className="comments">
                                {(() => {
                                    const { maxLabel, maxValue, minLabel, minValue } = getMinMaxComment(
                                        farmLabels,
                                        treatmentData[selectedTreatment]
                                    );
                                    return (
                                        <p>
                                            Trang trại có số lượng điều trị <strong>{selectedTreatment.replace(/_/g, " ")}</strong> nhiều nhất là <strong>{maxLabel}</strong> với <strong>{maxValue}</strong> ca. 
                                           <br></br> Ít nhất là <strong>{minLabel}</strong> với <strong>{minValue}</strong> ca.
                                        </p>
                                    );
                                })()}
                            </div>
                        </>
                            )}

                        </div>
                    </div>
                </TabPanel>
                <TabPanel header="SS số lượng">
                    <div className="card">
                        <Chart type="line" data={getLineChartData()} />
                    </div>
                </TabPanel>
                <TabPanel header="SS sản phẩm">
                    <div className="card">
                        <Chart type="bar" data={getProductComparisonChartData()} />
                    </div>
                </TabPanel>
                <TabPanel header="SS loại điều trị">
                    <div className="card">
                        <Chart type="line" data={getTreatmentLineChartData()} />
                    </div>
                </TabPanel>


            </TabView>
        </div>
    );
}
export default Statistical;
