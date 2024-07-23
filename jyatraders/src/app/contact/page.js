'use client'
import React, { useState } from 'react';
import styles from './ContactSection.module.css';
import Cta from '../../components/sections/Cta';
import {
    Button,
    useDisclosure,
    useToast
} from "@chakra-ui/react";
import axios from 'axios';

export default function ContactSection() {

    const toast = useToast();
    const [isLoadingButton, setIsLoadingButton] = useState(false);

    const [data, setData] = useState({
        name: '',
        email: '',
        mobile: '',
        message: '',
    });

    const inputData = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };


    const validateData = () => {
        if (!data.name || !data.email || !data.mobile || !data.message) {
            toast({
                title: 'All fields are required.',
                status: 'error',
                duration: 4000,
                isClosable: true,
                position: 'top'
            });
            return false;
        }
        const mobileRegex = /^[0-9]{10}$/;
        if (!mobileRegex.test(data.mobile)) {
            toast({
                title: 'Invalid mobile number. Must be 10 digits.',
                status: 'error',
                duration: 4000,
                isClosable: true,
                position: 'top'
            });
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            toast({
                title: 'Invalid email format.',
                status: 'error',
                duration: 4000,
                isClosable: true,
                position: 'top'
            });
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        if (!validateData()) {
            return;
        }
        try {
            setIsLoadingButton(true);
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`, data)
                .then(response => {
                    setIsLoadingButton(false);
                    setData({
                        name: '',
                        email: '',
                        mobile: '',
                        message: ''
                    });

                    toast({
                        title: response.data.msg,
                        status: 'success',
                        duration: 4000,
                        isClosable: true,
                        position: 'top'
                    });
                })
                .catch(error => {
                    setIsLoadingButton(false);
                    console.log('Submission error:', error);
                    toast({
                        title: 'Submission Failed',
                        description: 'Failed to submit your request. Please try again later.',
                        status: 'error',
                        duration: 4000,
                        isClosable: true,
                        position: 'top'
                    });
                });
        } catch (error) {
            setIsLoadingButton(false);
            console.log('API Call Error', error);
        }
    };

    return (
        <section className="choose-area jarallax choose-bg" data-background="/assets/img/bg/choose_bg.jpg">
            <div className="choose-shape">
                <img src="/assets/img/images/choose_shape.png" alt="" data-aos="fade-right" data-aos-delay={0} />
            </div>
            <div className="container mt-5">
                <div className="row align-items-center">
                    <div className="col-lg-5">
                        <div className="">
                            <div className="white-title mb-20 tg-heading-subheading animation-style3">
                                <p style={{ fontSize: '20px', color:'white' }} className="title tg-element-title"><strong style={{ color: '#5682e8', fontSize: '25px' }}>Address:</strong><br></br>Chandni Chowk Bishnupur Begusarai Bihar 851129</p>
                                <p style={{ fontSize: '20px',color:'white' }} className="title tg-element-title"><strong style={{ color: '#5682e8', fontSize: '25px' }}>Phone:</strong><br></br><a href="tel:07856000428">+91 7856000428</a></p>
                                <p style={{ fontSize: '20px',color:'white' }} className="title tg-element-title"><strong style={{ color: '#5682e8', fontSize: '25px' }}>Email:</strong><br></br><a href="mailto:jyatrades@gmail.com">jyatrades@gmail.com</a></p>
                            </div>
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
            <div style={{marginTop:"150px"}}>
             <Cta />
            </div>
        </section>
    );
}
