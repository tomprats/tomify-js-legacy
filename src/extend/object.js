export function build(key, value) {
  const object = {};
  object[key] = value;
  return object;
}
export function encode(object) {
  const keys = Object.keys(object);
  let path = "";
  keys.forEach((key) => {
    path += `${encodeURIComponent(key)}=${encodeURIComponent(object[key])}`;
    if(key !== keys.last) { path += "&"; }
  });
  return path;
}
export function isEmpty(object) { return Object.keys(object).length === 0; }
export function isDefined(object) { return Object.is(object, undefined); }
