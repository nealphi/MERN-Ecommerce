import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys)

const baseStyle = definePartsStyle({
  // define the part you're going to style
  field: {
    backgroundColor: 'red',
    color: 'teal.500', // change the input text color
    _placeholder: {
      color: 'teal.500',
    }
  },
})

export const inputTheme = defineMultiStyleConfig({ baseStyle })