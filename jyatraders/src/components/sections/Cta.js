import Link from "next/link"

export default function Cta() {
    return (
        <>
            <section className="cta-area">
                <div className="container">
                    <div className="cta-inner-wrap" data-background="/assets/img/bg/cta_bg.jpg">
                        <div className="row align-items-center">
                            <div className="col-lg-9">
                                <div className="cta-content">
                                    <div className="cta-info-wrap">
                                        <div className="icon">
                                            <i className="flaticon-phone-call" />
                                        </div>
                                        <div className="content">
                                            <span>Call For More Info</span>
                                            <Link href="tel:7856000428">+91 7856000428</Link>
                                        </div>
                                    </div>
                                    <h2 className="title">Let’s Request a Schedule For Free Consultation</h2>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="cta-btn text-end">
                                    <Link href="tel:7856000428" className="btn">Call Now</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
