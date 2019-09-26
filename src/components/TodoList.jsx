import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import FolderIcon from "@material-ui/icons/Flag";

const iconColor = important => (important ? "red" : "#343a40");
const lineThrough = completed => (completed ? "line-through" : "inherit");

const TodoList = ({ todos, remove, complete, important }) => {
  const [dense] = useState(false);
  const [secondary] = useState(true);
  return (
    <List dense={dense}>
      {todos.map(todo => (
        <ListItem key={todo.id}>
          <ListItemAvatar>
            <IconButton
              edge="start"
              aria-label="delete"
              onClick={() => important(todo.id, todo.fireId, !todo.important)}
            >
              <Avatar
                style={{
                  background: "transparent",
                  color: iconColor(todo.important),
                  cursor: "pointer"
                }}
              >
                <FolderIcon />
              </Avatar>
            </IconButton>
          </ListItemAvatar>
          <ListItemText
            style={{
              textDecoration: lineThrough(todo.completed),
              cursor: "pointer"
            }}
            onClick={() => complete(todo.id, todo.fireId, !todo.completed)}
            primary={todo.text}
            secondary={secondary ? `${todo.date.toLocaleString()}` : null}
          />
          <ListItemSecondaryAction>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => remove(todo.id, todo.fireId)}
            >
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default TodoList;
