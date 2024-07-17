'use client'
import React from "react"
import Link from "next/link"
import MobileMenu from "../MobileMenu"
import OffcanvusMenu from "../OffcanvusMenu"
import './header1.module.css'
import './styles.css'
import ApplyForm from "../../form/ApplyForm"

export default function Header1({ scroll, isMobileMenu, handleMobileMenu, isSearch, handleSearch, isOffcanvus, handleOffcanvus }) {

    return (
        <>
            <header id="sticky-header" className={`transparent-header header-style-two ${scroll ? "sticky-menu" : ""}`}>
                <div className="container custom-container">
                    <div className="heder-top-wrap">
                        <div className="row align-items-center">
                            <div className="col-lg-7">
                                <div className="header-top-left">
                                    <ul className="list-wrap">
                                        <li><i className="flaticon-location" />Begusarai, Visanpur, Bihar</li>
                                        <li><i className="flaticon-mail" /><Link href="#">jyatrades@gmail.com</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-5">
                                <div className="header-top-right">
                                    <div className="header-social">
                                        <ul className="list-wrap">
                                            <li><Link href="https://www.facebook.com/share/3P9eGP8bczjuNXVW/?mibextid=qi2Omg"><i className="fab fa-facebook-f" /></Link></li>
                                            <li><Link href="https://x.com/JyaTrades?t=zfNiyRtxoWMlMelmA9_NWg&s=09"><i className="fab fa-twitter" /></Link></li>
                                            <li><Link href="https://www.instagram.com/jyatrades?igsh=M215N3F5YzM1dmtl"><i className="fab fa-instagram" /></Link></li>
                                            <li><Link href="https://pin.it/3EAsYUbZk"><i className="fab fa-pinterest-p" /></Link></li>
                                            <li><Link href="https://youtube.com/@jyatrades?si=ZSNj9KBjhwNw2zwk"><i className="fab fa-youtube" /></Link></li>
                                            <li><Link href="https://www.linkedin.com/in/jya-trades-952214317?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"><i className="fab fa-linkedin" /></Link></li>
                                            <li><Link href="https://wa.me/917856000428"><i className="fab fa-whatsapp" /></Link></li>
                                        </ul>
                                    </div>
                                    <div className="header-top-btn">
                                        <Link href="tel:07856000468"> <i className="flaticon-phone-call" />
                                            +91 7856000468
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="menu-area">
                        <div className="row">
                            <div className="col-12">

                                <div className="mobile-nav-toggler"
                                    style={{ marginTop: '10px' }}
                                    onClick={handleMobileMenu}>
                                    <i className="fas fa-bars" />
                                </div>

                                <div className="menu-wrap">
                                    <nav className="menu-nav">
                                        <div className="logo" style={{ marginTop: '7px' }}>
                                            <Link href="/"><h3 style={{ border: '1px solid grey', borderRadius: '10px', padding: '7px', background: '#00194a', color: '#f5f5f7' }}>
                                                <img
                                                    src="/images/logo 500.png"
                                                    alt=""
                                                />
                                            </h3></Link>
                                        </div>
                                        <div className="navbar-wrap main-menu d-none d-lg-flex">
                                            <ul className="navigation">
                                                <li className="active"><Link href="#_next">Home</Link></li>
                                                <li className=""><Link href="#services">Services</Link></li>
                                                <li className=""><Link href="/courses">Courses</Link></li>
                                                <li className=""><Link href="/about">About Us</Link></li>
                                                <li><Link href="#contact">contacts</Link></li>
                                            </ul>
                                        </div>
                                        <div className="header-action">
                                            <ul className="list-wrap">
                                                <li className="header-contact-two">
                                                    {/* <div className="icon">
                                                        <i className="flaticon-phone-call" />
                                                    </div>
                                                    <div className="content">
                                                        <span>Hot Line Number</span>
                                                        <Link href="tel:0123456789">+123 8989 444</Link>
                                                    </div> */}
                                                    
                                                    <ApplyForm btnStyle={2} />
                                                </li>
                                                <li className="offcanvas-menu" onClick={handleOffcanvus}>
                                                    <Link href="#" className="menu-tigger menu-tigger2">
                                                        <span />
                                                        <span />
                                                        <span />
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </nav>
                                </div>

                                {/* Mobile Menu  */}
                                <div className="mobile-menu">
                                    <nav className="menu-box">
                                        <div className="close-btn" onClick={handleMobileMenu}>
                                            <i className="fas fa-times" />
                                        </div>
                                        <div className="nav-logo">
                                            <Link href="/">
                                                {/* <img
                                                    src="/images/logo 500.png"
                                                    alt=""
                                                    style={{ borderRadius: 10 }}
                                                /> */}
                                                <Link href="/">
                                                    <img
                                                        src="/images/favicon.png"
                                                        alt=""
                                                        style={{ height: 50, width: 50, marginTop: '-15px' }}
                                                    />
                                                </Link>
                                            </Link>
                                        </div>


                                        <div className="menu-outer">
                                            <MobileMenu handleMobileMenu={handleMobileMenu} />
                                        </div>


                                        <div className="social-links">
                                            <ul className="clearfix list-wrap">
                                                <li><Link href="https://www.facebook.com/share/3P9eGP8bczjuNXVW/?mibextid=qi2Omg"><i className="fab fa-facebook-f" /></Link></li>
                                                <li><Link href="https://x.com/JyaTrades?t=zfNiyRtxoWMlMelmA9_NWg&s=09"><i className="fab fa-twitter" /></Link></li>
                                                <li><Link href="https://www.instagram.com/jyatrades?igsh=M215N3F5YzM1dmtl"><i className="fab fa-instagram" /></Link></li>
                                                <li><Link href="https://pin.it/3EAsYUbZk"><i className="fab fa-pinterest-p" /></Link></li>
                                                <li><Link href="https://youtube.com/@jyatrades?si=ZSNj9KBjhwNw2zwk"><i className="fab fa-youtube" /></Link></li>
                                                <li><Link href="https://www.linkedin.com/in/jya-trades-952214317?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"><i className="fab fa-linkedin" /></Link></li>
                                                <li><Link href="https://wa.me/917856000428"><i className="fab fa-whatsapp" /></Link></li>
                                            </ul>
                                        </div>
                                    </nav>
                                </div>

                                <div className="menu-backdrop" onClick={handleMobileMenu} />
                            </div>
                        </div>
                    </div>
                </div>



                <OffcanvusMenu isOffcanvus={isOffcanvus} handleOffcanvus={handleOffcanvus} />
            </header>

        </>
    )
}
