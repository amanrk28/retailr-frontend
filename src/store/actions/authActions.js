import * as aT from '../actionTypes/authActionTypes';
import { signupApi, loginApi } from '../../common/api';
import { EMAIL_REGEX } from 'utils/utils';
import { setAuthToken, clearAllStorages } from 'utils/localStorage';

const set_user = data => ({
  type: aT.SET_USER,
  data,
});

const set_token = data => ({
  type: aT.SET_TOKEN,
  data,
});

export const setAuthCredentials = data => {
  return dispatch => {
    if (data.token) {
      setAuthToken(data.token);
      dispatch(set_token(data.token));
    }
    if (data.user) dispatch(set_user(data.user));
  };
};

export const signupUser = req_data => {
  return dispatch => {
    const { email, phone_number, password } = req_data;
    const emailRegex = new RegExp(EMAIL_REGEX);

    if (phone_number.length !== 10)
      return console.log('Incorrect Phone Number. Try again');

    if (email && !emailRegex.test(email.trim()))
      return console.log('Incorrect Email. Try again');

    if (!password)
      return console.log('Password not provided. Cannot create user');

    signupApi(req_data)
      .then(res => {
        const { status, data, msg } = res;
        if (!status) throw msg;
        dispatch(setAuthCredentials(data));
      })
      .catch(err => console.log(err));
  };
};

export const loginUser = req_data => {
  return dispatch => {
    const { email, password } = req_data;
    const emailRegex = new RegExp(EMAIL_REGEX);
    if (!email || !password || (email && !emailRegex.test(email.trim())))
      return console.log('Invalid/ Incomplete Credentials provided');

    loginApi(req_data)
      .then(res => {
        const { status, data, msg } = res;
        if (!status) throw msg;
        dispatch(setAuthCredentials(data));
      })
      .catch(err => console.log(err));
  };
};

export const logout = () => {
  return dispatch => {
    clearAllStorages();
  };
};