import Accordion from "@/components/elements/Accordion"
import Layout from "@/components/layout/Layout"
import BrandSlider from "@/components/slider/BrandSlider"
import Link from "next/link"

export default function ServiceDetails4() {
    return (
        <>
            <Layout headerStyle={6} footerStyle={1} breadcrumbTitle="Service Details">
                <div>
                    <section className="services-details-area pt-120 pb-120">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-71 order-0 order-lg-2">
                                    <div className="services-details-wrap">
                                        <div className="services-details-content">
                                            <div className="sd-inner-wrap-four">
                                                <div className="row align-items-center">
                                                    <div className="col-55">
                                                        <div className="thumb">
                                                            <img src="/assets/img/services/services_details04.jpg" alt="" />
                                                        </div>
                                                    </div>
                                                    <div className="col-45">
                                                        <div className="content">
                                                            <h2 className="title">Key Features For your Insurance Business</h2>
                                                            <p>when an unknown printer took ar galley offer type year anddey scrambled  make type aewer specimen book bethas survived not only five when annery unknown printer.</p>
                                                            <ul className="list-wrap">
                                                                <li><img src="/assets/img/icons/check_icon.svg" alt="" />100% Better results</li>
                                                                <li><img src="/assets/img/icons/check_icon.svg" alt="" />Valuable Ideas</li>
                                                                <li><img src="/assets/img/icons/check_icon.svg" alt="" />Budget Friendly Theme</li>
                                                                <li><img src="/assets/img/icons/check_icon.svg" alt="" />Happy Customers</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="services-details-list-three">
                                                <ul className="list-wrap">
                                                    <li>
                                                        <div className="icon">
                                                            <i className="flaticon-family" />
                                                        </div>
                                                        <div className="content">
                                                            <h4 className="title">Trusted  High Security</h4>
                                                            <p>with a number of strategic financial services under one roof</p>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="icon">
                                                            <i className="flaticon-winner" />
                                                        </div>
                                                        <div className="content">
                                                            <h4 className="title">Certified Company</h4>
                                                            <p>eedlegal financial se areaet little help feryanery integrated</p>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                            <p>eed a little help from our friends from time to time. Although we offer the one-stop convenience of annery integrated range of legal, financial services under one roof, there are occasions when our clients areaneed specia- list advice beyond the scope of our own expertise. That’s why we’ve developed close working relationships with a number of strategic partner.</p>
                                            <div className="industrial-working-wrap mt-50">
                                                <h2 className="title-two">Great Insurance your Solutions For Business</h2>
                                                <p className="info-one">when an unknown printer took a galley of type and scrambled it to make a type specimen bookhas a not only five centuries, but also the leap into electronic typesetting, remaining essentially unchan galley of type and scrambled it to make a type specimen book.</p>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <img src="/assets/img/services/sd_working_img03.jpg" alt="" />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <img src="/assets/img/services/sd_working_img04.jpg" alt="" />
                                                    </div>
                                                </div>
                                                <p>when an unknown printer took a galley of type and scrambled it to make a type specimen bookhas a not only five centuries, but also the leap into electronic typesetting, remaining essentially unchan galley of type and scrambled it to make a type specimen book.</p>
                                            </div>
                                            <div className="accordion-wrap-three">
                                                <Accordion />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-29">
                                    <aside className="services-sidebar">
                                        <div className="services-cat-list services-cat-list-two mb-30">
                                            <ul className="list-wrap">
                                                <li className="active"><Link href="/services-details">Family Insurance <i className="flaticon-right-arrow" /></Link></li>
                                                <li><Link href="/services-details">Car insurance <i className="flaticon-right-arrow" /></Link></li>
                                                <li><Link href="/services-details">Health Insurance <i className="flaticon-right-arrow" /></Link></li>
                                                <li><Link href="/services-details">Cargo Insurance <i className="flaticon-right-arrow" /></Link></li>
                                                <li><Link href="/services-details">Fire Insurance <i className="flaticon-right-arrow" /></Link></li>
                                                <li><Link href="/services-details">Job Insurance <i className="flaticon-right-arrow" /></Link></li>
                                            </ul>
                                        </div>
                                        <div className="services-widget services-sidebar-contact">
                                            <h4 className="title">If You Need Any Help Contact With Us</h4>
                                            <Link href="tel:0123456789"><i className="flaticon-phone-call" /> +91 705 2101 786</Link>
                                        </div>
                                        <div className="services-widget">
                                            <h4 className="sw-title">Brochure</h4>
                                            <div className="services-brochure-wrap">
                                                <p>when an unknown printer took ga lley offer typey anddey.</p>
                                                <Link href="assets/img/services/services_details01.jpg" target="_blank" download className="download-btn"><i className="far fa-file-pdf" />PDF. Download</Link>
                                                <Link href="assets/img/services/services_details01.jpg" target="_blank" download className="download-btn"><i className="far fa-file-alt" />DOC. Download</Link>
                                            </div>
                                        </div>
                                        <div className="services-widget">
                                            <h4 className="sw-title">Get a Free Quote</h4>
                                            <div className="services-widget-form">
                                                <form action="#">
                                                    <div className="form-grp">
                                                        <input type="text" placeholder="Your Name" />
                                                    </div>
                                                    <div className="form-grp">
                                                        <input type="email" placeholder="E-mail Address" />
                                                    </div>
                                                    <div className="form-grp">
                                                        <textarea name="message" placeholder="Type Your Message" />
                                                    </div>
                                                    <button type="submit" className="submit-btn">Send Message</button>
                                                </form>
                                            </div>
                                        </div>
                                    </aside>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* services-details-area-end */}
                    {/* brand-area */}
                    <div className="brand-area-seven">
                        <div className="container">
                            <BrandSlider />
                        </div>
                    </div>
                </div>

            </Layout>
        </>
    )
}