import {FilterType} from "../constants";
import {isFutureEvent, isPastEvent} from "./event";

export const filter = {
  [FilterType.EVERYTHING]: (events) => events.slice(),
  [FilterType.FUTURE]: (events) => events.filter((event) => isFutureEvent(event.startTime)),
  [FilterType.PAST]: (events) => events.filter((event) => isPastEvent(event.startTime)),
};
