import Link from "next/link"

export default function Footer2() {
    return (
        <>
            <footer>
                <div className="footer-area-two footer-bg-two" id="about" data-background="/assets/img/bg/h2_footer_bg.jpg">
                    <div className="footer-top-two">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-4 col-md-7">
                                    <div className="footer-widget">
                                        <div className="fw-logo">
                                            <Link href="/">
                                                <img
                                                    src="/images/logo 500.png"
                                                    alt=""
                                                    style={{
                                                        borderRadius: 10,
                                                    }}
                                                />
                                            </Link>
                                        </div>
                                        <div className="footer-content">
                                            <p>
                                                Located in Begusarai, Visanpur, Bihar, JYA Traders is your local gateway to global financial opportunities.
                                            </p>
                                            <div className="footer-info">
                                                <ul className="list-wrap">
                                                    <li>
                                                        <div className="icon">
                                                            <i className="flaticon-phone-call" />
                                                        </div>
                                                        <div className="content">
                                                            <Link href="tel:0123456789">+123 888 9999</Link>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="icon">
                                                            <i className="flaticon-clock" />
                                                        </div>
                                                        <div className="content">
                                                            <p>Mon – Sat: 8 am – 5 pm, <br /> Sunday: <span>CLOSED</span></p>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-5 col-sm-6">
                                    <div className="footer-widget">
                                        <h4 className="fw-title">Menu</h4>
                                        <div className="footer-link">
                                            <ul className="list-wrap">
                                                <li><Link href="/about">Company</Link></li>
                                                <li><Link href="/contact">Careers</Link></li>
                                                <li><Link href="/contact">Press media</Link></li>
                                                <li><Link href="/blog">Our Blog</Link></li>
                                                <li><Link href="/contact">Privacy Policy</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-5 col-sm-6">
                                    <div className="footer-widget">
                                        <h4 className="fw-title">Quick Links</h4>
                                        <div className="footer-link">
                                            <ul className="list-wrap">
                                                <li><Link href="/contact">How it’s Work</Link></li>
                                                <li><Link href="/contact">Partners</Link></li>
                                                <li><Link href="/contact">Testimonials</Link></li>
                                                <li><Link href="/contact">Case Studies</Link></li>
                                                <li><Link href="/contact">Pricing</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-7">
                                    <div className="footer-widget">
                                        <h4 className="fw-title">Our Newsletter</h4>
                                        <div className="footer-newsletter">
                                            <p>Sign up to Privitar’s weekly newsletter to get the latest updates.</p>
                                            <form action="#">
                                                <input type="email" placeholder="enter your e-mail" />
                                                <button type="submit">Subscribe</button>
                                            </form>
                                            <div className="footer-social footer-social-two">
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
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer-bottom-two">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="copyright-text-two text-center">
                                        <p>Copyright © gerow | All Right Reserved</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}
