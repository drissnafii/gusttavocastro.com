import styled from 'styled-components'

export const ButtonPrimary = styled.div`
  appearance: none;
  background: transparent;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.borderRadius};
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  display: inline-block;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  margin: 0 0 0 -10px;
  outline: 0;
  padding: 8px 10px 8px;
  text-decoration: none;
  transition: background ${({ theme }) => theme.transitions.duration} ease-in-out,
    color ${({ theme }) => theme.transitions.duration} ease-in-out;

  &:hover {
    background: ${({ theme }) => theme.colors.hover};
    color: ${({ theme }) => theme.colors.primary};
    opacity: 1;
  }

  &:hover kbd {
    background: ${({ theme }) => theme.colors.primary};
  }
`
