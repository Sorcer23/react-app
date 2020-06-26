import moment from "moment";

export default function formatDateTime(date) {
  return moment(date).format("LLL");
}
