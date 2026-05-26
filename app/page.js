import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import Contact from '@/components/sections/Contact'
import GridWarp from '@/components/sections/GridWarp.client'
import Hero from '@/components/sections/Hero'
import Process from '@/components/sections/Process'
import Stats from '@/components/sections/Stats'

export default function Home() {
  return (
    <>
      <GridWarp />
      <div id="top" className="relative overflow-x-clip">
      <Navbar />
      <main>
        <Hero />
        <Process />
        <Stats />
        <Contact />
      </main>
      <Footer />
    </div>
    </>
  )
}
