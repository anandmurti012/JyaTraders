import Layout from "@/components/layout/Layout"
import Link from "next/link"

export default function Services() {
    return (
        <>
            <Layout headerStyle={6} footerStyle={1} breadcrumbTitle="Our Services">
                <section className="services-area-five inner-services-bg" data-background="/assets/img/bg/inner_services_bg.jpg">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-6 col-lg-8 col-md-10">
                                <div className="section-title-two text-center mb-50">
                                    <h2 className="title">Spotlight some most important features We have</h2>
                                    <p>Borem ipsum dolor sit amet consectetur adipiscing elita</p>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-lg-4 col-md-6 col-sm-10">
                                <div className="services-item">
                                    <div className="services-content">
                                        <div className="content-top">
                                            <div className="icon">
                                                <i className="flaticon-briefcase" />
                                            </div>
                                            <h2 className="title">Business Analysis</h2>
                                        </div>
                                        <div className="services-thumb">
                                            <img src="/assets/img/services/services_img01.jpg" alt="" />
                                            <Link href="/services-details" className="btn transparent-btn">Our Services</Link>
                                        </div>
                                        <ul className="list-wrap">
                                            <li>seusmeyd tempose atidim area</li>
                                            <li>aliquam duhipsum is simply free</li>
                                            <li>Get Life Time Access</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-10">
                                <div className="services-item">
                                    <div className="services-content">
                                        <div className="content-top">
                                            <div className="icon">
                                                <i className="flaticon-taxes" />
                                            </div>
                                            <h2 className="title">Tax Strategy</h2>
                                        </div>
                                        <div className="services-thumb">
                                            <img src="/assets/img/services/services_img02.jpg" alt="" />
                                            <Link href="/services-details" className="btn transparent-btn">Our Services</Link>
                                        </div>
                                        <ul className="list-wrap">
                                            <li>seusmeyd tempose atidim area</li>
                                            <li>aliquam duhipsum is simply free</li>
                                            <li>Get Life Time Access</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-10">
                                <div className="services-item">
                                    <div className="services-content">
                                        <div className="content-top">
                                            <div className="icon">
                                                <i className="flaticon-money" />
                                            </div>
                                            <h2 className="title">Financial Advice</h2>
                                        </div>
                                        <div className="services-thumb">
                                            <img src="/assets/img/services/services_img03.jpg" alt="" />
                                            <Link href="/services-details" className="btn transparent-btn">Our Services</Link>
                                        </div>
                                        <ul className="list-wrap">
                                            <li>seusmeyd tempose atidim area</li>
                                            <li>aliquam duhipsum is simply free</li>
                                            <li>Get Life Time Access</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-10">
                                <div className="services-item">
                                    <div className="services-content">
                                        <div className="content-top">
                                            <div className="icon">
                                                <i className="flaticon-investment" />
                                            </div>
                                            <h2 className="title">Market Research</h2>
                                        </div>
                                        <div className="services-thumb">
                                            <img src="/assets/img/services/services_img04.jpg" alt="" />
                                            <Link href="/services-details" className="btn transparent-btn">Our Services</Link>
                                        </div>
                                        <ul className="list-wrap">
                                            <li>seusmeyd tempose atidim area</li>
                                            <li>aliquam duhipsum is simply free</li>
                                            <li>Get Life Time Access</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-10">
                                <div className="services-item">
                                    <div className="services-content">
                                        <div className="content-top">
                                            <div className="icon">
                                                <i className="flaticon-data-management" />
                                            </div>
                                            <h2 className="title">Business Goal</h2>
                                        </div>
                                        <div className="services-thumb">
                                            <img src="/assets/img/services/services_img05.jpg" alt="" />
                                            <Link href="/services-details" className="btn transparent-btn">Our Services</Link>
                                        </div>
                                        <ul className="list-wrap">
                                            <li>seusmeyd tempose atidim area</li>
                                            <li>aliquam duhipsum is simply free</li>
                                            <li>Get Life Time Access</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-10">
                                <div className="services-item">
                                    <div className="services-content">
                                        <div className="content-top">
                                            <div className="icon">
                                                <i className="flaticon-calculator" />
                                            </div>
                                            <h2 className="title">Revenue Calculate</h2>
                                        </div>
                                        <div className="services-thumb">
                                            <img src="/assets/img/services/services_img06.jpg" alt="" />
                                            <Link href="/services-details" className="btn transparent-btn">Our Services</Link>
                                        </div>
                                        <ul className="list-wrap">
                                            <li>seusmeyd tempose atidim area</li>
                                            <li>aliquam duhipsum is simply free</li>
                                            <li>Get Life Time Access</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </Layout>
        </>
    )
}