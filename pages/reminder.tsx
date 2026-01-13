import Head from 'next/head'
import { GetStaticProps } from 'next'
import Base from '../layouts/Base'
import { Box } from '../components/Box'

interface ReminderProps {
  title: string
  description: string
  tagline: string
  image: string
  primaryColor: string
  secondaryColor: string
}

export const getStaticProps: GetStaticProps<ReminderProps> = async () => {
  const meta = {
    title: 'Reminder // Driss Nafii',
    description:
      'Time is the most important asset. Time does not equal money. Time equals life. And you only have one chance to make it right.',
    tagline: 'Press On!',
    image: '/static/images/reminder-bw.jpg',
    primaryColor: '#80ffea',
    secondaryColor: '#8aff80',
  }

  return { props: meta }
}

function Reminder(props: ReminderProps) {
  const { title, description, image } = props

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={description} name="description" />
        <meta content={description} property="og:description" />
        <meta content="https://drissnafii.me/reminder" property="og:url" />
        <meta content={`https://drissnafii.me${image}`} property="og:image" />
      </Head>

      <Box style={{ textAlign: 'justify' }}>
        <p>
          <strong>Nothing in this world can take the place of good old persistence.</strong> Talent
          will not; nothing is more common than unsuccessful people with talent. Genius will not;
          unrewarded genius is almost a proverb. Education will not; the world is full of educated
          derelicts. <strong>Persistence and determination alone are omnipotent.</strong>. The
          slogan <strong>&apos;Press On!&apos;</strong> has solved and always will solve the
          problems of the human race.
        </p>
        <p>
          <em>- by Calvin Coolidge</em>
        </p>
      </Box>
    </>
  )
}

Reminder.Layout = Base

export default Reminder
