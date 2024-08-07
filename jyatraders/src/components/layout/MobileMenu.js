import Link from "next/link"

export default function MobileMenu({ handleMobileMenu }) {
    return (
        <>
            <ul className="navigation">
                <li className="active menu-item-has-children"><Link href="/" onClick={handleMobileMenu} >Home</Link></li>
                <li className="menu-item-has-children"><Link href="/about" onClick={handleMobileMenu}>About Us</Link></li>
                <li className="menu-item-has-children"><Link href="/services" onClick={handleMobileMenu}>Services</Link></li>
                <li className="menu-item-has-children"><Link href="/courses" onClick={handleMobileMenu}>Courses</Link></li>
                <li className="menu-item-has-children"><Link href="/contact" onClick={handleMobileMenu}>Contact Us</Link></li>
            </ul>
        </>
    )
}
