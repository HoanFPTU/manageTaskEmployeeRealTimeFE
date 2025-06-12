export const getNameById = (id, employees) => {
  const employee = employees.find((e) => e.id === id);
  return employee ? employee.name : id;
};
export const getNameByConversationId = (conversationId, employees) => {
  const id = conversationId
    .split("*_*")
    .find((i) => i !== localStorage.getItem("id"));
  return getNameById(id, employees);
};
export const getIdPartner = (conversationId) => {
  return conversationId
    .split("*_*")
    .find((i) => i !== localStorage.getItem("id"));
};
export function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();

  const isToday = date.toDateString() === now.toDateString();

  if (isToday) {
    // Hiện giờ phút nếu là hôm nay
    return date.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  } else {
    // Hiện ngày nếu là hôm qua trở về trước
    return date.toLocaleDateString("vi-VN");
  }
}
