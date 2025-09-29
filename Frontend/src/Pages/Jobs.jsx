import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Box,
  TextField,
  InputAdornment,
} from "@mui/material";
import API from "../Api/axios";
import SearchIcon from "@mui/icons-material/Search";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const [search, setSearch] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await API.get("/jobs");
        setJobs(res.data.data || []);
      } catch (err) {
        console.error(err);
        showSnackbar("Failed to fetch jobs", "error");
      }
    };
    fetchJobs();
  }, []);

  const showSnackbar = (message, severity = "info") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleApply = async (jobId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return showSnackbar("Please login first", "warning");

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const res = await API.post("/application/apply", { jobId }, config);
      showSnackbar(res.data.message, "success");
    } catch (err) {
      console.error(err.response?.data);
      showSnackbar(err.response?.data?.message || "Failed to apply", "error");
    }
  };

  useEffect(() => {
    if (!search) {
      setFilteredJobs(jobs);
    } else {
      const lower = search.toLowerCase();
      const filtered = jobs.filter(
        (job) =>
          job.title?.toLowerCase().includes(lower) ||
          job.company?.toLowerCase().includes(lower) ||
          job.location?.toLowerCase().includes(lower) ||
          job.description?.toLowerCase().includes(lower)
      );
      setFilteredJobs(filtered);
    }
  }, [search, jobs]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Available Jobs
      </Typography>
      <Box sx={{ mb: 8 }}>
        <TextField
          label="Search jobs"
          variant="outlined"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="large" />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>

      <Grid container columnSpacing={12} rowSpacing={5}>
        {filteredJobs && filteredJobs.length > 0 ? (
          filteredJobs?.map((job) => (
            <Grid size={{ xs: 12, md: 3 }} key={job._id}>
              <Card
                onClick={() => setSelectedJob(job)}
                sx={{
                  width: 300,
                  height: 280,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  transition: "0.3s",
                  ":hover": {
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" noWrap>
                    {job.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" noWrap>
                    {job.company} | {job.location}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      mt: 1,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      color: "text.secondary",
                    }}
                  >
                    {job.description}
                  </Typography>

                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Salary: {job.salary}
                  </Typography>
                </CardContent>

                <Button
                  variant="contained"
                  color="primary"
                  sx={{ m: 2, mt: "auto" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleApply(job._id);
                  }}
                >
                  Apply
                </Button>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ textAlign: "center", mt: 4 }}
          >
            No Jobs Found
          </Typography>
        )}
      </Grid>
      <Dialog
        open={!!selectedJob}
        onClose={() => setSelectedJob(null)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>{selectedJob?.title}</DialogTitle>
        <DialogContent dividers>
          <Typography variant="subtitle1" color="textSecondary">
            {selectedJob?.company} | {selectedJob?.location}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            {selectedJob?.description}
          </Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Salary: {selectedJob?.salary}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedJob(null)}>Close</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
