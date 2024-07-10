'use client'
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from "@chakra-ui/react";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from 'axios'


export default function Banner() {
    const toast = useToast()
    const router = useRouter();

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [isLoadingButton, setIsLoadingButton] = useState(false)

    const handleSubmit = () => {
        setIsLoadingButton(true);

        const formData={
            name:'amit',
            roll:456
        }

        axios.post('/api/apply', formData)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.error(error);
        });



        // setTimeout(() => {
        //     onClose();
            setIsLoadingButton(false);
        //     toast({
        //         title: 'Successfully Submit',
        //         description: "We've collect your request, We will contact you sortly.",
        //         status: 'success',
        //         duration: 4000,
        //         isClosable: true,
        //         position: 'top'
        //     });
        // }, 2000);




        
    }

    return (
        <>
            <section className="banner-area-two banner-bg-two" data-background="/assets/img/banner/h2_banner_bg.jpg">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="banner-content-two">
                                <span className="sub-title" data-aos="fade-up" data-aos-delay={0}>Welcome to JYA Trades</span>
                                <h2 className="title" data-aos="fade-up" data-aos-delay={300}>Your Trusted Partner in Financial Growth</h2>
                                <p data-aos="fade-up" data-aos-delay={500}>
                                    We pride ourselves on offering comprehensive trading and wealth management services tailored to meet the diverse needs of our clients.
                                </p>
                                <div className="banner-btn">
                                    <button
                                        onClick={() => { onOpen() }}
                                        className="btn"
                                        data-aos="fade-right"
                                        data-aos-delay={700}>
                                        Apply Now
                                    </button>

                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-30px' }}>
                                {/* <button className="btn btn-primary" style={{ marginTop: '0' }}>Signup</button>
                                <button className="btn btn-primary" style={{ marginLeft: '10px', marginTop: '0' }}>Login</button> */}
                            </div>
                            <div className="banner-img text-center">
                                <img src="/assets/img/banner/h2_banner_img.png" alt="" data-aos="fade-left" data-aos-delay={400} />
                            </div>
                        </div>


                    </div>
                </div>


                {/* Apply form modal */}
                <Modal onClose={onClose} size={'xl'} isOpen={isOpen}>
                    <ModalOverlay />
                    <ModalContent
                        width="90vw"
                    // maxWidth="none"
                    // height="80vh"
                    // sx={{ borderRadius: '12px' }} 
                    >
                        <ModalHeader>Login</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <div class="row align-items-start">
                                <div class="col-12 col-sm-12 col-md-6 mt-2">
                                    <label>Full Name</label>
                                    <input  className="form-control" type="text" />
                                </div>
                                <div class="col-12 col-sm-12 col-md-6 mt-2">
                                    <label>Email</label>
                                    <input className="form-control" type="email" />
                                </div>
                                <div class="col-12 col-sm-12 col-md-6 mt-2">
                                    <label>Mobile</label>
                                    <input className="form-control" type="number" />
                                </div>
                                <div class="col-12 col-sm-12 col-md-6 mt-2">
                                    <label>Gender</label>
                                    <select class="form-select" aria-label="Default select example">
                                        <option selected style={{ background: "#EEEEEE" }}> Select</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div class="col-12 col-sm-12 col-md-12 mt-2">
                                    <label>Address</label>
                                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="4"></textarea>
                                </div>
                                <div class="col-12 col-sm-12 col-md-12 mt-2">
                                    <label>Proffession</label>
                                    <input className="form-control" type="text" />
                                </div>

                            </div>
                        </ModalBody>
                        <ModalFooter>

                            <Button
                                isLoading={isLoadingButton}
                                style={{
                                    background: '#0054FD',
                                    color: "#fff",
                                    height: 40,
                                    // width:,
                                    padding: '0px 20px',
                                    borderRadius: '10px'
                                }}
                                onClick={() => { handleSubmit() }}
                                loadingText={'Submitting..'}
                            >
                                Submit
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

                <div className="banner-shape-wrap">
                    <img src="/assets/img/banner/h2_banner_shape01.png" alt="" />
                    <img src="/assets/img/banner/h2_banner_shape02.png" alt="" />
                    <img src="/assets/img/banner/h2_banner_shape03.png" alt="" data-aos="zoom-in-up" data-aos-delay={800} />
                </div>
            </section>
        </>
    )
}
