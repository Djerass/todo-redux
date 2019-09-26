import {
  ADD_TODO,
  REMOVE_TODO,
  SWAP_IMPORTANCE,
  SWAP_COMPLETED,
  SET_TODOS,
  START_SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILED,
  CLEAR_MESSAGE,
  START_SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILED,
  LOGOUT
} from "./types";
import nanoid from "nanoid";
import axios from "axios";

const apiKey = "AIzaSyBDrOXpi-yT08nHJf268FmNkK3Pp0cGxqI";
const signUpURL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;
const signInURL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;

// <AUTH>

// <SIGN_UP>
const start_sign_up = () => ({ type: START_SIGN_UP });
const sign_up_falied = error => ({ type: SIGN_UP_FAILED, error });
const sign_up_success = () => ({ type: SIGN_UP_SUCCESS });
const clear_message = () => ({ type: CLEAR_MESSAGE });

export const sign_up = (email, password, cb) => {
  return dispatch => {
    dispatch(start_sign_up());
    axios
      .post(signUpURL, {
        email,
        password,
        returnSecureToken: true
      })
      .then(() => {
        dispatch(sign_up_success());
        cb();
        setTimeout(() => dispatch(clear_message()), 10000);
      })
      .catch(err => {
        dispatch(sign_up_falied(err.response.data.error.message));
      });
  };
};
// </SIGN_UP>

// <SIGN_IN>
const start_sign_in = () => ({ type: START_SIGN_IN });
const sign_in_success = (idToken, refreshToken, email, localId, expiresIn) => ({
  type: SIGN_IN_SUCCESS,
  idToken,
  refreshToken,
  email,
  localId,
  expiresIn
});
const sign_in_failed = error => ({ type: SIGN_IN_FAILED, error });
export const logout = () => ({ type: LOGOUT });
export const sign_in = (email, password, cb) => {
  return dispatch => {
    dispatch(start_sign_in());
    axios
      .post(signInURL, {
        email,
        password,
        returnSecureToken: true
      })
      .then(response => {
        const {
          idToken,
          refreshToken,
          email,
          localId,
          expiresIn
        } = response.data;
        dispatch(
          sign_in_success(idToken, refreshToken, email, localId, expiresIn)
        );
        setTimeout(() => dispatch(logout()), expiresIn * 1000);
        cb();
      })
      .catch(err => {
        dispatch(sign_in_failed(err.response.data.error.message));
      });
  };
};
// </SIGN_IN>

// </AUTH>

// <TODO>

const add_todo = todo => ({ type: ADD_TODO, todo });
const remove_todo = id => ({ type: REMOVE_TODO, id });
const swap_importance = id => ({ type: SWAP_IMPORTANCE, id });
const swap_completed = id => ({ type: SWAP_COMPLETED, id });
const set_todos = todos => ({ type: SET_TODOS, todos });

// export const change_importance = id => {
//   return (dispatch, getState) => {
//     dispatch(swap_importance(id));
//     localStorage.setItem("todos228", JSON.stringify(getState().todoReducer));
//   };
// };

// export const change_completed = id => {
//   return (dispatch, getState) => {
//     dispatch(swap_completed(id));
//     localStorage.setItem("todos228", JSON.stringify(getState().todoReducer));
//   };
// };

// export const delete_todo = (id, fireId) => {
//   return (dispatch, getState) => {
//     dispatch(remove_todo(id));
//     localStorage.setItem("todos228", JSON.stringify(getState().todoReducer));
//   };
// };

// export const plus_todo = text => {
//   return (dispatch, getState) => {
//     const date = new Date();
//     const id = nanoid();
//     dispatch(add_todo(id, text, date));
//     localStorage.setItem("todos228", JSON.stringify(getState().todoReducer));
//   };
// };

// export const load_todos = () => {
//   return dispatch => {
//     const local = JSON.parse(localStorage.getItem("todos228"));
//     if (local && local.todos) {
//       const todos = local.todos.map(todo => {
//         todo.date = new Date(todo.date);
//         return todo;
//       });
//       dispatch(set_todos(todos));
//     }
//   };
// };

export const change_importance = (id, newValue, fireId, token) => {
  return dispatch => {
    dispatch(swap_importance(id));
    const todoURL = `https://evernote-clone-1bb19.firebaseio.com/todos/${fireId}/.json?auth=${token}`;
    axios
      .patch(todoURL, { important: newValue })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };
};

export const change_completed = (id, newValue, fireId, token) => {
  return dispatch => {
    dispatch(swap_completed(id));
    const todoURL = `https://evernote-clone-1bb19.firebaseio.com/todos/${fireId}/.json?auth=${token}`;
    axios
      .patch(todoURL, { completed: newValue })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };
};

export const delete_todo = (id, fireId, token) => {
  return dispatch => {
    dispatch(remove_todo(id));
    const todoURL = `https://evernote-clone-1bb19.firebaseio.com/todos/${fireId}.json?auth=${token}`;
    axios
      .delete(todoURL)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };
};

export const plus_todo = (text, token, userId) => {
  return dispatch => {
    const dbURL =
      "https://evernote-clone-1bb19.firebaseio.com/todos.json?auth=";
    console.log(userId);
    const todo = {
      id: nanoid(),
      text: text,
      completed: false,
      important: false,
      date: new Date(),
      userId
    };
    const todoURL = dbURL + token;
    axios
      .post(todoURL, todo)
      .then(response => {
        console.log(response);
        const fireId = response.data.name;
        todo.fireId = fireId;
        dispatch(add_todo(todo));
      })
      .catch(err => console.log(err.response.data.error.message));
  };
};

export const load_todos = (token, userId) => {
  return dispatch => {
    const todoURL = `https://evernote-clone-1bb19.firebaseio.com/todos.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
    axios
      .get(todoURL)
      .then(response => {
        console.log(response.data);
        const todos = [];
        const todoObj = response.data;
        for (let i in todoObj) {
          console.log(todoObj[i]);
          const todo = {
            ...todoObj[i],
            date: new Date(todoObj[i].date),
            fireId: i
          };
          todos.push(todo);
        }
        dispatch(set_todos(todos));
      })
      .catch(err => {
        console.log(err.response.data.error.message);
      });
  };
};

// </TODO>
