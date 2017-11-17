export default class Show extends Component {
  onClick = () => {
    this.props.onClick(this.props.record)
  }
  render() {
    const {
      onClick,
      record,
      ...props
    } = this.props;

    return (
      <Default onClick={this.onClick} {...props}>Show</Default>
    );
  }
}
