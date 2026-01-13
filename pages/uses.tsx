import Head from 'next/head'
import { GetStaticProps } from 'next'
import Base from '../layouts/Base'
import stripHtml from '../lib/strip-html'
import categories, { UsesCategory, UsesItem } from '../data/uses'

interface UsesProps {
  title: string
  description: string
  tagline: string
  image: string
  primaryColor: string
  secondaryColor: string
}

export const getStaticProps: GetStaticProps<UsesProps> = async () => {
  const meta = {
    title: 'Uses // Driss Nafii',
    description:
      "I often get messages asking about specific pieces of <strong>software or hardware I use</strong>. This is not a static page, it's a <strong>living document</strong> with everything I'm using nowadays.",
    tagline: 'Tools. Apps. Gear.',
    image: '/static/images/uses-bw.jpg',
    primaryColor: '#ffff80',
    secondaryColor: '#ff80bf',
  }

  return { props: meta }
}

function Uses(props: UsesProps) {
  const { title, description, image } = props

  const renderAll = () => {
    return categories.map((category: UsesCategory, index: number) => {
      return (
        <div key={index}>
          <h2>{category.name}</h2>
          <ul>
            {category.items.map((item: UsesItem, iIndex: number) => {
              return (
                <li key={iIndex}>
                  <a href={item.url} target="_blank">
                    {item.title}
                  </a>
                  <span> - </span>
                  <span dangerouslySetInnerHTML={{ __html: item.description }} />
                </li>
              )
            })}
          </ul>
        </div>
      )
    })
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={stripHtml(description)} name="description" />
        <meta content={stripHtml(description)} property="og:description" />
        <meta content="https://drissnafii.me/uses" property="og:url" />
        <meta content={`https://drissnafii.me${image}`} property="og:image" />
      </Head>

      <p dangerouslySetInnerHTML={{ __html: description }} />

      {renderAll()}
    </>
  )
}

Uses.Layout = Base

export default Uses
