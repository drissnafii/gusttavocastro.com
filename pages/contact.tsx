import { useState, FormEvent } from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import { GetStaticProps } from 'next'
import Base from '../layouts/Base'
import stripHtml from '../lib/strip-html'
import Toast from '../components/Toast'
import { Box } from '../components/Box'

interface ContactProps {
  title: string
  tagline: string
  image: string
  primaryColor: string
  secondaryColor: string
}

export const getStaticProps: GetStaticProps<ContactProps> = async () => {
  const meta = {
    title: 'Contact // Driss Nafii',
    tagline: 'Email me. Like in the old days.',
    image: '/static/images/reminder-bw.jpg',
    primaryColor: '#80ffea',
    secondaryColor: '#8aff80',
  }

  return { props: meta }
}

function Contact(props: ContactProps) {
  const { title, image } = props
  const description = `<strong>I love chatting</strong> with other developers, students, and creators. <strong>I'm a student</strong>, so I can't promise to reply to your email immediately, but I'll do my best to respond in a timely manner.`
  const [isEmailSent, setIsEmailSent] = useState<boolean | undefined>(undefined)
  const [showToast, setShowToast] = useState(false)

  const onSendEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.target as HTMLFormElement

    try {
      const isProd = process.env.NODE_ENV === 'production'
      const base = isProd ? 'https://drissnafii.me' : 'http://localhost:3000'

      await fetch(`${base}/api/email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: (form.elements.namedItem('name') as HTMLInputElement).value,
          email: (form.elements.namedItem('email') as HTMLInputElement).value,
          message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
        }),
      })

      setIsEmailSent(true)
      setShowToast(true)
    } catch (e) {
      console.error(e)
      setIsEmailSent(false)
      setShowToast(true)
    }
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={stripHtml(description)} name="description" />
        <meta content={stripHtml(description)} property="og:description" />
        <meta content="https://drissnafii.me/contact" property="og:url" />
        <meta content={`https://drissnafii.me${image}`} property="og:image" />
      </Head>

      <Box>
        <p dangerouslySetInnerHTML={{ __html: description }} />
        <h2>Send an email</h2>
        <Form onSubmit={onSendEmail}>
          <FormGroup>
            <Label htmlFor="name">Name</Label>
            <Input id="name" type="text" placeholder="Driss Nafii" required />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="driss@example.com" required />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" placeholder="How can I help you?" rows={4} required />
          </FormGroup>
          <FormGroup>
            <Button type="submit">Send</Button>
          </FormGroup>
        </Form>

        <Toast
          title={isEmailSent ? 'Email sent :D' : 'Error :('}
          description={
            isEmailSent
              ? 'Thanks for taking the time to write it.'
              : 'Something wrong happened. Try again later.'
          }
          isSuccess={isEmailSent}
          showToast={showToast}
          setShowToast={setShowToast}
        />
      </Box>
    </>
  )
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 400px;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`

const Label = styled.label`
  color: ${({ theme }) => theme.colors.secondary};
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 500;
`

const Input = styled.input`
  color: ${({ theme }) => theme.colors.primary};
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.radii.borderRadius};
  padding: 10px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.cyan};
  }
`

const Textarea = styled.textarea`
  color: ${({ theme }) => theme.colors.primary};
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.radii.borderRadius};
  padding: 10px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.cyan};
  }
`

const Button = styled.button`
  color: ${({ theme }) => theme.colors.background};
  background: #fff;
  border: 1px solid #fff;
  border-radius: ${({ theme }) => theme.radii.borderRadius};
  cursor: pointer;
  padding: 10px;
  margin-top: 5px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: transparent;
    border-color: ${({ theme }) => theme.colors.cyan};
    color: ${({ theme }) => theme.colors.cyan};
  }

  &:focus {
    background: transparent;
    border-color: ${({ theme }) => theme.colors.cyan};
    color: ${({ theme }) => theme.colors.cyan};
    outline: none;
  }
`

Contact.Layout = Base

export default Contact
