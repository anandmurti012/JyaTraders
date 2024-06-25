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
                            Begusarai, Visanpur, Bihar
                        </p>
                    </div>
                    <div className="contact-list mb-30">
                        <h4>Phone Number</h4>
                        <p>+0989 7876 9865 9</p>
                    </div>
                    <div className="contact-list mb-30">
                        <h4>Email Address</h4>
                        <Link href='#' >jyatrades@gmail.com</Link>
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
                    <Link href="#"><i className="fab fa-facebook-f" /></Link>
                    <Link href="#"><i className="fab fa-twitter" /></Link>
                    <Link href="#"><i className="fab fa-google-plus-g" /></Link>
                    <Link href="#"><i className="fab fa-instagram" /></Link>
                </div>
            </div>
            <div className={`offcanvas-overly ${isOffcanvus ? "active" : ""}`} onClick={handleOffcanvus} />
        </>
    )
}
