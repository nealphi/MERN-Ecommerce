import React, { useState } from "react";
import {
  Box,
  Button,
  Image,
  Input,
  Text,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import axios from "axios";
// import { useGetToken } from "../hooks/useGetToken";

const ProfileImageUploader = () => {
  // const { headers } = useGetToken();

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
    console.log(file);
  };

  const handleImageDelete = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleUpload = async () => {
    const api = "https://nealphi-ecommerce-server.vercel.app";

    const formData = new FormData();
    formData.append("image", image);

 
    const response = await axios.post(
      `${api}/user/upload-profile-image`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response);  
  };

  return (
    <Box
      textAlign="center"
      p={4}
      borderWidth={1}
      borderRadius="md"
      boxShadow="md"
    >
      <Text mb={4}>Upload your profile picture:</Text>
      <Input
        type="file"
        accept="image/* "
        onChange={handleImageChange}
        mb={4}
        display="none"
        id="profile-image-upload"
      />
      <label htmlFor="profile-image-upload">
        <Button as="span" colorScheme="teal">
          Choose File
        </Button>
      </label>
      <Box mt={4} position="relative">
        {imagePreview ? (
          <>
            <Image
              src={imagePreview}
              alt="Profile Preview"
              boxSize="150px"
              objectFit="cover"
              borderRadius="full"
            />
            <IconButton
              aria-label="Delete Image"
              icon={<CloseIcon />}
              onClick={handleImageDelete}
              position="absolute"
              top={2}
              right={2}
              size="sm"
              colorScheme="red"
            />
          </>
        ) : (
          <Text>No image selected</Text>
        )}
      </Box>
      <Button mt={4} colorScheme="teal" onClick={handleUpload}>
        Upload Image
      </Button>
    </Box>
  );
};

export default ProfileImageUploader;
