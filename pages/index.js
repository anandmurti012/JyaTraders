import Layout from "@/components/layout/Layout"
import About from "@/components/sections/home1/About"
import Banner from "@/components/sections/home1/Banner"
import Blog from "@/components/sections/home1/Blog"
import Brand from "@/components/sections/home1/Brand"
import Choose from "@/components/sections/home1/Choose"
import Cta from "@/components/sections/home1/Cta"
import Features from "@/components/sections/home1/Features"
import Overview from "@/components/sections/home1/Overview"
import Pricing from "@/components/sections/home1/Pricing"
import Project from "@/components/sections/home1/Project"
import Request from "@/components/sections/home1/Request"
import Services from "@/components/sections/home1/Services"
import Team from "@/components/sections/home1/Team"
import Testimonial from "@/components/sections/home1/Testimonial"

export default function Home1() {
    return (
        <>
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
                <Pricing />
                <Blog />
                <Request />
            </Layout>
        </>
    )
}