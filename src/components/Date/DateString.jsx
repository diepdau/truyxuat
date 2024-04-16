import React from "react";

const DateConverterString = ({ formattedDate }) => {
  const parts = formattedDate.split('-');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Lưu ý: tháng bắt đầu từ 0
    const day = parseInt(parts[2], 10);
  
    // Tạo đối tượng Date từ các thành phần trên
    const dateObject = new Date(year, month, day);
  
    // Trả về đối tượng Date
    return dateObject;
};

export default DateConverterString;
