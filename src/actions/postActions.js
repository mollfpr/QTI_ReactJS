export const FETCH_POSTS = "FETCH_POSTS";
export const DELETE_POST = "DELETE_POST";
export const GET_POST = "GET_POST";

export const fetchPosts = posts => ({
  type: FETCH_POSTS,
  payload: { posts }
});

export const deletePost = id => ({
  type: DELETE_POST,
  id
});

export const getPost = id => ({
  type: GET_POST,
  id
});
