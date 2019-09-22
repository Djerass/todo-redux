import {
  ADD_TODO,
  REMOVE_TODO,
  SWAP_IMPORTANCE,
  SWAP_COMPLETED,
  SET_TODOS
} from "./types";
import nanoid from "nanoid";

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
    localStorage.setItem("todos228", JSON.stringify(getState()));
  };
};

export const change_completed = id => {
  return (dispatch, getState) => {
    dispatch(swap_completed(id));
    localStorage.setItem("todos228", JSON.stringify(getState()));
  };
};

export const delete_todo = id => {
  return (dispatch, getState) => {
    dispatch(remove_todo(id));
    localStorage.setItem("todos228", JSON.stringify(getState()));
  };
};

export const plus_todo = text => {
  return (dispatch, getState) => {
    const date = new Date();
    const id = nanoid();
    dispatch(add_todo(id, text, date));
    localStorage.setItem("todos228", JSON.stringify(getState()));
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
