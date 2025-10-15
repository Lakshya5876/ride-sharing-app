import React, { useState } from "react";
import { bookRide } from "../api";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function RideForm({ token }) {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [loading, setLoading] = useState(false);

  const submitRide = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await bookRide({ pickup, dropoff }, token);
      alert("Ride booked successfully!");
      setPickup("");
      setDropoff("");
    } catch (e) {
      alert("Error booking ride.");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={submitRide} style={{ maxWidth: 400, margin: "auto" }}>
      <TextField
        label="Pickup Location"
        value={pickup}
        onChange={e => setPickup(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Dropoff Location"
        value={dropoff}
        onChange={e => setDropoff(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <Button type="submit" variant="contained" color="primary" disabled={loading} fullWidth>
        Book Ride
      </Button>
    </form>
  );
}