import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  Box,
  CircularProgress,
} from "@mui/material";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import CancelIcon from "@mui/icons-material/Cancel";
import WorkIcon from "@mui/icons-material/Work";
import API from "../Api/axios";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export default function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const appRes = await API.get("/application/my-applications", config);
        setApplications(appRes.data.data || appRes.data || []);

        const jobRes = await API.get("/jobs");
        setJobs(jobRes.data.data || []);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const appliedCount = applications.length;
  const totalJobs = jobs.length;

  const statusCount = applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {});

  console.log("gggggggggggggggggggggggggggggggggggggg", applications);

  const cardData = [
    {
      title: "Total Applied Jobs",
      value: appliedCount,
      icon: <HowToRegIcon fontSize="large" />,
      color: "#1976d2",
    },
    {
      title: "Total Available Jobs",
      value: totalJobs,
      icon: <WorkIcon fontSize="large" />,
      color: "#9c27b0",
    },
    {
      title: "Applied",
      value: statusCount.applied || 0,
      icon: <PendingActionsIcon fontSize="large" />,
      color: "#ffa000",
    },
    {
      title: "Reviewed",
      value: statusCount.reviewed || 0,
      icon: <CheckCircleIcon fontSize="large" />,
      color: "#0288d1",
    },
    {
      title: "Accepted",
      value: statusCount.accepted || 0,
      icon: <CheckCircleIcon fontSize="large" />,
      color: "#2e7d32",
    },
    {
      title: "Rejected",
      value: statusCount.rejected || 0,
      icon: <CancelIcon fontSize="large" />,
      color: "#d32f2f",
    },
  ];

  const applicationsOverTime = applications
    .reduce((acc, app) => {
      const date = new Date(app.appliedAt).toLocaleDateString();
      const existing = acc.find((item) => item.date === date);
      if (existing) existing.count += 1;
      else acc.push({ date, count: 1 });
      return acc;
    }, [])
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const statusPieData = [
    { name: "Applied", value: statusCount.applied || 0, color: "#ffa000" },
    { name: "Reviewed", value: statusCount.reviewed || 0, color: "#0288d1" },
    { name: "Accepted", value: statusCount.accepted || 0, color: "#2e7d32" },
    { name: "Rejected", value: statusCount.rejected || 0, color: "#d32f2f" },
  ];

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#1976d2" }}
      >
        📊 Dashboard Overview
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 4, color: "gray" }}>
        Track your job application statistics in real time
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {cardData.map((card) => (
              <Grid item xs={12} sm={6} md={4} key={card.title}>
                <Card
                  sx={{
                    height: 120,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: card.color,
                    color: "#fff",
                    px: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    {card.icon}
                    <Typography variant="h6">{card.title}</Typography>
                  </Box>
                  <Typography
                    variant="h3"
                    sx={{ fontWeight: "bold", textAlign: "center" }}
                  >
                    {card.value}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Charts Section */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Applications Over Time
                </Typography>
                <AreaChart width={550} height={400} data={applicationsOverTime}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke="#8884d8"
                    fill="#8884d8"
                  />
                </AreaChart>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Application Status Distribution
                </Typography>
                <PieChart width={550} height={400}>
                  <Pie
                    data={statusPieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {statusPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              p: 2,
              borderRadius: 2,
              boxShadow: 3,
              height: "100%",
              maxHeight: "calc(100vh - 100px)",
              overflowY: "auto",
              width: 225,
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <AccessTimeIcon />
              Last 5 Applied Jobs
            </Typography>

            {applications.slice(0, 5).map((app, idx) => (
              <Box
                key={idx}
                sx={{
                  backgroundColor: "#f5f5f5",
                  p: 1.5,
                  mb: 1,
                  borderRadius: 1,
                }}
              >
                <Typography variant="subtitle2" fontWeight="bold">
                  {app?.jobId?.title || "Job Title N/A"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Company: {app?.jobId?.company || "N/A"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Status: {app.status || "N/A"}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Applied:{" "}
                  {app.appliedAt
                    ? new Date(app.appliedAt).toLocaleDateString()
                    : "N/A"}
                </Typography>
              </Box>
            ))}
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
