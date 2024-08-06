import { modalAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  // define the part you're going to style
  overlay: {
    bg: "blackAlpha.800", //change the background
  },
  dialog: {
    borderRadius: "md",
    bg: `gray.200`,
  },
  closeButton: {
    border: "none",
  },
  body: {
padding:'16px 24px'
  },
  footer: {
    button: {
      bg: "lightGreen",
      color: "white",
      _hover: {
        bg: "darkGreen",
      },
    },
  },
});

export const modalTheme = defineMultiStyleConfig({
  baseStyle,
});
