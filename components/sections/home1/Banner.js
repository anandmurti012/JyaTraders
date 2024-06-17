import VideoPopup from "@/components/elements/PopupVideo"
import Link from "next/link"

export default function Banner() {
    return (
        <>
            <section className="banner-area-two banner-bg-two" data-background="/assets/img/banner/h2_banner_bg.jpg">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="banner-content-two">
                                <span className="sub-title" data-aos="fade-up" data-aos-delay={0}>We Are Expert In This Field</span>
                                <h2 className="title" data-aos="fade-up" data-aos-delay={300}>Get a Smart Way For Your Business</h2>
                                <p data-aos="fade-up" data-aos-delay={500}>Agilos helps you to convert your data into a strategic asset and get top-notch business insights.</p>
                                <div className="banner-btn">
                                    <Link href="/services" className="btn" data-aos="fade-right" data-aos-delay={700}>Our Services</Link>
                                    <VideoPopup style={1} />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="banner-img text-center">
                                <img src="/assets/img/banner/h2_banner_img.png" alt="" data-aos="fade-left" data-aos-delay={400} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="banner-shape-wrap">
                    <img src="/assets/img/banner/h2_banner_shape01.png" alt="" />
                    <img src="/assets/img/banner/h2_banner_shape02.png" alt="" />
                    <img src="/assets/img/banner/h2_banner_shape03.png" alt="" data-aos="zoom-in-up" data-aos-delay={800} />
                </div>
            </section>
        </>
    )
}
