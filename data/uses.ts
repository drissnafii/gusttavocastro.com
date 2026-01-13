export interface UsesItem {
  title: string
  description: string
  url: string
}

export interface UsesCategory {
  name: string
  items: UsesItem[]
}

const categories: UsesCategory[] = [
  {
    name: 'Desk',
    items: [
      {
        title: 'Personal Laptop',
        description: 'My main development setup for all my projects.',
        url: '',
      },
      {
        title: 'Wireless Mouse',
        description: 'A simple and efficient mouse for development.',
        url: '',
      },
      {
        title: 'Mechanical Keyboard',
        description: 'I love the tactile feel for coding during long hours.',
        url: '',
      },
    ],
  },
  {
    name: 'Development',
    items: [
      {
        title: 'Visual Studio Code',
        description: 'My main editor with many extensions for React and Node.js.',
        url: 'https://code.visualstudio.com/',
      },
      {
        title: 'Postman',
        description: 'For testing my REST and GraphQL APIs.',
        url: 'https://www.postman.com/',
      },
      {
        title: 'Git & GitHub',
        description: 'Version control and collaboration on all my projects.',
        url: 'https://github.com/',
      },
      {
        title: 'Docker',
        description: 'Containerization for development and deployment.',
        url: 'https://www.docker.com/',
      },
      {
        title: 'MongoDB Compass',
        description: 'Graphical interface for managing my MongoDB databases.',
        url: 'https://www.mongodb.com/products/compass',
      },
    ],
  },
  {
    name: 'Apps',
    items: [
      {
        title: 'Figma',
        description: 'For design and prototyping of my user interfaces.',
        url: 'https://figma.com',
      },
      {
        title: 'Notion',
        description: 'Project organization and note-taking.',
        url: 'https://notion.so/',
      },
      {
        title: 'Discord',
        description: 'Communication with the developer community.',
        url: 'https://discord.com/',
      },
      {
        title: 'Excalidraw',
        description: 'Virtual whiteboard for drawing diagrams.',
        url: 'https://excalidraw.com/',
      },
    ],
  },
  {
    name: 'Services',
    items: [
      {
        title: 'GitHub',
        description: 'Hosting all my open-source projects.',
        url: 'https://github.com',
      },
      {
        title: 'Vercel',
        description: 'Deployment of my Next.js applications.',
        url: 'https://vercel.com',
      },
      {
        title: 'AWS',
        description: 'Cloud services for EC2, RDS, S3, and Lambda.',
        url: 'https://aws.amazon.com',
      },
      {
        title: 'MongoDB Atlas',
        description: 'Cloud database for my applications.',
        url: 'https://www.mongodb.com/atlas',
      },
      {
        title: 'N8N',
        description: 'Workflow automation and integrations.',
        url: 'https://n8n.io',
      },
    ],
  },
]

export default categories
