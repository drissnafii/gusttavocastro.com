import Head from 'next/head'
import { GetStaticProps } from 'next'
import { LayoutGroup } from 'framer-motion'
import { parseISO, format } from 'date-fns'
import Base from '../layouts/Base'
import { Box } from '../components/Box'
import FeaturedTalk from '../components/FeaturedTalk'
import stripHtml from '../lib/strip-html'
import items, { Talk, TalkYear, Presentation } from '../data/talks'

interface TalksProps {
  title: string
  tagline: string
  image: string
  primaryColor: string
  secondaryColor: string
}

export const getStaticProps: GetStaticProps<TalksProps> = async () => {
  const meta = {
    title: 'Talks // Driss Nafii',
    tagline: 'Conferences. Meetups. Events.',
    image: '/static/images/talks-bw.jpg',
    primaryColor: '#9580ff',
    secondaryColor: '#80ffea',
  }

  return { props: meta }
}

function Talks(props: TalksProps) {
  const renderFeatured = () => {
    const featured = ['Developer Experience', 'Hands-on Figma for devs', 'Pitch - Startup']

    return items
      .map((item: TalkYear) => {
        return item.talks.filter((talk: Talk) => featured.includes(talk.title))
      })
      .filter((item: Talk[]) => {
        if (item.length > 0) {
          return item
        }
      })
      .map((item: Talk[], index: number) => {
        return <FeaturedTalk key={index} talk={item[0]} />
      })
  }

  const renderAll = () => {
    return items.map((item: TalkYear, index: number) => {
      return (
        <div key={index}>
          <h3>{item.year}</h3>
          <p>{item.summary}</p>
          {item.talks.map((talk: Talk, tIndex: number) => {
            return <TalkItem key={tIndex} talk={talk} />
          })}
        </div>
      )
    })
  }

  const getTotalTalks = () => {
    let total = 0

    for (let i = 0; i < items.length; i++) {
      total += items[i].talks.length
    }

    return total
  }

  const { title, image } = props
  const description = `I went my first conference in 2023 and felt in love with <strong>sharing knowledge</strong> publicly. Since then, I have traveled to <strong>various places</strong> and gave more than <strong>${getTotalTalks()} talks</strong>. Want me to speak at your event? Hit me up!`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={stripHtml(description)} name="description" />
        <meta content={stripHtml(description)} property="og:description" />
        <meta content="https://drissnafii.me/talks" property="og:url" />
        <meta content={`https://drissnafii.me${image}`} property="og:image" />
      </Head>

      <LayoutGroup>
        <p dangerouslySetInnerHTML={{ __html: description }} />

        <h2>Featured Talks</h2>
        <Box style={{ margin: '10px 0 0 -20px' }}>{renderFeatured()}</Box>

        <h2>All Talks</h2>
        {renderAll()}
      </LayoutGroup>
    </>
  )
}

interface TalkItemProps {
  talk: Talk
}

function TalkItem({ talk }: TalkItemProps) {
  return (
    <div>
      <h3>
        <a href={talk.url} target="_blank">
          {talk.title}
        </a>
      </h3>
      <ul>
        <li>
          <em>When:</em> {format(parseISO(talk.date), 'LLLL, d')}
        </li>
        <li>
          <em>Where:</em> {talk.where}
        </li>
        {talk.attendees && (
          <li>
            <em>Attendees:</em> {talk.attendees}
          </li>
        )}
        {talk.presentations &&
          talk.presentations.map((presentation: Presentation, pIndex: number) => {
            return (
              <li key={pIndex}>
                <em>Presentation:</em>{' '}
                <a href={presentation.url} target="_blank">
                  {presentation.title}
                </a>{' '}
                {presentation.video && (
                  <a href={presentation.video} target="_blank">
                    (Video)
                  </a>
                )}
              </li>
            )
          })}
      </ul>
    </div>
  )
}

Talks.Layout = Base

export default Talks
