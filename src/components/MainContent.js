import React from "react";
import PropTypes from "prop-types";

import PostList from "./PostList";

const MainContent = ({ posts, handleDelete, onSearching, history, match }) => (
  <div className="container">
    <div className="row">
      <div className="col-lg-8 col-md-10 mx-auto">
        <div className="row">
          <div className="col-md-9">
            <input
              onChange={onSearching}
              className="form-control"
              style={{ width: "100%" }}
              placeholder="Search..."
            />
          </div>
          <div className="col-md-3">
            <button type="button" className="btn btn-outline-dark" onClick={() => history.push('/posts/add')}>New Post</button>
          </div>
        </div>
        <PostList posts={posts} handleDelete={handleDelete} history={history} match={match} />
      </div>
    </div>
  </div>
);

MainContent.propTypes = {
  posts: PropTypes.array,
  handleDelete: PropTypes.func,
  history: PropTypes.object
};

export default MainContent;
