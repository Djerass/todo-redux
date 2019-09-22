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
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(load_todos());
  }, [dispatch]);
  const submitHandler = text => dispatch(plus_todo(text));
  const removeHandler = id => dispatch(delete_todo(id));
  const completeHandler = id => dispatch(change_completed(id));
  const importanceHandler = id => dispatch(change_importance(id));
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
