import ServicePageContent from '@/components/leistungen/ServicePageContent'
import { servicePages } from '@/lib/content'

const svc = servicePages['web-14-tagen']

export const metadata = {
  title: svc.meta.title,
  description: svc.meta.description,
}

export default function Web14TagenPage() {
  return <ServicePageContent svc={svc} />
}
