import styled from 'styled-components'
import { Box } from './Box'
import Toast from './Toast'
import { useRef, useState, forwardRef, ReactNode, RefObject } from 'react'
import { useRouter } from 'next/router'
import {
  KBarAnimator,
  KBarProvider,
  KBarPortal,
  useDeepMatches,
  KBarPositioner,
  KBarSearch,
  KBarResults,
  ActionImpl,
} from 'kbar'
import dynamic from 'next/dynamic'
import type { LottieRefCurrentProps } from 'lottie-react'

import emailIcon from '../public/static/icons/email.json'
import sourceIcon from '../public/static/icons/source.json'
import aboutIcon from '../public/static/icons/about.json'
import homeIcon from '../public/static/icons/home.json'
import articlesIcon from '../public/static/icons/articles.json'
import projectsIcon from '../public/static/icons/projects.json'
import talksIcon from '../public/static/icons/talks.json'
import usesIcon from '../public/static/icons/uses.json'
import reminderIcon from '../public/static/icons/reminder.json'
import copyLinkIcon from '../public/static/icons/copy-link.json'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

interface CommandBarProps {
  children: ReactNode
}

interface LottieIconProps {
  lottieRef: RefObject<LottieRefCurrentProps | null>
}

interface ActionWithIcon extends Omit<ActionImpl, 'icon'> {
  icon?: React.ReactElement<LottieIconProps>
}

export default function CommandBar({ children }: CommandBarProps) {
  const copyLinkRef = useRef<LottieRefCurrentProps>(null)
  const emailRef = useRef<LottieRefCurrentProps>(null)
  const sourceRef = useRef<LottieRefCurrentProps>(null)
  const homeRef = useRef<LottieRefCurrentProps>(null)
  const aboutRef = useRef<LottieRefCurrentProps>(null)
  const articlesRef = useRef<LottieRefCurrentProps>(null)
  const projectsRef = useRef<LottieRefCurrentProps>(null)
  const talksRef = useRef<LottieRefCurrentProps>(null)
  const usesRef = useRef<LottieRefCurrentProps>(null)
  const reminderRef = useRef<LottieRefCurrentProps>(null)
  const router = useRouter()
  const [showToast, setShowToast] = useState(false)

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setShowToast(true)
  }

  const iconSize = { width: 24, height: 24 }

  const actions = [
    {
      id: 'copy',
      name: 'Copy Link',
      shortcut: ['l'],
      keywords: 'copy-link',
      section: 'General',
      perform: copyLink,
      icon: (
        <Lottie
          lottieRef={copyLinkRef}
          style={iconSize}
          animationData={copyLinkIcon}
          loop={false}
          autoplay={false}
        />
      ),
    },
    {
      id: 'email',
      name: 'Send Email',
      shortcut: ['e'],
      keywords: 'send-email',
      section: 'General',
      perform: () => router.push('/contact'),
      icon: (
        <Lottie
          lottieRef={emailRef}
          style={iconSize}
          animationData={emailIcon}
          loop={false}
          autoplay={false}
        />
      ),
    },
    {
      id: 'source',
      name: 'View Source',
      shortcut: ['s'],
      keywords: 'view-source',
      section: 'General',
      perform: () => window.open('https://github.com/drissnafii/drissnafii.me', '_blank'),
      icon: (
        <Lottie
          lottieRef={sourceRef}
          style={iconSize}
          animationData={sourceIcon}
          loop={false}
          autoplay={false}
        />
      ),
    },
    {
      id: 'home',
      name: 'Home',
      shortcut: ['g', 'h'],
      keywords: 'go-home',
      section: 'Go To',
      perform: () => router.push('/'),
      icon: (
        <Lottie
          lottieRef={homeRef}
          style={iconSize}
          animationData={homeIcon}
          loop={false}
          autoplay={false}
        />
      ),
    },
    {
      id: 'about',
      name: 'About',
      shortcut: ['g', 'a'],
      keywords: 'go-about',
      section: 'Go To',
      perform: () => router.push('/about'),
      icon: (
        <Lottie
          lottieRef={aboutRef}
          style={iconSize}
          animationData={aboutIcon}
          loop={false}
          autoplay={false}
        />
      ),
    },
    {
      id: 'articles',
      name: 'Letters',
      shortcut: ['g', 'b'],
      keywords: 'go-articles',
      section: 'Go To',
      perform: () => router.push('/letters'),
      icon: (
        <Lottie
          lottieRef={articlesRef}
          style={iconSize}
          animationData={articlesIcon}
          loop={false}
          autoplay={false}
        />
      ),
    },
    {
      id: 'projects',
      name: 'Projects',
      shortcut: ['g', 'p'],
      keywords: 'go-projects',
      section: 'Go To',
      perform: () => router.push('/projects'),
      icon: (
        <Lottie
          lottieRef={projectsRef}
          style={iconSize}
          animationData={projectsIcon}
          loop={false}
          autoplay={false}
        />
      ),
    },
    {
      id: 'talks',
      name: 'Talks',
      shortcut: ['g', 't'],
      keywords: 'go-talks',
      section: 'Go To',
      perform: () => router.push('/talks'),
      icon: (
        <Lottie
          lottieRef={talksRef}
          style={iconSize}
          animationData={talksIcon}
          loop={false}
          autoplay={false}
        />
      ),
    },
    {
      id: 'uses',
      name: 'Uses',
      shortcut: ['g', 'u'],
      keywords: 'go-uses',
      section: 'Go To',
      perform: () => router.push('/uses'),
      icon: (
        <Lottie
          lottieRef={usesRef}
          style={iconSize}
          animationData={usesIcon}
          loop={false}
          autoplay={false}
        />
      ),
    },
    {
      id: 'reminder',
      name: 'Reminder',
      shortcut: ['g', 'r'],
      keywords: 'go-reminder',
      section: 'Go To',
      perform: () => router.push('/reminder'),
      icon: (
        <Lottie
          lottieRef={reminderRef}
          style={iconSize}
          animationData={reminderIcon}
          loop={false}
          autoplay={false}
        />
      ),
    },
  ]

  return (
    <>
      <KBarProvider actions={actions}>
        <KBarPortal>
          <Positioner>
            <Animator>
              <Search placeholder="Type a command or search…" />
              <RenderResults />
            </Animator>
          </Positioner>
        </KBarPortal>
        {children}
      </KBarProvider>

      <Toast
        title="Copied :D"
        description="You can now share it with anyone."
        isSuccess={true}
        showToast={showToast}
        setShowToast={setShowToast}
      />
    </>
  )
}

function RenderResults() {
  const { results } = useDeepMatches()

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === 'string' ? (
          <GroupName>{item}</GroupName>
        ) : (
          <ResultItem action={item as ActionWithIcon} active={active} />
        )
      }
    />
  )
}

interface ResultItemProps {
  action: ActionWithIcon
  active: boolean
}

const ResultItem = forwardRef<HTMLDivElement, ResultItemProps>(({ action, active }, ref) => {
  const lottieRef = (action.icon?.props as LottieIconProps)?.lottieRef

  if (active) {
    lottieRef?.current?.play()
  } else {
    lottieRef?.current?.stop()
  }

  return (
    <ResultBox
      ref={ref}
      $active={active}
      onMouseEnter={() => lottieRef?.current?.play()}
      onMouseLeave={() => lottieRef?.current?.stop()}
    >
      <Action>
        {action.icon && action.icon}
        <ActionRow>
          <span>{action.name}</span>
        </ActionRow>
      </Action>
      {action.shortcut?.length ? (
        <Shortcut aria-hidden>
          {action.shortcut.map(shortcut => (
            <Kbd key={shortcut}>{shortcut}</Kbd>
          ))}
        </Shortcut>
      ) : null}
    </ResultBox>
  )
})

ResultItem.displayName = 'ResultItem'

const Positioner = styled(KBarPositioner)`
  position: fixed;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  inset: 0px;
  padding: 14vh 16px 16px;
  background: rgba(0, 0, 0, 0.8);
  box-sizing: border-box;
`

const Search = styled(KBarSearch)`
  padding: 12px 16px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
  outline: none;
  border: none;
  margin: 0;
  background: ${({ theme }) => theme.colors.command};
  color: ${({ theme }) => theme.colors.primary};
`

const GroupName = styled.div`
  padding: 8px 16px;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
  background: ${({ theme }) => theme.colors.command};
`

const Kbd = styled.kbd`
  background: rgba(255, 255, 255, 0.1);
  color: ${({ theme }) => theme.colors.secondary};
  padding: 4px 8px;
  text-transform: uppercase;
`

const Shortcut = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: 4px;
`

const Action = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`

const ActionRow = styled.div`
  display: flex;
  flex-direction: column;
`

const Animator = styled(KBarAnimator)`
  background-color: #1a1c1e;
  max-width: 600px;
  width: 100%;
  color: ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  overflow: hidden;

  @supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none)) {
    background-color: ${({ theme }) => theme.colors.command};
    -webkit-backdrop-filter: saturate(300%) blur(25px);
    backdrop-filter: saturate(300%) blur(25px);
  }

  & > div > div::-webkit-scrollbar {
    display: none;
  }

  & > div > div {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`

const ResultBox = styled(Box)<{ $active: boolean }>`
  padding: 12px 16px;
  background: ${({ theme, $active }) =>
    $active ? 'rgba(255, 255, 255, 0.1)' : theme.colors.command};
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0;
  cursor: pointer;
  color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.secondary)};
`
