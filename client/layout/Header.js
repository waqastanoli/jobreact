import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";
import Action from "../actions/accountActions";
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
class Header extends Component {
  onLogout(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(Action.logoutUser(this.props.history));
  }
  onshowWorks(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(Action.showorks());
  }
  render() {
    return (
      <header>
        <div className="main clearfix">
          <div className="logo">
            <a href="#" title="JobBird">
              <img
                src="https://static.jobbird.com/images/jobbird.dbd67b881a4f7a6c5a6690118a3e8c02.svg"
                alt="JocialIO"
              />
            </a>
          </div>
          <div className="spacer_head">&nbsp;</div>
          <div className="search">
            <span className="sprite iconsearch"></span>
            <input type="Search" placeholder="Search" name="hello" />
          </div>

          <div className="buttonHolder inline-block how_it_works rainbow_button">
            <button
              //onClick={this.onshowWorks.bind(this)}
              className="button"
              id="myBtn"
            >
              Werkgevers
            </button>
          </div>
          <div className="buttonHolder inline-block how_it_works rainbow_button">
            <button
              //onClick={this.onshowWorks.bind(this)}
              className="button"
              id="myBtn"
            >
              Plaats je cv
            </button>
          </div>
        </div>
      </header>
    );
  }
}

export default connect(state => ({
  profile: state.profile,
  auth: state.auth
}))(withRouter(Header));
