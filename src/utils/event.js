import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrBefore);

export const formatEventDay = (day) => {
  return dayjs(day).format(`MMM DD`);
};

export const formatEventTime = (time) => {
  return dayjs(time).format(`HH:mm`);
};

export const formatMachineDate = (date) => {
  return dayjs(date).format(`YYYY-MM-DDTHH:mm`);
};

// дата начала события больше или равна текущей дате
export const isFutureEvent = (startTime) => {
  return dayjs().isSameOrBefore(startTime, `D`);
};

//  дата окончания маршрута меньше, чем текущая
export const isPastEvent = (startTime) => {
  return dayjs().isAfter(startTime, `D`);
};

export const generateDuration = (startTime, endTime) => {
  const HOURS_IN_DAY = 24;
  const MINS_IN_HOUR = 60;

  const durationInDays = dayjs(endTime).diff(dayjs(startTime), `day`, true); // без округления
  const days = Math.trunc(durationInDays);
  const durationInHours = (durationInDays - days) * HOURS_IN_DAY;
  const hours = Math.trunc(durationInHours);
  const minutes = Math.trunc((durationInHours - hours) * MINS_IN_HOUR);
  let duration;

  if (!days && !hours) {
    duration = minutes.toString().padStart(2, 0) + `M`;
  } else if (hours && !days) {
    duration = hours.toString().padStart(2, 0) + `H ` + minutes.toString().padStart(2, 0) + `M`;
  } else {
    duration = days.toString().padStart(2, 0) + `D ` + hours.toString().padStart(2, 0) + `H ` + minutes.toString().padStart(2, 0) + `M`;
  }

  return duration;
};

// Сортировка (по дате, по длительности и по цене, по убыванию)
export const sortEventByDay = (eventA, eventB) => {

  return dayjs(eventB.startTime).diff(dayjs(eventA.startTime));
};

export const sortEventByTime = (eventA, eventB) => {

  return dayjs(eventB.endTime).diff(dayjs(eventB.startTime)) - dayjs(eventA.endTime).diff(dayjs(eventA.startTime));
};

export const sortEventByPrice = (eventA, eventB) => {
  return eventB.price - eventA.price;
};

export const isDatesEqual = (timeA, timeB) => {
  return dayjs(timeA).isSame(dayjs(timeB));
};
