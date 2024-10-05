// components/ErrorPage.tsx
import { useRouteError } from "react-router-dom";
import { Typography, Container } from "@mui/material";

const ErrorPage = () => {
  const error: any = useRouteError();

  return (
    <Container>
      <Typography variant="h2" color="error" gutterBottom>
        Oops!
      </Typography>
      <Typography variant="h5">
        Sorry, an unexpected error has occurred.
      </Typography>
      <Typography variant="body1" color="textSecondary">
        {error.statusText || error.message}
      </Typography>
    </Container>
  );
};

export default ErrorPage;
