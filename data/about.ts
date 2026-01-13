export interface CareerItem {
  jobTitle: string
  company: string
  companyUrl: string
  startDate: string
  endDate?: string
  location: string
}

const items: CareerItem[] = [
  {
    jobTitle: 'AI Development Intern',
    company: 'Runkuplus',
    companyUrl: 'https://runkuplus.com',
    startDate: '2025-05-01',
    endDate: '2025-08-01',
    location: 'Agadir, Morocco',
  },
  {
    jobTitle: 'Full-Stack Web Development Student',
    company: 'YouCode | UM6P',
    companyUrl: 'https://youcode.ma',
    startDate: '2024-11-01',
    location: 'Youssoufia, Morocco',
  },
  {
    jobTitle: 'Basic Web Development Training',
    company: 'Study Center',
    companyUrl: '',
    startDate: '2024-05-01',
    endDate: '2024-11-01',
    location: 'Fès, Morocco',
  },
]

export default items
