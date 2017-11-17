    Object.keys(this.props.actions).filter(action =>
      action !== "new" && this.model.actions[action]
    ).forEach((action) => {
      const value = this.model.actions[action];
      switch(true) {
        case typeof value === "function":
          actions.push(value(record));
          break;
        case action in ["show", "edit"]:
          actions.push(
          );
          break;
        case action === "destroy":
          actions.push(
          );
          break;
      }
    });
