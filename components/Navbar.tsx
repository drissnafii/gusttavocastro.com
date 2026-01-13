import styled from 'styled-components'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion, LayoutGroup } from 'framer-motion'
import { useKBar } from 'kbar'

export default function Navbar() {
  const router = useRouter()
  const pages = ['About', 'Letters', 'Projects', 'Talks', 'Uses', 'Reminder']
  const [hovered, setHovered] = useState('')
  const { query } = useKBar()

  return (
    <LayoutGroup>
      <Header>
        <InternalLink href="/">
          <ButtonLogo>d</ButtonLogo>
        </InternalLink>

        <Nav>
          <List>
            {pages.map(page => {
              const path = `/${page.toLowerCase()}`
              const isHovered = hovered === page
              const isActive = router.pathname === path

              return (
                <li key={page}>
                  <InternalLink href={path}>
                    <NavContainer
                      onHoverStart={() => setHovered(page)}
                      onHoverEnd={() => setHovered('')}
                      $isActive={isActive}
                    >
                      {isHovered && (
                        <NavHovered
                          layoutId="nav"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        />
                      )}
                      {page}
                    </NavContainer>
                  </InternalLink>
                </li>
              )
            })}
          </List>
        </Nav>

        <Aside>
          <ButtonHeader
            as="button"
            type="button"
            aria-label="Command"
            onClick={query.toggle}
            style={{ padding: '0 8px' }}
          >
            <Icon className="ri-command-line" />
          </ButtonHeader>
        </Aside>
      </Header>
    </LayoutGroup>
  )
}

const Header = styled.header`
  display: flex;
  align-items: center;
  color: white;
  font-size: 12px;
  min-height: 59px;
  width: 100%;
  flex-wrap: wrap;
  position: absolute;
  top: 0;
  z-index: 3;
  margin-top: 13px;

  @media ${({ theme }) => theme.media.bp2} {
    margin-top: 0;
  }

  & a {
    border: none;
  }
`

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: inline-flex;
  position: relative;

  @media ${({ theme }) => theme.media.bp1} {
    justify-content: space-around;
  }
`

const ButtonHeader = styled.div`
  appearance: none;
  background: transparent;
  border: none;
  border-radius: ${({ theme }) => theme.radii.borderRadius};
  color: white;
  cursor: pointer;
  height: 34px;
  padding: 0 10px;
  transition: background ${({ theme }) => theme.transitions.duration} ease-in-out;

  &:hover {
    background: ${({ theme }) => theme.colors.hover};
  }
`

const Icon = styled.i`
  font-size: 24px;
  line-height: 32px;
`

const ButtonLogo = styled(ButtonHeader)`
  font-weight: 700;
  font-size: 32px;
  text-decoration: none;
  margin-left: 12px;
  font-family: ${({ theme }) => theme.fonts.heading};
`

const Nav = styled.nav`
  text-align: center;
  flex: 1;
  order: 2;
  flex-basis: 100%;

  @media ${({ theme }) => theme.media.bp2} {
    order: 0;
    flex-basis: initial;
  }

  @media ${({ theme }) => theme.media.bp3} {
    overflow-x: scroll;
    overflow-y: hidden;
  }
`

const Aside = styled.div`
  display: flex;
  align-items: center;
  padding-right: 12px;
  margin-left: auto;
`

const InternalLink = styled(Link)`
  border: 0;
  position: relative;

  &:hover,
  &:focus {
    opacity: 1;
  }
`

const NavContainerBase = styled.span<{ $isActive?: boolean }>`
  color: ${({ theme, $isActive }) => ($isActive ? theme.colors.primary : theme.colors.secondary)};
  cursor: pointer;
  display: inline-block;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 1.2px;
  padding: 8px 12px;
  text-decoration: none;
  text-transform: uppercase;
  transition: color ${({ theme }) => theme.transitions.duration} ease-in-out;
  border-bottom: none;
  position: relative;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  &::after {
    content: '';
    position: absolute;
    margin: 0px auto;
    top: 0;
    left: 0px;
    right: 0px;
    height: 1px;
    width: 20px;
    background: rgb(255, 255, 255);
    opacity: ${({ $isActive }) => ($isActive ? 1 : 0)};
    transition: opacity ${({ theme }) => theme.transitions.duration} ease-in-out;
  }
`

const NavContainer = motion(NavContainerBase)

const NavHoveredBase = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.colors.hover};
  border-radius: ${({ theme }) => theme.radii.borderRadius};
  z-index: -1;
`

const NavHovered = motion(NavHoveredBase)
