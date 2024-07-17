import Link from "next/link"

export default function MobileMenu({handleMobileMenu}) {
    return (
        <>
            <ul className="navigation">
                <li className="active menu-item-has-children"><Link href="#_next" onClick={handleMobileMenu} >Home</Link></li>
                <li className="menu-item-has-children"><Link href="/about">About Us</Link></li>
                <li className="menu-item-has-children"><Link href="/services">Services</Link></li>
                <li className="menu-item-has-children"><Link href="/contact">Contact</Link></li>
                <li><Link href="/courses">Courses</Link></li>
            </ul>
        </>
    )
}
