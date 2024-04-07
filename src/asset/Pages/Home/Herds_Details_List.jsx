import React, { useState, useEffect } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { useLocation } from "react-router-dom";
import Infor_Herd from "./Infor_Herd.jsx";
import RecordsList from "./RecordsList.jsx";
import Harvest_Update from "../Harvest/Harvest_Update.jsx";
import CultivationLogs_Herd from "../CultivationLogs/CultivationLogs_Herd.jsx";
import Treatments from "../Treatments/Treatments.jsx";
import axios from "axios";
import "./HerdsList.css";

export default function BasicDemo() {
  const [formData, setFormData] = useState();
  const location = useLocation();
  const herdId = location.pathname.split("/")[2];
  useEffect(() => {
    getHerd();
  }, []);
  const reloadData = () => {
    // eslint-disable-next-line no-undef
    getHerd();
  };
  const getHerd = async () => {
    try {
      const res = await axios.get(`/herds/${herdId}`);
      setFormData(res.data.herd);
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div className="card card_herd">
      <TabView>
        <TabPanel header="Thông tin">
          {/* eslint-disable-next-line react/jsx-pascal-case */}
          <Infor_Herd
          idherd={herdId}
            data={formData}
            isUpdate={true}
            reloadData={reloadData}
          />
        </TabPanel>
        <TabPanel header="Danh sách con">
          <RecordsList herdId={herdId} />
        </TabPanel>
        <TabPanel header="Nhật kí chăm sóc">
          <CultivationLogs_Herd idherd={herdId} />
        </TabPanel>
        <TabPanel header="Thu hoạch">
          <Harvest_Update idherd={herdId} />
        </TabPanel>
        <TabPanel header="Điều trị">
          <Treatments idherd={herdId} />
        </TabPanel>
      </TabView>
    </div>
  );
}
