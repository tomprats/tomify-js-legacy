Component.create "Public.Sessions.Show",
  componentWillInitialize: ->
    @follow Model.find("Public.Session").on "new", @newSession
    @follow Model.find("Public.Password").on "new", @newPassword
  newSession: ->
    @setState(newPassword: false)
  newPassword: ->
    @setState(newPassword: true)
  render: ->
    <div className="row text-center">
      {if @state.newPassword
        <div className="dynamic-sm">
          <Public.Passwords.New />
        </div>
      else if setting "allow_signup"
        <div className="dynamic-lg">
          <div className="row">
            <div className="col-md-6">
              <Public.Sessions.New />
            </div>
            <div className="col-md-6">
              <Public.Users.New />
            </div>
          </div>
        </div>
      else
        <div className="dynamic-sm">
          <Public.Sessions.New />
        </div>
      }
    </div>
