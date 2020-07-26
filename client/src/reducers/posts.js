import {
  POSTS_FOUND,
  POSTS_ERROR,
  POST_DELETION_ERROR,
  POST_DELETED,
  LIKE_ADDED,
  LIKE_ERROR,
  LIKE_REMOVED,
  LIKE_REMOVE_FAIL,
  POST_ADDED,
  COMMENT_ADDED,
  COMMENT_FAIL,
  POST_ERROR,
  POST_FOUND,
  COMMENT_DELETION_ERROR,
  COMMENT_DELETED,
} from '../types';

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  const { posts, post } = state;
  switch (type) {
    case POSTS_FOUND:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case POSTS_ERROR:
      return {
        ...state,
        posts: [],
        loading: false,
      };
    case POST_DELETION_ERROR: {
      return state;
    }
    case POST_DELETED:
      return {
        ...state,
        posts: posts.filter((post) => post._id !== payload),
      };
    case POST_ADDED:
      return {
        ...state,
        posts: [payload, ...posts],
      };
    case POSTS_ERROR:
      return {
        ...state,
        error: payload,
      };
    case LIKE_ADDED:
    case LIKE_REMOVED:
      return {
        ...state,
        posts: posts.map((post) =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
      };
    case LIKE_REMOVE_FAIL:
    case LIKE_ERROR:
    case COMMENT_FAIL:
    case POST_ERROR:
    case COMMENT_DELETION_ERROR:
      return {
        ...state,
        error: payload,
      };
    case COMMENT_ADDED:
      return {
        ...state,
        posts: posts.map((post) =>
          post._id === payload.id
            ? { ...post, comments: payload.comments }
            : post
        ),
        post: { ...post, comments: payload.comments },
      };
    case POST_FOUND:
      return {
        ...state,
        post: payload,
      };
    case COMMENT_DELETED:
      return {
        ...state,
        post: {
          ...post,
          comments: post.comments.filter((comment) => comment._id !== payload),
        },
      };
    default:
      return state;
  }
}
