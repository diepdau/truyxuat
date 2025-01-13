import Card from "../../../components/Card/Card";
import { TabView, TabPanel } from "primereact/tabview";
import MonitoringHistory from "../MonitoringHistory/MonitoringHistory"
import CardDetectPeople from "../DetectPeople/DetectPeople"
import './Identify.css'

const advertisements = [
  {
    id:1,
    name: "Giảm giá mùa hè",
  imageUrl: ["https://cdn.pixabay.com/photo/2024/09/05/08/24/mountain-9024209_1280.jpg"],
    linkUrl: "xem thêm",
    content: "Chào mừng mùa hè với giảm giá lên đến 30%! Nhanh tay mua sắm để không bỏ lỡ cơ hội này.",
    type: "khuyến mãi",
    discountPercentage: 30,
    status: true,
    startDate: new Date("2024-06-01T00:00:00Z"),
    endDate: new Date("2024-08-31T23:59:59Z")
  },
  {
    id:2,
    name: "Khuyến mãi Black Friday",
    imageUrl: ["https://cdn.pixabay.com/photo/2024/09/05/08/24/mountain-9024209_1280.jpg"],
    linkUrl: "xem thêm",
    content: "Black Friday đã đến! Giảm giá lên đến 50% cho tất cả các sản phẩm. Đừng bỏ lỡ!",
    type: "khuyến mãi",
    discountPercentage: 50,
    status: true,
    startDate: new Date("2024-11-29T00:00:00Z"),
    endDate: new Date("2024-11-30T23:59:59Z")
  },
  {
    id:3,
    name: "Quảng cáo sản phẩm mới",
    imageUrl: ["https://cdn.pixabay.com/photo/2024/09/05/08/24/mountain-9024209_1280.jpg"],
    linkUrl: "xem thêm",
    content: "Khám phá sản phẩm mới của chúng tôi! Chất lượng tuyệt vời, giá cả hợp lý.",
    type: "quảng cáo",
    discountPercentage: 0,
    status: true,
    startDate: new Date("2024-09-01T00:00:00Z"),
    endDate: new Date("2024-12-31T23:59:59Z")
  },
  {
    id:4,
    name: "Banner sự kiện đặc biệt",
    imageUrl: ["https://cdn.pixabay.com/photo/2024/09/05/08/24/mountain-9024209_1280.jpg"],
    linkUrl: "xem thêm",
    content: "Tham gia sự kiện đặc biệt của chúng tôi và nhận nhiều phần quà hấp dẫn!",
    type: "banner",
    discountPercentage: 0,
    status: false,
    startDate: new Date("2024-05-01T00:00:00Z"),
    endDate: new Date("2024-05-15T23:59:59Z")
  }
];
const images = [
  "https://i.ytimg.com/vi/aMFztDPl0KI/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGGUgXihJMA8=&rs=AOn4CLA3IbGHBdNTD0lffJ73YN_zicdhbA",
  "https://i.ytimg.com/vi/aMFztDPl0KI/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGGUgXihJMA8=&rs=AOn4CLA3IbGHBdNTD0lffJ73YN_zicdhbA",
  "https://i.ytimg.com/vi/aMFztDPl0KI/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGGUgXihJMA8=&rs=AOn4CLA3IbGHBdNTD0lffJ73YN_zicdhbA",
  "https://i.ytimg.com/vi/aMFztDPl0KI/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGGUgXihJMA8=&rs=AOn4CLA3IbGHBdNTD0lffJ73YN_zicdhbA",
  "https://i.ytimg.com/vi/aMFztDPl0KI/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGGUgXihJMA8=&rs=AOn4CLA3IbGHBdNTD0lffJ73YN_zicdhbA",
  "https://i.ytimg.com/vi/aMFztDPl0KI/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGGUgXihJMA8=&rs=AOn4CLA3IbGHBdNTD0lffJ73YN_zicdhbA",
  "https://i.ytimg.com/vi/aMFztDPl0KI/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGGUgXihJMA8=&rs=AOn4CLA3IbGHBdNTD0lffJ73YN_zicdhbA",
  "https://i.ytimg.com/vi/aMFztDPl0KI/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGGUgXihJMA8=&rs=AOn4CLA3IbGHBdNTD0lffJ73YN_zicdhbA",
  "https://i.ytimg.com/vi/aMFztDPl0KI/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGGUgXihJMA8=&rs=AOn4CLA3IbGHBdNTD0lffJ73YN_zicdhbA",
  "https://i.ytimg.com/vi/aMFztDPl0KI/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGGUgXihJMA8=&rs=AOn4CLA3IbGHBdNTD0lffJ73YN_zicdhbA",
  "https://i.ytimg.com/vi/aMFztDPl0KI/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGGUgXihJMA8=&rs=AOn4CLA3IbGHBdNTD0lffJ73YN_zicdhbA",
];  


const imagespeople = [
  "https://nhachannuoi.vn/wp-content/uploads/2023/09/anh-4-135149_939-135150.jpg",
  "https://nhachannuoi.vn/wp-content/uploads/2023/09/anh-4-135149_939-135150.jpg",
  "https://nhachannuoi.vn/wp-content/uploads/2023/09/anh-4-135149_939-135150.jpg",
  "https://nhachannuoi.vn/wp-content/uploads/2023/09/anh-4-135149_939-135150.jpg",
  "https://nhachannuoi.vn/wp-content/uploads/2023/09/anh-4-135149_939-135150.jpg",
  "https://nhachannuoi.vn/wp-content/uploads/2023/09/anh-4-135149_939-135150.jpg",
  "https://nhachannuoi.vn/wp-content/uploads/2023/09/anh-4-135149_939-135150.jpg",
  "https://nhachannuoi.vn/wp-content/uploads/2023/09/anh-4-135149_939-135150.jpg",
  "https://nhachannuoi.vn/wp-content/uploads/2023/09/anh-4-135149_939-135150.jpg",
  "https://nhachannuoi.vn/wp-content/uploads/2023/09/anh-4-135149_939-135150.jpg",
  "https://nhachannuoi.vn/wp-content/uploads/2023/09/anh-4-135149_939-135150.jpg",
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