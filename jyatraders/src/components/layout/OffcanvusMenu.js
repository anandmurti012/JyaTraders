import Link from "next/link"

export default function OffcanvusMenu({ isOffcanvus, handleOffcanvus }) {
    return (
        <>
            <div className={`extra-info ${isOffcanvus ? "active" : ""}`}>
                <div className="close-icon menu-close" onClick={handleOffcanvus}>
                    <button><i className="far fa-window-close" /></button>
                </div>
                <div className="logo-side mb-30">
                    <Link href="/"><img
                        src="/images/logo 500.png"
                        alt=""
                    /></Link>

                </div>
                <div className="side-info mb-30">
                    <div className="contact-list mb-30">
                        <h4>Office Address</h4>
                        <p>
                            Chandni chowk Bishnupur Begusarai Bihar 851129
                        </p>
                    </div>
                    <div className="contact-list mb-30">
                        <h4>Phone Number</h4>
                        <Link href="tel:0123456789">+91 7856000428</Link>
                    </div>
                    <div className="contact-list mb-30">
                        <h4>Email Address</h4>
                        <Link href="mailto:jyatrades@gmail.com" >jyatrades@gmail.com</Link>
                    </div>
                </div>
                <ul className="side-instagram list-wrap">
                    <li><Link href="#"><img src="/assets/img/images/sb_insta01.jpg" alt="" /></Link></li>
                    <li><Link href="#"><img src="/assets/img/images/sb_insta02.jpg" alt="" /></Link></li>
                    <li><Link href="#"><img src="/assets/img/images/sb_insta03.jpg" alt="" /></Link></li>
                    <li><Link href="#"><img src="/assets/img/images/sb_insta04.jpg" alt="" /></Link></li>
                    <li><Link href="#"><img src="/assets/img/images/sb_insta05.jpg" alt="" /></Link></li>
                    <li><Link href="#"><img src="/assets/img/images/sb_insta06.jpg" alt="" /></Link></li>
                </ul>
                <div className="social-icon-right mt-30">
                    <Link href="https://www.facebook.com/share/3P9eGP8bczjuNXVW/?mibextid=qi2Omg"><i className="fab fa-facebook-f" /></Link>
                    <Link href="https://x.com/JyaTrades?t=zfNiyRtxoWMlMelmA9_NWg&s=09"><i className="fab fa-twitter" /></Link>
                    <Link href="https://www.instagram.com/jyatrades?igsh=M215N3F5YzM1dmtl"><i className="fab fa-instagram" /></Link>
                    <Link href="https://pin.it/3EAsYUbZk"><i className="fab fa-pinterest-p" /></Link>
                    <Link href="https://youtube.com/@jyatrades?si=ZSNj9KBjhwNw2zwk"><i className="fab fa-youtube" /></Link>
                    <Link href="https://www.linkedin.com/in/jya-trades-952214317?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"><i className="fab fa-linkedin" /></Link>
                    <Link href="https://t.me/jyatrades"><i className="fab fa-telegram" /></Link>
                    <Link href="https://wa.me/917856000428"><i className="fab fa-whatsapp" /></Link>
                </div>
            </div>
            <div className={`offcanvas-overly ${isOffcanvus ? "active" : ""}`} onClick={handleOffcanvus} />
        </>
    )
}
