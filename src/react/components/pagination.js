import PropTypes from "prop-types";
import Component from "core/component";

export default class Pagination extends Component {
  static propTypes = {
    length: PropTypes.number.isRequired,
    page: PropTypes.string.isRequired,
    setPage: PropTypes.func.isRequired,
    total: PropTypes.number.isRequired
  }
  render() {
    const first = 1;
    const prev = this.props.page - 1;
    const next = this.props.page + 1;
    const last = Math.ceil(this.props.total / this.props.length);
    const prevDisabled = first > prev;
    const nextDisabled = next > last;

    return (
      <ul className="pagination">
        <li className={`pagination-first${prevDisabled && " disabled"}`}>
          <button onClick={() => !prevDisabled && this.props.setPage(first)} className="fa fa-angle-double-left" />
        </li>
        <li className={`pagination-prev${prevDisabled && " disabled"}`}>
          <button onClick={() => !prevDisabled && this.props.setPage(prev)} className="fa fa-angle-left" />
        </li>
        <li className="pagination-link active">
          <button>{this.props.page}</button>
        </li>
        <li className={`pagination-next${nextDisabled && " disabled"}`}>
          <button onClick={() => !nextDisabled && this.props.setPage(next)} className="fa fa-angle-right" />
        </li>
        <li className={`pagination-last${nextDisabled && " disabled"}`}>
          <button onClick={() => !nextDisabled && this.props.setPage(last)} className="fa fa-angle-double-right" />
        </li>
      </ul>
    );
  }
}
