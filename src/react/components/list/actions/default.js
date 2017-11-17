export default class Default extends Component {
  render() {
    const {
      children, ...props
    } = {
      className: "btn btn-primary btn-xs",
      ...this.props
    };

    return <button {...props}>{children}</button>;
  }
}
