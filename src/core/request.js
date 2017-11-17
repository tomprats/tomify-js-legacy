/* eslint no-param-reassign: "off" */
export function formData(data, object, objectName) {
  Object.keys(object).forEach((key) => {
    const value = object[key];
    const name = objectName ? `${objectName}[${key}]` : key;
    if(!(value instanceof Object) || (value instanceof File)) {
      data.append(name, value);
    } else {
      data = this.formData(data, value, name);
    }
  });
  return data;
}
export function ajax(_options) {
  let options = {..._options};
  options.url = options.url.assign(options.data);
  if(options.type in ["POST", "PUT"]) {
    options = Object.assign(options, {
      data: formData(new FormData(), options.data),
      cache: false,
      processData: false,
      contentType: false
    });
  }
  // TODO: Rewrite using fetch
  // return $.ajax(options);
  return Promise.resolve({name: "Tom"});
}
export function none(data) { return Promise.resolve(data); }
export function fetch(type, url, data) { return this.ajax({type, url, data}); }
