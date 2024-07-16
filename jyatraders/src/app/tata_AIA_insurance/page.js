import React from 'react'
import styles from './Tata_AIA_insurance_Section.module.css'
import Link from 'next/link'

export default function ServiceSection() {
    return (
        <section className={styles.aboutSection}>
            <div className="container">
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
