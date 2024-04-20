import React from "react";

const DateConverterString = ({ originalDate }) => {
  // Chuyển đổi từ ISO 8601 sang Date object
  const dateObject = new Date(originalDate);
  
  // Lấy ngày, tháng, năm từ Date object
  const year = dateObject.getFullYear();
  const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Lưu ý: tháng bắt đầu từ 0
  const day = dateObject.getDate().toString().padStart(2, '0');
  
  // Tạo chuỗi ngày tháng mới
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

const ExampleComponent = () => {
  // Chuỗi JSON bạn cung cấp
  const jsonString = "{\"key\":null,\"ref\":null,\"props\":{\"originalDate\":\"2024-04-16T19:43:41.935Z\"},\"_owner\":null,\"_store\":{}}";

  // Chuyển đổi chuỗi JSON thành đối tượng JavaScript
  const jsonObject = JSON.parse(jsonString);

  // Trích xuất ngày từ đối tượng JSON
  const originalDate = jsonObject.props.originalDate;

  // Sử dụng hàm DateConverterString để chuyển đổi ngày
  const formattedDate = DateConverterString({ originalDate });

  return (
    <div>
      {/* Hiển thị ngày đã chuyển đổi */}
      <p>Formatted Date: {formattedDate}</p>
    </div>
  );
}

export default ExampleComponent;
