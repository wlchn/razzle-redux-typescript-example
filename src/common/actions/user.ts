import axios from 'axios';
import { _env } from '../lib/env';

export const fetchUser = username => {
  return async (dispatch, getState) => {
    const res = await axios.get(`${_env.PROJECT_API_URL}/users/${username}`);
    const data = res.data;
    dispatch(setUser(data));
  };
};

export const setUser = user => {
  return {
    type: 'SET_USER',
    payload: {
      user
    }
  };
};
