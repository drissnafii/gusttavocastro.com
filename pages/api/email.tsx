import { NextApiRequest, NextApiResponse } from 'next'
import { Resend } from 'resend'
import EmailTemplate from '../../components/EmailTemplate'

const resend = new Resend(process.env.RESEND_API_KEY)

interface EmailData {
  name: string
  email: string
  message: string
}

export default async function sendEmail(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data: EmailData = req.body

    await resend.sendEmail({
      from: 'drissnafii.me <website@drissnafii.me>',
      to: process.env.RESEND_DESTINATION_EMAIL || '',
      replyTo: data.email,
      subject: `${data.name} - via drissnafii.me`,
      react: <EmailTemplate {...data} />,
    })

    res.status(200).json({ message: 'Email sent' })
  } catch (e) {
    const error = e as Error
    res.status(500).json({ message: error.message })
  }
}
