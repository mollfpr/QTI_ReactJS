import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class Post extends Component {
  state = {
    post: {}
  };

  static propTypes = {
    post: PropTypes.object,
    handleDelete: PropTypes.func,
    history: PropTypes.object
  };

  componentDidMount() {
    if (this.props.match.params.id) {
      console.log("mounted");
      this.getPost(this.props.match.params.id);
    } else {
      this.setState({ post: this.props.post });
    }
  }

  getPost(id) {
    console.log("get");
    fetch(`http://localhost:8000/api/posts/${id}`, {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${localStorage.getItem("token")}`
      })
    })
      .then(res => res.json())
      .then(json => this.setState({ post: json.success.posts }));
  }

  render() {
    return (
      <React.Fragment>
        <div className="post-preview">
          <Link to={`/posts/${this.state.post ? this.state.post.id : null}`}>
            <h2 className="post-title">
              {this.state.post ? this.state.post.title : null}
            </h2>
            <h3 className="post-subtitle">
              {this.state.post ? this.state.post.content : null}
            </h3>
          </Link>
          <p className="post-meta">
            <div className="row">
              <button
                className="btn btn-default"
                style={{ padding: 15 }}
                onClick={() => this.props.handleDelete(this.state.post.id)}
              >
                <span className="fa fa-trash" />
              </button>
              <button
                className="btn btn-default"
                style={{ padding: 15 }}
                onClick={() =>
                  this.props.history.push(`/posts/${this.state.post.id}/edit`)
                }
              >
                <span className="fa fa-pen" />
              </button>
            </div>
          </p>
        </div>
        <hr />
      </React.Fragment>
    );
  }
}

export default Post;
