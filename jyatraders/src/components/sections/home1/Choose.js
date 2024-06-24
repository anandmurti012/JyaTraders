// import VideoPopup from "@/components/elements/PopupVideo"
'use client'
export default function Choose() {
    return (
        <>
            <section className="choose-area jarallax choose-bg" data-background="/assets/img/bg/choose_bg.jpg">
                <div className="choose-shape">
                    <img src="/assets/img/images/choose_shape.png" alt="" data-aos="fade-right" data-aos-delay={0} />
                </div>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-4">
                            <div className="">
                                <div className="section-title-two white-title mb-20 tg-heading-subheading animation-style3">
                                    <h2 className="title tg-element-title">We’ll Ensure You Always Get the Best Guidance.</h2>
                                </div>
                                {/* <p>Morem ipsum dolor sit amet, consectetur adipiscing elita florai psum dolor sit amet, consecteture.Borem.</p> */}
                                {/* <VideoPopup style={2} /> */}
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="skill-wrap wow fadeInRight" data-wow-delay=".2s">
                                <div className="section-title-two mb-15">
                                    <span className="sub-title">Why Choose Us?</span>
                                    <h2 className="title">Your Gateway to Financial Excellence</h2>
                                </div>

                                <div className="progress-wrap">
                                    <div className="progress-item">
                                        <h6 className="title">
                                            <b>Comprehensive Training Programs:</b>
                                        </h6>
                                        <span>From NISM Certification to Cryptocurrency Trading, we cover it all.</span>
                                    </div>
                                    <div className="progress-item">
                                        <h6 className="title">
                                            <b>Diverse Trading Options:</b>
                                        </h6>
                                        <span>Trade in cash, commodities, forex, and more with our robust platform.</span>
                                    </div>
                                    <div className="progress-item">
                                        <h6 className="title">
                                            <b>Expert Wealth Management:</b>
                                        </h6>
                                        <span>Secure your future with retirement planning, fixed deposits, and consultancy services.</span>
                                    </div>
                                    <div className="progress-item">
                                        <h6 className="title">
                                            <b>Comprehensive Training Programs:</b>
                                        </h6>
                                        <span>From NISM Certification to Cryptocurrency Trading, we cover it all.</span>
                                    </div>
                                    <div className="progress-item">
                                        <h6 className="title">
                                            <b>Trusted Partnerships</b>
                                        </h6>
                                        <span>Benefit from zero fee account opening with Kotak Securities and comprehensive insurance plans with Tata AIA.</span>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
