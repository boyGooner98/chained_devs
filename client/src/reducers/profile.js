import {
  PROFILE_ADDED,
  PROFILE_FAIL,
  PROFILE_FOUND,
  CLEAR_PROFILE,
  EDUCATION_ADDED,
  EDUCATION_FAIL,
  EXPERIENCE_FAIL,
  EXPERIENCE_ADDED,
  EDUCATION_DELETED,
  EXPERIENCE_DELETED,
  ACCOUNT_DELETED,
  FOUND_ALL,
  GET_REPOS,
  FOUND_WITHID
} from '../types';
const initialState = {
  profile: null,
  profiles: [],
  currentUserProfile:[],
  repos: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case FOUND_WITHID:
      return {
        ...state,
        currentUserProfile: payload,
        loading:false
      }
    case PROFILE_FOUND:
    case PROFILE_ADDED:
    case EDUCATION_ADDED:
    case EXPERIENCE_ADDED:
    case EDUCATION_DELETED:
    case EXPERIENCE_DELETED:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case FOUND_ALL:
      return {
        ...state,
        profiles: payload,
        loading:false
      }
    case GET_REPOS:
      return {
        ...state,
        repos: payload,
        loading:false
      }
    case EXPERIENCE_FAIL:
    case EDUCATION_FAIL:
      return {
        ...state,
        loading: false,
      };
    case PROFILE_FAIL:
      return {
        ...state,
        profile: null,
        currentUserProfile:null,
        loading: false,
        error: payload,
      };
    case CLEAR_PROFILE:
    case ACCOUNT_DELETED:
      return {
        ...state,
        profile: null,
        loading: false,
        repos: [],
      };
    default:
      return state;
  }
}
