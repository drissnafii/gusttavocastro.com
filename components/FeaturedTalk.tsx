import { useState, ReactNode } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { motion } from 'framer-motion'

interface Presentation {
  title: string
  url: string
  video?: string
}

interface Talk {
  title: string
  cover: string
  where: string
  presentations: Presentation[]
}

interface FeaturedTalkProps {
  talk: Talk
  index?: number
}

interface AnimationProps {
  index?: number
  children: ReactNode
}

export default function FeaturedTalk({ talk, index }: FeaturedTalkProps) {
  return (
    <TalkLink href={talk.presentations[0].video || '#'} target="_blank">
      <Animation index={index}>
        <Content>
          <ImageContainer>
            <Image src={talk.cover} alt={talk.title} width="250" height="138" />
          </ImageContainer>
          <div>
            <Title>{talk.presentations[0].title}</Title>
            <Paragraph>{talk.where}</Paragraph>
            <Paragraph>{talk.title}</Paragraph>
          </div>
        </Content>
      </Animation>
    </TalkLink>
  )
}

function Animation({ index, children }: AnimationProps) {
  const [hovered, setHovered] = useState<number | string>('')
  const isHovered = hovered === index

  return (
    <AnimContainer
      onHoverStart={() => setHovered(index ?? '')}
      onHoverEnd={() => setHovered('')}
    >
      {isHovered && (
        <AnimHovered
          layoutId="featuredTalks"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
      {children}
    </AnimContainer>
  )
}

const TalkLink = styled.a`
  margin-top: 20px;
  border: 0;
  text-decoration: none;

  &:first-child {
    margin-left: 0;
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;

  @media ${({ theme }) => theme.media.bp2} {
    flex-direction: row;
    height: 140px;
  }
`

const ImageContainer = styled.div`
  margin-right: 20px;
  width: 250px;

  & img {
    filter: grayscale(1);
  }
`

const Title = styled.h3`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 18px;
  margin: 0;
`

const Paragraph = styled.p`
  color: ${({ theme }) => theme.colors.secondary};
  margin: 0;
`

const AnimContainerBase = styled.div`
  padding: 20px;
  position: relative;
  width: 100%;
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
