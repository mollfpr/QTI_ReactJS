import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect, withRouter, Switch } from "react-router-dom";

// import Navigation from "./Navigation";
// import Header from "./Header";
import MainContent from "./MainContent";
// import Footer from "./Footer";
import Container from "./Container";
import Login from "./Login";
import Form from "./Form";
import Post from "./Post";

import { fetchPosts } from "../actions/postActions";

class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    history: PropTypes.object,
    posts: PropTypes.array
  };

  componentDidMount() {
    this.filteredList();
  }

  filteredList = (keyword = "") => {
    fetch(`http://localhost:8000/api/posts?search=${keyword}`, {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${localStorage.getItem("token")}`
      })
    })
      .then(res => res.json())
      .catch(e => console.log(e))
      .then(json => {
        if (json) {
          if (json.success) {
            this.props.dispatch(fetchPosts(json.success.posts));
          }
        }
      });
  };

  handleFetching = data => {
    console.log(data);
    this.props.dispatch(fetchPosts(data));
  };

  handleInputChange = event => {
    this.filteredList(event.target.value);
  };

  handleDelete = id => {
    fetch(`http://localhost:8000/api/posts/${id}`, {
      method: "DELETE",
      headers: new Headers({
        Authorization: `Bearer ${localStorage.getItem("token")}`
      })
    })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.filteredList();
        }
      });
  };

  render() {
    return (
      <Switch>
        {/* <Navigation doLogout={this.doLogout} /> */}
        {/* <Header /> */}
        {/* <MainContent
          posts={this.props.posts}
          handleDelete={this.handleDelete}
          onSearching={this.handleInputChange}
          history={this.props.history}
        /> */}
        <Route
          exact
          path="/"
          render={props =>
            localStorage.getItem("token") ? (
              <Container {...props}>
                <MainContent
                  posts={this.props.posts}
                  handleDelete={this.handleDelete}
                  onSearching={this.handleInputChange}
                  {...props}
                />
              </Container>
            ) : (
              <Redirect to={{ pathname: "/login" }} />
            )
          }
        />
        <Route
          exact
          path="/posts/:id/edit"
          render={props =>
            localStorage.getItem("token") ? (
              <Container {...props}>
                <Form handleFetching={this.handleFetching} {...props} />
              </Container>
            ) : (
              <Redirect to={{ pathname: "/login" }} />
            )
          }
        />
        <Route
          exact
          path="/posts/add"
          render={props =>
            localStorage.getItem("token") ? (
              <Container {...props}>
                <Form handleFetching={this.handleFetching} {...props} />
              </Container>
            ) : (
              <Redirect to={{ pathname: "/login" }} />
            )
          }
        />
        <Route
          exact
          path="/posts/:id"
          render={props =>
            localStorage.getItem("token") ? (
              <Container {...props}>
                <div className="container">
                  <div className="row">
                    <div className="col-lg-8 col-md-10 mx-auto">
                      <Post {...props} />
                    </div>
                  </div>
                </div>
              </Container>
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Route
          path="/login"
          render={props =>
            !localStorage.getItem("token") ? (
              <Login {...props} />
            ) : (
              <Redirect to={{ pathname: "/" }} />
            )
          }
        />
        {/* <PublicRoute path="/login" component={Login} /> */}
        {/* <hr /> */}
        {/* <Footer /> */}
      </Switch>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts.posts
});

export default withRouter(connect(mapStateToProps)(App));
