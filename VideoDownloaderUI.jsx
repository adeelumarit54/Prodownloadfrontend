import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Grid,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import DownloadIcon from "@mui/icons-material/Download";
import YouTubeIcon from "@mui/icons-material/YouTube";

import "@fontsource/poppins";
//const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
//  const API_URL = import.meta.env.VITE_API_URL || "https://video-downloader-production.up.railway.app";
 const API_URL = import.meta.env.VITE_API_URL || "https://video-donload-production.up.railway.app";


export default function VideoDownloaderUI() {
  const [videoUrl, setVideoUrl] = useState("");
  const [downloading, setDownloading] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [platform, setPlatform] = useState(null);

  // 📌 URL check kar ke platform detect karo
  // const detectPlatform = (url) => {
  //   if (url.includes("instagram.com")) {
  //     setPlatform({
  //       name: "Instagram",
  //       color: "#E4405F",
  //       icon: <InstagramIcon />,
  //     });
  //   } else if (url.includes("facebook.com")) {
  //     setPlatform({
  //       name: "Facebook",
  //       color: "#1877F2",
  //       icon: <FacebookIcon />,
  //     });
  //   } else if (url.includes("tiktok.com")) {
  //     setPlatform({
  //       name: "TikTok",
  //       color: "#000000",
  //       icon: <MusicNoteIcon />,
  //     });
  //   } else {
  //     setPlatform(null);
  //   }
  // };
  const detectPlatform = (url) => {
  if (url.includes("instagram.com")) {
    setPlatform({
      name: "Instagram",
      color: "#E4405F",
      icon: <InstagramIcon />,
    });
  } else if (url.includes("facebook.com")) {
    setPlatform({
      name: "Facebook",
      color: "#1877F2",
      icon: <FacebookIcon />,
    });
  } else if (url.includes("tiktok.com")) {
    setPlatform({
      name: "TikTok",
      color: "#000000",
      icon: <MusicNoteIcon />,
    });
  } else if (url.includes("youtube.com") || url.includes("youtu.be")) {
    setPlatform({
      name: "YouTube",
      color: "#FF0000",
      icon: <YouTubeIcon />,
    });
  } else {
    setPlatform(null);
  }
};

const handleMainDownloadClick = () => {
 if (
  !videoUrl ||
  !/^https?:\/\/(www\.)?(instagram|facebook|tiktok|youtube|youtu\.be)\.com?/.test(videoUrl)
) {
  alert("Paste a valid Instagram, Facebook, TikTok, or YouTube URL!");
  return;
}

  detectPlatform(videoUrl);
  setShowButton(true);
};

// const handleDownload = async () => {
//   if (!videoUrl) return alert("Paste a URL first!");
//   setDownloading(true);

//   try {
//     const res = await fetch(`${API_URL}/download?url=${encodeURIComponent(videoUrl)}`);


//     if (!res.ok) throw new Error("Failed to download video 😵");

//     const blob = await res.blob();

//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "video.mp4";
//     document.body.appendChild(a);
//     a.click();
//     a.remove();
//     window.URL.revokeObjectURL(url);

//     setVideoUrl("");
//     setShowButton(false);
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   } finally {
//     setDownloading(false);
//   }
// };

const handleDownload = async () => {
  if (!videoUrl) return alert("Paste a URL first!");
  setDownloading(true);

  try {
    const res = await fetch(`${API_URL}/download`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: videoUrl }),
    });

    if (!res.ok) throw new Error("Failed to download video 😵");

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "video.mp4";
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);

    setVideoUrl("");
    setShowButton(false);
  } catch (err) {
    console.error(err);
    alert(err.message);
  } finally {
    setDownloading(false);
  }
};




  return (
    <Box
      sx={{
        fontFamily: "Poppins, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        minHeight: "80vh",
        backgroundColor: "#f9fbff",
        gap: 2,
        px: 2,
        overflow: "hidden",
        textAlign: "center",
        pt: 10,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 900,
          lineHeight: 1.2,
          color: "#222",
          fontSize: { xs: "24px", sm: "28px", md: "32px" },
          marginBottom: 2,
        }}
      >
        Download Videos from
      </Typography>

      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          lineHeight: 1.2,
          color: "#222",
          fontSize: "1.5rem",
          marginBottom: 2,
        }}
      >
        Facebook, Instagram & TikTok
      </Typography>

      {/* 🪄 URL Input */}
      <TextField
        variant="outlined"
        placeholder="Paste video URL here..."
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        sx={{
          width: "100%",
          maxWidth: 500,
          backgroundColor: "white",
          borderRadius: "6px",
          boxShadow: 2,
          "& .MuiOutlinedInput-root": {
            borderRadius: "6px",
            paddingRight: "4px",
          },
          "& .MuiInputBase-input": {
            height: "50px",
            padding: "0 14px",
            fontFamily: "Poppins, sans-serif",
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" sx={{ p: 0 }}>
              <Button
                variant="contained"
                sx={{
                  height: "46px",
                  borderRadius: "6px",
                  px: 2,
                  textTransform: "none",
                  fontWeight: 600,
                  fontFamily: "Poppins, sans-serif",
                  backgroundColor: "#356ecaff",
                  "&:hover": {
                    backgroundColor: "#356ecaff",
                    opacity: 0.85,
                  },
                }}
                onClick={handleMainDownloadClick}
              >
                Continue 
              </Button>
            </InputAdornment>
          ),
        }}
      />

      {/* 📹 Single Button — Platform ke hisaab se */}
    {showButton && platform && (
  <Grid container justifyContent="center" sx={{ maxWidth: 500, mt: 4 }}>
    <Button
      startIcon={platform.icon || <DownloadIcon />}
      sx={{
        width: "200px",
        height: "50px",
        textTransform: "none",
        fontWeight: 600,
        borderRadius: "7px",
        fontFamily: "Poppins, sans-serif",
        fontSize: "16px",
        backgroundColor: platform.color || "#356ecaff",
        color: "white",
        "&:hover": {
          backgroundColor: platform.color || "#356ecaff",
          opacity: 0.85,
        },
      }}
      onClick={handleDownload}
      disabled={downloading}
    >
      {downloading ? "Downloading..." : "Download"}
    </Button>
  </Grid>
)}

    </Box>
  );
}
