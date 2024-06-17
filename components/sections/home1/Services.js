import Link from "next/link"
import { useState } from 'react'

export default function Services() {
    const [isActive, setIsActive] = useState({
        status: false,
        key: "",
    })

    const handleToggle = (key) => {
        if (isActive.key === key) {
            setIsActive({
                status: false,
            })
        } else {
            setIsActive({
                status: true,
                key,
            })
        }
    }
    return (
        <>
            <section className="services-area-two services-bg-two" data-background="/assets/img/bg/services_bg02.jpg">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-8">
                            <div className="section-title-two mb-60 tg-heading-subheading animation-style3">
                                <span className="sub-title">What We Do For You</span>
                                <h2 className="title tg-element-title">We can inspire and Offer Different Services</h2>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-4">
                            <div className="view-all-btn text-end mb-30">
                                <Link href="/services" className="btn">See All Service</Link>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-8">
                            <div className="services-item-two" onMouseEnter={() => handleToggle(1)} onMouseLeave={() => handleToggle(1)}>
                                <div className="services-thumb-two">
                                    <img src="/assets/img/services/h2_services_img01.jpg" alt="" />
                                    <div className="item-shape">
                                        <img src="/assets/img/services/services_item_shape.png" alt="" />
                                    </div>
                                </div>
                                <div className="services-content-two">
                                    <div className="icon">
                                        <i className="flaticon-piggy-bank" />
                                    </div>
                                    <h2 className="title"><Link href="/services-details">Finance Planning</Link></h2>
                                    <p style={{ display: `${isActive.key == 1 ? "block" : "none"}` }}>Morem ipsum dolor ametey consectre adipiscing.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-8">
                            <div className="services-item-two" onMouseEnter={() => handleToggle(2)} onMouseLeave={() => handleToggle(2)}>
                                <div className="services-thumb-two">
                                    <img src="/assets/img/services/h2_services_img02.jpg" alt="" />
                                    <div className="item-shape">
                                        <img src="/assets/img/services/services_item_shape.png" alt="" />
                                    </div>
                                </div>
                                <div className="services-content-two">
                                    <div className="icon">
                                        <i className="flaticon-calculator" />
                                    </div>
                                    <h2 className="title"><Link href="/services-details">Tax File Audit</Link></h2>
                                    <p style={{ display: `${isActive.key == 2 ? "block" : "none"}` }}>Morem ipsum dolor ametey consectre adipiscing.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-8">
                            <div className="services-item-two" onMouseEnter={() => handleToggle(3)} onMouseLeave={() => handleToggle(3)}>
                                <div className="services-thumb-two">
                                    <img src="/assets/img/services/h2_services_img03.jpg" alt="" />
                                    <div className="item-shape">
                                        <img src="/assets/img/services/services_item_shape.png" alt="" />
                                    </div>
                                </div>
                                <div className="services-content-two">
                                    <div className="icon">
                                        <i className="flaticon-money" />
                                    </div>
                                    <h2 className="title"><Link href="/services-details">Investment Idea</Link></h2>
                                    <p style={{ display: `${isActive.key == 3 ? "block" : "none"}` }}>Morem ipsum dolor ametey consectre adipiscing.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-8">
                            <div className="services-item-two" onMouseEnter={() => handleToggle(4)} onMouseLeave={() => handleToggle(4)}>
                                <div className="services-thumb-two">
                                    <img src="/assets/img/services/h2_services_img04.jpg" alt="" />
                                    <div className="item-shape">
                                        <img src="/assets/img/services/services_item_shape.png" alt="" />
                                    </div>
                                </div>
                                <div className="services-content-two">
                                    <div className="icon">
                                        <i className="flaticon-layers" />
                                    </div>
                                    <h2 className="title"><Link href="/services-details">Risk Management</Link></h2>
                                    <p style={{ display: `${isActive.key == 4 ? "block" : "none"}` }}>Morem ipsum dolor ametey consectre adipiscing.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
