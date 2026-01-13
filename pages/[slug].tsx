import Head from 'next/head'
import { ArticleJsonLd } from 'next-seo'
import { GetStaticProps, GetStaticPaths } from 'next'
import Blogpost from '../layouts/Blogpost'
import ErrorMessage from '../components/ErrorMessage'
import { getPostBySlug, getAllPosts, convertMarkdownToHtml } from '../lib/blog'

interface PostProps {
  title?: string
  description?: string
  slug?: string
  date?: string
  image?: string
  content?: string
  canonical_url?: string
  errorCode?: number
}

function Post(props: PostProps) {
  if (props.errorCode) {
    return <ErrorMessage code={props.errorCode} />
  }

  const title = `${props.title} // Driss Nafii`
  const description = props.description || ''
  const url = `https://drissnafii.me/${props.slug}`
  const date = new Date(props.date || '').toISOString()
  const image = props.image
    ? `https://drissnafii.me${props.image}`
    : 'https://drissnafii.me/static/images/home-opt.jpg'

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={description} name="description" />
        <meta content={description} property="og:description" />
        <meta content={url} property="og:url" />
        <meta content={image} property="og:image" />

        {props.canonical_url && <link rel="canonical" href={props.canonical_url} />}
      </Head>

      <ArticleJsonLd
        authorName="Driss Nafii"
        type="Blog"
        url={url}
        title={title}
        images={[image]}
        datePublished={date}
        dateModified={date}
        description={props.description || ''}
      />

      <div dangerouslySetInnerHTML={{ __html: props.content || '' }} />
    </>
  )
}

interface Params {
  slug: string
  [key: string]: string
}

export const getStaticProps: GetStaticProps<PostProps, Params> = async ({ params }) => {
  try {
    const post = getPostBySlug(params?.slug || '', [
      'canonical_url',
      'content',
      'date',
      'description',
      'image',
      'lang',
      'slug',
      'title',
    ])

    const content = await convertMarkdownToHtml(post.content || '')

    return {
      props: {
        ...post,
        content,
      },
      revalidate: 60,
    }
  } catch (e) {
    return { props: { errorCode: 404 } }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts(['slug'])

  return {
    paths: posts.map(post => {
      return {
        params: {
          slug: post.slug || '',
        },
      }
    }),
    fallback: 'blocking',
  }
}

Post.Layout = Blogpost

export default Post
