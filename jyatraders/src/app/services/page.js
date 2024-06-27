import React from 'react'
import styles from './ServiceSection.module.css'
import Link from 'next/link'

export default function ServiceSection() {
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
                                    <img src={'/assets/img/services/sd_video_img.jpg'} alt="" layout="responsive" width={500} height={500} />
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

                {/* N-2 */}

                <div className="row mt-5">
                    <div className={`content-column col-lg-6 col-md-12 col-sm-12 order-2 ${styles.contentColumn}`}>
                        <div className={styles.innerColumn}>
                            <div className={`inner-column wow fadeInLeft ${styles.innerColumn}`}>
                                <figure className={styles.image1}>
                                    <Link href={"#"} className="lightbox-image" data-fancybox="images">
                                        <img src={'/assets/img/services/services_img01.jpg'} alt="" layout="responsive" width={500} height={500} />
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

                {/* N-3 */}

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

                {/* N-4 */}

                <div className="row mt-5">
                    <div className={`content-column col-lg-6 col-md-12 col-sm-12 order-2 ${styles.contentColumn}`}>
                        <div className={styles.innerColumn}>
                            <div className={`inner-column wow fadeInLeft ${styles.innerColumn}`}>
                                <figure className={styles.image1}>
                                    <Link href={"#"} className="lightbox-image" data-fancybox="images">
                                        <img src={'/assets/img/services/logo-3.png'} alt="" layout="responsive" width={500} height={500} />
                                    </Link>
                                </figure>
                            </div>

                        </div>
                    </div>
                    <div className="image-column col-12 col-lg-6 col-md-12 col-sm-12">
                        <div className={styles.secTitle}>
                            <span className={styles.title}>Dr. Moni’s Prakash Dental</span>
                            <h2></h2>
                        </div>
                        <div className={styles.text2}>
                            In addition to our financial services, we also operate Dr. Moni’s Prakash Dental, offering top-notch dental care services in Begusarai.
                        </div>
                        <div>
                            <div className={styles.text}>
                                <b>Comprehensive Dental Care: </b>
                                Offering a wide range of dental services from routine check-ups to advanced treatments.
                            </div>
                            <div className={styles.text}>
                                <b>Experienced Professionals: </b>
                                Our team of skilled dentists ensures the highest quality of care.
                            </div>
                            <div className={styles.text}>
                                <b>State-of-the-Art Facility: </b>
                                Equipped with the latest dental technology for accurate diagnosis and effective treatment.
                            </div>
                            <div className={styles.text}>
                                <b>Patient-Centered Approach: </b>
                                We prioritize your comfort and satisfaction with personalized dental care plans.
                            </div>
                        </div>
                    </div>
                </div>

                {/* N-5 */}

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

                {/* N-6 */}

                <div className="row mt-5">
                    <div className={`content-column col-lg-6 col-md-12 col-sm-12 order-2 ${styles.contentColumn}`}>
                        <div className={styles.innerColumn}>
                            <div className={`inner-column wow fadeInLeft ${styles.innerColumn}`}>
                                <figure className={styles.image1}>
                                    <Link href={"#"} className="lightbox-image" data-fancybox="images">
                                        <img src={'/assets/img/services/h4_services_img01.jpg'} alt="" layout="responsive" width={500} height={500} />
                                    </Link>
                                </figure>
                            </div>

                        </div>
                    </div>
                    <div className="image-column col-12 col-lg-6 col-md-12 col-sm-12">
                        <div className={styles.secTitle}>
                            <span className={styles.title}>Tata AIA Insurance</span>
                            <h2></h2>
                        </div>
                        <div className={styles.text2}>
                            Protect yourself and your loved ones with our insurance offerings from Tata AIA                        </div>
                        <div>
                            <div className={styles.text}>
                                Tata AIA Insurance Offerings:
                            </div>
                            <div className={styles.text}>
                                <b>Term Insurance: </b>
                                Provide financial security for your loved ones with comprehensive term life coverage.
                            </div>
                            <div className={styles.text}>
                                <b>Accidental Insurance: </b>
                                Protect yourself from unforeseen accidents with our extensive accidental insurance plans.
                            </div>
                            <div className={styles.text}>
                                <b>Disability Insurance: </b>
                                Ensure financial stability in the event of a disability, safeguarding your income and lifestyle.
                            </div>
                            <div className={styles.text}>
                                <b>Trusted Partner: </b>
                                Backed by Tata AIA, a renowned name in the insurance industry, ensuring reliability and trust.
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </section>
    )
}
