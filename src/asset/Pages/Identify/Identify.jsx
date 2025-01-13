import Card from "../../../components/Card/Card";
import { TabView, TabPanel } from "primereact/tabview";
import MonitoringHistory from "../MonitoringHistory/MonitoringHistory"
import CardDetectPeople from "../DetectPeople/DetectPeople"
import './Identify.css'

const advertisements = [
  {
    id:1,
    name: "Phát hiện con vật",
    imageUrl: ["https://i.ytimg.com/vi/amfztdpl0ki/hq720.jpg?sqp=-oaymwe7ck4feiidsfryq4qpay0iaruaaaaagaelaadiqj0agkjd8aeb-ah-cyac0awkagwiababggugxihjma8=&rs=aon4cla3ibghbdntd0lffj73yn_zicdhba"],
    linkUrl: "xem thêm",
    content: "2.1.2025:Phát hiện vật thể",
  },
  {
    id:2,
    name: "Phát hiện con người",
    imageUrl: ["https://i.ytimg.com/vi/amfztdpl0ki/hq720.jpg?sqp=-oaymwe7ck4feiidsfryq4qpay0iaruaaaaagaelaadiqj0agkjd8aeb-ah-cyac0awkagwiababggugxihjma8=&rs=aon4cla3ibghbdntd0lffj73yn_zicdhba"],
    linkUrl: "xem thêm",
    content: "2.1.2025:Phát hiện vật thể",
  },
  {
    id:3,
    name: "Phát hiện con người",
    imageUrl: ["https://i.ytimg.com/vi/amfztdpl0ki/hq720.jpg?sqp=-oaymwe7ck4feiidsfryq4qpay0iaruaaaaagaelaadiqj0agkjd8aeb-ah-cyac0awkagwiababggugxihjma8=&rs=aon4cla3ibghbdntd0lffj73yn_zicdhba"],
    linkUrl: "xem thêm",
    content: "2.1.2025:Phát hiện vật thể",
  },
  {
    id:4,
    name: "Phát hiện con người",
    imageUrl: ["https://i.ytimg.com/vi/amfztdpl0ki/hq720.jpg?sqp=-oaymwe7ck4feiidsfryq4qpay0iaruaaaaagaelaadiqj0agkjd8aeb-ah-cyac0awkagwiababggugxihjma8=&rs=aon4cla3ibghbdntd0lffj73yn_zicdhba"],
    linkUrl: "xem thêm",
    content: "2.1.2025:Phát hiện vật thể",
  },
];
const images = [
    {
      url: "https://i.ytimg.com/vi/amfztdpl0ki/hq720.jpg?sqp=-oaymwe7ck4feiidsfryq4qpay0iaruaaaaagaelaadiqj0agkjd8aeb-ah-cyac0awkagwiababggugxihjma8=&rs=aon4cla3ibghbdntd0lffj73yn_zicdhba",
      date: "12/01/2025",
      description: "Phát hiện vật nuôi khỏi chuống.",
    },
    {
      url: "https://i.ytimg.com/vi/amfztdpl0ki/hq720.jpg?sqp=-oaymwe7ck4feiidsfryq4qpay0iaruaaaaagaelaadiqj0agkjd8aeb-ah-cyac0awkagwiababggugxihjma8=&rs=aon4cla3ibghbdntd0lffj73yn_zicdhba",
      date: "11/01/2025",
      description: "Phát hiện vật nuôi tại chuồng bò.",
    },
    {
      url: "https://i.ytimg.com/vi/amfztdpl0ki/hq720.jpg?sqp=-oaymwe7ck4feiidsfryq4qpay0iaruaaaaagaelaadiqj0agkjd8aeb-ah-cyac0awkagwiababggugxihjma8=&rs=aon4cla3ibghbdntd0lffj73yn_zicdhba",
      date: "10/01/2025",
      description: "Vật nuôi đang di chuyển trong khu vực vườn.",
    },
    {
      url: "https://i.ytimg.com/vi/amfztdpl0ki/hq720.jpg?sqp=-oaymwe7ck4feiidsfryq4qpay0iaruaaaaagaelaadiqj0agkjd8aeb-ah-cyac0awkagwiababggugxihjma8=&rs=aon4cla3ibghbdntd0lffj73yn_zicdhba",
      date: "12/01/2025",
      description: "Phát hiện vật nuôi tại khu vực nhà kho.",
    },
    {
      url: "https://i.ytimg.com/vi/amfztdpl0ki/hq720.jpg?sqp=-oaymwe7ck4feiidsfryq4qpay0iaruaaaaagaelaadiqj0agkjd8aeb-ah-cyac0awkagwiababggugxihjma8=&rs=aon4cla3ibghbdntd0lffj73yn_zicdhba",
      date: "12/01/2025",
      description: "Phát hiện vật nuôi khỏi chuống.",
    },
    {
      url: "https://i.ytimg.com/vi/amfztdpl0ki/hq720.jpg?sqp=-oaymwe7ck4feiidsfryq4qpay0iaruaaaaagaelaadiqj0agkjd8aeb-ah-cyac0awkagwiababggugxihjma8=&rs=aon4cla3ibghbdntd0lffj73yn_zicdhba",
      date: "11/01/2025",
      description: "Phát hiện vật nuôi tại chuồng bò.",
    },
    {
      url: "https://i.ytimg.com/vi/amfztdpl0ki/hq720.jpg?sqp=-oaymwe7ck4feiidsfryq4qpay0iaruaaaaagaelaadiqj0agkjd8aeb-ah-cyac0awkagwiababggugxihjma8=&rs=aon4cla3ibghbdntd0lffj73yn_zicdhba",
      date: "10/01/2025",
      description: "Vật nuôi đang di chuyển trong khu vực vườn.",
    },
    {
      url: "https://i.ytimg.com/vi/amfztdpl0ki/hq720.jpg?sqp=-oaymwe7ck4feiidsfryq4qpay0iaruaaaaagaelaadiqj0agkjd8aeb-ah-cyac0awkagwiababggugxihjma8=&rs=aon4cla3ibghbdntd0lffj73yn_zicdhba",
      date: "12/01/2025",
      description: "Phát hiện vật nuôi tại khu vực nhà kho.",
    },
  ];

const imagespeople = [
  {
    url:   "https://nhachannuoi.vn/wp-content/uploads/2023/09/anh-4-135149_939-135150.jpg",
    date: "12/01/2025",
    description: "Phát hiện người lạ tại khu vực nhà kho.",
  },
  {
    url:   "https://nhachannuoi.vn/wp-content/uploads/2023/09/anh-4-135149_939-135150.jpg",
    date: "11/01/2025",
    description: "Phát hiện người  tại nhà kho.",
  },
  {
    url:   "https://nhachannuoi.vn/wp-content/uploads/2023/09/anh-4-135149_939-135150.jpg",
    date: "10/01/2025",
    description: "Người đang di chuyển trong.",
  },
  {
    url:   "https://nhachannuoi.vn/wp-content/uploads/2023/09/anh-4-135149_939-135150.jpg",
    date: "12/01/2025",
    description: "Phát hiện người lạ tại khu vực nhà kho.",
  },
  {
    url:   "https://nhachannuoi.vn/wp-content/uploads/2023/09/anh-4-135149_939-135150.jpg",
    date: "11/01/2025",
    description: "Phát hiện người  tại nhà kho.",
  },
  {
    url:   "https://nhachannuoi.vn/wp-content/uploads/2023/09/anh-4-135149_939-135150.jpg",
    date: "10/01/2025",
    description: "Người đang di chuyển trong.",
  },
]; 

const Identify=()=>{
  return (
    <div className="container">
     <div className='newAdvContainer'>
        <TabView className='tabview'>
          <TabPanel header="Phát hiện người">
           <CardDetectPeople images={imagespeople} />
          </TabPanel>
          <TabPanel header="Phát hiện vật nuôi">
            <CardDetectPeople images={images} />
          </TabPanel>

          <TabPanel header="Lịch sử giám sát">
            <MonitoringHistory/>
          </TabPanel>
        </TabView>
      </div>
      <div className='listAdv'>
        {advertisements.map(item=>(
          <Card key={item.id} item={item}/>
        ))}
      </div>
    
    </div>
    
  )
}

export default Identify;