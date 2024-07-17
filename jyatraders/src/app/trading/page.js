import React from 'react'
import styles from './TradingSection.module.css'
import Link from 'next/link'

export default function TradingSection() {
    return (
        <section className={styles.aboutSection}>
            <div className="container">
                <div className="row mt-5">
                    <div className={`content-column col-lg-6 col-md-12 col-sm-12 order-2 ${styles.contentColumn}`}>
                        <div className={styles.innerColumn}>
                            <div className={`inner-column wow fadeInLeft ${styles.innerColumn}`}>
                                <figure className={styles.image1}>
                                    <Link href={"#"} className="lightbox-image" data-fancybox="images">
                                        <img className={styles.shapeImage} src={'/assets/img/services/services_img01.jpg'} alt="" layout="responsive" width={500} height={500} />
                                    </Link>
                                </figure>
                            </div>

                        </div>
                    </div>
                    <div className="image-column col-12 col-lg-6 col-md-12 col-sm-12">
                        <div className={styles.secTitle}>
                            <span className={styles.title}>Trading</span>
                            <h2></h2>
                        </div>
                        <div className={styles.text2}>
                            We provide a robust platform for trading across various financial instruments:
                        </div>
                        <div>
                            <div className={styles.text}>
                                <b>Cash Market Trading: </b>
                                Engage in the buying and selling of stocks and securities.
                            </div>
                            <div className={styles.text}>
                                <b>Commodity Trading: </b>
                                Trade in commodities like gold, silver, and oil.
                            </div>
                            <div className={styles.text}>
                                <b>Intraday Trading: </b>
                                Execute trades within a single trading day for quick gains.
                            </div>
                            <div className={styles.text}>
                                <b>Delivery Trading: </b>
                                Invest in stocks with a focus on long-term holding.
                            </div>
                            <div className={styles.text}>
                                <b>Swing Trading: </b>
                                Capture short to medium-term gains by holding positions for several days to weeks.
                            </div>
                            <div className={styles.text}>
                                <b>Forex Trading: </b>
                                Trade in the global currency market for high liquidity and potential profits.
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}
