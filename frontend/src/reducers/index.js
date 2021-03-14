import { combineReducers } from 'redux';
import errors from './Errors';
import messages from './Messages';
import auth from './Auth';

export default combineReducers({
  errors,
  messages,
  auth,
});
