import AbstractView from "./abstract.js";

const createCostInfoTemplate = () => {
  return `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
  </p>`;
};

export default class CostInfo extends AbstractView {
  _getTemplate() {
    return createCostInfoTemplate();
  }
}
