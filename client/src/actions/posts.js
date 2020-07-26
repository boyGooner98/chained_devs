import axios from 'axios';
import {
  POSTS_FOUND,
  POSTS_ERROR,
  POST_DELETED,
  POST_DELETION_ERROR,
  LIKE_ADDED,
  LIKE_ERROR,
  LIKE_REMOVED,
  LIKE_REMOVE_FAIL,
  POST_ADDED,
  POST_FAIL,
  COMMENT_ADDED,
  COMMENT_FAIL,
  POST_FOUND,
  POST_ERROR,
  COMMENT_DELETED,
  COMMENT_DELETION_ERROR,
} from '../types';
import { setAlert } from './alert';

export const getPosts = () => async (dispatch) => {
  try {
    const response = await axios.get('/api/posts/all');
    dispatch({
      type: POSTS_FOUND,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: POSTS_ERROR,
      payload: err,
    });
    dispatch(setAlert('NO POSTS AVAILABLE', 'danger'));
  }
};

export const delPost = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/posts/delete/${id}`);
    dispatch({
      type: POST_DELETED,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: POST_DELETION_ERROR,
    });
  }
};

export const addLike = (id) => async (dispatch) => {
  try {
    const response = await axios.put(`/api/posts/likes/${id}`);
    dispatch({
      type: LIKE_ADDED,
      payload: {
        id: id,
        likes: response.data,
      },
    });
  } catch (err) {
    dispatch({
      type: LIKE_ERROR,
      payload: err,
    });
  }
};

export const removeLike = (id) => async (dispatch) => {
  try {
    const response = await axios.put(`/api/posts/unlikes/${id}`);
    dispatch({
      type: LIKE_REMOVED,
      payload: {
        id: id,
        likes: response.data,
      },
    });
  } catch (err) {
    dispatch({
      type: LIKE_REMOVE_FAIL,
      payload: err,
    });
  }
};

export const addPost = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.post(`/api/posts/`, formData, config);
    dispatch({
      type: POST_ADDED,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: POST_FAIL,
      payload: err,
    });
  }
};

export const addComment = (formData, id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.post(
      `/api/posts/comments/${id}`,
      formData,
      config
    );
    dispatch({
      type: COMMENT_ADDED,
      payload: {
        id,
        comments: response.data,
      },
    });
  } catch (err) {
    dispatch({
      type: COMMENT_FAIL,
      payload: err,
    });
  }
};

export const getCurrentPost = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/posts/onePost/${id}`);
    dispatch({
      type: POST_FOUND,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err,
    });
  }
};

export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `/api/posts/comments/remove/${postId}/${commentId}`
    );
    dispatch({
      type: COMMENT_DELETED,
      payload: commentId,
    });
  } catch (err) {
    dispatch({
      type: COMMENT_DELETION_ERROR,
      payload: err,
    });
  }
};
