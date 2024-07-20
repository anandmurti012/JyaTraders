'use client'
import React, { useState } from 'react';
import styles from './ContactSection.module.css';
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
                            <div className="section-title-two white-title mb-20 tg-heading-subheading animation-style3">

                                <h5 style={{ fontSize: '25px' }} className="title tg-element-title"><strong style={{ color: '#5682e8', fontSize: '20px' }}>Address:</strong><br></br>Chandni Chowk Bishnupur Begusarai Bihar 851129</h5><br></br>
                                <h5 style={{ fontSize: '25px' }} className="title tg-element-title"><strong style={{ color: '#5682e8', fontSize: '20px' }}>Phone:</strong><br></br><a href="tel:07856000468">+91 7856000468</a></h5><br></br>
                                <h5 style={{ fontSize: '25px' }} className="title tg-element-title"><strong style={{ color: '#5682e8', fontSize: '20px' }}>Email:</strong><br></br><a href="mailto:bookings@wheelzcarrentals.com">jyatrades@gmail.com</a></h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-7">
                        <div className="col-lg-12 col-md-8 block-9 mb-md-5 mt-4">
                            <div className={`bg-light p-5 contact-form ${styles.contactForm}`}>
                                <input type="hidden" name="access_key" value="a05d4939-0a3f-4a3a-a73d-682b2e3daf29" />

                                <div className="form-group">
                                    <input name="name" value={data?.name} onChange={inputData} type="text" className={`form-control ${styles.formControl}`} placeholder="Your Name" />
                                </div>

                                <div className="form-group">
                                    <input name="mobile" value={data?.mobile} onChange={inputData} type="tel" maxLength={10} className={`form-control ${styles.formControl}`} placeholder="Your Contact" />
                                </div>

                                <div className="form-group">
                                    <input name="email" value={data?.email} onChange={inputData} type="email" className={`form-control ${styles.formControl}`} placeholder="Your Email" />
                                </div>

                                <div className="form-group">
                                    <textarea name="message" value={data?.message} onChange={inputData} cols="30" rows="4" className={`form-control ${styles.formControl}`} placeholder="Message"></textarea>
                                </div>

                                <div>
                                    <Button
                                        isLoading={isLoadingButton}
                                        loadingText="Submitting"
                                        colorScheme="blue"
                                        className={styles.submitButton}
                                        onClick={() => { handleSubmit() }}
                                    >
                                        Submit Form
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
