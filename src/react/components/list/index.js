import PropTypes from "prop-types";
import Component from "core/component";
import Model from "core/model";
import Pagination from "react/components/pagination";
// import Actions from "actions";
// Actions versus Action Creators?

export default class List extends Component {
  static defaultProps = {
    actions: ["new"],
    length: 5,
    title: ""
  }
  static propTypes = {
    actions: PropTypes.arrayOf(PropTypes.string),
    header: PropTypes.element.isRequired,
    key: PropTypes.string.isRequired,
    length: PropTypes.number,
    model: PropTypes.instanceOf(Model).isRequired,
    row: PropTypes.func.isRequired,
    title: PropTypes.string
  }
  constructor(props, context) {
    super(props, context);

    // TODO: Convert actions from model to props and emitted actions
    // - this.props.actions should just be list of available

    /* TODO: Shouldn't need these
    this.store = Store.findOrCreate(`${this.props.name}.Index`);
    this.records = this.store.findOrCreate("Records", []);
    */

    /* TODO: These need to come from RXJS
     * should listen to events with this.props.key
    this.followStores.push({records: this.records});
    this.follow(this.model.on("all", this.modelAll));
    this.follow(this.model.on("create", this.modelChange));
    this.follow(this.model.on("update", this.modelChange));
    this.follow(this.model.on("destroy", this.modelChange));
    */

    this.state = {
      currentRecords: [],
      page: 1
    };
  }
  componentDidMount() {
    this.model.all();
  }
  setPage = (page) => {
    const finish = page * this.props.length;
    const start = finish - this.props.length;
    const currentRecords = this.state.records.slice(start, finish);
    this.setState({page, currentRecords});
  }
  modelAll = (response) => {
    this.records.set(response.data);
    this.setPage(1);
  }
  modelChange = response => response.type === "success" && this.model.all()
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-12">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4>
                  {this.props.title || this.props.model.name.parameterize}
                  {"new" in this.props.actions.new && (<Actions.New onClick={this.props.actions.new} />)}
                </h4>
                <Pagination
                  page={this.state.page}
                  total={this.state.records.length}
                  setPage={this.setPage}
                  length={this.props.length}
                />
              </div>
              <div className="table-responsive">
                <table className="table table-bordered table-hover">
                  <thead>{this.props.header}</thead>
                  <tbody>
                    {this.state.currentRecords.map(record => this.props.row(record))}
                  </tbody>
                </table>
              </div>
              <div className="panel-footer">
                <Pagination
                  page={this.state.page}
                  total={this.state.records.length}
                  setPage={this.setPage}
                  length={this.props.length}
                />
                <div className="clearfix" />
              </div>
            </div>
          </div>
        </div>
        {this.props.actions.map(action => {
          const Action = List[action.titleize];

          return <Action {...this.props} />
        })}
      </div>
    );
  }
}
