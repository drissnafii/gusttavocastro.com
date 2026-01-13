import styled from 'styled-components'
import { ReactElement } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import BlogDate from '../components/BlogDate'
import { Post, PostMain, PostContent, PostContainer } from '../components/Post'
import { Wrapper } from '../components/Wrapper'

interface BlogpostProps {
  children: ReactElement<{
    title?: string
    image?: string
    date?: string
    views?: number
  }>
}

interface MainProps {
  image?: string
  children: React.ReactNode
}

export default function Blogpost({ children }: BlogpostProps) {
  const { title, image, date } = children.props

  return (
    <Wrapper>
      <Navbar />
      <Main image={image}>
        {image && (
          <PostHeader>
            <PostHeaderTitle>{title}</PostHeaderTitle>
            <PostImage $backgroundImage={image} />
            <PostHeaderSubtitle>
              <BlogDate dateString={date} />
            </PostHeaderSubtitle>
          </PostHeader>
        )}
        <StyledPostContent>
          <PostContainer>
            {!image && (
              <div>
                <PostContentTitle>{title}</PostContentTitle>
                <PostContentSubtitle>
                  <BlogDate dateString={date} />
                </PostContentSubtitle>
              </div>
            )}
            {children}
          </PostContainer>
        </StyledPostContent>
      </Main>
      <Footer />
    </Wrapper>
  )
}

function Main({ image, children }: MainProps) {
  return image ? <Post>{children}</Post> : <PostMain>{children}</PostMain>
}

const PostHeader = styled.div`
  background-color: #141618;
  min-height: 600px;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-direction: column;
  z-index: -1;
`

const PostTitle = styled.h1`
  text-align: center;

  @media ${({ theme }) => theme.media.bp2} {
    font-size: 72px;
    line-height: 90px;
    max-width: 60%;
  }
`

export const PostHeaderTitle = styled(PostTitle)`
  color: #fff;
  margin: 59px auto 0;
  position: relative;
  z-index: 3;
  font-size: 36px;
  line-height: 48px;
  padding: 0 12px;

  @media ${({ theme }) => theme.media.bp2} {
    font-size: 60px;
    line-height: 80px;
  }
`

export const PostContentTitle = styled(PostTitle)`
  color: ${({ theme }) => theme.colors.primary};
  margin: 90px auto 0;
  max-width: none;
  font-size: 48px;
  line-height: 60px;
  text-align: center;

  @media ${({ theme }) => theme.media.bp2} {
    margin-top: 0;
  }
`

const PostSubtitle = styled.h2`
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
`

const PostHeaderSubtitle = styled(PostSubtitle)`
  position: absolute;
  bottom: 20px;
  z-index: 2;
  margin: 0;
  width: 100%;
`

const PostContentSubtitle = styled(PostSubtitle)`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 16px;
  margin: 0 0 60px;
`

const PostImage = styled.div<{ $backgroundImage?: string }>`
  background-color: #141618;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: fixed;
  opacity: 0.4;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  will-change: transform;
  background-image: ${({ $backgroundImage }) =>
    $backgroundImage ? `url(${$backgroundImage})` : 'none'};

  &::after {
    content: '';
    background-image: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.8) 0,
      transparent 50%,
      transparent 90%,
      rgba(0, 0, 0, 0.8)
    );
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 2;
    will-change: transform;
  }

  @media ${({ theme }) => theme.media.bp4} {
    position: absolute;
  }
`

const StyledPostContent = styled(PostContent)`
  & ::selection {
    background: #ff80bf;
    color: #000;
    -webkit-text-fill-color: #000;
  }
`
