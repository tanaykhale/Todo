import { lazy, Suspense, useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./components/ErrorPage";

import AuthGuard from "./components/AuthGuard";
import Navbar from "./components/Navbar";
import SignupPage from "./components/SignupPage";

const LoginPage = lazy(() => import("./components/LoginPage"));
const TodoItems = lazy(() => import("./components/TodoItems"));
const TodoList = lazy(() => import("./components/TodoList"));

const user = [
  { Name: "Tanay", Email: "tanaykhale@gmail.com", Password: "Arrow1@123" },
  { Name: "Tanmay", Email: "tanayk12@gmail.com", Password: "Arrow1@123" },
];
localStorage.setItem("user", JSON.stringify(user));

const App = () => {
  const [users, setUsers] = useState<
    { Name: string; Email: string; Password: string }[]
  >([]);
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState<string[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedValue, setEditedValue] = useState<string>("");
  const [auth, setAuth] = useState<boolean | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentUser, setCurrentUser] = useState<{
    Name: string;
    Email: string;
    Password: string;
  } | null>(null);

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

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route
          path="/"
          element={
            <Navbar
              auth={auth}
              anchorEl={anchorEl}
              currentUser={currentUser}
              setAuth={setAuth}
              handleMenu={handleMenu}
              handleClose={handleClose}
            ></Navbar>
          }
          errorElement={<ErrorPage></ErrorPage>}
        >
          <Route
            path="login"
            element={
              <LoginPage
                setAuth={setAuth}
                users={users}
                setUsers={setUsers}
                setCurrentUser={setCurrentUser}
              />
            }
            errorElement={<ErrorPage></ErrorPage>}
          />
          <Route
            path="signup"
            element={<SignupPage></SignupPage>}
            errorElement={<ErrorPage></ErrorPage>}
          ></Route>
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
