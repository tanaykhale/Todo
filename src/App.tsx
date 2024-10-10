import { lazy, Suspense, useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./components/ErrorPage";

import AuthGuard from "./components/AuthGuard";

const TodoForm = lazy(() => import("./components/TodoForm"));
const TodoItems = lazy(() => import("./components/TodoItems"));
const TodoList = lazy(() => import("./components/TodoList"));

const user = [
  { Email: "tanaykhale@gmail.com", Password: "Arrow1@123" },
  { Email: "tanayk12@gmail.com", Password: "Arrow1@123" },
];
localStorage.setItem("user", JSON.stringify(user));

const App = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState<string[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedValue, setEditedValue] = useState<string>("");
  const [auth, setAuth] = useState<boolean | null>(null);

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
        <Route
          path="/"
          element={<TodoForm setAuth={setAuth} />}
          errorElement={<ErrorPage></ErrorPage>}
        />
        <Route element={<AuthGuard auth={auth}></AuthGuard>}>
          <Route
            path="items"
            element={
              <TodoItems
                task={task}
                handleClick={handleClick}
                handleChange={handleChange}
              />
            }
            errorElement={<ErrorPage></ErrorPage>}
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
              errorElement={<ErrorPage></ErrorPage>}
            />
          </Route>
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
