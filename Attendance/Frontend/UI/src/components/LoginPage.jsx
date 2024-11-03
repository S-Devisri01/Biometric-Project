import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  AppBar,
  Toolbar,
} from "@mui/material";
import { motion } from "framer-motion";

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = () => {
    let isValid = true;
    setEmailError("");
    setPasswordError("");
    setError("");

    if (!validateEmail(email)) {
      setEmailError("Invalid email format.");
      isValid = false;
    }

    // You can add your password validation here if needed

    if (isValid) {
      // Call the onLogin function to trigger authentication
      onLogin(); // Trigger authentication state change

      // Navigate to the appropriate dashboard based on the email
      if (email === "staff@gmail.com") {
        navigate("/staff-dashboard");
      } else {
        navigate("/dashboard");
      }
    } else {
      setError("Please fix the above errors.");
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {/* Login */}
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(90vh - 64px)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper elevation={3} sx={{ p: 3, borderRadius: 5, width: 400 }}>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              align="center"
              sx={{ mb: 3 }}
            >
              Login
            </Typography>
            <Box
              component="form"
              sx={{ display: "flex", flexDirection: "column", gap: 3 }}
            >
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!emailError}
                helperText={emailError}
                fullWidth
                required
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!passwordError}
                helperText={passwordError}
                fullWidth
                required
              />
              {error && (
                <Typography variant="body2" color="error" align="center">
                  {error}
                </Typography>
              )}
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleLogin}
                >
                  Login
                </Button>
              </Box>
            </Box>
          </Paper>
        </motion.div>
      </Box>
    </Box>
  );
};

export default LoginPage;
