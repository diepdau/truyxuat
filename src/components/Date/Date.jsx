const DateConverter = ({ originalDate }) => {
  // Chuyển đổi từ ISO 8601 sang Date object
  const dateObject = new Date(originalDate);

  // Lấy ngày, tháng, năm từ Date object
  const day = dateObject.getDate().toString().padStart(2, "0");
  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0"); // Lưu ý: tháng bắt đầu từ 0
  const year = dateObject.getFullYear();

  // // Lấy giờ và phút từ Date object
  // let hour = dateObject.getHours();
  // const minute = dateObject.getMinutes().toString().padStart(2, "0");

  // // Định dạng giờ sang 12-giờ và thêm 'AM' hoặc 'PM'
  // const ampm = hour >= 12 ? "PM" : "AM";
  // hour = hour % 12;
  // hour = hour ? hour : 12; // Đổi 0 thành 12 nếu là giờ 0 (12:00 AM)
  // const formattedTime = `${hour}:${minute} ${ampm}`;

  // Tạo chuỗi ngày tháng mới
  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
};
export default DateConverter;
