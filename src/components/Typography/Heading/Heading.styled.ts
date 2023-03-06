import styled from "@emotion/styled"
import { theme } from "theme"
import { handleTypographyProps, STypographyProps } from "../Typography.utils"

export const SHeading = styled.h1<STypographyProps>`
  color: ${theme.colors.neutralGray100};

  ${handleTypographyProps}
`
