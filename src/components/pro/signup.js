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
import { Card, CardContent } from "@mui/material";
import { isEmail } from "validator";

const defaultTheme = createTheme();

const required = (value) => {
  return value ? undefined : "Champ obligatoire!";
};

const isAlphaWithHyphen = (value) => {
  return /^[a-zA-Z-]+$/.test(value) ? undefined : "Nom non valide.";
};

const validEmail = (value) => {
  return isEmail(value) ? undefined : "Email non valide.";
};

const vusername = (value) => {
  return (value.length >= 3 && value.length <= 20)
    ? undefined
    : "Le nom d'utilisateur doit contenir entre 3 et 20 caractères.";
};

const vpassword = (value) => {
  return (value.length >= 6 && value.length <= 40)
    ? undefined
    : "Le mot de passe doit contenir entre 6 et 40 caractères.";
};

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (
      !username ||
      !email ||
      !password ||
      required(username) ||
      validEmail(email) ||
      required(password) ||
      vusername(username) ||
      vpassword(password)
    ) {
      setMessage("Veuillez remplir correctement tous les champs.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/blog/auth/signup", {
        username,
        email,
        password,
      });

      console.log(response);
      navigate("/signin");
    } catch (error) {
      console.error(error);
      setMessage("Echec d'inscription. Réessayez.");
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
                  Inscrivez-vous
                </Typography>
              </Box>
              <Box
                component="form"
                noValidate
                onSubmit={handleRegistration}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="username"
                      label="Nom d'utilisateur"
                      onChange={onChangeUsername}
                      name="username"
                      value={username}
                      variant="outlined"
                      validations={[required, vusername]}
                      error={formSubmitted && !!vusername(username)}
                      helperText={formSubmitted && vusername(username)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Adresse email"
                      name="email"
                      autoComplete="email"
                      onChange={onChangeEmail}
                      value={email}
                      variant="outlined"
                      validations={[required, validEmail]}
                      error={formSubmitted && !!validEmail(email)}
                      helperText={formSubmitted && validEmail(email)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Mot de passe"
                      type="password"
                      id="password"
                      value={password}
                      onChange={onChangePassword}
                      variant="outlined"
                      validations={[required, vpassword]}
                      error={formSubmitted && !!vpassword(password)}
                      helperText={formSubmitted && vpassword(password)}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    backgroundColor: "primary.main",
                    color: "white",
                  }}
                >
                  S'inscrire
                </Button>
                {message && (
                  <div className="form-group" style={{ margin: "5px" }}>
                    <div
                      className="alert alert-danger"
                      role="alert"
                      style={{ color: "red" }}
                    >
                      {message}
                    </div>
                  </div>
                )}
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <RouterLink
                      to="/signin"
                      variant="body2"
                      sx={{
                        textDecoration: "none",
                        color: (theme) => theme.palette.primary.main,
                        "&:hover": {
                          color: (theme) => theme.palette.primary.dark,
                        },
                      }}
                    >
                      Vous avez déjà un compte ? Connectez-vous !
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
