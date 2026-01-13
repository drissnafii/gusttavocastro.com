export interface Project {
  title: string
  description: string
  url: string
  active: boolean
  icon?: string
  stats?: string
}

export interface ProjectYear {
  year: string
  projects: Project[]
}

const items: ProjectYear[] = [
  {
    year: '2025',
    projects: [
      {
        title: 'MyClinic',
        description: 'Full-stack web application dedicated to healthcare data management',
        url: 'https://github.com/drissnafii/myclinic',
        active: true,
        icon: 'projects',
        stats: 'React.js, Express.js, MongoDB, Redis',
      },
      {
        title: 'InTrack',
        description: 'Personal financial management web application',
        url: 'https://github.com/drissnafii/intrack',
        active: true,
        icon: 'investing',
        stats: 'JavaScript, CSS, EJS, Express.js',
      },
      {
        title: 'YallaVamos',
        description: 'A web guide for the 2030 FIFA World Cup in Morocco',
        url: 'https://github.com/drissnafii/yallavamos',
        active: true,
        icon: 'home',
        stats: 'PHP, Blade, PostgreSQL, Laravel 12',
      },
    ],
  },
  {
    year: '2024',
    projects: [
      {
        title: 'Personal Portfolio',
        description: 'Personal portfolio website built with Next.js',
        url: 'https://drissnafii.me',
        active: true,
        icon: 'about',
        stats: 'Next.js, React, Stitches',
      },
      {
        title: 'Learning Projects',
        description: 'Various projects completed during my training',
        url: '',
        active: false,
        stats: 'HTML, CSS, JavaScript',
      },
    ],
  },
]

export default items
