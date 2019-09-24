import {
  START_SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILED,
  CLEAR_MESSAGE,
  START_SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILED,
  LOGOUT
} from "./types";

const initialState = {
  idToken: null,
  refreshToken: null,
  localId: null,
  email: null,
  loading: false,
  error: null,
  message: null,
  expiresIn: null
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
        ...state,
        error: action.error
      };
    }
    case CLEAR_MESSAGE: {
      return {
        ...state,
        message: null
      };
    }
    case START_SIGN_IN: {
      return {
        ...state,
        loading: true
      };
    }
    case SIGN_IN_SUCCESS: {
      return {
        ...state,
        idToken: action.idToken,
        refreshToken: action.refreshToken,
        email: action.email,
        localId: action.localId,
        expiresIn: action.expiresIn,
        loading: false
      };
    }
    case SIGN_IN_FAILED: {
      return {
        ...state,
        loading: false,
        error: action.error
      };
    }
    case LOGOUT: {
      return { ...initialState };
    }
    default:
      return state;
  }
};

export default authReducer;
