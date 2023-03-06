import { Icon } from "components/Icon/Icon"
import styled from "@emotion/styled"
import { theme } from "theme"

export const AssetIconWrapper = styled(Icon)`
  position: relative;
`

export const SIcon = styled(Icon)`
  width: 28px;
  height: 28px;
  border-radius: 50%;

  > svg {
    position: absolute;
  }
`
export const SChainedIcon = styled(Icon)`
  position: absolute;
  left: 15px;
  top: 0;
  z-index: ${theme.zIndices.chainedIcon};
  background: ${theme.colors.black};
  border-radius: 50%;
  width: 15px;
  height: 15px;

  > svg {
    position: absolute;
    width: 13px;
    height: 13px;
    top: 1px;
    left: 1px;
  }
`
