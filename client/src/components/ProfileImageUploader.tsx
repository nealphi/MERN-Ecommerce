import axios from "axios";
import React, { useState } from "react";

const ProfileImageUploader = () => {
  const [file, setFile] = useState(" ");

  const handleImageChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = (e) => {
    const formData = new FormData();
    formData.append("file", file);
    console.log(file);
    const api = "https://nealphi-ecommerce-server.vercel.app";
    axios
      .post(`${api}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => console.log("Upload successful:", res))
      .catch((err) =>
        console.error(
          "Upload failed:",
          err.response ? err.response.data : err.message
        )
      );
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload}>UPLOAD</button>
    </div>
  );
};

export default ProfileImageUploader;
