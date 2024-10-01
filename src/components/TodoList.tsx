import {
  Box,
  Checkbox,
  List,
  TextField,
  IconButton,
  ListItemText,
  Typography,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

interface TodoListProps {
  todos: string[];
  editedValue: string;
  editIndex: number | null;
  onDelete: (index: number) => void;
  handleSave: (index: number) => void;
  handleEdit: (index: number) => void;
  setEditedValue: (value: string) => void;
}

const TodoList = ({
  todos,
  onDelete,
  handleSave,
  handleEdit,
  editIndex,
  editedValue,
  setEditedValue,
}: TodoListProps) => {
  return (
    <Box
      sx={{
        mt: 4,
        maxWidth: "80%",
        margin: "auto",
        backgroundColor: "#f9f9f9",
        padding: 3,
        borderRadius: 3,
        boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          mb: 3,
          color: "#333",
          fontWeight: "bold",
        }}
      >
        Your Todo List
      </Typography>

      <List>
        {todos.map((todo, idx) => (
          <Paper
            elevation={3}
            key={idx}
            sx={{
              mb: 2,
              p: 2,
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              boxShadow: idx === editIndex ? "0 0 15px #007BFF" : "none",
              backgroundColor: idx === editIndex ? "#e0f7fa" : "#fff",
            }}
          >
            <Checkbox
              color="primary"
              size="medium"
              inputProps={{ "aria-label": "controlled" }}
            />

            {editIndex === idx ? (
              <TextField
                fullWidth
                variant="outlined"
                value={editedValue}
                onChange={(e) => setEditedValue(e.target.value)}
                sx={{ mr: 2, backgroundColor: "#f1f1f1", borderRadius: 1 }}
              />
            ) : (
              <ListItemText primary={todo} sx={{ flexGrow: 1, ml: 2 }} />
            )}

            {editIndex === idx ? (
              <IconButton
                aria-label="save"
                sx={{
                  color: "green",
                  "&:hover": { backgroundColor: "#e8f5e9" },
                  mr: 1,
                }}
                onClick={() => handleSave(idx)}
              >
                <SaveIcon />
              </IconButton>
            ) : (
              <IconButton
                aria-label="edit"
                sx={{
                  color: "blue",
                  "&:hover": { backgroundColor: "#e3f2fd" },
                  mr: 1,
                }}
                onClick={() => handleEdit(idx)}
              >
                <EditIcon />
              </IconButton>
            )}

            <IconButton
              aria-label="delete"
              sx={{
                color: "red",
                "&:hover": { backgroundColor: "#ffebee" },
              }}
              onClick={() => onDelete(idx)}
            >
              <DeleteIcon />
            </IconButton>
          </Paper>
        ))}
      </List>
    </Box>
  );
};

export default TodoList;
