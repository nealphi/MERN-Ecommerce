import { extendTheme } from "@chakra-ui/react";
import '@fontsource-variable/cinzel';
import { inputTheme } from "./components/input";
import { menuTheme } from "./components/menu";
import { cardTheme } from "./components/card";
import { modalTheme } from "./components/modal";
const config = {
  initialColorMode: 'system',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  components: { Input: inputTheme, Menu: menuTheme, Card: cardTheme,  Modal: modalTheme },
  fonts: {
    heading: 'Cinzel Variable',
    body: `'Raleway', sans-serif`,

  },
  colors: {
    lightBlue: "rgb(107, 157, 172)",
    darkBlue: "rgb(91, 135, 148)",
    lightGreen: " rgb(134, 174, 173)",
    darkGreen:  "rgb(92, 139, 138)",
    lightBeige:  "rgb(240,237,228)",
    beige:  "rgb(207, 191, 170)",
    mocha:  "rgb(133, 126, 119)",
    gray: {
      50: "#f8f0f2",
      100: "#d9d9d9",
      200: "#a09b94",
      300: "#a6a6a6",
      400: "#8c8c8c",
      500: "#737373",
      600: "#595959",
      700: "#404040",
      800: "#262626",
      900: "#1a1a1a",
    },
    brand: {
      100: "#f7fafc",
      // ...
      900: "#1a202c",
    },
  },
});

export default theme;
