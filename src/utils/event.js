import dayjs from "dayjs";

export const formatEventDay = (day) => {
  return dayjs(day).format(`MMM DD`);
};

export const formatEventTime = (time) => {
  return dayjs(time).format(`HH:mm`);
};

export const formatMachineDate = (date) => {
  return dayjs(date).format(`YYYY-MM-DDTHH:mm`);
};
