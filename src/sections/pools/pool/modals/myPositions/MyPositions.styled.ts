import styled from "@emotion/styled"
import { theme } from "theme"

export const SMobContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 2px;

  padding: 20px 2px 20px 20px;

  background-color: rgba(${theme.rgbColors.white}, 0.08);

  border: 1px solid rgba(${theme.rgbColors.white}, 0.12);
  border-radius: 14px;
`

export const SClaimAllCard = styled.div`
  display: flex;
  gap: 2px;
  flex-direction: column;

  justify-content: space-between;

  background: linear-gradient(
      270deg,
      rgba(76, 243, 168, 0.12) 0.23%,
      rgba(76, 243, 168, 0) 67.62%,
      rgba(76, 243, 168, 0) 100%
    ),
    rgba(255, 255, 255, 0.03);

  outline: 1px solid rgba(${theme.rgbColors.white}, 0.06);
  outline-offset: -1px;

  border-radius: 12px;

  padding: 20px 30px;
  margin: 14px 0 8px 0;
`
