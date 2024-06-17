import Layout from "@/components/layout/Layout"
import About from "@/components/sections/home2/About"
import Banner from "@/components/sections/home2/Banner"
import Blog from "@/components/sections/home2/Blog"
import Brand from "@/components/sections/home2/Brand"
import Counter from "@/components/sections/home2/Counter"
import Cta from "@/components/sections/home2/Cta"
import Features from "@/components/sections/home2/Features"
import Overview from "@/components/sections/home2/Overview"
import Project from "@/components/sections/home2/Project"
import Team from "@/components/sections/home2/Team"
import Testimonial from "@/components/sections/home2/Testimonial"

export default function Home2() {
    return (
        <>
            <Layout headerStyle={2} footerStyle={3}>
                <Banner />
                <Brand />
                <Features />
                <About />
                <Overview />
                <Project />
                <Counter />
                <Team />
                <Testimonial />
                <Cta />
                <Blog />
            </Layout>
        </>
    )
}