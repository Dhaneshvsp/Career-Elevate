import moment from "moment";

export default function formatTime(date) {
  if (!date) return "N/A";
  return moment(date).format("Do MMMM YYYY, HH:mm");
}