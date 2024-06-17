import Layout from "@/components/layout/Layout"
import About from "@/components/sections/home3/About"
import Banner from "@/components/sections/home3/Banner"
import Blog from "@/components/sections/home3/Blog"
import Brand from "@/components/sections/home3/Brand"
import Choose from "@/components/sections/home3/Choose"
import Cta from "@/components/sections/home3/Cta"
import Estimate from "@/components/sections/home3/Estimate"
import Features from "@/components/sections/home3/Features"
import Pricing from "@/components/sections/home3/Pricing"
import Services from "@/components/sections/home3/Services"
import Team from "@/components/sections/home3/Team"
import Testimonial from "@/components/sections/home3/Testimonial"

export default function Home3() {
    return (
        <>
            <Layout headerStyle={3} footerStyle={1}>
                <Banner />
                <Features />
                <About />
                <Brand />
                <Services />
                <Choose />
                <Cta />
                <Estimate />
                <Team />
                <Testimonial />
                <Pricing />
                <Blog />
            </Layout>
        </>
    )
}