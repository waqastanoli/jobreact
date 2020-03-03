import React, { Component } from "react";
import { Route, Switch } from "react-router";

// PAGES //
import Home from "../pages/Home";
import ProductDetail from "../pages/ProductDetail";
//import Wishlist from '../pages/Wishlist';
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Signup from "../pages/Signup";
import Signin from "../pages/Signin";
import Pep from "../pages/contents/Pep";
import SoloTeam from "../pages/contents/SoloTeam";

import Press from "../pages/contents/Press";
import Reward from "../pages/contents/Reward";

import TECK from "../pages/contents/TECK";
import AdvisoryTeam from "../pages/contents/AdvisoryTeam";
import TopicDetail from "../pages/TopicDetail";
import Verification from "../pages/Verification";
import PositionForm from "../pages/PositionForm";
import PositionList from "../pages/PositionList";
// CONTAINERS //
import AppContainer from "../containers/AppContainer";
import MinimumContainer from "../containers/MinimumContainer";

// Routing in React.js //

export const renderRoutes = () => {
  return (
    <div>
      <Switch>
        <Route
          exact
          path="/"
          render={props => (
            <AppRoute Component={Signin} Layout={AppContainer} props={props} />
          )}
        />
        <Route
          exact
          path="/PositionForm"
          render={props => (
            <AppRoute
              Component={PositionForm}
              Layout={AppContainer}
              props={props}
            />
          )}
        />
        <Route
          exact
          path="/PositionList"
          render={props => (
            <AppRoute
              Component={PositionList}
              Layout={AppContainer}
              props={props}
            />
          )}
        />

        <Route
          exact
          path="/:userName"
          render={props => (
            <AppRoute Component={Home} Layout={AppContainer} props={props} />
          )}
        />
      </Switch>
    </div>
  );
};

// Structure according to separate page or any container over page etc //
const AppRoute = ({ Component, Layout, props, type }) => {
  if (Layout) {
    return (
      <Layout {...props} type={type}>
        <Component {...props} type={type} />
      </Layout>
    );
  } else if (!Component) {
    return <Layout {...props} type={type} />;
  } else {
    return <Component {...props} type={type} />;
  }
};
