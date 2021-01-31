import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

// const getEventsByType

export const sumMoneyByType = (type, events) => {
  return events.filter((event) => event.eventType.toUpperCase() === type.toUpperCase())
  .reduce((sum, event) => {
    return sum + event.price;
  }, 0);
};

export const countEventType = (type, events) => {
  return events.filter((event) => event.eventType.toUpperCase() === type.toUpperCase()).length;
};

const countEventDuration = (event) => {
  return dayjs(event.endTime).diff(dayjs(event.startTime));
};

export const sumTimeByType = (type, events) => {
  return dayjs.duration(
      events.filter((event) => event.eventType.toUpperCase() === type.toUpperCase())
      .reduce((sum, event) => {
        return sum + countEventDuration(event);
      }, 0)).days();
};

// Используем особенности Set, чтобы удалить дубли в массиве
export const makeItemsUniq = (items) => [...new Set(items)];
