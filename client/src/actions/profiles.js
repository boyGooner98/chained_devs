import { PROFILE_ADDED, PROFILE_FAIL, PROFILE_FOUND, LOGOUT,GET_REPOS,FOUND_ALL,FOUND_WITHID,EDUCATION_ADDED,ACCOUNT_DELETED,EDUCATION_FAIL,EXPERIENCE_ADDED,EXPERIENCE_DELETED,EDUCATION_DELETED,EXPERIENCE_FAIL,DELETE_ACCOUNT,DELETE_PROFILE } from '../types';
import { setAlert } from './alert';
import axios from 'axios';
import { loadUser } from './auth';
//FINDING THE CURRENT LOGGED IN USER PROFILE
export const findProfile = () => async (dispatch) => {
  try {
    const response = await axios.get('/api/profiles/me');
    dispatch({
      type: PROFILE_FOUND,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_FAIL,
    });
  }
};
//CREATE OR EDIT PROFILE ACTION
export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post('/api/profiles/', formData, config);
    dispatch({
      type: PROFILE_ADDED,
      payload: res.data,
    });
    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile created', 'success'));
    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//ADDING EDUCATION TO THE PROFILE

export const addEducation = (formData, history) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axios.put('/api/profiles/education', formData, config)
    dispatch({
      type: EDUCATION_ADDED,
      payload:response
    })
    dispatch(setAlert('education added to profile','success'));
     history.push('/dashboard');
  } catch (err) {
    dispatch({
      type: EDUCATION_FAIL
    })
  }
};

//ADDING EXPERIENCE TO THE PROFILE
export const addExperience = (formData, history) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axios.put(
      '/api/profiles/experience',
      formData,
      config
    );
    dispatch({
      type: EXPERIENCE_ADDED,
      payload: response,
    });
    dispatch(setAlert('experience added to profile', 'success'));
    history.push('/dashboard');
  } catch (err) {
    dispatch({
      type: EXPERIENCE_FAIL,
    });
  }
};

//DELETE EDUCATION 

export const deleteEducation = (id) => async dispatch => {
  const response = await axios.delete(`/api/profiles/education/delete/${id}`);
  dispatch({
    type: EDUCATION_DELETED,
    payload:response.data
  })
  dispatch(setAlert('Education has been deleted'))
}
export const deleteExperience = (id) => async (dispatch) => {
  const response = await axios.delete(`/api/profiles/experience/delete/${id}`);
  dispatch({
    type: EXPERIENCE_DELETED,
    payload: response.data,
  });
  dispatch(setAlert('Experience has been deleted'));
};

//DELETE PROFILE AND THE USER ASSOCIATED WITH IT

export const deleteAccount = () => async dispatch => {
  if (window.confirm('are you sure?This cannot be undone!')) {
   const response = await axios.delete('/api/profiles/delete');
   dispatch({
     type: ACCOUNT_DELETED,
   });
   dispatch(setAlert('Account Successfully deleted', 'success')); 
  }
  
}

//GET ALL PROFILES
export const getAllProfiles = () => async dispatch => {
  try {
    console.log("this is called")
    const res = await axios.get('/api/profiles/getAllProfiles');
    dispatch({
      type: FOUND_ALL,
      payload:res.data
    })
  } catch (err) {
    dispatch({
      type:PROFILE_FAIL
    })
  }
}
//GET A SINGLE PROFILE BY USERID
export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profiles/${userId}`);
    dispatch({
      type: FOUND_WITHID,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_FAIL,
    });
  }
};
export const getRepos = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profiles/github/${username}`);
    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_FAIL,
    });
  }
};