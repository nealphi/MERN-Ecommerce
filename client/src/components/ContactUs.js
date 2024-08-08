import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import {
  Box,
  Button,
  color,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
export const ContactUs = () => {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_o0lp69a", "template_p55uo0i", form.current, {
        publicKey: "LTrQmZedVx_aWXvH_",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          e.target.reset();
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <Flex
      width={"100vw"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      bgColor={"white"}
      p={"40px"}
    >
      <Text fontSize={["26px", "32", "38px"]} color={"lightGreen"} mb={10}>
        Contact Us
      </Text>
      <form ref={form} onSubmit={sendEmail}>
        <Flex flexDirection={["column", "row"]} gap={5} my={5}>
          <FormControl isRequired>
            <FormLabel>Full Name</FormLabel>
            <Input type="text" name="user_name" />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input type="email" name="user_email" />
          </FormControl>
        </Flex>

        <Flex flexDirection={"column"} gap={5}>
          <Textarea
            name="message"
            placeholder="Type your message here..."
            height={"200px"}
            color={"teal.500"}
            _placeholder={{ color: "teal.500" }}
          />
          <Button
            className="submit"
            type="submit"
            color={"white"}
            bgColor={"lightGreen"}
            _hover={{ backgroundColor: "darkGreen" }}
          >Send</Button>
        </Flex>
      </form>
    </Flex>
  );
};
