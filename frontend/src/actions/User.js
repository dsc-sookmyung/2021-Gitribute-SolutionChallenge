import axios from 'axios';
import { createMessage, returnErrors } from './Messages';
import { tokenConfig } from './Auth';

import { GET_STAR, DELETE_STAR, ADD_STAR, GET_CENTER, HANDLE_PAD } from './Types';

// GET STAR
export const getStar = () => (dispatch, getState) => {
  axios
    .get('/api/star/', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_STAR,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// DELETE STAR
export const deleteStar = () => (dispatch, getState) => {
  axios
    .delete(`/api/star/`, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ deleteStar: 'Star Deleted' }));
      dispatch({
        type: DELETE_STAR,
      });
    })
    .catch((err) => console.log(err));
};

// ADD STAR
export const addStar = (star) => (dispatch, getState) => {
  axios
    .post('/api/star/', star, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ addStar: 'Star Added' }));
      dispatch({
        type: ADD_STAR,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const getCenter = () => (dispatch, getState) => {
  axios
    .get('/api/center/', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_CENTER,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const handlePad = () => (dispatch, getState) => {
  axios
    .get('/api/center/', tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ handlePad: 'Pad number changed' }));
      dispatch({
        type: HANDLE_PAD,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};
