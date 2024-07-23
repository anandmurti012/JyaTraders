import React from 'react'
import styles from './Dr_moni_prakash_Section.module.css'
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
                                        <img className={styles.shapeImage} src={'/assets/img/services/logo-3.png'} alt="" layout="responsive" width={500} height={500} />
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
                        </div> <br></br>
                    </div>
                </div>
            </div>
        </section>
    )
}
