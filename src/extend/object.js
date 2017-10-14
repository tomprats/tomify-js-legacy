export default {
  build: (key, value) => {
    const object = {};
    object[key] = value;
    return object;
  },
  encode: (object) => {
    const keys = Object.keys(object);
    let path = "";
    keys.forEach((key) => {
      path += `${encodeURIComponent(key)}=${encodeURIComponent(object[key])}`;
      if(key !== keys.last) { path += "&"; }
    });
    return path;
  },
  isEmpty: object => Object.keys(object).length === 0
};
