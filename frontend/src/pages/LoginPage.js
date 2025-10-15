import React, { useState } from "react";
import { login } from "../api";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login(email, password);
      localStorage.setItem("token", res.data.token);
      alert("Logged in!");
    } catch (err) {
      alert("Login failed");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleLogin} style={{ maxWidth: 400, margin: "auto" }}>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <Button type="submit" variant="contained" color="primary" disabled={loading} fullWidth>
        Login
      </Button>
    </form>
  );
}