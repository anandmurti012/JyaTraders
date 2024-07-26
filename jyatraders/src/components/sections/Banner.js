'use client'
import ApplyForm from '../form/ApplyForm'

export default function Banner() {

    return (
        <>
            <section className="banner-area-two banner-bg-two" data-background="/assets/img/banner/h2_banner_bg.jpg">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="banner-content-two">
                                <span className="sub-title" data-aos="fade-up" data-aos-delay={0}>Welcome to JYA Trades</span>
                                <h2 className="title" data-aos="fade-up" data-aos-delay={300}>Your Trusted Partner in Financial Growth</h2>
                                <p data-aos="fade-up" data-aos-delay={500}>
                                    We pride ourselves on offering comprehensive trading and wealth management services tailored to meet the diverse needs of our clients.
                                </p>
                                <div className="banner-btn">
                                    <ApplyForm btnStyle={1} />
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-30px' }}>
                                {/* <button className="btn btn-primary" style={{ marginTop: '0' }}>Signup</button>
                                <button className="btn btn-primary" style={{ marginLeft: '10px', marginTop: '0' }}>Login</button> */}
                            </div>
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
