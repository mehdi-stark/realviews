import dayjs from "dayjs";

export default {
  formatDate(dateString) {
    console.log('format date param : ' + dateString)
    const date = dayjs(dateString);
    // Then specify how you want your dates to be formatted
    return date.format("YYYY-MM-DD");
  }
}