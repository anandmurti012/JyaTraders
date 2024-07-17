import React from 'react';
import Link from 'next/link';
import styles from './ContactSection.module.css';

export default function ContactSection() {
    return (
        <section className={`ftco-section contact-section ${styles.contactSection}`}>
            <div className="container">
                <div className="row d-flex mb-5 contact-info">
                    <div className="col-md-4">
                        <div className="row mb-5">
                            <div className="col-md-12">                 
                                    <div className={`icon mr-3 ${styles.icon}`}>
                                        <span className="icon-map-o"></span>
                                    </div>
                                    <p><span>Address:</span> Chandni Chowk Bishnupur Begusarai Bihar 851129</p>                              
                            </div>
                            <div className="col-md-12">                        
                                    <div className={`icon mr-3 ${styles.icon}`}>
                                        <span className="icon-mobile-phone"></span>
                                    </div>
                                    <p><span>Phone:</span> <a href="tel:07856000468">+91 7856000468</a></p>          
                            </div>
                            <div className="col-md-12">                          
                                    <div className={`icon mr-3 ${styles.icon}`}>
                                        <span className="icon-envelope-o"></span>
                                    </div>
                                    <p><span>Email:</span> <a href="mailto:bookings@wheelzcarrentals.com">jyatrades@gmail.com</a></p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8 block-9 mb-md-5">
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
                </div>
            </div>
        </section>
    );
}
