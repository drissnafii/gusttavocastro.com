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
  const description = `I'm obsessed with projects where <strong>user experience</strong> is the focus. Here you can navigate to <strong>${getTotalProjects()} different</strong> websites, apps, and libraries I've built. Some projects are still active, others have been discontinued— and I have new ones that are being sketched out.`

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
