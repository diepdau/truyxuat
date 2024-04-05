import React from 'react'; 
import { TabView, TabPanel } from 'primereact/tabview';
import { useLocation } from "react-router-dom";
import Infor_Herd from "./Infor_Herd";
import RecordsList from "./RecordsList.jsx";

import CultivationLogs_Herd from "../CultivationLogs/CultivationLogs_Herd.jsx";


export default function BasicDemo() {
    const location = useLocation();
    const herdId = location.pathname.split("/")[2];
   
    return (
        <div className="card">
            <TabView>
                <TabPanel header="Thông tin">
                <Infor_Herd idherd={herdId}/>
                </TabPanel>
                <TabPanel header="Danh sách con">
                <RecordsList herdId={herdId} />
                </TabPanel>
                <TabPanel header="Nhật kí chăm sóc">
                <CultivationLogs_Herd idherd={herdId} />
                </TabPanel>
            </TabView>
        </div>
    )
}
        