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

export const generateDuration = (startTime, endTime) => {
  const HOURS_IN_DAY = 24;
  const MINS_IN_HOUR = 60;

  const durationInDays = dayjs(endTime).diff(startTime, `day`, true); // без округления
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
