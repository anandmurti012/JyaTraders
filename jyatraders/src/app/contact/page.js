import React from 'react';
import Link from 'next/link';
import styles from './ContactSection.module.css';

export default function ContactSection() {
    return (
        <section className="choose-area jarallax choose-bg" data-background="/assets/img/bg/choose_bg.jpg">
            <div className="choose-shape">
                <img src="/assets/img/images/choose_shape.png" alt="" data-aos="fade-right" data-aos-delay={0} />
            </div>
            <div className="container mt-5">
                <div className="row align-items-center">
                    <div className="col-lg-5">
                        <div className="">
                            <div className="section-title-two white-title mb-20 tg-heading-subheading animation-style3">
                                <h5 style={{fontSize:'25px'}} className="title tg-element-title"><strong style={{color:'#5682e8', fontSize:'20px'}}>Address:</strong><br></br>Chandni Chowk Bishnupur Begusarai Bihar 851129</h5><br></br>
                                <h5 style={{fontSize:'25px'}} className="title tg-element-title"><strong style={{color:'#5682e8', fontSize:'20px'}}>Phone:</strong><br></br><a href="tel:07856000468">+91 7856000468</a></h5><br></br>
                                <h5 style={{fontSize:'25px'}} className="title tg-element-title"><strong style={{color:'#5682e8', fontSize:'20px'}}>Email:</strong><br></br><a href="mailto:bookings@wheelzcarrentals.com">jyatrades@gmail.com</a></h5>
                            </div>
                            {/* <p>Morem ipsum dolor sit amet, consectetur adipiscing elita florai psum dolor sit amet, consecteture.Borem.</p> */}
                            {/* <VideoPopup style={2} /> */}
                        </div>
                    </div>
                    <div className="col-lg-7">
                        {/* <div className="skill-wrap wow fadeInRight" data-wow-delay=".2s">                      */}
                            <div className=" col-lg-12 col-md-8 block-9 mb-md-5">
                                <form className={`bg-light p-5 contact-form ${styles.contactForm}`} action="https://api.web3forms.com/submit" method="POST">
                                    <input type="hidden" name="access_key" value="a05d4939-0a3f-4a3a-a73d-682b2e3daf29" />

                                    <div className="form-group">
                                        <input name="name" type="text" className={`form-control ${styles.formControl}`} placeholder="Your Name" required />
                                    </div>

                                    <div className="form-group">
                                        <input name="phone" type="number" className={`form-control ${styles.formControl}`} placeholder="Your Contact" required />
                                    </div>

                                    <div className="form-group">
                                        <input name="email" type="email" className={`form-control ${styles.formControl}`} placeholder="Your Email" required />
                                    </div>

                                    <div className="form-group">
                                        <textarea name="message" cols="30" rows="4" className={`form-control ${styles.formControl}`} placeholder="Message" required></textarea>
                                    </div>

                                    <div>
                                        <button className={`btn btn-primary ${styles.submitButton}`} type="submit">Submit Form</button>
                                    </div>
                                </form>
                            </div>
                        {/* </div> */}
                    </div>
                </div>
            </div>
        </section>
    );
}
