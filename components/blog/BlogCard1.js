import Image from "next/image"
import Link from "next/link"

export default function BlogCard1({ item }) {
    return (
        <>
            <div className="col-md-6">
                <div className="blog-post-item-two">
                    <div className="blog-post-thumb-two">
                        <Link href={`/blog/${item.id}`}> <Image
                            width="0"
                            height="0"
                            sizes="100vw"
                            style={{ width: "auto", height: "auto" }}
                            src={`/assets/img/blog/${item.img}`} alt="" /></Link>
                        <Link href="/blog" className="tag tag-two">Development</Link>
                    </div>
                    <div className="blog-post-content-two">
                        <h2 className="title"><Link href={`/blog/${item.id}`}>{item.title}</Link></h2>
                        <p>Everything you need to start building area atching presence for your business.</p>
                        <div className="blog-meta">
                            <ul className="list-wrap">
                                <li>
                                    <Link href={`/blog/${item.id}`}> <Image
                                        width="0"
                                        height="0"
                                        sizes="100vw"
                                        style={{ width: "auto", height: "auto" }} src="/assets/img/blog/blog_avatar01.png" alt="" />Kat Doven</Link>
                                </li>
                                <li><i className="far fa-calendar" />22 Jan, 2023</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
