import React, { useEffect, useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { useLocation } from "react-router-dom";
import Infor_Herd from "./Infor_Herd.jsx";
import RecordsList from "./RecordsList.jsx";
import CultivationLogs_Herd from "../CultivationLogs/CultivationLogs_Herd.jsx";
import Treatments from "../Treatments/Treatments.jsx";
import "./HerdsList.css";
import axios from "axios";
import Harvest from "../Harvest/Harvest.jsx";

export default function BasicDemo() {
  const [formData, setFormData] = useState({});
  const location = useLocation();
  const herdId = location.pathname.split("/")[2];
  const getHerd = async () => {
    try {
      const res = await axios.get(`/herds/${herdId}`);
      setFormData(res.data.herd);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getHerd();
  }, [formData]);
  const reloadData123 = () => {
    getHerd();
  };
  return (
    <div className="card card_herd">
      <TabView>
        <TabPanel header="Thông tin">
          <Infor_Herd  data={formData}  reloadData={reloadData123}  isUpdate={true}/>
        </TabPanel>
        <TabPanel header="Danh sách con">
          <RecordsList herdId={herdId} />
        </TabPanel>
        <TabPanel header="Nhật kí chăm sóc">
          <CultivationLogs_Herd idherd={herdId} />
        </TabPanel>
        <TabPanel header="Thu hoạch">
          <Harvest  isherdharvest={herdId}
          />
        </TabPanel>
        <TabPanel header="Điều trị">
          <Treatments idherd={herdId} />
        </TabPanel>
      </TabView>
    </div>
  );
}
