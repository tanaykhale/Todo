import { Box, Button, Container, TextField, Typography } from "@mui/material";

import validateSchema from "../schemas";
import { useFormik } from "formik";

const SignupPage = () => {
  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: validateSchema,
    onSubmit: (values) => {
      const existingData = JSON.parse(localStorage.getItem("user") || "[]");
      const user = [
        ...existingData,
        { Name: values.name, Email: values.email, Password: values.password },
      ];
      localStorage.setItem("user", JSON.stringify(user));
      alert("Sign up Complete.You can now login");
    },
  });

  return (
    <>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Sign Up
        </Typography>
        <Box
          sx={{
            boxShadow: 3,
            padding: 4,
            borderRadius: 2,
            backgroundColor: "#fff",
          }}
        >
          <form onSubmit={formik.handleSubmit} className="box">
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

export default SignupPage;
