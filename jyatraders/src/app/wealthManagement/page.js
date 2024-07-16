import React from 'react'
import styles from './WealthManagementSection.module.css'
import Link from 'next/link'

export default function ServiceSection() {
    return (
        <section className={styles.aboutSection}>
            <div className="container">
               
                <div className="row">
                    <div className={`content-column col-lg-6 col-md-12 col-sm-12 order-2 ${styles.contentColumn}`}>
                        <div className={styles.innerColumn}>
                            <div className={styles.secTitle}>
                                <span className={styles.title}>Wealth Management</span>
                                <h2></h2>
                            </div>

                            <div className={styles.text}>
                                Secure your financial future with our comprehensive wealth management services:
                            </div>

                            <div>

                                <div className={styles.text}>
                                    <b>Retirement Planning: </b>
                                    Plan and save for a comfortable retirement.
                                </div>
                                <div className={styles.text}>
                                    <b>Recurring Deposits: </b>
                                    Benefit from regular savings with attractive interest rates.
                                </div>
                                <div className={styles.text}>
                                    <b>Fixed Deposits: </b>
                                    Invest in fixed deposits for guaranteed returns.
                                </div>
                                <div className={styles.text}>
                                    <b>Consultancy Services: </b>
                                    Receive expert advice on managing and growing your wealth.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="image-column col-12 col-lg-6 col-md-12 col-sm-12">
                        <div className={`inner-column wow fadeInLeft ${styles.innerColumn}`}>
                            <figure className={styles.image1}>
                                <Link href={"#"} className="lightbox-image" data-fancybox="images">
                                    <img src={'/assets/img/services/h4_services_img02.jpg'} alt="" layout="responsive" width={500} height={500} />
                                </Link>
                            </figure>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
