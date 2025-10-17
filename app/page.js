import { redirect } from 'next/navigation'

export default function Home() {
  // Redirect to course landing page
  redirect('/course-landing')
}