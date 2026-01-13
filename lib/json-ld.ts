interface Organization {
  '@type': string
  url: string
  name: string
}

interface Thing {
  '@type': string
  name: string
}

interface Language {
  '@type': string
  name: string
}

interface Country {
  '@type': string
  name: string
}

interface EducationalOrganization {
  '@type': string
  name: string
  url?: string
  startDate: string
  endDate?: string
}

interface PersonJsonLd {
  '@context': string
  '@type': string
  url: string
  affiliation: Organization[]
  description: string
  image: string
  name: string
  givenName: string
  familyName: string
  gender: string
  birthPlace: string
  jobTitle: string
  sameAs: string[]
  knowsAbout: Thing[]
  knowsLanguage: Language[]
  nationality: Country[]
  alumniOf: EducationalOrganization[]
}

export const getPersonJsonLd = (): PersonJsonLd => {
  return {
    '@context': 'https://schema.org/',
    '@type': 'Person',
    url: 'https://drissnafii.me/',
    affiliation: [
      {
        '@type': 'Organization',
        url: 'https://youcode.ma/',
        name: 'YouCode | UM6P',
      },
      {
        '@type': 'Organization',
        url: 'https://runkuplus.com/',
        name: 'Runkuplus',
      },
    ],
    description:
      'Driss Nafii is a Moroccan Full-Stack web developer specializing in the MERN stack. He is currently studying at YouCode | UM6P in Youssoufia and completed an AI development internship at Runkuplus in Agadir.',
    image: 'https://drissnafii.me/static/images/photo.png',
    name: 'Driss Nafii',
    givenName: 'Driss',
    familyName: 'Nafii',
    gender: 'Male',
    birthPlace: 'Morocco',
    jobTitle: 'Full-Stack Development Student',
    sameAs: [
      'https://www.linkedin.com/in/driss-nafii',
      'https://github.com/drissnafii',
      'https://drissnafii.me',
    ],
    knowsAbout: [
      { '@type': 'Thing', name: 'React.js' },
      { '@type': 'Thing', name: 'Next.js' },
      { '@type': 'Thing', name: 'Node.js' },
      { '@type': 'Thing', name: 'Express.js' },
      { '@type': 'Thing', name: 'MongoDB' },
      { '@type': 'Thing', name: 'PostgreSQL' },
      { '@type': 'Thing', name: 'AWS' },
    ],
    knowsLanguage: [
      { '@type': 'Language', name: 'French' },
      { '@type': 'Language', name: 'English' },
      { '@type': 'Language', name: 'German' },
      { '@type': 'Language', name: 'Arabic' },
    ],
    nationality: [{ '@type': 'Country', name: 'Morocco' }],
    alumniOf: [
      {
        '@type': 'EducationalOrganization',
        name: 'YouCode | UM6P',
        url: 'https://youcode.ma/',
        startDate: '2024',
        endDate: '2025',
      },
      {
        '@type': 'EducationalOrganization',
        name: 'Study Center',
        startDate: '2024',
        endDate: '2024',
      },
    ],
  }
}
