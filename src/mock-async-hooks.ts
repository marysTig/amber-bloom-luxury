export class AsyncLocalStorage {
  constructor() {}
  getStore() {
    return null;
  }
  run(store, callback) {
    return callback();
  }
}
