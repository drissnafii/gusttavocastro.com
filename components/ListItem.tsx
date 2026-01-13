import styled from 'styled-components'
import { useState, ReactNode } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import BlogDate from './BlogDate'

interface ListItemProps {
  href: string
  title: string
  date?: string
  index: number
}

interface AnimationProps {
  index: number
  children: ReactNode
}

export default function ListItem({ href, title, date, index }: ListItemProps) {
  if (href.charAt(0) === '/') {
    return (
      <ArticleItem>
        <InternalLink href={href}>
          <Animation index={index}>
            <Title>{title}</Title>
            <Date>
              <BlogDate dateString={date} />
            </Date>
          </Animation>
        </InternalLink>
      </ArticleItem>
    )
  }

  return (
    <Item>
      <Anchor href={href} target="_blank">
        <Animation index={index}>
          <Title>{title}</Title>
          <IconContainer>
            <i className="ri-arrow-right-up-line"></i>
          </IconContainer>
        </Animation>
      </Anchor>
    </Item>
  )
}

function Animation({ index, children }: AnimationProps) {
  const [hovered, setHovered] = useState<number | string>('')
  const isHovered = hovered === index

  return (
    <AnimContainer
      className="anim-container"
      onHoverStart={() => setHovered(index)}
      onHoverEnd={() => setHovered('')}
    >
      {isHovered && (
        <AnimHovered
          layoutId="listItem"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
      {children}
    </AnimContainer>
  )
}

const Item = styled.li`
  border-bottom: 1px solid ${({ theme }) => theme.colors.hover};

  &:last-child {
    border: 0;
  }
`

const Anchor = styled.a`
  text-decoration: none;
`

const InternalLink = styled(Link)`
  text-decoration: none;
`

const Title = styled.span`
  display: block;
  max-width: 500px;
  font-weight: 700;
  font-size: 18px;
  line-height: 40px;
  text-align: left;
`

const Date = styled.span`
  color: ${({ theme }) => theme.colors.secondary};
  display: block;
  font-weight: 500;
  font-size: 14px;
  min-width: 100px;
  text-align: left;

  @media ${({ theme }) => theme.media.bp2} {
    text-align: right;
  }
`

const IconContainer = styled.span`
  font-size: 24px;
`

const AnimContainerBase = styled.span`
  border: 0;
  color: ${({ theme }) => theme.colors.secondary};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  width: 100%;
  opacity: 1;
  transition: all ${({ theme }) => theme.transitions.duration} ease-in-out;
  text-decoration: none;
  position: relative;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`

const AnimContainer = motion(AnimContainerBase)

const AnimHoveredBase = styled.span`
  position: absolute;
  top: -1px;
  left: -20px;
  right: -20px;
  bottom: -1px;
  background: ${({ theme }) => theme.colors.hover};
  border-radius: ${({ theme }) => theme.radii.borderRadius};
  z-index: -1;
`

const AnimHovered = motion(AnimHoveredBase)

const ArticleItem = styled(Item)`
  .anim-container {
    flex-direction: column;

    @media ${({ theme }) => theme.media.bp2} {
      flex-direction: row;
    }
  }
`
