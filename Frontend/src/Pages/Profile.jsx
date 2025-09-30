// import React, { useEffect, useState } from "react";
// import {
//   Container,
//   Typography,
//   TextField,
//   Button,
//   Box,
//   Avatar,
//   IconButton,
//   Snackbar,
//   Alert,
//   Tooltip,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import API from "../Api/axios";

// export default function Profile() {
//   const [profile, setProfile] = useState({});
//   const [profilePhoto, setProfilePhoto] = useState(null);
//   const [resume, setResume] = useState(null);
//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const [snackbar, setSnackbar] = useState({ msg: "", severity: "success" });

//   const token = localStorage.getItem("token");
//   const config = { headers: { Authorization: `Bearer ${token}` } };

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await API.get("/profile/users", config);
//         setProfile(res.data.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchProfile();
//   }, []);

//   const handleChange = (e) => {
//     setProfile({ ...profile, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (e.target.name === "profilePhoto") {
//       setProfilePhoto(file);
//       const previewUrl = URL.createObjectURL(file);
//       setProfile({ ...profile, profilePhoto: previewUrl });
//     }

//     if (e.target.name === "resume") setResume(file);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       for (const key in profile) {
//         // Only append non-object fields
//         if (typeof profile[key] !== "object") {
//           formData.append(key, profile[key]);
//         }
//       }
//       if (profilePhoto) formData.append("profilePhoto", profilePhoto);
//       if (resume) formData.append("resume", resume);

//       const res = await API.put("/profile/upload", formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       setProfile(res.data.data);
//       setSnackbar({ msg: res.data.message, severity: "success" });
//       setOpenSnackbar(true);
//     } catch (err) {
//       setSnackbar({
//         msg: err.response?.data?.message || "Profile update failed",
//         severity: "error",
//       });
//       setOpenSnackbar(true);
//     }
//   };

//   const handleSnackbarClose = (event, reason) => {
//     if (reason === "clickaway") return;
//     setOpenSnackbar(false);
//   };

//   return (
//     <Container maxWidth="sm" sx={{ mt: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         My Profile
//       </Typography>

//       {/* Profile Photo with Edit Icon */}
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           mb: 4,
//           position: "relative",
//         }}
//       >
//         <Avatar
//           src={
//             profile.profilePhoto
//               ? profile.profilePhoto.startsWith("blob:")
//                 ? profile.profilePhoto
//                 : `/${profile.profilePhoto}`
//               : ""
//           }
//           sx={{ width: 120, height: 120 }}
//         />
//         <Tooltip title="Edit Profile Photo">
//           <IconButton
//             component="label"
//             sx={{
//               position: "absolute",
//               bottom: 0,
//               right: "calc(50% - 10px)",
//               bgcolor: "background.paper",
//               border: "1px solid #ccc",
//             }}
//           >
//             <EditIcon />
//             <input
//               type="file"
//               hidden
//               accept="image/*"
//               name="profilePhoto"
//               onChange={handleFileChange}
//             />
//           </IconButton>
//         </Tooltip>
//       </Box>

//       <Box component="form" onSubmit={handleSubmit}>
//         <TextField
//           fullWidth
//           label="Name"
//           name="name"
//           value={profile.name || ""}
//           onChange={handleChange}
//           margin="normal"
//         />
//         <TextField
//           fullWidth
//           label="Phone"
//           name="phone"
//           value={profile.phone || ""}
//           onChange={handleChange}
//           margin="normal"
//         />
//         <TextField
//           fullWidth
//           label="Location"
//           name="location"
//           value={profile.location || ""}
//           onChange={handleChange}
//           margin="normal"
//         />
//         <TextField
//           fullWidth
//           label="LinkedIn URL"
//           name="linkedin"
//           value={profile.linkedin || ""}
//           onChange={handleChange}
//           margin="normal"
//         />
//         <TextField
//           fullWidth
//           label="Bio"
//           name="bio"
//           value={profile.bio || ""}
//           onChange={handleChange}
//           multiline
//           rows={3}
//           margin="normal"
//         />
//         <TextField
//           fullWidth
//           label="Skills (comma separated)"
//           name="skills"
//           value={profile.skills || ""}
//           onChange={handleChange}
//           margin="normal"
//         />

//         {/* Resume Upload */}
//         <Box sx={{ mt: 2, mb: 2 }}>
//           <Button variant="contained" component="label">
//             Upload Resume
//             <input
//               type="file"
//               hidden
//               accept="application/pdf"
//               name="resume"
//               onChange={handleFileChange}
//             />
//           </Button>
//           {profile.resume && (
//             <Typography variant="body2" sx={{ mt: 1 }}>
//               Existing Resume:{" "}
//               <a href={`/${profile.resume}`} target="_blank" rel="noreferrer">
//                 View
//               </a>
//             </Typography>
//           )}
//         </Box>

//         <Button type="submit" variant="contained" color="primary">
//           Update Profile
//         </Button>
//       </Box>

//       <Snackbar
//         open={openSnackbar}
//         autoHideDuration={6000}
//         onClose={handleSnackbarClose}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       >
//         <Alert
//           onClose={handleSnackbarClose}
//           severity={snackbar.severity}
//           sx={{ width: "100%" }}
//         >
//           {snackbar.msg}
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
// }

import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Avatar,
  IconButton,
  Snackbar,
  Alert,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import API from "../Api/axios";

export default function Profile() {
  const [profile, setProfile] = useState({});
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [resume, setResume] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbar, setSnackbar] = useState({ msg: "", severity: "success" });

  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/profile/users", config);
        setProfile(res.data.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (e.target.name === "profilePhoto") {
      setProfilePhoto(file);
      // Show preview immediately
      const previewUrl = URL.createObjectURL(file);
      setProfile({ ...profile, profilePhoto: previewUrl });
    }

    if (e.target.name === "resume") {
      setResume(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(profile).forEach((key) => {
        if (typeof profile[key] !== "object") {
          formData.append(key, profile[key]);
        }
      });
      if (profilePhoto) formData.append("profilePhoto", profilePhoto);
      if (resume) formData.append("resume", resume);

      const res = await API.put("/profile/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setProfile(res.data.data);
      setSnackbar({ msg: res.data.message, severity: "success" });
      setOpenSnackbar(true);
    } catch (err) {
      setSnackbar({
        msg: err.response?.data?.message || "Profile update failed",
        severity: "error",
      });
      setOpenSnackbar(true);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom textAlign={"center"}>
        My Profile
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 4,
          position: "relative",
        }}
      >
        <Avatar
          src={
            profile.profilePhoto
              ? profile.profilePhoto.startsWith("blob:")
                ? profile.profilePhoto
                : `http://localhost:5000/${profile.profilePhoto}`
              : ""
          }
          sx={{ width: 120, height: 120 }}
        />
        <Tooltip title="Edit Profile Photo">
          <IconButton
            component="label"
            sx={{
              position: "absolute",
              bottom: 0,
              right: "calc(50% - 10px)",
              bgcolor: "background.paper",
              border: "1px solid #ccc",
            }}
          >
            <EditIcon />
            <input
              type="file"
              hidden
              accept="image/*"
              name="profilePhoto"
              onChange={handleFileChange}
            />
          </IconButton>
        </Tooltip>
      </Box>

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={profile.name || ""}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Phone"
          name="phone"
          value={profile.phone || ""}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Location"
          name="location"
          value={profile.location || ""}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="LinkedIn URL"
          name="linkedin"
          value={profile.linkedin || ""}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Bio"
          name="bio"
          value={profile.bio || ""}
          onChange={handleChange}
          multiline
          rows={3}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Skills (comma separated)"
          name="skills"
          value={profile.skills || ""}
          onChange={handleChange}
          margin="normal"
        />

        {/* Resume Upload */}
        <Box sx={{ mt: 2, mb: 2 }}>
          <Button variant="contained" component="label">
            Upload Resume
            <input
              type="file"
              hidden
              accept="application/pdf"
              name="resume"
              onChange={handleFileChange}
            />
          </Button>
          {profile.resume && !resume && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Download Resume:{" "}
              <a
                href={`http://localhost:5000/${profile.resume}`}
                target="_blank"
                rel="noreferrer"
              >
                View
              </a>
            </Typography>
          )}
        </Box>

        <Button type="submit" variant="contained" color="primary">
          Update Profile
        </Button>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.msg}
        </Alert>
      </Snackbar>
    </Container>
  );
}
