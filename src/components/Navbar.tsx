import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleClick = (value: string) => {
    if (value === "signup") navigate("signup");
    else navigate("login");
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            ></IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Todo App
            </Typography>
            <Button color="inherit" onClick={() => handleClick("login")}>
              Login
            </Button>
            <Button color="inherit" onClick={() => handleClick("signup")}>
              Signup
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Outlet></Outlet>
    </>
  );
};

export default Navbar;
