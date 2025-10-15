import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export default function RideList({ rides }) {
  if (!rides || rides.length === 0) {
    return <div>No rides available.</div>;
  }
  return (
    <List>
      {rides.map((ride, idx) => (
        <ListItem key={idx} divider>
          <ListItemText
            primary={`Ride from ${ride.pickup} to ${ride.dropoff}`}
            secondary={`Status: ${ride.status}`}
          />
        </ListItem>
      ))}
    </List>
  );
}