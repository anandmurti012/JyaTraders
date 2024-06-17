import Accordion from "@/components/elements/Accordion"
import Layout from "@/components/layout/Layout"
import BrandSlider from "@/components/slider/BrandSlider"
import Link from "next/link"

export default function ServiceDetails2() {
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
                                            <h2 className="title">We help our clients identify their they area issues develop solutions and take action</h2>
                                            <p>eed a little help from our friends from time to time. Although we offer the one-stop convenience of annery integrated range of legal, financial services under one roof, there are occasions when our clients areaneed specia- list advice beyond the scope of our own expertise. </p>
                                            <div className="sd-inner-wrap-two">
                                                <div className="row align-items-center">
                                                    <div className="col-58">
                                                        <div className="thumb">
                                                            <img src="/assets/img/services/services_details02.jpg" alt="" />
                                                        </div>
                                                    </div>
                                                    <div className="col-42">
                                                        <div className="services-details-list">
                                                            <ul className="list-wrap">
                                                                <li>
                                                                    <div className="icon">
                                                                        <i className="flaticon-business-presentation" />
                                                                    </div>
                                                                    <div className="content">
                                                                        <h5 className="title">Growing Business</h5>
                                                                        <p>Finance helps you to convert into a strategic asset get.</p>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="icon">
                                                                        <i className="flaticon-investment" />
                                                                    </div>
                                                                    <div className="content">
                                                                        <h5 className="title">Finance Investment</h5>
                                                                        <p>Finance helps you to convert into a strategic asset get.</p>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="icon">
                                                                        <i className="flaticon-taxes" />
                                                                    </div>
                                                                    <div className="content">
                                                                        <h5 className="title">Tax Advisory</h5>
                                                                        <p>Finance helps you to convert into a strategic asset get.</p>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="industrial-working-wrap">
                                                <h2 className="title-two">Quality Industrial Working</h2>
                                                <p className="info-one">when an unknown printer took a galley of type and scrambled it to make a type specimen bookhas a not only five centuries, but also the leap into electronic typesetting, remaining essentially unchan galley of type and scrambled it to make a type specimen book.</p>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <img src="/assets/img/services/sd_working_img01.jpg" alt="" />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <img src="/assets/img/services/sd_working_img02.jpg" alt="" />
                                                    </div>
                                                </div>
                                                <p className="info-two">when an unknown printer took a galley of type and scrambled it to make a type specimen bookhas a not only five centuries, but also the leap into electronic typesetting, remaining essentially unchan galley of type and scrambled it to make a type specimen book.</p>
                                            </div>
                                            <div className="company-benefit-wrap">
                                                <h2 className="title-two">Company Key Benefits</h2>
                                                <p>when an unknown printer took a galley of type and scrambled it to make a type specimen bookhas a not only five centuries, but also the leap into electronic typesetting, remaining essentially unchan galley of type and scrambled it to make a type specimen book.</p>
                                                <div className="accordion-wrap-three">
                                                    <Accordion />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-29">
                                    <aside className="services-sidebar">
                                        <div className="services-widget">
                                            <h4 className="sw-title">Our Services</h4>
                                            <div className="services-cat-list">
                                                <ul className="list-wrap">
                                                    <li className="active"><Link href="/services-details">business Analysis <i className="flaticon-right-arrow" /></Link></li>
                                                    <li><Link href="/services-details">Tax Strategy <i className="flaticon-right-arrow" /></Link></li>
                                                    <li><Link href="/services-details">Financial Advisory <i className="flaticon-right-arrow" /></Link></li>
                                                    <li><Link href="/services-details">business Growth <i className="flaticon-right-arrow" /></Link></li>
                                                    <li><Link href="/services-details">Innovation Idea <i className="flaticon-right-arrow" /></Link></li>
                                                    <li><Link href="/services-details">Market Research <i className="flaticon-right-arrow" /></Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="services-widget">
                                            <h4 className="sw-title">Brochure</h4>
                                            <div className="services-brochure-wrap">
                                                <p>when an unknown printer took ga lley offer typey anddey.</p>
                                                <Link href="assets/img/services/services_details01.jpg" target="_blank" download className="download-btn"><i className="far fa-file-pdf" />PDF. Download</Link>
                                                <Link href="assets/img/services/services_details01.jpg" target="_blank" download className="download-btn"><i className="far fa-file-alt" />DOC. Download</Link>
                                            </div>
                                        </div>
                                        <div className="services-widget services-sidebar-contact">
                                            <h4 className="title">If You Need Any Help Contact With Us</h4>
                                            <Link href="tel:0123456789"><i className="flaticon-phone-call" /> +91 705 2101 786</Link>
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