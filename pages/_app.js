import Preloader from "@/components/elements/Preloader"
import { useEffect, useState } from "react"
import AOS from 'aos'
import "public/assets/css/bootstrap.min.css"
import "public/assets/css/animate.min.css"
import "public/assets/css/magnific-popup.css"
import "public/assets/css/fontawesome-all.min.css"
import "public/assets/css/flaticon.css"
import "public/assets/css/odometer.css"
import "public/assets/css/jarallax.css"
import "public/assets/css/swiper-bundle.min.css"
import "public/assets/css/slick.css"
import "public/assets/css/aos.css"
import "public/assets/css/default.css"
import "public/assets/css/style.css"
import "public/assets/css/responsive.css"

function MyApp({ Component, pageProps }) {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)
        AOS.init()
    }, [])
    return (
        <>
            {!loading ? (
                <Component {...pageProps} />
            ) : (
                <Preloader />
            )}
        </>
    )
}

export default MyApp
