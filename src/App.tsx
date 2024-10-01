import { lazy, Suspense, useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const TodoForm = lazy(() => import("./components/TodoForm"));
const TodoItems = lazy(() => import("./components/TodoItems"));
const TodoList = lazy(() => import("./components/TodoList"));

const App = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState<string[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedValue, setEditedValue] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask(event.target.value);
  };

  const handleClick = () => {
    setTodos((prevTodos) => [...prevTodos, task]);
    setTask("");
  };
  const handleDelete = (idx: number) => {
    const newTodo = todos.filter((_, i) => i !== idx);
    setTodos(newTodo);
  };
  const handleUpdate = (index: number, newTodo: string) => {
    const updatedTodos = todos.map((todo, idx) =>
      idx === index ? newTodo : todo
    );
    setTodos(updatedTodos);
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setEditedValue(todos[index]);
  };

  const handleSave = (index: number) => {
    handleUpdate(index, editedValue);
    setEditIndex(null);
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<TodoForm />} />
        <Route
          path="items"
          element={
            <TodoItems
              task={task}
              handleClick={handleClick}
              handleChange={handleChange}
            />
          }
        >
          <Route
            path="lists"
            element={
              <TodoList
                todos={todos}
                editedValue={editedValue}
                editIndex={editIndex}
                onDelete={handleDelete}
                handleSave={handleSave}
                handleEdit={handleEdit}
                setEditedValue={setEditedValue}
              />
            }
          />
        </Route>
      </>
    )
  );

  return (
    <Suspense fallback={<div>Loading..........</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
