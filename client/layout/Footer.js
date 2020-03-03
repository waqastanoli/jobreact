import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";
import HowWorks from "../pages/HowWorks";
import Action from "../actions/accountActions";
import AccountAction from "../actions/accountActions";
// image
import logo from "../public/jocallio/image/logo.png";
import API_URL from "../config/API_URL";
import small_profile_img from "../public/jocallio/image/small_profile.png";
import profileplaceholder from "../public/jocallio/image/small_profileL.png";
// sub components
import Checkout from "./header/Checkout";
import HeaderNav from "./header/HomeBreadCrumbs";
import CartNav from "./header/Cart";
import WishlistNav from "./header/Wishlist";
import Detail from "./header/Detail";
import { NavDropdown } from "react-bootstrap";
import { Modal, Button, Alert } from "react-bootstrap";
class Footer extends Component {
  constructor(props) {
    super(props);
    this.workhandleClose = this.workhandleClose.bind(this);
  }
  workhandleClose() {
    const { dispatch } = this.props;
    dispatch(AccountAction.closeworks());
  }
  render() {
    const { dispatch, products, auth, match, fetched, profile } = this.props;
    return (
      <div>
        <footer>Copyright © 2020 Jobbird All Rights Reserved.</footer>
      </div>
    );
  }
}
export default connect(state => ({
  profile: state.profile,
  auth: state.auth
}))(withRouter(Footer));
