import { START_SIGN_UP, SIGN_UP_SUCCESS, SIGN_UP_FAILED } from "./types";

const initialState = {
  idToken: null,
  refreshToken: null,
  loading: false,
  error: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_SIGN_UP:
      return {
        ...state,
        loading: true
      };
    case SIGN_UP_SUCCESS:
      return {
        idToken: action.idToken,
        refreshToken: action.refreshToken,
        loading: false,
        error: null
      };
    case SIGN_UP_FAILED: {
      return {
        idToken: null,
        refreshToken: null,
        loading: false,
        errror: action.errror
      };
    }
    default:
      return state;
  }
};

export default authReducer;
