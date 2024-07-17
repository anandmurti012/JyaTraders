import Link from "next/link"

export default function MobileMenu({ handleMobileMenu }) {
    return (
        <>
            <ul className="navigation">
                <li className="active menu-item-has-children"><Link href="#" onClick={handleMobileMenu} >Home</Link></li>
                <li className="menu-item-has-children"><Link href="#">About Us</Link></li>
                <li className="menu-item-has-children"><Link href="#">Pages</Link></li>
                <li className="menu-item-has-children"><Link href="#">Blog</Link></li>
                <li><Link href="#">contacts</Link></li>
            </ul>
        </>
    )
}
