import { modalAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  // define the part you're going to style
  overlay: {
    bg: "blackAlpha.700", //change the background
  },
  dialog: {
    color: "gray.100",
    borderRadius: "md",
    bg: "mocha",
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
