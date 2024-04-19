const DateConverter = ({ originalDate }) => {
  // Chuyển đổi từ ISO 8601 sang Date object
  const dateObject = new Date(originalDate);

  // Lấy ngày, tháng, năm từ Date object
  const year = dateObject.getFullYear();
  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0"); // Lưu ý: tháng bắt đầu từ 0
  const day = dateObject.getDate().toString().padStart(2, "0");
  const hours = dateObject.getHours().toString().padStart(2, "0");
  const minutes = dateObject.getMinutes().toString().padStart(2, "0");
  const seconds = dateObject.getSeconds().toString().padStart(2, "0");

  // Tạo chuỗi ngày tháng mới
  const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  return formattedDate;
};
export default DateConverter;
