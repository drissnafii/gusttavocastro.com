import { LayoutGroup } from 'framer-motion'
import Head from 'next/head'
import styled from 'styled-components'
import { GetStaticProps } from 'next'
import FeaturedArticle from '../components/FeaturedArticle'
import { ListGroup } from '../components/ListGroup'
import ListItem from '../components/ListItem'
import Base from '../layouts/Base'
import { getAllPosts, getPostBySlug } from '../lib/blog'
import stripHtml from '../lib/strip-html'

interface PostData {
  [key: string]: string | undefined
}

interface LettersProps {
  title: string
  tagline: string
  image: string
  primaryColor: string
  secondaryColor: string
  featuredPosts: PostData[]
  allPosts: PostData[]
}

export const getStaticProps: GetStaticProps<LettersProps> = async () => {
  const allPosts = getAllPosts(['date', 'skip', 'slug', 'title'])

  const featuredParams = ['date', 'slug', 'title', 'image', 'content', 'description']

  const featuredPosts = [
    getPostBySlug('test-unitaire-laravel', featuredParams),
    getPostBySlug('honeypot-spam-protection', featuredParams),
  ]

  return {
    props: {
      title: 'Letters // Driss Nafii',
      tagline: 'Stories. Updates. Guides.',
      image: '/static/images/articles-bw.jpg',
      primaryColor: '#ffff80',
      secondaryColor: '#ff80bf',
      featuredPosts,
      allPosts,
    },
  }
}

function Articles(props: LettersProps) {
  const renderFeatured = () => {
    return props.featuredPosts.map((post, index) => {
      return (
        <FeaturedArticle
          key={index}
          index={index}
          href={`/${post.slug}/`}
          title={post.title || ''}
          description={post.description || ''}
          image={post.image || ''}
          content={post.content || ''}
        />
      )
    })
  }

  const renderAll = () => {
    return props.allPosts.map((post, index) => {
      if (!post.skip) {
        return (
          <ListItem
            key={index}
            index={index}
            href={`/${post.slug}/`}
            title={post.title || ''}
            date={post.date}
          />
        )
      }
      return null
    })
  }

  const { title, image } = props
  const description = `Here you can find all the <strong>${props.allPosts.length} letters</strong> I wrote. You can read about web development, software engineering, and tech career in both English and Portuguese.`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={stripHtml(description)} name="description" />
        <meta content={stripHtml(description)} property="og:description" />
        <meta content="https://drissnafii.me/articles" property="og:url" />
        <meta content={`https://drissnafii.me${image}`} property="og:image" />
      </Head>

      <LayoutGroup>
        <p dangerouslySetInnerHTML={{ __html: description }} />

        <h2>Featured Letters</h2>
        <FeaturedArticles>{renderFeatured()}</FeaturedArticles>

        <h2>All Letters</h2>
        <ListGroup>{renderAll()}</ListGroup>
      </LayoutGroup>
    </>
  )
}

const FeaturedArticles = styled.div`
  margin: 10px 0 0 -20px;

  @media ${({ theme }) => theme.media.bp2} {
    display: flex;
    justify-content: space-between;
  }
`

Articles.Layout = Base

export default Articles
