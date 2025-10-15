import React from "react";
import RideForm from "../components/RideForm";

export default function BookRidePage() {
  const token = localStorage.getItem("token");
  return <RideForm token={token} />;
}
