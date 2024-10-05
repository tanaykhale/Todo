import { Box, Button, TextField, Typography } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { startTransition } from "react";
import React from "react";

interface TodoItemsProps {
  task: string;
  handleClick: () => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TodoItems = ({ task, handleClick, handleChange }: TodoItemsProps) => {
  const navigate = useNavigate();

  const handleTodoandNavigate = () => {
    handleClick();
    startTransition(() => {
      navigate("lists");
    });
  };
  const handleBack = () => {
    startTransition(() => {
      navigate("/");
    });
  };
  const handleKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") handleTodoandNavigate();
  };
  return (
    <Box sx={{ mt: 4 }} textAlign="center">
      <Typography variant="h4" sx={{ fontWeight: "bold" }} gutterBottom>
        <Button onClick={handleBack}>
          <ArrowBackIcon></ArrowBackIcon>
        </Button>{" "}
        Todo's
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <TextField
          placeholder="Enter the todo"
          variant="outlined"
          value={task}
          onChange={handleChange}
          margin="normal"
          sx={{ minWidth: "50%" }}
          onKeyDown={handleKey}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleTodoandNavigate}
          sx={{ mt: 2 }}
        >
          Add
        </Button>
      </Box>

      <Outlet />
    </Box>
  );
};

export default React.memo(TodoItems);
