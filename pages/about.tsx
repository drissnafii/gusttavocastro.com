import styled from 'styled-components'
import { useState, useRef, ReactElement } from 'react'
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
      'Driss Nafii is a Moroccan Full-Stack web developer specializing in the MERN stack. He is currently studying at YouCode | UM6P in Youssoufia. His passion for building modern and scalable web applications led him to specialize in React.js, Next.js, Node.js, Express.js, and databases like MongoDB and PostgreSQL. He has experience with AWS services (EC2, RDS, S3, Lambda) and modern tools like Docker, N8N, and 11Labs.',
    tagline: 'Create. Learn. Evolve.',
    image: '/static/images/photo.png',
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
  const copyBioRef = useRef<LottieRefCurrentProps>(null)
  const downloadRef = useRef<LottieRefCurrentProps>(null)

  const renderIntro = () => {
    return (
      <Container>
        <Section>
          <Image
            alt="Driss"
            src="/static/images/photo.png"
            width="336"
            height="336"
            priority
          />
        </Section>
        <Section>
          <Paragraph $marginTop>
            <strong>Hey, I&apos;m Driss Nafii</strong>
            I started web development in 2024, specializing in the MERN stack.
          </Paragraph>
          <Paragraph>
            I&apos;m currently a <strong>Full-Stack web development student</strong> at YouCode |
            UM6P. I completed an AI development internship at Runkuplus in Agadir. I&apos;m
            originally from Morocco and currently living in <strong>Youssoufia</strong> for my
            studies.
          </Paragraph>
          <Paragraph>
            <strong>I love modern development</strong>, new technologies, and innovative projects.
            When I&apos;m not coding, I enjoy learning new technologies, watching movies, and{' '}
            <strong>exploring new development tools</strong>.
          </Paragraph>
        </Section>
      </Container>
    )
  }

  const renderBio = () => {
    const btnStyle = { display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }
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
            onMouseEnter={() => copyBioRef.current?.play()}
            onMouseLeave={() => copyBioRef.current?.stop()}
          >
            <Lottie
              lottieRef={copyBioRef}
              style={iconStyle}
              animationData={copyBioIcon}
              loop={false}
              autoplay={false}
            />
            Copy Bio
          </ButtonPrimary>
          <span style={{ margin: '0 20px 0 10px' }}>•</span>
          <ButtonPrimary
            as="a"
            download
            role="button"
            href="/static/images/photo.png"
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

    setToastTitle('Copied :D')
    setToastDescription('You can now paste it anywhere.')
    setShowToast(true)
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
