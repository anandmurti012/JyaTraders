import Layout from "@/components/layout/Layout"
import About from "@/components/sections/home4/About"
import Banner from "@/components/sections/home4/Banner"
import Blog from "@/components/sections/home4/Blog"
import Brand from "@/components/sections/home4/Brand"
import Counter from "@/components/sections/home4/Counter"
import Cta from "@/components/sections/home4/Cta"
import Project from "@/components/sections/home4/Project"
import Request from "@/components/sections/home4/Request"
import Services from "@/components/sections/home4/Services"
import Team from "@/components/sections/home4/Team"
import Testimonial from "@/components/sections/home4/Testimonial"

export default function Home4() {
    return (
        <>
            <Layout headerStyle={4} footerStyle={2}>
                <Banner />
                <Brand />
                <Services />
                <About />
                <Counter />
                <Team />
                <Project />
                <Cta />
                <Testimonial />
                <Blog />
                <Request />
            </Layout>
        </>
    )
}