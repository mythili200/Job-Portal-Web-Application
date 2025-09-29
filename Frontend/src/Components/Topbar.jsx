import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

export default function Topbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, cursor: "pointer" }}
          onClick={() => navigate("/dashboard")}
        >
          Job Portal
        </Typography>
        <Button color="inherit" onClick={() => navigate("/dashboard")}>
          Dashboard
        </Button>
        <Button color="inherit" onClick={() => navigate("/jobs")}>
          Jobs
        </Button>
        <Button color="inherit" onClick={() => navigate("/profile")}>
          Profile
        </Button>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}
