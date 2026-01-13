import styled from 'styled-components'
import { useState, useRef, ReactNode } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import type { LottieRefCurrentProps } from 'lottie-react'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

interface Project {
  title: string
  description: string
  url: string
  icon?: string
  stats?: string
}

interface FeaturedProjectProps {
  project: Project
  index?: number
}

interface AnimationProps {
  index?: number
  children: ReactNode
}

export default function FeaturedProject({ project, index }: FeaturedProjectProps) {
  const icon = project.icon ? require(`../public/static/icons/${project.icon}.json`) : null
  const iconRef = useRef<LottieRefCurrentProps>(null)

  return (
    <ProjectLink
      href={project.url}
      target="_blank"
      onMouseEnter={() => iconRef.current?.play()}
      onMouseLeave={() => iconRef.current?.stop()}
    >
      <Animation index={index}>
        {icon && (
          <Lottie
            lottieRef={iconRef}
            style={{ width: 24, height: 24, marginBottom: 10 }}
            animationData={icon}
            loop={false}
            autoplay={false}
          />
        )}
        <Body>
          <Title>{project.title}</Title>
          <Description>{project.description}</Description>
          {project.stats && <Stats>{project.stats}</Stats>}
        </Body>
      </Animation>
    </ProjectLink>
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
          layoutId="featuredProjects"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
      {children}
    </AnimContainer>
  )
}

const ProjectLink = styled.a`
  display: flex;
  transition: opacity ${({ theme }) => theme.transitions.duration} ease-in-out;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.borderRadius};
  text-decoration: none;
  width: 100%;

  &:hover {
    opacity: 1;
  }

  @media ${({ theme }) => theme.media.bp2} {
    width: calc(33.333% - 13px);
  }
`

const Body = styled.div`
  flex: 1 1 auto;
`

const Title = styled.p`
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
  font-size: 18px;
`

const Description = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.secondary};
  line-height: 24px;
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

const AnimContainerBase = styled.span`
  position: relative;
  width: 100%;
  padding: 20px;
`

const AnimContainer = motion(AnimContainerBase)

const AnimHoveredBase = styled.span`
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
