import {build} from "extend/object";
import * as Request from "core/request";

export default class Model {
  static create(namespace, options) {
    this[namespace] = new this(namespace, options);
    return this[namespace];
  }
  static find(namespace) {
    return this[namespace];
  }
  static findOrCreate(namespace, options) {
    return this.find(namespace) || this.create(namespace, options);
  }
  constructor(namespace, options = {}) {
    this.name = namespace.split(".").last;
    if(!this.name) { throw new Error("Model: Requires Name"); }
    this.param = options.param || this.name.underscore;
    this.prefix = namespace.split(".").first.lowercase;
    this.path = options.path || this.name.underscore.pluralize;
    this.path = `/api/${this.prefix}/${this.path}`;
    this.requests = {};
    this.setDefaultActions();
  }
  setAction(name, request) {
    this.requests[name] = [];
    this[name] = (...args) => {
      request.running = true;
      this.requests[name].push(request);
      return request(...args).then((response) => {
        request.running = false;
        // TODO: Either incorporate an observable class or rewrite
        this.trigger(name, response);
      });
    };
  }
  requested(action) { return this.requests[action].length > 0; }
  request(type, nest) {
    return (one, two) => {
      let {path} = this;
      let params;
      if(path instanceof Object) {
        path += `/${one}`;
        params = two;
      } else {
        params = one;
      }
      if(nest) { params = build(this.param, params); }
      return Request.fetch(type, path, params);
    };
  }
  setDefaultActions() {
    this.setAction("find", this.request("get"));
    this.setAction("show", this.request("get"));
    this.setAction("edit", this.request("get"));
    this.setAction("update", this.request("put", true));
    this.setAction("new", Request.none);
    this.setAction("all", this.request("get"));
    this.setAction("where", this.request("get"));
    this.setAction("create", this.request("post", true));
    this.setAction("destroy", this.request("delete"));
  }
}
