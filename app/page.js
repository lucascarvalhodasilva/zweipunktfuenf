import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import Ticker from '@/components/sections/Ticker'

export default function Home() {
  return (
    <div id="top" className="relative overflow-x-clip">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Ticker />
      </main>
      <Footer />
    </div>
  )
}
