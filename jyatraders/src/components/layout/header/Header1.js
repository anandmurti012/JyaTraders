import Link from "next/link"
import MobileMenu from "../MobileMenu"
import OffcanvusMenu from "../OffcanvusMenu"
import SearchPopup from "../SearchPopup"
import { useToast } from '@chakra-ui/react'
import { Router } from "next/router"
import { useRouter } from "next/navigation"

export default function Header1({ scroll, isMobileMenu, handleMobileMenu, isSearch, handleSearch, isOffcanvus, handleOffcanvus }) {

    const toast = useToast()
    const router = useRouter();

    const handleSubmit = async () => {

    }


    return (
        <>
            <header id="sticky-header" className={`transparent-header header-style-two ${scroll ? "sticky-menu" : ""}`}>
                <div className="container custom-container">
                    <div className="heder-top-wrap">
                        <div className="row align-items-center">
                            <div className="col-lg-7">
                                <div className="header-top-left">
                                    <ul className="list-wrap">
                                        <li><i className="flaticon-location" />256 Avenue, Mark Street, Newyork City</li>
                                        <li><i className="flaticon-mail" /><Link href="mailto:gerow@gmail.com">jyaTraders@gmail.com</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-5">
                                <div className="header-top-right">
                                    <div className="header-social">
                                        <ul className="list-wrap">
                                            <li><Link href="#"><i className="fab fa-facebook-f" /></Link></li>
                                            <li><Link href="#"><i className="fab fa-twitter" /></Link></li>
                                            <li><Link href="#"><i className="fab fa-instagram" /></Link></li>
                                            <li><Link href="#"><i className="fab fa-pinterest-p" /></Link></li>
                                        </ul>
                                    </div>
                                    <div className="header-top-btn">
                                        <Link href="tel:0123456789"> <i className="flaticon-phone-call" />
                                            +123 8989 444
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="menu-area">
                        <div className="row">
                            <div className="col-12">
                                <div className="mobile-nav-toggler" onClick={handleMobileMenu}><i className="fas fa-bars" /></div>
                                <div className="menu-wrap">
                                    <nav className="menu-nav">
                                        <div className="logo">
                                            <Link href="/"><h3 style={{ border: '1px solid grey', borderRadius: '10px', padding: '7px', background: '#00194a', color: '#f5f5f7' }}>JyaTrades</h3></Link>
                                        </div>
                                        <div className="navbar-wrap main-menu d-none d-lg-flex">
                                            <ul className="navigation">
                                                <li className="active menu-item-has-children"><Link href="#">Home</Link>
                                                    <ul className="sub-menu">
                                                        <li><Link href="/">Finance</Link></li>
                                                        <li><Link href="/index-2">Consulting</Link></li>
                                                        <li><Link href="/index-3">Insurance</Link></li>
                                                        <li><Link href="/index-4">Digital Agency</Link></li>
                                                        <li><Link href="/index-5">Business</Link></li>
                                                    </ul>
                                                </li>
                                                <li className="menu-item-has-children"><Link href="#">About Us</Link>
                                                    <ul className="sub-menu">
                                                        <li><Link href="/about">About One</Link></li>
                                                        <li><Link href="/about-2">About Two</Link></li>
                                                        <li><Link href="/about-3">About Three</Link></li>
                                                        <li><Link href="/about-4">About Four</Link></li>
                                                        <li><Link href="/about-5">About Five</Link></li>
                                                    </ul>
                                                </li>
                                                <li className="menu-item-has-children"><Link href="#">Pages</Link>
                                                    <ul className="sub-menu">
                                                        <li className="menu-item-has-children"><Link href="/services">Services</Link>
                                                            <ul className="sub-menu">
                                                                <li><Link href="/services">Services One</Link></li>
                                                                <li><Link href="/services-2">Services Two</Link></li>
                                                                <li><Link href="/services-3">Services Three</Link></li>
                                                                <li><Link href="/services-4">Services Four</Link></li>
                                                                <li><Link href="/services-5">Services Five</Link></li>
                                                            </ul>
                                                        </li>
                                                        <li className="menu-item-has-children"><Link href="/services-details">Services Details</Link>
                                                            <ul className="sub-menu">
                                                                <li><Link href="/services-details">Services Details One</Link></li>
                                                                <li><Link href="/services-details-2">Services Details Two</Link></li>
                                                                <li><Link href="/services-details-3">Services Details Three</Link></li>
                                                                <li><Link href="/services-details-4">Services Details Four</Link></li>
                                                                <li><Link href="/services-details-5">Services Details Five</Link></li>
                                                            </ul>
                                                        </li>
                                                        <li><Link href="/project-details">Portfolio Details</Link></li>
                                                        <li><Link href="/team-details">Team Details</Link></li>
                                                        <li><Link href="/404">404 Error</Link></li>
                                                    </ul>
                                                </li>
                                                <li className="menu-item-has-children"><Link href="#">Blog</Link>
                                                    <ul className="sub-menu">
                                                        <li><Link href="/blog">Our Blog</Link></li>
                                                        <li><Link href="/blog-details">Blog Details</Link></li>
                                                    </ul>
                                                </li>
                                                <li><Link href="/contact">contacts</Link></li>
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

                                                    <button
                                                        onClick={() => { router.push('/apply'); }}
                                                        style={{ background: '#0054FD', color: "#fff", height: 45, padding: '0px 15px', borderRadius: '100px' }}
                                                    >
                                                        Apply for Consulting
                                                    </button>
                                                </li>
                                                <li className="offcanvas-menu" onClick={handleOffcanvus}>
                                                    <Link href="#" className="menu-tigger">
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
                                        <div className="close-btn" onClick={handleMobileMenu}><i className="fas fa-times" /></div>
                                        <div className="nav-logo">
                                            <Link href="/"><img src="/assets/img/logo/logo.png" alt="Logo" /></Link>
                                        </div>
                                        <div className="mobile-search">
                                            <form action="#">
                                                <input type="text" placeholder="Search here..." />
                                                <button><i className="flaticon-search" /></button>
                                            </form>
                                        </div>
                                        <div className="menu-outer">
                                            <MobileMenu />
                                        </div>
                                        <div className="social-links">
                                            <ul className="clearfix list-wrap">
                                                <li><Link href="#"><i className="fab fa-facebook-f" /></Link></li>
                                                <li><Link href="#"><i className="fab fa-twitter" /></Link></li>
                                                <li><Link href="#"><i className="fab fa-instagram" /></Link></li>
                                                <li><Link href="#"><i className="fab fa-linkedin-in" /></Link></li>
                                                <li><Link href="#"><i className="fab fa-youtube" /></Link></li>
                                            </ul>
                                        </div>
                                    </nav>
                                </div>
                                <div className="menu-backdrop" onClick={handleMobileMenu} />
                            </div>
                        </div>
                    </div>
                </div>
                <SearchPopup isSearch={isSearch} handleSearch={handleSearch} />
                <OffcanvusMenu isOffcanvus={isOffcanvus} handleOffcanvus={handleOffcanvus} />
            </header>

        </>
    )
}