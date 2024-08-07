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
            <section className="services-area-two services-bg-two" id="services" data-background="/assets/img/bg/services_bg02.jpg">
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
                                <Link href="/services" className="btn">View All Services</Link>
                                {/* <Link href="/courses" className="btn">View Courses</Link> */}
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-8">
                            <Link href="/services/training">
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
                                        <h2 className="title">Training</h2>
                                        <p style={{ display: `${isActive.key == 1 ? "block" : "none"}`, cursor: 'pointer' }}>
                                            Enhance your trading skills and knowledge with our expert training programs. We cover a wide range of topics to ensure you are well-prepared for the market
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-8">
                            <Link href='/services/trading'>
                                <div className="services-item-two" onMouseEnter={() => handleToggle(2)} onMouseLeave={() => handleToggle(2)}>
                                    <div className="services-thumb-two">
                                        <img src="/assets/img/services/h2_services_img03.jpg" alt="" />
                                        <div className="item-shape">
                                            <img src="/assets/img/services/services_item_shape.png" alt="" />
                                        </div>
                                    </div>
                                    <div className="services-content-two">
                                        <div className="icon">
                                            <i className="flaticon-calculator" />
                                        </div>
                                        <h2 className="title">Trading</h2>
                                        <p style={{ display: `${isActive.key == 2 ? "block" : "none"}`, cursor: 'pointer' }}>
                                            We provide a robust platform for trading across various financial instruments.
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-8">
                            <Link href='/services/wealthManagement'>
                                <div className="services-item-two" onMouseEnter={() => handleToggle(3)} onMouseLeave={() => handleToggle(3)}>
                                    <div className="services-thumb-two">
                                        <img src="/assets/img/services/h2_services_img08.jpg" alt="" />
                                        <div className="item-shape">
                                            <img src="/assets/img/services/services_item_shape.png" alt="" />
                                        </div>
                                    </div>
                                    <div className="services-content-two">
                                        <div className="icon">
                                            <i className="flaticon-money" />
                                        </div>
                                        <h2 className="title">Wealth Management</h2>
                                        <p style={{ display: `${isActive.key == 3 ? "block" : "none"}`, cursor: 'pointer' }}>
                                            Secure your financial future with our comprehensive wealth management services.
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-8">
                            <Link href='/services/dr_moni_prakash'>
                                <div className="services-item-two" onMouseEnter={() => handleToggle(4)} onMouseLeave={() => handleToggle(4)}>
                                    <div className="services-thumb-two">
                                        <img src="/assets/img/services/logo-3.jpg" alt="" />
                                        <div className="item-shape">
                                            <img src="/assets/img/services/services_item_shape.png" alt="" />
                                        </div>
                                    </div>
                                    <div className="services-content-two">
                                        <div className="icon">
                                            <i className="flaticon-layers" />
                                        </div>
                                        <h2 className="title">Dr. Moni’s Prakash Dental</h2>
                                        <p style={{ display: `${isActive.key == 4 ? "block" : "none"}`, cursor: 'pointer' }}>
                                            In addition to our financial services, we also operate Dr. Moni’s Prakash Dental, offering top-notch dental care services in Begusarai.
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-8">
                            <Link href='/services/kotakSecurities'>
                                <div className="services-item-two" onMouseEnter={() => handleToggle(5)} onMouseLeave={() => handleToggle(5)}>
                                    <div className="services-thumb-two">
                                        <img src="/assets/img/services/h2_services_img06.jpg" alt="" />
                                        <div className="item-shape">
                                            <img src="/assets/img/services/services_item_shape.png" alt="" />
                                        </div>
                                    </div>
                                    <div className="services-content-two">
                                        <div className="icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-shield-check" viewBox="0 0 16 16">
                                                <path d="M5.338 1.59a61 61 0 0 0-2.837.856.48.48 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.7 10.7 0 0 0 2.287 2.233c.346.244.652.42.893.533q.18.085.293.118a1 1 0 0 0 .101.025 1 1 0 0 0 .1-.025q.114-.034.294-.118c.24-.113.547-.29.893-.533a10.7 10.7 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.8 11.8 0 0 1-2.517 2.453 7 7 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7 7 0 0 1-1.048-.625 11.8 11.8 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 63 63 0 0 1 5.072.56" />
                                                <path d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0" />
                                            </svg>
                                        </div>
                                        <h2 className="title">Kotak Securities</h2>
                                        <p style={{ display: `${isActive.key == 5 ? "block" : "none"}`, cursor: 'pointer' }}>
                                            Open your trading account with no initial fees.
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-8">
                            <Link href='/services/tata_AIA_insurance'>
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
                                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-person-check-fill" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0" />
                                                <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                                            </svg>
                                        </div>
                                        <h2 className="title">Tata AIA Insurance</h2>

                                        <p style={{ display: `${isActive.key == 6 ? "block" : "none"}`, cursor: 'pointer' }}>
                                            Protect yourself and your loved ones with our insurance offerings from Tata AIA.
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
