import styled from "@emotion/styled"
import { theme } from "theme"
import { Heading } from "../Heading/Heading"
import { handleTypographyProps, STypographyProps } from "../Typography.utils"

export const SGradientText = styled(Heading)<STypographyProps>`
  font-size: 16px;
  display: inline-block;
  background: linear-gradient(${theme.gradients.simplifiedGradient});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  ${handleTypographyProps}
`
