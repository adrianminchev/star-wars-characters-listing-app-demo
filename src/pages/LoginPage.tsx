import {
  Container,
  TextField,
  Button,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import { useLogin } from "../hooks/useLogin";

function LoginPage(): JSX.Element {
  const {
    username,
    password,
    setUsername,
    setPassword,
    handleSubmit,
    showUsernameError,
    showPasswordError,
    isFormValid,
  } = useLogin();

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            helperText={
              showUsernameError
                ? "A minimum of 4 and a maximum of 30 characters are required."
                : " "
            }
            error={showUsernameError}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            helperText={
              showPasswordError
                ? "A minimum of 4 and a maximum of 30 characters are required."
                : " "
            }
            error={showPasswordError}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            disabled={!isFormValid}
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default LoginPage;
