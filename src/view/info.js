import AbstractView from "./abstract.js";

const createInfoTemplate = () => {
  return `<section class="trip-main__trip-info  trip-info"></section>`;
};

export default class Info extends AbstractView {
  getTemplate() {
    return createInfoTemplate();
  }
}
