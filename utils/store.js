const store = {};

module.exports = {
  set: (key, value) => (store[key] = value),
  get: (key) => store[key],
  remove: (key) => delete store[key],
};
