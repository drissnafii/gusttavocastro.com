import Head from 'next/head'
import { GetStaticProps } from 'next'
import { LayoutGroup } from 'framer-motion'
import Base from '../layouts/Base'
import FeaturedProject from '../components/FeaturedProject'
import { FeaturedProjects } from '../components/FeaturedProjects'
import stripHtml from '../lib/strip-html'
import items, { Project, ProjectYear } from '../data/projects'

interface ProjectsProps {
  title: string
  tagline: string
  image: string
  primaryColor: string
  secondaryColor: string
}

export const getStaticProps: GetStaticProps<ProjectsProps> = async () => {
  const meta = {
    title: 'Projects // Driss Nafii',
    tagline: 'Work. Hobby. Open Source.',
    image: '/static/images/projects-bw.jpg',
    primaryColor: '#80ffea',
    secondaryColor: '#8aff80',
  }

  return { props: meta }
}

function Projects(props: ProjectsProps) {
  const renderFeatured = () => {
    const featured = ['MyClinic', 'InTrack', 'YallaVamos']

    return items
      .map((item: ProjectYear) => {
        return item.projects.filter((project: Project) => featured.includes(project.title))
      })
      .filter((item: Project[]) => {
        if (item.length > 0) {
          return item
        }
      })
      .flat()
      .map((item: Project, index: number) => {
        return <FeaturedProject key={index} project={item} index={index} />
      })
  }

  const renderAll = () => {
    return items.map((item: ProjectYear, index: number) => {
      return (
        <div key={index}>
          <h3>{item.year}</h3>
          <ul>
            {item.projects.map((project: Project, pIndex: number) => {
              return <ProjectItem key={pIndex} project={project} />
            })}
          </ul>
        </div>
      )
    })
  }

  const getTotalProjects = () => {
    let total = 0

    for (let i = 0; i < items.length; i++) {
      total = total + items[i].projects.length
    }

    return total
  }

  const { title, image } = props
  const description = `During my bootcamp journey, I built <strong>more than 30 projects</strong> that helped me learn and grow as a developer. Each project taught me something new about <strong>web development, problem-solving, and user experience</strong>. Here are some of the key projects that showcase my skills and passion for creating meaningful digital experiences.`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={stripHtml(description)} name="description" />
        <meta content={stripHtml(description)} property="og:description" />
        <meta content="https://drissnafii.me/projects" property="og:url" />
        <meta content={`https://drissnafii.me${image}`} property="og:image" />
      </Head>

      <LayoutGroup>
        <p dangerouslySetInnerHTML={{ __html: description }} />

        <h2>Featured Projects</h2>
        <FeaturedProjects>{renderFeatured()}</FeaturedProjects>

        <h2>All Projects</h2>
        {renderAll()}
      </LayoutGroup>
    </>
  )
}

interface ProjectItemProps {
  project: Project
}

function ProjectItem({ project }: ProjectItemProps) {
  return (
    <li>
      <a href={project.url} target="_blank">
        {project.title}
      </a>
    </li>
  )
}

Projects.Layout = Base

export default Projects
