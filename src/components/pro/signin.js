import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link as RouterLink } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Card, CardContent } from "@mui/material";
const defaultTheme = createTheme();

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/blog/auth/signin",
        {
          username,
          password,
        }
      );
      const user = response.data;
      console.log(user.id);
      const token = response.data.token;
      Cookies.set("blog", token, { path: "/api", expires: 1 });
      localStorage.setItem("user", JSON.stringify(response.data));

      navigate("/home");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage("Nom d'utilisateur ou mot de passe incorrect.");
      } else {
        setErrorMessage(
          "Erreur de connexion. Vérifiez vos informations d'identification."
        );
      }
      console.error(error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
          }}
        >
          <Card sx={{ minWidth: 500, boxShadow: 3 }}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
              </Box>
              <Box
                component="form"
                onSubmit={handleLogin}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Nom d'utilisateur"
                  name="username"
                  value={username}
                  autoFocus
                  onChange={onChangeUsername}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Mot de passe"
                  type="password"
                  id="password"
                  value={password}
                  onChange={onChangePassword}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                {errorMessage && (
                  <div className="form-group" style={{ margin: "5px" }}>
                    <div
                      className="alert alert-danger"
                      role="alert"
                      style={{ color: "red" }}
                    >
                      {errorMessage}
                    </div>
                  </div>
                )}
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <RouterLink to="/signup" variant="body2">
                      {"Vous n'avez pas de compte ? Inscrivez-vous"}
                    </RouterLink>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
