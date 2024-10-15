import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import validateSchema from "../schemas";
import React, { useEffect } from "react";

interface FormProp {
  setAuth: (value: boolean) => void;
  users: { Name: string; Email: string; Password: string }[];
  setUsers: React.Dispatch<
    React.SetStateAction<{ Name: string; Email: string; Password: string }[]>
  >;
  setCurrentUser: React.Dispatch<
    React.SetStateAction<{
      Name: string;
      Email: string;
      Password: string;
    } | null>
  >;
}

const LoginPage = ({ setAuth, users, setUsers, setCurrentUser }: FormProp) => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if ((location.pathname = "/login")) setAuth(false);
  }, [location]);
  useEffect(() => {
    const storedUsers = localStorage.getItem("user");
    if (storedUsers) {
      const parsedUsers = JSON.parse(storedUsers);
      setUsers(parsedUsers);
    }
  }, []);

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: validateSchema,
    onSubmit: (values) => {
      const compareData = users.find(
        (user) =>
          user.Email === values.email &&
          user.Password === values.password &&
          values.name === user.Name
      );

      if (compareData) {
        setAuth(true);
        setCurrentUser(compareData);
        navigate("/items");
      } else {
        setAuth(false);
        navigate("/signup");
        alert("Data not found. Please Sign up");
      }
    },
  });

  const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === "Enter") {
      formik.handleSubmit();
    }
  };

  return (
    <>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Log IN
        </Typography>
        <Box
          sx={{
            boxShadow: 3,
            padding: 4,
            borderRadius: 2,
            backgroundColor: "#fff",
          }}
        >
          <form
            onSubmit={formik.handleSubmit}
            onKeyDown={handleKeyDown}
            className="box"
          >
            <TextField
              fullWidth
              label="Name"
              name="name"
              variant="outlined"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              margin="normal"
              required
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />

            <TextField
              fullWidth
              label="Email"
              name="email"
              variant="outlined"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              margin="normal"
              required
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              variant="outlined"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              margin="normal"
              required
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 3, padding: 1 }}
            >
              Submit
            </Button>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default React.memo(LoginPage);
