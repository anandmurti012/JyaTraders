// components/AboutSection.js
import React from 'react';
import Image from 'next/image';
import styles from './AboutSection.module.css';

export default function AboutSection() {
    return (
        <section className={styles.aboutSection}>
            <div className="container">
                <div className="row">
                    <div className={`content-column col-lg-6 col-md-12 col-sm-12 order-2 ${styles.contentColumn}`}>
                        <div className={styles.innerColumn}>
                            <div className={styles.secTitle}>
                                <span className={styles.title}>About Us</span>
                                <h2></h2>
                            </div>
                            <div className={styles.text}>
                                At JYA Traders, we pride ourselves on offering comprehensive trading and wealth management services tailored to meet the diverse needs of our clients. With a deep understanding of the financial markets and a commitment to customer satisfaction, we provide training, trading, and wealth management solutions to help you achieve your financial goals. Located in Begusarai, Visanpur, Bihar, JYA Traders is your local gateway to global financial opportunities.
                            </div>

                            <div>
                                <span className={styles.title}>Why Choose Us?</span>

                                <div className={styles.text2}>
                                    <li>Empower Your Financial Journey with JYA Traders</li>
                                </div>

                                <div className={styles.text2}>
                                    <li>Discover the Art of Profitable Trading with JYA Traders</li>
                                </div>

                                <div className={styles.text2}>
                                    <li>Secure Your Future with Expert Wealth Management at JYA Traders</li>
                                </div>

                                <div className={styles.text2}>
                                    <li>Transform Your Trading Skills with JYA Traders' Comprehensive Training</li>
                                </div>

                                <div className={styles.text2}>
                                    <li>Experience Excellence in Dental Care at Dr. Moni’s Prakash Dental Clinic</li>
                                </div>

                                <div className={styles.text2}>
                                    <li>Protect Your Loved Ones with Tata AIA Insurance</li>
                                </div>

                                <div className={styles.text2}>
                                    <li>Open Your Zero Fee Trading Account with Kotak Securities Today</li>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="image-column col-12 col-lg-6 col-md-12 col-sm-12">
                        <div className={`inner-column wow fadeInLeft ${styles.innerColumn}`}>
                            <figure className={styles.image1}>
                                <a href="#" className="lightbox-image" data-fancybox="images">
                                    <img src={'/assets/img/about/1702509848175.png'} alt="" layout="responsive" width={500} height={500} />
                                </a>
                            </figure>
                        </div>
                    </div>
                </div>
                <div className={styles.secTitle}>
                    <span className={styles.title}>Jya Trades,</span>
                    <h2>Your Partner in Financial Excellence</h2>
                </div>
                <div className={styles.text}>
                    At JYA Traders, located in Begusarai, Visanpur, Bihar, we are dedicated to empowering individuals with the knowledge and tools to navigate the financial markets confidently. Whether you are a novice investor or seasoned trader, our comprehensive range of services ensures that your financial goals are met effectively.
                </div>

                <div>

                    <b>Training for Success:</b>
                    <div className={styles.text}>
                        Our training programs cover everything from foundational NISM Certification to advanced strategies in Forex, Commodity, and Derivatives trading. We emphasize Zero Loss Psychology and equip you with the skills needed for Intraday, Swing, and Long-term trading.
                    </div>


                    <b>Diverse Trading Opportunities:</b>
                    <div className={styles.text}>
                        We offer a robust platform for trading in Cash Markets, Commodities, Forex, and more. With us, you can engage in Intraday trading for quick gains or opt for Delivery trading to build a long-term portfolio.
                    </div>


                    <b>Expert Wealth Management:</b>
                    <div className={styles.text}>
                        Plan your financial future with confidence through our Retirement Planning services, Recurring and Fixed Deposits, and personalized Consultancy. We ensure your investments align with your aspirations and risk tolerance.
                    </div>


                    <b>Trusted Partnerships:</b>
                    <div className={styles.text}>
                        Benefit from our collaborations with Kotak Securities for zero fee account opening and Tata AIA Insurance for reliable insurance solutions. These partnerships underscore our commitment to providing holistic financial services under one roof.
                    </div>

                    <div className={styles.text}>
                        At JYA Traders, we believe in transparency, integrity, and personalized service. Our mission is to empower you to make informed financial decisions and achieve lasting prosperity. Join us on this journey towards financial excellence.
                    </div>

                    <div className={styles.text}>
                        <b>Contact us today</b> to discover how we can help you achieve your financial goals. Together, let's build a secure and prosperous future.
                    </div>



                </div>
            </div>
        </section>
    );
};

