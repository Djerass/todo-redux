import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  plus_todo,
  change_importance,
  change_completed,
  delete_todo,
  load_todos
} from "../store/actionCreators";
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";

const Home = () => {
  const todos = useSelector(state => state.todoReducer.todos);
  const token = useSelector(state => state.authReducer.idToken);
  const userId = useSelector(state => state.authReducer.localId);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(load_todos(token, userId));
  }, [dispatch, token, userId]);
  const submitHandler = text => dispatch(plus_todo(text, token, userId));
  const removeHandler = (id, fireId) =>
    dispatch(delete_todo(id, fireId, token));
  const completeHandler = (id, fireId, newValue) =>
    dispatch(change_completed(id, newValue, fireId, token));
  const importanceHandler = (id, fireId, newValue) =>
    dispatch(change_importance(id, newValue, fireId, token));
  return (
    <>
      <AddTodoForm submit={submitHandler} />
      <TodoList
        todos={todos}
        remove={removeHandler}
        complete={completeHandler}
        important={importanceHandler}
      />
    </>
  );
};

export default Home;
