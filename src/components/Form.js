import React, { Component } from "react";
import PropTypes from "prop-types";

class Form extends Component {
  state = {
    post: {
      title: null,
      content: null
    }
  };

  titleRef = React.createRef();
  contentRef = React.createRef();

  static propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object,
    handleFetching: PropTypes.func
  };

  componentDidMount() {
    if (this.props.match.params) {
      if (this.props.match.params.id) {
        fetch(`http://localhost:8000/api/posts/${this.props.match.params.id}`, {
          metdod: "GET",
          headers: new Headers({
            Authorization: `Bearer ${localStorage.getItem("token")}`
          })
        })
          .then(res => res.json())
          .catch(e => console.log(e))
          .then(json => {
            if (json) {
              if (json.success) {
                this.setState({
                  post: {
                    title: json.success.posts.title,
                    content: json.success.posts.content
                  }
                });
              }
            }
          });
      }
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    let formData = JSON.stringify({
      title: this.titleRef.current.value,
      content: this.contentRef.current.value
    });

    let url, options;
    if (this.props.match.params.id) {
      url = `http://localhost:8000/api/posts/${this.props.match.params.id}`;
      options = {
        method: "PUT",
        body: formData,
        headers: new Headers({
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
        })
      };
    } else {
      url = `http://localhost:8000/api/posts`;
      options = {
        method: "POST",
        body: formData,
        headers: new Headers({
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
        })
      };
    }

    fetch(url, options)
      .then(res => res.json())
      .catch(e => console.log(e))
      .then(json => console.log(json))
      .catch(e => console.log(e));

    fetch(`http://localhost:8000/api/posts`, {
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
            this.props.handleFetching(json.success.posts);
          }
        }
      });

    this.props.history.push("/");
  };

  render() {
    return (
      <div className="row">
        <div className="col-lg-8 col-md-10 mx-auto">
          <h1>{this.props.match.params.id ? `Edit Post` : `New Post`}</h1>
          <form onSubmit={this.handleSubmit}>
            <label className="control-label">Title</label>
            <input
              type="text"
              ref={this.titleRef}
              className="form-control"
              style={{ marginTop: 10, marginBottom: 10 }}
              defaultValue={this.state.post.title}
            />
            <label className="control-label">Content</label>
            <input
              type="text"
              ref={this.contentRef}
              className="form-control"
              style={{ marginTop: 10, marginBottom: 10 }}
              defaultValue={this.state.post.content}
            />
            <button
              type="submit"
              className="btn btn-primary"
              style={{ marginTop: 10, marginBottom: 10 }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Form;
