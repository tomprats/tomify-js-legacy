export default class New extends Component {
  render() {
    return <Default {...props}>New</Default>;
  }
}

export default class Edit extends Component {
  render() {
    return (
      <Default onClick={() => this.model[action](record.id)}>Edit</Default>
    );
  }
}

export default class Destroy extends Component {
  render() {
    return (
      <button
        onClick={() => this.model.destroy(record.id).then(({type, message}) =>
          message({type, text: message})
        )}
        data-confirm={`Are you sure you want to delete ${record.name}?`}
      >
        Delete
      </button>
    );
  }
}
