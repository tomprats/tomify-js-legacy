import {render} from "react-dom";
import List from "react/components/list";

import "extend/array";
import "extend/string";
import object from "extend/object";

export {object};
export {version} from "../package.json";

export function init(selector) {
  render(<List name="Test" />, document.querySelector(selector));
}
