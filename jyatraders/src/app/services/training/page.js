import React from 'react'
import styles from './TrainingSection.module.css'
import Link from 'next/link'

export default function TrainingSection() {
    return (
        <section className={styles.aboutSection}>
            <div className="container">
                <div className="row">
                    <div className={`content-column col-lg-6 col-md-12 col-sm-12 order-2 ${styles.contentColumn}`}>
                        <div className={styles.innerColumn}>
                            <div className={styles.secTitle}>
                                <span className={styles.title}>Training</span>
                                <h2></h2>
                            </div>

                            <div className={styles.text2}>
                                Enhance your trading skills and knowledge with our expert training programs. We cover a wide range of topics to ensure you are well-prepared for the market:
                            </div>

                            <div>

                                <div className={styles.text}>
                                    <b>NISM Certification: </b>
                                    Achieve professional certification to validate your trading expertise.
                                </div>
                                <div className={styles.text}>
                                    <b>Zero Loss Psychology: </b>
                                    Master the mindset for minimizing losses and maximizing gains.
                                </div>
                                <div className={styles.text}>
                                    <b>Derivatives: </b>
                                    Learn to navigate and trade derivative instruments effectively.
                                </div>
                                <div className={styles.text}>
                                    <b>Currency Trading: </b>
                                    Gain insights into currency markets and strategies for success.
                                </div>
                                <div className={styles.text}>
                                    <b>Commodity Trading: </b>
                                    Understand the commodities market and how to trade commodities.
                                </div>
                                <div className={styles.text}>
                                    <b>Forex Trading: </b>
                                    Dive into the foreign exchange market with our specialized forex training.
                                </div>
                                <div className={styles.text}>
                                    <b>Mutual Funds: </b>
                                    Explore mutual fund investments for diversified portfolios.
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="image-column col-12 col-lg-6 col-md-12 col-sm-12">
                        <div className={`inner-column wow fadeInLeft ${styles.innerColumn}`}>
                            <figure className={styles.image1}>
                                <Link href={"#"} className="lightbox-image" data-fancybox="images">
                                    <img className={styles.shapeImage} src={'/assets/img/services/sd_video_img.jpg'} alt="" layout="responsive" width={500} height={500} />
                                </Link>
                            </figure>
                        </div>
                    </div>
                    
                </div>
                <div className='row'>
                    <div className='col-12 col-sm-12 col-md-6' >
                        <div className={styles.text}>
                            <b>Intraday Trading: </b>
                            Develop strategies for same-day trading to capitalize on market movements.
                        </div>
                        <div className={styles.text}>
                            <b>Cash Trading: </b>
                            Get familiar with trading in the cash market.
                        </div>
                        <div className={styles.text}>
                            <b>Swing Trading: </b>
                            Discover the techniques of swing trading to profit from market fluctuations.
                        </div>
                    </div>
                    <div className='col-12 col-sm-12 col-md-6' >
                        <div className={styles.text}>
                            <b>Long-term and Short-term Trading: </b>
                            Understand the strategies for both long-term and short-term market positions.
                        </div>
                        <div className={styles.text}>
                            <b>Delivery Trading: </b>
                            Learn about the delivery-based trading approach for long-term investments.
                        </div>

                        <div className={styles.text}>
                            <b>Cryptocurrency Trading: </b>
                            Navigate the emerging world of digital currencies.
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
