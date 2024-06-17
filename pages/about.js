import CounterUp from "@/components/elements/CounterUp"
import SocialToggle from "@/components/elements/SocialToggle"
import Layout from "@/components/layout/Layout"
import BrandSlider from "@/components/slider/BrandSlider"
import TestimonialSlider1 from "@/components/slider/TestimonialSlider1"
import Link from "next/link"

export default function About() {
    return (
        <>
            <Layout headerStyle={6} footerStyle={1} breadcrumbTitle="About Us">
                <div>
                    <section className="about-area-seven pt-120 pb-120">
                        <div className="container">
                            <div className="row align-items-center justify-content-center">
                                <div className="col-lg-6 col-md-9 order-0 order-lg-2">
                                    <div className="about-img-seven-wrap">
                                        <img src="/assets/img/images/inner_about_img01.jpg" alt="" data-aos="fade-right" data-aos-delay={0} />
                                        <img src="/assets/img/images/inner_about_img02.jpg" alt="" data-aos="fade-up" data-aos-delay={300} />
                                        <img src="/assets/img/images/inner_about_shape01.png" alt="" className="shape" data-aos="zoom-in" data-aos-delay={500} />
                                        <div className="experience-wrap" data-aos="fade-left" data-aos-delay={0}>
                                            <h2 className="title">25</h2>
                                            <p>Years Of Experience</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="about-content-seven">
                                        <div className="section-title mb-30">
                                            <span className="sub-title">Who We are</span>
                                            <h2 className="title">Innovative Business Solutions For Success Company</h2>
                                        </div>
                                        <p>Morem ipsum dolor sit amet, consectetur adipiscing elita florai psum dolor sit amet consecteture Borem ipsum dolor sitter consectetur adipiscing elita florai psum.</p>
                                        <div className="success-wrap-two">
                                            <ul className="list-wrap">
                                                <li>
                                                    <div className="icon">
                                                        <i className="flaticon-investment" />
                                                    </div>
                                                    <div className="content">
                                                        <h2 className="count"><CounterUp count={152} />K</h2>
                                                        <p>Total revenue</p>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="icon">
                                                        <i className="flaticon-business-presentation" />
                                                    </div>
                                                    <div className="content">
                                                        <h2 className="count"><CounterUp count={95} />%</h2>
                                                        <p>Increase in sales</p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <p className="info-two">Morem ipsum dolor sit amet, consectetur adipiscing elita florai psum dolor sit amet, consecteture. consecteture.Borem ipsum dolor sit amectetur adipiscing.</p>
                                        <Link href="/contact" className="btn btn-three">Contact With Us</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* about-area-end */}
                    {/* features-area */}
                    <section className="features-area-five features-bg" data-background="/assets/img/bg/features_bg.jpg">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-xl-5 col-lg-6">
                                    <div className="section-title text-center mb-50">
                                        <span className="sub-title">Core Features</span>
                                        <h2 className="title">Amazing Features For Business Solutions</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-lg-4 col-md-6">
                                    <div className="features-item">
                                        <div className="features-content">
                                            <div className="content-top">
                                                <div className="icon">
                                                    <i className="flaticon-puzzle-piece" />
                                                </div>
                                                <h2 className="title">Quality Services</h2>
                                            </div>
                                            <p>eiusmod temporincididunt ut labore magna aliqua Quisery.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                    <div className="features-item">
                                        <div className="features-content">
                                            <div className="content-top">
                                                <div className="icon">
                                                    <i className="flaticon-inspiration" />
                                                </div>
                                                <h2 className="title">Innovation Ideas</h2>
                                            </div>
                                            <p>eiusmod temporincididunt ut labore magna aliqua Quisery.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                    <div className="features-item">
                                        <div className="features-content">
                                            <div className="content-top">
                                                <div className="icon">
                                                    <i className="flaticon-profit" />
                                                </div>
                                                <h2 className="title">Business Growth</h2>
                                            </div>
                                            <p>eiusmod temporincididunt ut labore magna aliqua Quisery.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="features-shape-wrap">
                            <img src="/assets/img/images/features_shape01.png" alt="" />
                            <img src="/assets/img/images/features_shape02.png" alt="" />
                        </div>
                    </section>
                    {/* features-area-end */}
                    {/* team-area */}
                    <section className="team-area-three">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-6">
                                    <div className="section-title-two text-center mb-50">
                                        <span className="sub-title">Expert People</span>
                                        <h2 className="title">Dedicated Team Members</h2>
                                        <p>Ever find yourself staring at your computer screen a good consulting slogan to come to mind? Oftentimes.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-8">
                                    <div className="team-item-three">
                                        <div className="team-thumb-three">
                                            <img src="/assets/img/team/h3_team_img01.png" alt="" />
                                            <SocialToggle />
                                        </div>
                                        <div className="team-content-three">
                                            <h4 className="title"><Link href="/team-details">Brooklyn Simmons</Link></h4>
                                            <span>Finance Advisor</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-8">
                                    <div className="team-item-three">
                                        <div className="team-thumb-three">
                                            <img src="/assets/img/team/h3_team_img02.png" alt="" />
                                            <SocialToggle />
                                        </div>
                                        <div className="team-content-three">
                                            <h4 className="title"><Link href="/team-details">Jenny Wilson</Link></h4>
                                            <span>Finance Advisor</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-8">
                                    <div className="team-item-three">
                                        <div className="team-thumb-three">
                                            <img src="/assets/img/team/h3_team_img03.png" alt="" />
                                            <SocialToggle />
                                        </div>
                                        <div className="team-content-three">
                                            <h4 className="title"><Link href="/team-details">Ronald Richards</Link></h4>
                                            <span>Finance Advisor</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-8">
                                    <div className="team-item-three">
                                        <div className="team-thumb-three">
                                            <img src="/assets/img/team/h3_team_img04.png" alt="" />
                                            <SocialToggle />
                                        </div>
                                        <div className="team-content-three">
                                            <h4 className="title"><Link href="/team-details">Marvin McKinney</Link></h4>
                                            <span>Finance Advisor</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* team-area-end */}
                    {/* testimonial-area */}
                    <section className="testimonial-area testimonial-bg" data-background="/assets/img/bg/testimonial_bg.jpg">
                        <div className="container">
                            <div className="row align-items-center justify-content-center">
                                <div className="col-lg-5 col-md-8">
                                    <div className="testimonial-img">
                                        <img src="/assets/img/images/testimonial_img.jpg" alt="" />
                                        <div className="review-wrap">
                                            <img src="/assets/img/icons/rating.svg" alt="" />
                                            <div className="content">
                                                <h2 className="title">15k</h2>
                                                <p>Positive <br /> Review</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-7">
                                    <div className="testimonial-item-wrap">
                                        <TestimonialSlider1 />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* testimonial-area-end */}
                    {/* brand-area */}
                    <div className="brand-area-six pt-80 pb-80">
                        <div className="container">
                            <BrandSlider />
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}