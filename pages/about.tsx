import styled from 'styled-components'
import { useState, useRef } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { parseISO, format, intervalToDuration } from 'date-fns'
import { GetStaticProps } from 'next'
import Base from '../layouts/Base'
import { ButtonPrimary } from '../components/ButtonPrimary'
import Toast from '../components/Toast'
import stripHtml from '../lib/strip-html'
import items, { CareerItem } from '../data/about'
import dynamic from 'next/dynamic'
import type { LottieRefCurrentProps } from 'lottie-react'

import copyBioIcon from '../public/static/icons/copy-bio.json'
import checkmarkIcon from '../public/static/icons/checkmark.json'
import downloadIcon from '../public/static/icons/download.json'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

interface AboutProps {
  title: string
  description: string
  tagline: string
  image: string
  primaryColor: string
  secondaryColor: string
}

export const getStaticProps: GetStaticProps<AboutProps> = async () => {
  const meta = {
    title: 'About // Driss Nafii',
    description:
      'Driss Nafii is a Full-Stack web developer specializing in modern web technologies. His passion for building modern and scalable web applications led him to specialize in React.js, Next.js, Node.js, and modern development tools.',
    tagline: 'Create. Learn. Evolve.',
    image: '/static/images/photo.webp',
    primaryColor: '#ff80bf',
    secondaryColor: '#9580ff',
  }

  return { props: meta }
}

function About(props: AboutProps) {
  const { title, description, image } = props
  const [toastTitle, setToastTitle] = useState('')
  const [toastDescription, setToastDescription] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const copyBioRef = useRef<LottieRefCurrentProps>(null)
  const downloadRef = useRef<LottieRefCurrentProps>(null)

  const renderIntro = () => {
    return (
      <Container>
        <Section>
          <Image
            alt="Driss Nafii"
            src="/static/images/photo.webp"
            width="336"
            height="336"
            priority
            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
          />
        </Section>
        <Section>
          <Paragraph $marginTop>
            <strong>Hey, I&apos;m Driss Nafii</strong>
            I&apos;m a passionate Full-Stack web developer specializing in modern web technologies.
          </Paragraph>
          <Paragraph>
            I&apos;m currently focused on building <strong>scalable web applications</strong> using 
            React.js, Next.js, and Node.js. I have experience with modern development tools and 
            enjoy creating user-friendly interfaces and robust backend systems.
          </Paragraph>
          <Paragraph>
            <strong>I love modern development</strong>, new technologies, and innovative projects.
            When I&apos;m not coding, I enjoy learning new technologies, exploring development tools, 
            and <strong>staying up-to-date with industry trends</strong>.
          </Paragraph>
        </Section>
      </Container>
    )
  }

  const renderBio = () => {
    const btnStyle = { display: 'inline-flex', justifyContent: 'center', alignItems: 'center', minWidth: '155px' }
    const iconStyle = { width: 24, height: 24, marginRight: 8 }

    return (
      <div>
        <p>
          This is made for journalists, podcast hosts, and event organizers to copy-and-paste.
        </p>
        <blockquote>
          <p>{description}</p>
        </blockquote>
        <ButtonsContainer>
          <ButtonPrimary
            as="button"
            style={btnStyle}
            onClick={copyBio}
            onMouseEnter={() => !isCopied && copyBioRef.current?.play()}
            onMouseLeave={() => !isCopied && copyBioRef.current?.stop()}
          >
            <Lottie
              lottieRef={copyBioRef}
              style={iconStyle}
              animationData={isCopied ? checkmarkIcon : copyBioIcon}
              loop={false}
              autoplay={isCopied}
            />
            {isCopied ? 'Copied' : 'Copy Bio'}
          </ButtonPrimary>
          <span style={{ margin: '0 20px 0 10px' }}>•</span>
          <ButtonPrimary
            as="a"
            download
            role="button"
            href="/static/images/photo.webp"
            style={btnStyle}
            onClick={downloadHeadshot}
            onMouseEnter={() => downloadRef.current?.play()}
            onMouseLeave={() => downloadRef.current?.stop()}
          >
            <Lottie
              lottieRef={downloadRef}
              style={iconStyle}
              animationData={downloadIcon}
              loop={false}
              autoplay={false}
            />
            Download Headshot
          </ButtonPrimary>
        </ButtonsContainer>
      </div>
    )
  }

  const renderAll = () => {
    return items.map((item: CareerItem, index: number) => {
      return (
        <div style={{ marginBottom: 40 }} key={index}>
          <h3>{item.jobTitle}</h3>
          <p style={{ margin: 0 }}>
            <a href={item.companyUrl} target="_blank">
              {item.company}
            </a>
            <span> • {item.location}</span>
          </p>
          <p style={{ margin: 0 }}>
            <span>{format(parseISO(item.startDate), 'LLL yyyy')}</span>
            <span> – </span>
            <span>{item.endDate ? format(parseISO(item.endDate), 'LLL yyyy') : 'Present'}</span>
            <span> • </span>
            <span>{getDuration(item.startDate, item.endDate)}</span>
          </p>
        </div>
      )
    })
  }

  const getDuration = (startDate: string, endDate?: string) => {
    const durationObj = intervalToDuration({
      start: parseISO(startDate),
      end: endDate ? parseISO(endDate) : new Date(),
    })

    let durationStr = ''

    if (durationObj.years && durationObj.years > 1) {
      durationStr = `${durationObj.years} yrs `
    } else if (durationObj.years === 1) {
      durationStr = `${durationObj.years} yr `
    }

    durationStr += `${durationObj.months} mos`

    return durationStr
  }

  const downloadHeadshot = () => {
    setToastTitle('Downloading...')
    setToastDescription('You can now add this photo to your fancy site.')
    setShowToast(true)
  }

  const copyBio = (e: React.MouseEvent) => {
    e.preventDefault()
    navigator.clipboard.writeText(description)

    // Set copied state
    setIsCopied(true)

    // Reset after 2 seconds
    setTimeout(() => {
      setIsCopied(false)
    }, 2000)
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={stripHtml(description)} name="description" />
        <meta content={stripHtml(description)} property="og:description" />
        <meta content="https://drissnafii.me/about" property="og:url" />
        <meta content={`https://drissnafii.me${image}`} property="og:image" />
      </Head>

      {renderIntro()}

      <h2>Bio</h2>
      {renderBio()}

      <h2>Career</h2>
      {renderAll()}

      <Toast
        title={toastTitle}
        description={toastDescription}
        isSuccess={true}
        showToast={showToast}
        setShowToast={setShowToast}
      />
    </>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media ${({ theme }) => theme.media.bp2} {
    flex-direction: row;
  }
`

const Paragraph = styled.p<{ $marginTop?: boolean }>`
  @media ${({ theme }) => theme.media.bp2} {
    margin: 15px 0;
    ${({ $marginTop }) => $marginTop && 'margin-top: -6px;'}
  }

  ${({ $marginTop }) => $marginTop && 'margin-top: 16px;'}
`

const ButtonsContainer = styled.p`
  display: flex;
  align-items: center;
`

const Section = styled.div`
  margin-top: 0px;
  width: auto;

  @media ${({ theme }) => theme.media.bp2} {
    width: 48%;
  }
`

About.Layout = Base

export default About
