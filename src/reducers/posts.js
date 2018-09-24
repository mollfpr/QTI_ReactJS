import { FETCH_POSTS } from "../actions/postActions";

const initialState = {
  posts: []
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        posts: action.payload.posts
      };

    default:
      return state;
  }
};

export default postReducer;
