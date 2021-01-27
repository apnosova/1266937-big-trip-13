export default class Observer {
  constructor() {
    this._observers = [];
  }

  addObserver(observer) {
    this._observers.push(observer);
  }

  removeObserver(observer) {
    this._observers = this._observers.filter((exitedObserver) => exitedObserver !== observer);
  }

  _notify(type, payload) { // Тип события, полезная нагрузка
    this._observers.forEach((observer) => observer(type, payload));
  }
}
