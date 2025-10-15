import React, { useEffect, useState } from "react";
import { getRides } from "../api";
import RideList from "../components/RideList";

export default function RidesPage() {
  const [rides, setRides] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchRides() {
      if (!token) return;
      try {
        const res = await getRides(token);
        setRides(res.data.rides);
      } catch (e) {
        setRides([]);
      }
    }
    fetchRides();
  }, [token]);

  return <RideList rides={rides} />;
}