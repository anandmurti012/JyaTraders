import VideoPopup from "@/components/elements/PopupVideo"

export default function Choose() {
    return (
        <>
            <section className="choose-area jarallax choose-bg" data-background="/assets/img/bg/choose_bg.jpg">
                <div className="choose-shape">
                    <img src="/assets/img/images/choose_shape.png" alt="" data-aos="fade-right" data-aos-delay={0} />
                </div>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="choose-content">
                                <div className="section-title-two white-title mb-20 tg-heading-subheading animation-style3">
                                    <h2 className="title tg-element-title">We’ll Ensure You Always Get the Best Guidance.</h2>
                                </div>
                                <p>Morem ipsum dolor sit amet, consectetur adipiscing elita florai psum dolor sit amet, consecteture.Borem.</p>
                                <VideoPopup style={2} />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="skill-wrap wow fadeInRight" data-wow-delay=".2s">
                                <div className="section-title-two mb-15">
                                    <span className="sub-title">Why We are The Best</span>
                                    <h2 className="title">Smart  Great Finance For you Solutions</h2>
                                </div>
                                <p>Morem ipsum dolor sit amet consectedipiscing elita florai psum dolor sit amonsectet Borem ipsum consectetur.</p>
                                <div className="progress-wrap">
                                    <div className="progress-item">
                                        <h6 className="title">Consulting</h6>
                                        <div className="progress" role="progressbar" aria-label="Example with label" aria-valuenow={85} aria-valuemin={0} aria-valuemax={100}>
                                            <div className="progress-bar wow slideInLeft" data-wow-delay=".1s" style={{ width: '85%' }}><span>85%</span></div>
                                        </div>
                                    </div>
                                    <div className="progress-item">
                                        <h6 className="title">Investment</h6>
                                        <div className="progress" role="progressbar" aria-label="Example with label" aria-valuenow={76} aria-valuemin={0} aria-valuemax={100}>
                                            <div className="progress-bar wow slideInLeft" data-wow-delay=".2s" style={{ width: '76%' }}><span>76%</span></div>
                                        </div>
                                    </div>
                                    <div className="progress-item">
                                        <h6 className="title">Business</h6>
                                        <div className="progress" role="progressbar" aria-label="Example with label" aria-valuenow={90} aria-valuemin={0} aria-valuemax={100}>
                                            <div className="progress-bar wow slideInLeft" data-wow-delay=".3s" style={{ width: '90%' }}><span>90%</span></div>
                                        </div>
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
