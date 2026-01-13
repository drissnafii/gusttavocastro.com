import { Html } from '@react-email/html'

interface EmailTemplateProps {
  name: string
  email: string
  message: string
}

export default function EmailTemplate({ name, email, message }: EmailTemplateProps) {
  return (
    <Html>
      <ul>
        <li>
          <strong>Name:</strong> {name}
        </li>
        <li>
          <strong>Email:</strong> {email}
        </li>
        <li>
          <strong>Message:</strong> {message}
        </li>
      </ul>
    </Html>
  )
}
