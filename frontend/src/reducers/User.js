import { GET_STAR, DELETE_STAR, ADD_STAR, GET_CENTER, HANDLE_PAD } from '../actions/Types';

const initialState = {
  star: "",
  center: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_STAR:
      return {
        ...state,
        star: action.payload,
      };
    case DELETE_STAR:
      return {
        ...state,
        star: state.star.filter((star) => star.id !== action.payload),
      };
    case ADD_STAR:
      return {
        ...state,
        star: [...state.star, action.payload],
      };
    case GET_CENTER:
      return {
        ...state,
        pad: [...state.center, action.payload],
      };
    case HANDLE_PAD:
      return {
        ...state,
        pad: [...state.pad, action.payload],
      };
    default:
      return state;
  }
}
