import BlogPost from "@/components/blog/BlogPost"
import Layout from "@/components/layout/Layout"
import Image from "next/image"
import Link from "next/link"

export default function Blog() {
    return (
        <>
            <Layout headerStyle={6} footerStyle={1} breadcrumbTitle="Latest Blog">

                <section className="blog-area pt-120 pb-120">
                    <div className="container">
                        <div className="inner-blog-wrap">
                            <div className="row justify-content-center">
                                <div className="col-71">
                                    <div className="blog-post-wrap">
                                        <div className="row">
                                            <BlogPost showItem={6} style={1} showPagination />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-29">
                                    <aside className="blog-sidebar">
                                        <div className="sidebar-search">
                                            <form action="#">
                                                <input type="text" placeholder="Search Here . . ." />
                                                <button type="submit"><i className="flaticon-search" /></button>
                                            </form>
                                        </div>
                                        <div className="blog-widget">
                                            <h4 className="bw-title">Categories</h4>
                                            <div className="bs-cat-list">
                                                <ul className="list-wrap">
                                                    <li><Link href="#">Business <span>(02)</span></Link></li>
                                                    <li><Link href="#">Consulting <span>(08)</span></Link></li>
                                                    <li><Link href="#">Corporate <span>(05)</span></Link></li>
                                                    <li><Link href="#">Design <span>(02)</span></Link></li>
                                                    <li><Link href="#">Fashion <span>(11)</span></Link></li>
                                                    <li><Link href="#">Marketing <span>(12)</span></Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="blog-widget">
                                            <h4 className="bw-title">Recent Posts</h4>
                                            <div className="rc-post-wrap">
                                                <div className="rc-post-item">
                                                    <div className="thumb">
                                                        <Link href="/blog-details"> <Image
                                                            width="0"
                                                            height="0"
                                                            sizes="100vw"
                                                            style={{ width: "auto", height: "auto" }} src="/assets/img/blog/rc_post01.jpg" alt="" /></Link>
                                                    </div>
                                                    <div className="content">
                                                        <span className="date"><i className="far fa-calendar" />22 Jan, 2023</span>
                                                        <h2 className="title"><Link href="/blog-details">Whale be raised must be in a month</Link></h2>
                                                    </div>
                                                </div>
                                                <div className="rc-post-item">
                                                    <div className="thumb">
                                                        <Link href="/blog-details"> <Image
                                                            width="0"
                                                            height="0"
                                                            sizes="100vw"
                                                            style={{ width: "auto", height: "auto" }} src="/assets/img/blog/rc_post02.jpg" alt="" /></Link>
                                                    </div>
                                                    <div className="content">
                                                        <span className="date"><i className="far fa-calendar" />22 Jan, 2023</span>
                                                        <h2 className="title"><Link href="/blog-details">Whale be raised must be in a month</Link></h2>
                                                    </div>
                                                </div>
                                                <div className="rc-post-item">
                                                    <div className="thumb">
                                                        <Link href="/blog-details"> <Image
                                                            width="0"
                                                            height="0"
                                                            sizes="100vw"
                                                            style={{ width: "auto", height: "auto" }} src="/assets/img/blog/rc_post03.jpg" alt="" /></Link>
                                                    </div>
                                                    <div className="content">
                                                        <span className="date"><i className="far fa-calendar" />22 Jan, 2023</span>
                                                        <h2 className="title"><Link href="/blog-details">Whale be raised must be in a month</Link></h2>
                                                    </div>
                                                </div>
                                                <div className="rc-post-item">
                                                    <div className="thumb">
                                                        <Link href="/blog-details"> <Image
                                                            width="0"
                                                            height="0"
                                                            sizes="100vw"
                                                            style={{ width: "auto", height: "auto" }} src="/assets/img/blog/rc_post04.jpg" alt="" /></Link>
                                                    </div>
                                                    <div className="content">
                                                        <span className="date"><i className="far fa-calendar" />22 Jan, 2023</span>
                                                        <h2 className="title"><Link href="/blog-details">Whale be raised must be in a month</Link></h2>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="blog-widget">
                                            <h4 className="bw-title">Tags</h4>
                                            <div className="bs-tag-list">
                                                <ul className="list-wrap">
                                                    <li><Link href="#">Finance</Link></li>
                                                    <li><Link href="#">Consultancy</Link></li>
                                                    <li><Link href="#">Data</Link></li>
                                                    <li><Link href="#">Agency</Link></li>
                                                    <li><Link href="#">Travel</Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </aside>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    )
}