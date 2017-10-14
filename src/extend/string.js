String.prototype.assign = function assign(options) {
  return this.replace(/::.*::/, replace => options[replace.slice(2, -2)] || "");
};

String.prototype.words = function words() {
  return this.replace(/(?!^)([A-Z])/g, "_$1").lowercase.split(/[\W_-]/).compact;
};

String.prototype.date = function date() {
  return new Date(this).toLocaleDateString();
};

String.prototype.transform = function transform(method) {
  let string = this.replace(/![._-]([A-Z])/, "_$1").lowercase;
  string = string.splitAndJoin("-", method);
  string = string.splitAndJoin("_", method);
  string = string.splitAndJoin(".", method);
  return string;
};

String.prototype.splitAnd = function splitAnd(separator, method) {
  return this.split(separator).map(word => method(word));
};

String.prototype.splitAndJoin = function splitAndJoin(separator, method) {
  return this.splitAnd(separator, method).join(separator);
};

// TODO: Check for npm packages with similar methods
Object.defineProperties(String.prototype, {
  camelize: {get() { return this.transform(word => word[0].toLowerCase() + word.slice(1)); }},
  capitalize: {get() { return this.transform(word => word[0].toUpperCase() + word.slice(1)); }},
  dasherize: {get() { return this.words().join("-"); }},
  lowercase: {get() { return this.toLowerCase(); }},
  pluralize: {get() { return `${this}s`; }}, // TODO: Replace with pluralize npm package
  titleize: {get() { return this.words().map(word => (word !== "id" && word.capitalize)).compact.join(" "); }},
  underscore: {get() { return this.words().join("_"); }},
  uppercase: {get() { return this.toUpperCase(); }}
});
