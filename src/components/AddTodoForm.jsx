import React, { useState } from "react";
import { Input, FormControl, FormHelperText } from "@material-ui/core";

const AddTodoForm = ({ submit }) => {
  const [text, setText] = useState("");
  const [error, setError] = useState(false);
  const submitHandler = e => {
    e.preventDefault();
    if (text) {
      submit(text);
      setText("");
    } else {
      setError(true);
    }
  };
  const changeHandler = e => {
    setError(false);
    setText(e.target.value);
  };
  return (
    <form onSubmit={submitHandler}>
      <FormControl style={{ width: "100%", margin: "1rem 0" }} error={error}>
        <Input
          placeholder="Add todo"
          value={text}
          onChange={changeHandler}
          error={error}
          inputProps={{
            "aria-label": "description"
          }}
        />
        {error ? (
          <FormHelperText id="component-error-text">Input todo</FormHelperText>
        ) : null}
      </FormControl>
    </form>
  );
};

export default AddTodoForm;
