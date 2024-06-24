'use client'
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
                                    <h2 className="title"><Link href="/services-details">Training</Link></h2>
                                    <p style={{ display: `${isActive.key == 1 ? "block" : "none"}` }}>
                                        Enhance your trading skills and knowledge with our expert training programs. We cover a wide range of topics to ensure you are well-prepared for the market
                                    </p>
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
                                    <h2 className="title"><Link href="/services-details">Trading</Link></h2>
                                    <p style={{ display: `${isActive.key == 2 ? "block" : "none"}` }}>
                                        We provide a robust platform for trading across various financial instruments.
                                    </p>
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
                                    <h2 className="title"><Link href="/services-details">Wealth Management</Link></h2>
                                    <p style={{ display: `${isActive.key == 3 ? "block" : "none"}` }}>
                                        Secure your financial future with our comprehensive wealth management services.
                                    </p>
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
                                    <h2 className="title"><Link href="/services-details">Dr. Moni’s Prakash Dental</Link></h2>
                                    <p style={{ display: `${isActive.key == 4 ? "block" : "none"}` }}>
                                        In addition to our financial services, we also operate Dr. Moni’s Prakash Dental, offering top-notch dental care services in Begusarai.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-8">
                            <div className="services-item-two" onMouseEnter={() => handleToggle(5)} onMouseLeave={() => handleToggle(5)}>
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
                                    <h2 className="title"><Link href="/services-details">Kotak Securities</Link></h2>
                                    <p style={{ display: `${isActive.key == 5 ? "block" : "none"}` }}>
                                        Open your trading account with no initial fees.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-8">
                            <div className="services-item-two" onMouseEnter={() => handleToggle(6)} onMouseLeave={() => handleToggle(6)}>
                                <div className="services-thumb-two">
                                    {/* <div style={{height:330}} ></div> */}
                                    <img src="/assets/img/services/h2_services_img02.jpg" alt="" />
                                    <div className="item-shape">
                                        <img src="/assets/img/services/services_item_shape.png" alt="" />
                                    </div>
                                </div>
                                <div className="services-content-two">
                                    <div className="icon">
                                        <i className="flaticon-calculator" />
                                    </div>
                                    <h2 className="title"><Link href="/services-details">Tata AIA Insurance</Link></h2>
                                    <p style={{ display: `${isActive.key == 6 ? "block" : "none"}` }}>
                                        Protect yourself and your loved ones with our insurance offerings from Tata AIA.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}
