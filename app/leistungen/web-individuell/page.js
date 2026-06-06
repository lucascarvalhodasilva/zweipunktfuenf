import ServicePageContent from '@/components/leistungen/ServicePageContent'
import { servicePages } from '@/lib/content'

const svc = servicePages['web-individuell']

export const metadata = {
  title: svc.meta.title,
  description: svc.meta.description,
}

export default function WebIndividuellPage() {
  return <ServicePageContent svc={svc} />
}
