import Link from "next/link"

export default function Project() {
    return (
        <>
            <section className="project-area-two project-bg-two" data-background="/assets/img/bg/project_bg02.jpg">
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-lg-6">
                            <div className="section-title-two mb-40 tg-heading-subheading animation-style3">
                                <span className="sub-title">Complete Projects</span>
                                <h2 className="title tg-element-title">Our recently completed <br /> projects list</h2>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-10">
                            <div className="project-content-top">
                                <p>Ever find yourself staring at your computer screen a good consulting slogan to come to mind? Oftentimes.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container custom-container">
                    <div className="row justify-content-center">
                        <div className="col-lg-4 col-md-6 col-sm-10">
                            <div className="project-item-two">
                                <div className="project-thumb-two">
                                    <img src="/assets/img/project/h2_project_img01.jpg" alt="" />
                                </div>
                                <div className="project-content-two">
                                    <h2 className="title"><Link href="/project-details">Finance Consultancy</Link></h2>
                                    <span>Advisory</span>
                                    <Link href="/project-details" className="link-btn"><i className="fas fa-chevron-right" /></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-10">
                            <div className="project-item-two">
                                <div className="project-thumb-two">
                                    <img src="/assets/img/project/h2_project_img02.jpg" alt="" />
                                </div>
                                <div className="project-content-two">
                                    <h2 className="title"><Link href="/project-details">Finance Consultancy</Link></h2>
                                    <span>Advisory</span>
                                    <Link href="/project-details" className="link-btn"><i className="fas fa-chevron-right" /></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-10">
                            <div className="project-item-two">
                                <div className="project-thumb-two">
                                    <img src="/assets/img/project/h2_project_img03.jpg" alt="" />
                                </div>
                                <div className="project-content-two">
                                    <h2 className="title"><Link href="/project-details">Finance Consultancy</Link></h2>
                                    <span>Advisory</span>
                                    <Link href="/project-details" className="link-btn"><i className="fas fa-chevron-right" /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
