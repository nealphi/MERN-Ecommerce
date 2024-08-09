import axios from "axios";
import React, { useState } from "react";

const ProfileImageUploader = () => {
  const [file, setFile] = useState(" ");

  const handleImageChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = (e) => {
    const formData = new FormData()
    formData.append('file', file)
    const api = "https://nealphi-ecommerce-server.vercel.app"
    axios
    .post(`${api}/user/upload`, formData )
    .then(res => console.log(res))
    .catch(err => console.log(err));
  };
  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload}>UPLOAD</button>
    </div>
  );
};

export default ProfileImageUploader;
