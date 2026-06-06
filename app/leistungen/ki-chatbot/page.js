import ServicePageContent from '@/components/leistungen/ServicePageContent'
import { servicePages } from '@/lib/content'

const svc = servicePages['ki-chatbot']

export const metadata = {
  title: svc.meta.title,
  description: svc.meta.description,
}

export default function KiChatbotPage() {
  return <ServicePageContent svc={svc} />
}
