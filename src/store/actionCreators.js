import {
  ADD_TODO,
  REMOVE_TODO,
  SWAP_IMPORTANCE,
  SWAP_COMPLETED,
  SET_TODOS,
  START_SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILED,
  CLEAR_MESSAGE
} from "./types";
import nanoid from "nanoid";
import axios from "axios";

const apiKey = "AIzaSyBDrOXpi-yT08nHJf268FmNkK3Pp0cGxqI";
const authURL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;

// AUTH
const start_sign_up = () => ({ type: START_SIGN_UP });
const sign_up_falied = error => ({ type: SIGN_UP_FAILED, error });
const sign_up_success = () => ({ type: SIGN_UP_SUCCESS });
const clear_message = () => ({ type: CLEAR_MESSAGE });

export const sign_up = (email, password, cb) => {
  return dispatch => {
    dispatch(start_sign_up());
    axios
      .post(authURL, {
        email,
        password,
        returnSecureToken: true
      })
      .then(response => {
        dispatch(sign_up_success());
        cb();
        setTimeout(() => dispatch(clear_message()), 10000);
      })
      .catch(err => {
        dispatch(sign_up_falied(err.response.data.error.message));
      });
  };
};

// TODO
const add_todo = (id, text, date) => ({
  type: ADD_TODO,
  id,
  text,
  date
});

const remove_todo = id => ({ type: REMOVE_TODO, id });
const swap_importance = id => ({ type: SWAP_IMPORTANCE, id });
const swap_completed = id => ({ type: SWAP_COMPLETED, id });
const set_todos = todos => ({ type: SET_TODOS, todos });

export const change_importance = id => {
  return (dispatch, getState) => {
    dispatch(swap_importance(id));
    localStorage.setItem("todos228", JSON.stringify(getState().todoReducer));
  };
};

export const change_completed = id => {
  return (dispatch, getState) => {
    dispatch(swap_completed(id));
    localStorage.setItem("todos228", JSON.stringify(getState().todoReducer));
  };
};

export const delete_todo = id => {
  return (dispatch, getState) => {
    dispatch(remove_todo(id));
    localStorage.setItem("todos228", JSON.stringify(getState().todoReducer));
  };
};

export const plus_todo = text => {
  return (dispatch, getState) => {
    const date = new Date();
    const id = nanoid();
    dispatch(add_todo(id, text, date));
    localStorage.setItem("todos228", JSON.stringify(getState().todoReducer));
  };
};

export const load_todos = () => {
  return dispatch => {
    const local = JSON.parse(localStorage.getItem("todos228"));
    if (local && local.todos) {
      const todos = local.todos.map(todo => {
        todo.date = new Date(todo.date);
        return todo;
      });
      dispatch(set_todos(todos));
    }
  };
};
