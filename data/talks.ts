export interface Presentation {
  title: string
  url: string
  video?: string
}

export interface Talk {
  title: string
  url: string
  cover: string
  date: string
  where: string
  attendees?: string
  presentations: Presentation[]
}

export interface TalkYear {
  year: string
  summary: string
  talks: Talk[]
}

const items: TalkYear[] = [
  {
    year: '2025',
    summary: 'Internship and development projects',
    talks: [
      {
        title: 'AI Development with Runkuplus',
        url: '',
        cover: '/static/images/confFigma.jpg',
        date: '2025-08-01',
        where: 'Runkuplus, Agadir - Morocco',
        presentations: [
          {
            title: 'AI-powered call management platform',
            url: '',
          },
        ],
      },
    ],
  },
  {
    year: '2024',
    summary: 'Training and learning',
    talks: [
      {
        title: 'YouCode Training',
        url: '',
        cover: '/static/images/talk-epicweb.jpg',
        date: '2024-11-01',
        where: 'YouCode | UM6P, Youssoufia - Morocco',
        presentations: [
          {
            title: 'Beginning Full-Stack web development training',
            url: '',
          },
        ],
      },
      {
        title: 'Personal Projects',
        url: '',
        cover: '/static/images/talk-epicweb.jpg',
        date: '2024-12-01',
        where: 'Personal Projects',
        presentations: [
          {
            title: 'MyClinic, InTrack, YallaVamos',
            url: '',
          },
        ],
      },
    ],
  },
]

export default items
