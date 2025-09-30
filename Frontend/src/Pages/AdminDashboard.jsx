import React, { useEffect, useState } from "react";
import API from "../Api/axios";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import ReactECharts from "echarts-for-react";
import CreateJob from "./JobForm";

export default function AdminDashboard() {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobRes = await API.get("/jobs", config);
        const appRes = await API.get("/application/all", config);
        setJobs(jobRes.data.data || []);
        setApplications(appRes.data.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const companyCount = jobs.reduce((acc, job) => {
    acc[job.company] = (acc[job.company] || 0) + 1;
    return acc;
  }, {});

  const options = {
    title: { text: "Jobs per Company" },
    tooltip: {},
    xAxis: { type: "category", data: Object.keys(companyCount) },
    yAxis: { type: "value" },
    series: [{ data: Object.values(companyCount), type: "bar" }],
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Jobs</Typography>
              <Typography variant="h3">{jobs.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Applications</Typography>
              <Typography variant="h3">{applications.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography mt={4} variant="h5">
        Job Statistics
      </Typography>
      <ReactECharts option={options} style={{ height: 400 }} />
      <CreateJob />
    </Container>
  );
}
