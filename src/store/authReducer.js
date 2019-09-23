import {
  START_SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILED,
  CLEAR_MESSAGE
} from "./types";

const initialState = {
  idToken: null,
  refreshToken: null,
  loading: false,
  error: null,
  message: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_SIGN_UP:
      return {
        ...state,
        loading: true,
        error: null,
        message: null
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        message: "SignUp successful. Use Email & Password for sign in"
      };
    case SIGN_UP_FAILED: {
      return {
        idToken: null,
        refreshToken: null,
        loading: false,
        error: action.error,
        message: ""
      };
    }
    case CLEAR_MESSAGE: {
      return {
        ...state,
        message: null
      };
    }
    default:
      return state;
  }
};

export default authReducer;
