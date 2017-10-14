Object.defineProperties(Array.prototype, {
  compact: {get() { return this.filter(x => x); }},
  first: {get() { return this[0]; }},
  last: {get() { return this[this.length - 1]; }}
});
