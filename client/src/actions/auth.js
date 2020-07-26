import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_FAIL,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAR_PROFILE
} from '../types';
import axios from 'axios';
import { setAlert } from './alert';
import setUserToken from '../helper/helper';
import { findProfile } from './profiles'

export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post(
      'http://localhost:3000/api/user/register',
      body,
      config
    );
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    loadUser();

  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

export const login = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post(
      'http://localhost:3000/api/auth/login',
      body,
      config
      );
    console.log(res.data);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    loadUser();
    
  } catch (err) {
      console.log(err);
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const logout = () => dispatch => {
  dispatch({
    type:LOGOUT
  })
  dispatch({
    type:CLEAR_PROFILE
  })
}

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setUserToken(localStorage.token);
  }
    if (localStorage.token) {
        try {
            const res = await axios.get('/api/auth/');
            dispatch({
                type: USER_LOADED,
              payload: {
                token: localStorage.token,
                user:res.data
                }
            });
        } catch (err) {
            dispatch({
                type: AUTH_FAIL,
            });
        }
    }
    else {
          dispatch({
            type: AUTH_FAIL,
          });
    }
};
