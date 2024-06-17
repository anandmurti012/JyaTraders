import Layout from "@/components/layout/Layout"
import About from "@/components/sections/home5/About"
import AboutTwo from "@/components/sections/home5/AboutTwo"
import Blog from "@/components/sections/home5/Blog"
import Brand from "@/components/sections/home5/Brand"
import Contact from "@/components/sections/home5/Contact"
import Counter from "@/components/sections/home5/Counter"
import Faq from "@/components/sections/home5/Faq"
import Features from "@/components/sections/home5/Features"
import Pricing from "@/components/sections/home5/Pricing"
import Project from "@/components/sections/home5/Project"
import Request from "@/components/sections/home5/Request"
import Services from "@/components/sections/home5/Services"
import Slider from "@/components/sections/home5/Slider"
import Team from "@/components/sections/home5/Team"
import Testimonial from "@/components/sections/home5/Testimonial"

export default function Home5() {
    return (
        <>
            <Layout headerStyle={5} footerStyle={1}>
                <Slider />
                <About />
                <Features />
                <AboutTwo />
                <Services />
                <Counter />
                <Project />
                <Faq />
                <Request />
                <Team />
                <Testimonial />
                <Pricing />
                <Contact />
                <Blog />
                <Brand />
            </Layout>
        </>
    )
}