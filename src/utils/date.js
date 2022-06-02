import { date as qDate } from "quasar";

const DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss";
const DATE_FORMAT = "YYYY-MM-DD";
const TIME_FORMAT = "HH:mm:ss";

export function covertToQDateTime(date) {
  return qDate.formatDate(date, DATE_TIME_FORMAT);
}

export function covertToQDate(date) {
  return qDate.formatDate(date, DATE_FORMAT);
}

export function covertToQTime(date) {
  return qDate.formatDate(date, TIME_FORMAT);
}

export function getToday() {
  return this.covertToQDateTime(Date.now());
}

export function dateTimeFormat(value) {
  if (!value) {
    return "";
  }


  let formattedString = this.covertToQDateTime(new Date(value));

  return formattedString;
}

export function timeFormat(value) {
  if (!value) {
    return "";
  }

  if ((value + "").indexOf(":") > 0) {
    return value;
  }

  let formattedString = this.covertToQTime(new Date(value));

  return formattedString;
}

export function dateFormat(value) {
  if (!value) {
    return "";
  }

  let formattedString = this.covertToQDate(new Date(value));

  return formattedString;
}

export default {
  covertToQDateTime,
  covertToQDate,
  covertToQTime,
  getToday,
  dateTimeFormat,
  dateFormat,
  timeFormat
};
