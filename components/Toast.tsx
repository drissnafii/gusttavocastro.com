import { ReactNode } from 'react'
import * as ToastPrimitive from '@radix-ui/react-toast'
import styled, { keyframes } from 'styled-components'

interface ToastProps {
  title: string
  description: string
  isSuccess?: boolean
  showToast: boolean
  setShowToast: (show: boolean) => void
  children?: ReactNode
}

export default function Toast({
  title,
  description,
  isSuccess,
  showToast,
  setShowToast,
  children,
}: ToastProps) {
  const iconColor = isSuccess ? '#4cb782' : '#b75c4c'
  const iconName = isSuccess ? 'checkbox-circle' : 'error-warning'

  return (
    <ToastPrimitive.Provider>
      {children}
      <Root open={showToast} onOpenChange={setShowToast}>
        <IconContainer style={{ color: iconColor }}>
          <i className={`ri-${iconName}-fill`} />
        </IconContainer>
        <div>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </div>
        <Close aria-label="Close">
          <span aria-hidden>×</span>
        </Close>
      </Root>
      <Viewport />
    </ToastPrimitive.Provider>
  )
}

const slideUpAndFade = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`

const slideDownAndFade = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(20px);
  }
`

const Root = styled(ToastPrimitive.Root)`
  background: ${({ theme }) => theme.colors.hover};
  border-radius: 4px;
  border: 1px solid rgb(48, 50, 54);
  box-shadow: rgb(0 0 0 / 8%) 0px 4px 13px;
  color: rgb(138, 143, 152);
  font-size: 14px;
  overflow: hidden;
  margin: 0px;
  padding: 12px;
  display: flex;
  z-index: 2;

  &[data-state='open'] {
    animation: 100ms ease-in forwards ${slideUpAndFade};
  }

  &[data-state='closed'] {
    animation: 100ms ease-in forwards ${slideDownAndFade};
  }
`

const IconContainer = styled.div`
  font-size: 16px;
  margin-top: -2px;
  margin-right: 8px;
`

const Title = styled(ToastPrimitive.Title)`
  color: ${({ theme }) => theme.colors.primary};
  line-height: 28px;
`

const Description = styled(ToastPrimitive.Description)`
  margin-top: -5px;
  line-height: 28px;
`

const Close = styled(ToastPrimitive.Close)`
  position: absolute;
  right: 0;
  top: 0;
  width: 32px;
  height: 32px;
  background: transparent;
  border: 0;
  font-size: 18px;
  color: rgb(138, 143, 152);
  transition: color 0.2s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`

const Viewport = styled(ToastPrimitive.Viewport)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 2;
`
