import CounterUp from "../elements/CounterUp"

export default function Overview() {
    return (
        <>
            <section className="overview-area pt-120 pb-120">
                <div className="overview-shape" data-aos="fade-left" data-aos-delay={200} data-background="/assets/img/images/overview_shape.png" />
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-lg-6 col-md-10">
                            <div className="overview-img-wrap">
                                <img src="/assets/img/images/overview_img01.jpg" alt="" />
                                <img src="/assets/img/images/overview_img02.jpg" alt="" data-parallax="{&quot;x&quot; : 50 }" />
                                <img src="/assets/img/images/overview_img_shape.png" alt="" />
                                <div className="icon">
                                    <i className="flaticon-report-1" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="overview-content">
                                <div className="section-title-two mb-20 tg-heading-subheading animation-style3">
                                    <span className="sub-title">Unlock Your Potential, </span>
                                    <h2 className="title tg-element-title">With JYA Traders Training Programs</h2>
                                </div>
                                <p className="info-one">
                                    <b>NISM Certification: </b> Achieve professional certification and validate your expertise in the financial markets.
                                </p>
                                <p className="info-two">
                                    <b>Zero Loss Psychology: </b> Master the mindset required to minimize losses and maximize gains in trading.
                                </p>
                                <p className="info-two">
                                    <b>Diverse Market Training: </b> Gain in-depth knowledge of Derivatives, Currency, Commodity, and Forex trading.
                                </p>
                                <p className="info-two">
                                    <b>Specialized Trading Techniques: </b> Learn strategies for Intraday, Delivery, Swing Trading, and Long-term & Short-term investments.
                                </p>

                                <div className="content-bottom">
                                    <ul className="list-wrap">
                                        <li>
                                            <div className="icon">
                                                <i className="flaticon-trophy" />
                                            </div>
                                            <div className="content">
                                                <h2 className="count"><CounterUp count={235} />+</h2>
                                                <p>Best Award</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="icon">
                                                <i className="flaticon-rating" />
                                            </div>
                                            <div className="content">
                                                <h2 className="count"><CounterUp count={98} />k</h2>
                                                <p>Happy Clients</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
