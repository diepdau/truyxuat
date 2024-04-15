
const DateConverter = ({originalDate}) => {
    // Chuyển đổi từ ISO 8601 sang Date object
    const dateObject = new Date(originalDate);
    
    // Lấy ngày, tháng, năm từ Date object
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1; // Lưu ý: tháng bắt đầu từ 0
    const day = dateObject.getDate();
    
    // Tạo chuỗi ngày tháng mới
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    return(formattedDate);
}
export default DateConverter;
