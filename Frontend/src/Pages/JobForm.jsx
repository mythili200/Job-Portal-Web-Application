import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Container, Typography } from "@mui/material";
import API from "../Api/axios";
import { Navigate, useNavigate } from "react-router-dom";

export default function CreateJob() {
  const { handleSubmit, control } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = await API.post("/jobs", data, config);
      alert("Job created: " + res.data.data.title);
      navigate("/jobs");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error creating job");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Post a Job
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="title"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField {...field} label="Title" fullWidth margin="normal" />
          )}
        />
        <Controller
          name="company"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField {...field} label="Company" fullWidth margin="normal" />
          )}
        />
        <Controller
          name="location"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField {...field} label="Location" fullWidth margin="normal" />
          )}
        />
        <Controller
          name="description"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Description"
              fullWidth
              multiline
              rows={4}
              margin="normal"
            />
          )}
        />
        <Controller
          name="salary"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField {...field} label="Salary" fullWidth margin="normal" />
          )}
        />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Post Job
        </Button>
      </form>
    </Container>
  );
}
