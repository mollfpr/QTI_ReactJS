import React, { Fragment } from "react";
import PropTypes from "prop-types";

import Navigation from "./Navigation";
import Header from "./Header";
import Footer from "./Footer";

const Container = ({ children, history }) => (
  <Fragment>
    <Navigation
      doLogout={() => {
        localStorage.removeItem("token");
        history.push("/login");
      }}
    />
    <Header />
    {children}
    <Footer />
  </Fragment>
);

PropTypes.Container = {
  doLogout: PropTypes.func,
  children: PropTypes.object
};

export default Container;
