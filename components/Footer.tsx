import Link from 'next/link'
import styled from 'styled-components'

interface FooterLink {
  title: string
  url: string
  icon: string
}

export default function Footer() {
  const links: FooterLink[] = [
    {
      title: 'Email',
      url: '/contact',
      icon: 'ri-mail-line',
    },
    {
      title: 'LinkedIn',
      url: 'https://linkedin.com/in/driss-nafii',
      icon: 'ri-linkedin-line',
    },
    {
      title: 'GitHub',
      url: 'https://github.com/drissnafii',
      icon: 'ri-github-line',
    },
    {
      title: 'Portfolio',
      url: 'https://drissnafii.me',
      icon: 'ri-global-line',
    },
  ]

  const renderAnchor = (link: FooterLink, index: number) => {
    if (link.url.startsWith('http')) {
      return (
        <Anchor key={index} href={link.url} target="_blank" className="no-border">
          <Title>{link.title}</Title>
          <Icon className={link.icon} />
        </Anchor>
      )
    }

    return (
      <InternalLink key={index} href={link.url} className="no-border">
        <Title>{link.title}</Title>
        <Icon className={link.icon} />
      </InternalLink>
    )
  }

  return <Container>{links.map(renderAnchor)}</Container>
}

const Icon = styled.i`
  color: ${({ theme }) => theme.colors.primary};
  opacity: 1;
  margin-left: 5px;
  margin-top: 1px;
  font-size: 24px;

  @media ${({ theme }) => theme.media.bp2} {
    opacity: 0;
    font-size: 16px;
  }
`

const Container = styled.footer`
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;

  & a {
    border: none;
  }
`

const Anchor = styled.a`
  color: ${({ theme }) => theme.colors.secondary};
  display: flex;
  font-size: 15px;
  border: 0;
  margin-left: 20px;
  text-decoration: none;
  text-transform: lowercase;
  transition: color ${({ theme }) => theme.transitions.duration} ease-in-out;

  &:hover,
  &:focus {
    color: ${({ theme }) => theme.colors.primary};
    opacity: 1;
  }

  &:hover ${Icon} {
    transition: opacity ${({ theme }) => theme.transitions.duration} ease-in-out;
    opacity: 1;
  }

  &:first-child {
    margin: 0;
  }
`

const InternalLink = styled(Link)`
  color: ${({ theme }) => theme.colors.secondary};
  display: flex;
  font-size: 15px;
  border: 0;
  margin-left: 20px;
  text-decoration: none;
  text-transform: lowercase;
  transition: color ${({ theme }) => theme.transitions.duration} ease-in-out;

  &:hover,
  &:focus {
    color: ${({ theme }) => theme.colors.primary};
    opacity: 1;
  }

  &:hover ${Icon} {
    transition: opacity ${({ theme }) => theme.transitions.duration} ease-in-out;
    opacity: 1;
  }

  &:first-child {
    margin: 0;
  }
`

const Title = styled.span`
  display: none;

  @media ${({ theme }) => theme.media.bp2} {
    display: block;
  }
`
