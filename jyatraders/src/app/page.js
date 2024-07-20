'use client'
import Preloader from "../components/elements/Preloader"
import Layout from "../components/layout/Layout"
import About from "../components/sections/About"
import Banner from "../components/sections/Banner"
import Brand from "../components/sections/Brand"
import Choose from "../components/sections/Choose"
import Cta from "../components/sections/Cta"
import Features from "../components/sections/Features"
import Overview from "../components/sections/Overview"
import Project from "../components/sections/Project"
import Services from "../components/sections/Services"
import Team from "../components/sections/Team"
import Testimonial from "../components/sections/Testimonial"
import Aos from "aos"
import { useEffect, useState } from "react"

export default function Home() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
    Aos.init()
  }, [])

  return (
    
    !loading ? (
      <Layout headerStyle={1} footerStyle={2}>
        <Banner /> 
        <Features />
        <About />
        <Brand />
        <Services />
        <Overview />
      
        <Choose />
        <Project />
        
        <Cta />
        <Team />

        <Testimonial />

      </Layout>
    ) : (
      <Preloader />
    )
  )
}
