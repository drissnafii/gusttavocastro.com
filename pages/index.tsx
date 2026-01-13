import styled from 'styled-components'
import Head from 'next/head'
import { GetStaticProps } from 'next'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ShortcutHome from '../components/ShortcutHome'
import { PostMain, PostContent, PostContainer } from '../components/Post'
import { Wrapper } from '../components/Wrapper'
import { getPersonJsonLd } from '../lib/json-ld'

interface IndexProps {
  title: string
  description: string
  image: string
}

export const getStaticProps: GetStaticProps<IndexProps> = async () => {
  return {
    props: {
      title: 'Dendo',
      description: 'MERN-STACK DEVELOPER',
      image: '/static/images/home-bw.jpg',
    },
  }
}

export default function Index({ title, description, image }: IndexProps) {
  return (
    <Wrapper>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={description} name="description" />
        <meta content={description} property="og:description" />
        <meta content="https://drissnafii.me" property="og:url" />
        <meta content={`https://drissnafii.me${image}`} property="og:image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getPersonJsonLd()),
          }}
          key="person-jsonld"
        />
      </Head>

      <Navbar />
      <Home>
        <PostContent>
          <PostContainer>
            <div>
              <h1>{title}</h1>
              <p>
                <strong>
                  Full-Stack Web Development Student at{' '}
                  <a href="https://youcode.ma" target="blank">
                    YouCode | UM6P
                  </a>
                </strong>
                <br />
                {description}
              </p>
              <ShortcutHome />
            </div>
          </PostContainer>
        </PostContent>
      </Home>
      <Footer />
    </Wrapper>
  )
}

const Home = styled(PostMain)`
  align-items: center;
  display: flex;
  margin: 0 auto;

  @media ${({ theme }) => theme.media.bp2} {
    width: 800px;
  }
`
