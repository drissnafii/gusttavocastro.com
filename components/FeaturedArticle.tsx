import styled from 'styled-components'
import { useState, ReactNode } from 'react'
import { motion } from 'framer-motion'
import readingTime from 'reading-time'
import Link from 'next/link'

interface FeaturedArticleProps {
  href: string
  title: string
  description: string
  image: string
  content: string
  index: number
}

interface AnimationProps {
  index: number
  children: ReactNode
}

export default function FeaturedArticle({
  href,
  title,
  description,
  image,
  content,
  index,
}: FeaturedArticleProps) {
  const stats = readingTime(content)

  return (
    <Article href={href}>
      <Animation index={index}>
        <Container>
          <ImageContainer $backgroundImage={image} />
          <Content>
            <Title>{title}</Title>
            <Description>{description}</Description>
            <Stats>{stats.text}</Stats>
          </Content>
        </Container>
      </Animation>
    </Article>
  )
}

function Animation({ index, children }: AnimationProps) {
  const [hovered, setHovered] = useState<number | string>('')
  const isHovered = hovered === index

  return (
    <AnimContainer
      onHoverStart={() => setHovered(index)}
      onHoverEnd={() => setHovered('')}
      className="featured-article-anim"
    >
      {isHovered && (
        <AnimHovered
          layoutId="featuredArticles"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
      {children}
    </AnimContainer>
  )
}

const Article = styled(Link)`
  border: 0;
  width: 100%;
  text-decoration: none;

  &:hover {
    opacity: 1;
  }

  @media ${({ theme }) => theme.media.bp2} {
    width: 370px;
    margin-left: 20px;

    &:first-child {
      margin-left: 0;
    }
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const ImageContainer = styled.div<{ $backgroundImage: string }>`
  border-radius: 8px;
  width: 100%;
  height: 180px;
  margin-bottom: 20px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  filter: grayscale(1);
  background-image: url(${({ $backgroundImage }) => $backgroundImage});

  @media ${({ theme }) => theme.media.bp2} {
    width: 370px;
  }
`

const Content = styled.div`
  max-width: 450px;
  margin-right: 20px;

  @media ${({ theme }) => theme.media.bp2} {
    max-width: 100%;
    margin-right: 0;
  }
`

const Title = styled.h3`
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
`

const Description = styled.p`
  color: ${({ theme }) => theme.colors.secondary};
  display: -webkit-box;
  margin: 0;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const Stats = styled.p`
  margin: 5px 0 0;
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
  display: inline-block;
  font-weight: 500;
  letter-spacing: 1.2px;
  font-size: 12px;
`

const AnimContainerBase = styled.div`
  position: relative;
  width: 100%;
  padding: 20px;
`

const AnimContainer = motion(AnimContainerBase)

const AnimHoveredBase = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.colors.hover};
  border-radius: ${({ theme }) => theme.radii.borderRadius};
  z-index: -1;
`

const AnimHovered = motion(AnimHoveredBase)
