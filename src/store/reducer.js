import {
  ADD_TODO,
  REMOVE_TODO,
  SWAP_IMPORTANCE,
  SWAP_COMPLETED,
  SET_TODOS
} from "./types";

const initialState = {
  todos: []
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: action.id,
            text: action.text,
            completed: false,
            important: false,
            date: action.date
          }
        ]
      };
    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.id)
      };
    case SWAP_IMPORTANCE:
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id === action.id) {
            todo.important = !todo.important;
          }
          return todo;
        })
      };
    case SWAP_COMPLETED:
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id === action.id) {
            todo.completed = !todo.completed;
          }
          return todo;
        })
      };
    case SET_TODOS:
      return {
        ...state,
        todos: action.todos
      };
    default:
      return state;
  }
};

export default todoReducer;
