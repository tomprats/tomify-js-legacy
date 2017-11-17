import {Component as BaseComponent} from "react";

export default class Component extends BaseComponent {
  constructor(props, context) {
    super(props, context);

    this.componentWillInitialize && this.componentWillInitialize();
  }
}
