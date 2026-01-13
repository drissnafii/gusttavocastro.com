import styled from 'styled-components'
import { ReactElement } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { PostMain, PostContent, PostContainer } from '../components/Post'
import { Wrapper } from '../components/Wrapper'

interface BaseProps {
  children: ReactElement<{
    title?: string
    tagline?: string
    primaryColor?: string
    secondaryColor?: string
  }>
}

export default function Base({ children }: BaseProps) {
  const { title, tagline, primaryColor, secondaryColor } = children.props

  return (
    <Wrapper>
      <Navbar />
      <StyledPostMain $primaryColor={primaryColor}>
        <PostContent>
          <PostContainer>
            <GradientTitle $primaryColor={primaryColor} $secondaryColor={secondaryColor}>
              {tagline ? tagline : title}
            </GradientTitle>
            {children}
          </PostContainer>
        </PostContent>
      </StyledPostMain>
      <Footer />
    </Wrapper>
  )
}

const StyledPostMain = styled(PostMain)<{ $primaryColor?: string }>`
  & ::selection {
    background: ${({ $primaryColor }) => $primaryColor || '#ff80bf'};
    color: #000;
    -webkit-text-fill-color: #000;
  }
`

const GradientTitle = styled.h1<{ $primaryColor?: string; $secondaryColor?: string }>`
  background-image: linear-gradient(
    135deg,
    ${({ $primaryColor }) => $primaryColor || '#ff80bf'} 0%,
    ${({ $secondaryColor }) => $secondaryColor || '#9580ff'} 100%
  );
  background-size: 100%;
  background-clip: text;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
  -webkit-box-decoration-break: clone;
`
