import React from "react";
import PropTypes from "prop-types";

import Post from "./Post";

const PostList = ({ posts, handleDelete, history, match }) => (
  <React.Fragment>
    {posts.map((post, index) => (
      <Post
        key={index}
        post={post}
        handleDelete={handleDelete}
        history={history}
        match={match}
      />
    ))}
  </React.Fragment>
);

PostList.propTypes = {
  posts: PropTypes.array,
  handleDelete: PropTypes.func,
  history: PropTypes.object
};

export default PostList;
