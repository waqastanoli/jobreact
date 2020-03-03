import React, { Component } from "react";
import { connect } from "react-redux";
import { css } from "@emotion/core";
import { FadeLoader } from "react-spinners";
import Alert from "react-bootstrap/Alert";
import Action from "../actions/accountActions";
import AlertMessage from "../layout/AlertMessage";
import { NavLink } from "react-router-dom";
import logo from "../public/jocallio/image/logo.png";
import loginimage from "../public/jocallio/image/loginimage.png";
class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: "",
        email: "",
        password: ""
      },
      submitted: false,
      errors: {
        email: "",
        password: ""
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateInput = this.validateInput.bind(this);
    this.email = React.createRef();
    this.password = React.createRef();
    const { dispatch } = props;
    dispatch(Action.clearErrors());
  }
  validateInput(name, value, type) {
    var error = "";
    switch (name) {
      case "email":
        error = value == "" ? "Email is required" : "";
        if (error == "" && (type == "submit" || type == "blur")) {
          var emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
          error = emailValid ? "" : value + " is invalid Email";
        }
        break;
      case "password":
        error = value == "" ? "Password is required" : "";
        break;
    }
    const { errors } = this.state;
    errors[name] = error;
    this.setState({ errors, errors });
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/" + this.props.auth.user.username);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/" + nextProps.auth.user.username);
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  handleChange(event) {
    const { name, value } = event.target;
    this.validateInput(name, value, event.type);
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.validateInput(
      this.email.current.name,
      this.email.current.value,
      "blur"
    );
    this.validateInput(
      this.password.current.name,
      this.password.current.value,
      "blur"
    );
    this.setState({ submitted: true });
    const { user, errors } = this.state;

    const { dispatch } = this.props;
    if (errors.email == "" && errors.password == "") {
      dispatch(Action.loginAction(user));
    }
  }
  render() {
    const { registering, fetching } = this.props;
    const { user, submitted, errors } = this.state;
    const { account, auth } = this.props;
    const { error } = account;
    return (
      <div>
        <main className="loginScreen clearfix">
          <div
            className="leftPanel"
            onClick={() => this.props.history.push("/PositionForm")}
          >
            <h1>Create one or more new Positions</h1>
          </div>

          <div className="rightPanel">
            <h1>Create one or more new Candidates</h1>
          </div>
        </main>
        {/* <div className="loginHolder">
          Dont have an account?{" "}
          <NavLink to="/register" className="login-anchor">
            Create your account
          </NavLink>{" "}
          , it takes less than a minute
        </div> */}
      </div>
    );
  }
}
export default connect(state => ({
  account: state.account,
  auth: state.auth
}))(Signin);
