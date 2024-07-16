import React from 'react'
import styles from './KotakSecuritiesSection.module.css'
import Link from 'next/link'

export default function KotakSecuritiesSection() {
    return (
        <section className={styles.aboutSection}>
            <div className="container">

                <div className="row">
                    <div className={`content-column col-lg-6 col-md-12 col-sm-12 order-2 ${styles.contentColumn}`}>
                        <div className={styles.innerColumn}>
                            <div className={styles.secTitle}>
                                <span className={styles.title}>Kotak Securities</span>
                                <h2></h2>
                            </div>

                            {/* <div className={styles.text}>
                                Secure your financial future with our comprehensive wealth management services:
                            </div> */}

                            <div>

                                <div className={styles.text}>
                                    <b>Zero Fee Account Opening: </b>
                                    Start trading without any initial account opening fees.
                                </div>
                                <div className={styles.text}>
                                    <b>Advanced Trading Platform: </b>
                                    Experience seamless trading with our user-friendly and robust trading platform.
                                </div>
                                <div className={styles.text}>
                                    <b>Expert Support: </b>
                                    Access to professional advice and support to help you make informed trading decisions.
                                </div>
                                <div className={styles.text}>
                                    <b>Comprehensive Market Access: </b>
                                    Trade across a variety of markets including stocks, commodities, and forex with ease.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="image-column col-12 col-lg-6 col-md-12 col-sm-12">
                        <div className={`inner-column wow fadeInLeft ${styles.innerColumn}`}>
                            <figure className={styles.image1}>
                                <Link href={"#"} className="lightbox-image" data-fancybox="images">
                                    <img src={'/assets/img/services/services_details01.jpg'} alt="" layout="responsive" width={500} height={500} />
                                </Link>
                            </figure>
                        </div>
                    </div>
                </div>

            


            </div>
        </section>
    )
}
