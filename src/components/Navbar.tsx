import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { startTransition, useEffect } from "react";

interface Props {
  auth: boolean | null;
  anchorEl: null | HTMLElement;
  currentUser: { Name: string; Email: string; Password: string } | null;
  setAuth: (value: boolean | null) => void;
  handleMenu: (event: React.MouseEvent<HTMLElement>) => void;
  handleClose: () => void;
}

const Navbar = ({
  auth,
  anchorEl,
  currentUser,
  setAuth,
  handleMenu,
  handleClose,
}: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/login") {
      setAuth(false);
    }
  }, [location.pathname, setAuth]);

  const handleBack = () => {
    startTransition(() => {
      setAuth(false);
      navigate(-1);
    });
  };

  const handleNavigation = (path: string) => navigate(path);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="back"
            sx={{ mr: 2 }}
            onClick={handleBack}
          >
            <ArrowBackIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Todo App
          </Typography>

          {auth ? (
            <>
              <IconButton
                size="large"
                aria-label="current user account"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircleIcon />
                <Typography>
                  {`Welcome, ${currentUser ? currentUser.Name : "Guest"}`}
                </Typography>
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => handleNavigation("login")}>
                Login
              </Button>
              <Button
                color="inherit"
                onClick={() => handleNavigation("signup")}
              >
                Signup
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Outlet />
    </Box>
  );
};

export default Navbar;
