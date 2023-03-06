import { DialogContent } from "@radix-ui/react-dialog"
import { IconButton } from "components/IconButton/IconButton"
import { GradientText } from "components/Typography/GradientText/GradientText"
import styled from "@emotion/styled"
import { keyframes } from "@emotion/react"
import { theme } from "theme"
import isPropValid from "@emotion/is-prop-valid"

const fadeInKeyframes = keyframes`
  0% {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.96);
  }

  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`

const mobFadeInKeyframes = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`

const drawerKeyFrames = keyframes`
0% {
  transform: translateY(50%);
}

100% {
  transform: translateY(0) ;
}
`

export const ModalContainer = styled.div`
  --mobile-modal-header-height: 60px;
  --modal-header-title-height: 32px;

  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: ${theme.zIndices.backdrop};
`

export const ModalWindow = styled(DialogContent, {
  shouldForwardProp: (prop) =>
    isPropValid(prop) && prop !== "maxWidth" && prop !== "isDrawer",
})<{
  maxWidth?: number
  isDrawer?: boolean
}>`
  position: absolute;
  z-index: ${theme.zIndices.modal};
  width: 100%;

  animation: 150ms cubic-bezier(0.16, 1, 0.3, 1)
    ${({ isDrawer }) => (isDrawer ? drawerKeyFrames : mobFadeInKeyframes)};

  ${({ isDrawer }) =>
    isDrawer
      ? { bottom: 0, borderRadius: "20px 20px 0px 0px" }
      : { top: 0, height: "100vh" }}

  @media ${theme.viewport.gte.sm} {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    height: auto;
    max-width: ${(props) => `${props.maxWidth ?? 610}px`};
    border-radius: 16px;
    animation: 150ms cubic-bezier(0.16, 1, 0.3, 1) ${fadeInKeyframes};
  }
`

export const ModalWindowContainer = styled.div<{ isDrawer?: boolean }>`
  border: 1px solid rgba(${theme.rgbColors.white}, 0.06);
  box-shadow: 0px 38px 46px rgba(0, 0, 0, 0.03);
  background: ${theme.colors.backgroundGray900};

  ${({ isDrawer }) => (isDrawer ? { borderRadius: "20px 20px 0px 0px" } : {})}

  @media ${theme.viewport.gte.sm} {
    border-radius: 16px;
  }
`

export const ModalTitle = styled(GradientText)`
  font-size: 24px;
  line-height: var(--modal-header-title-height);
  font-weight: 500;
`

export const ModalBody = styled.div<{ isDrawer?: boolean }>`
  padding: 0 14px 19px;
  overflow-y: auto;

  ${({ isDrawer }) =>
    isDrawer
      ? "max-height: calc(100vh - var(--mobile-modal-header-height));"
      : "height: calc(100vh - var(--mobile-modal-header-height));"}

  ::-webkit-scrollbar {
    width: 0px;
  }

  @media ${theme.viewport.gte.sm} {
    padding: 0 30px 30px;
    max-height: 80vh;
    height: auto;

    ::-webkit-scrollbar {
      width: 6px;
    }
  }

  &::-webkit-scrollbar-track {
    margin-bottom: 16px;
  }
`
export const ModalHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 8px;
  gap: 8px;
  min-height: var(--mobile-modal-header-height);

  @media ${theme.viewport.gte.sm} {
    min-height: fit-content;
    padding: 8px;
    justify-content: space-between;
  }
`
export const CloseButton = styled(IconButton)`
  color: ${theme.colors.white};
  position: absolute;
  top: 0;
  right: 0;
  margin: 13px 19px;
  @media ${theme.viewport.gte.sm} {
    position: relative;
    margin: 0px;
    margin-left: auto;
  }
`

export const SecondaryButton = styled(IconButton)`
  color: ${theme.colors.white};
  position: absolute;
  top: 0;
  left: 0;
  margin: 13px 19px;
  @media ${theme.viewport.gte.sm} {
    position: relative;
    margin: 0px;
    margin-right: auto;
  }
`
