import Layout from "@/components/layout/Layout"

export default function Contact() {
    return (
        <>
            <Layout headerStyle={6} footerStyle={1} breadcrumbTitle="Contact Us">
                <div>
                    <section className="inner-contact-area pt-120 pb-120">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-6">
                                    <div className="inner-contact-img">
                                        <img src="/assets/img/images/contact_img.jpg" alt="" />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="inner-contact-info">
                                        <h2 className="title">Our Office Address</h2>
                                        <div className="contact-info-item">
                                            <h5 className="title-two">USA Office</h5>
                                            <ul className="list-wrap">
                                                <li>100 Wilshire Blvd, Suite 700 Santa <br /> Monica, CA 90401, USA</li>
                                                <li>+1 (310) 620-8565</li>
                                                <li>info@gmail.com</li>
                                            </ul>
                                        </div>
                                        <div className="contact-info-item">
                                            <h5 className="title-two">Australia Office</h5>
                                            <ul className="list-wrap">
                                                <li>100 Wilshire Blvd, Suite 700 Santa <br /> Monica, CA 90401, USA</li>
                                                <li>+1 (310) 620-8565</li>
                                                <li>info@gmail.com</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className="contact-map">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3152.332792000835!2d144.96011341744386!3d-37.805673299999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b349649%3A0xb6899234e561db11!2sEnvato!5e0!3m2!1sen!2sbd!4v1685027435635!5m2!1sen!2sbd" allowFullScreen loading="lazy" />
                    </div>
                </div>
            </Layout>
        </>
    )
}