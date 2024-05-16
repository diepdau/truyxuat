import React from 'react';
import DateConverter from "../../../components/Date/Date";

const YourComponent=({data,reloadData}) =>{
    // data.start_date.forEach((element) => {
    //     element.start_date = (
    //       <DateConverter originalDate={element.start_date} />
    //     );
    //   });
    return (
        <div className="grid">
            <div className="col-12 md:col-6 lg:col-3">
                <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Tên đàn</span>
                            <div className="text-900 font-medium text-xl">{data.name}</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-shopping-cart text-blue-500 text-xl"></i>
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">{data.start_date}</span>
                    <span className="text-500"> tạo</span>
                </div>
            </div>
            <div className="col-12 md:col-6 lg:col-3">
                <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Số lượng </span>
                            <div className="text-900 font-medium text-xl">{data.member_count} con</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-map-marker text-orange-500 text-xl"></i>
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">2</span>
                    <span className="text-500"> lần thu hoạch</span>
                </div>
            </div>
            <div className="col-12 md:col-6 lg:col-3">
                <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Trạng thái</span>
                            <div className="text-900 font-medium text-xl">{data.status}</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-cyan-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-inbox text-cyan-500 text-xl"></i>
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">14/1/2025</span>
                    <span className="text-500"> dự kiến ngày kết thúc</span>
                     
                </div>
            </div>
            <div className="col-12 md:col-6 lg:col-3">
                <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Điều trị</span>
                            <div className="text-900 font-medium text-xl">BM</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-purple-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-comment text-purple-500 text-xl"></i>
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">25/6/2024</span>
                    <span className="text-500"> kết thúc</span>
                </div>
            </div>
        </div>
    );
}

export default YourComponent;
