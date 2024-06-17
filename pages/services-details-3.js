import Layout from "@/components/layout/Layout"
import BrandSlider from "@/components/slider/BrandSlider"
import Link from "next/link"

export default function ServiceDetails3() {
    return (
        <>
            <Layout headerStyle={6} footerStyle={1} breadcrumbTitle="Service Details">
                <div>
                    <section className="services-details-area pt-120 pb-120">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-71 order-0 order-lg-2">
                                    <div className="services-details-wrap">
                                        <div className="services-details-thumb">
                                            <img src="/assets/img/services/services_details03.jpg" alt="" />
                                        </div>
                                        <div className="services-details-content">
                                            <h2 className="title">Make better products make products better</h2>
                                            <p>eed a little help from our friends from time to time. Although we offer the one-stop convenience of annery integrated range of legal, financial services under one roof, there are occasions when our clients areaneed specia- list advice beyond the scope of our own expertise. That’s why we’ve developed close working relationships with a number of strategic partner.</p>
                                            <div className="sd-inner-wrap sd-inner-wrap-three">
                                                <div className="row align-items-center">
                                                    <div className="col-43">
                                                        <div className="services-details-list-two">
                                                            <ul className="list-wrap">
                                                                <li>
                                                                    <div className="icon">
                                                                        <i className="flaticon-piggy-bank" />
                                                                    </div>
                                                                    <div className="content">
                                                                        <h5 className="title">Finance Consulting</h5>
                                                                        <p>eed are little help fromery fri of anery integrated</p>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="icon">
                                                                        <i className="flaticon-calculator" />
                                                                    </div>
                                                                    <div className="content">
                                                                        <h5 className="title">Tax Calculation</h5>
                                                                        <p>eed are little help fromery fri of anery integrated</p>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="col-57">
                                                        <div className="content">
                                                            <h3 className="title-two">Raise capital faster  negotiate on your own terms</h3>
                                                            <p>when an unknown printer took a galley offer typey anddey scrambled  make a type specimen bookhas survived not only five when an unknown printer took a galley of type and scrambled it to make a type specimen</p>
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