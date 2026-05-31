import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import SnapReveal from '@/components/layout/SnapReveal'
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
        <div className="snap-start h-screen overflow-hidden"><Hero /></div>
        <SnapReveal><Process /></SnapReveal>
        <SnapReveal><Stats /></SnapReveal>
        <SnapReveal className="flex flex-col" overflow="overflow-hidden md:overflow-y-auto">
          <Contact />
          <Footer />
        </SnapReveal>
      </main>
    </div>
    </>
  )
}
