import React, { useState } from "react";
import { signup } from "../api";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signup(email, password);
      alert("Signup successful!");
    } catch (err) {
      alert("Signup failed");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSignup} style={{ maxWidth: 400, margin: "auto" }}>
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
        Signup
      </Button>
    </form>
  );
}