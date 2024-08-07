import React, { useState } from 'react';
import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    useToast
} from "@chakra-ui/react";
import axios from 'axios';

const ApplyForm = ({ btnStyle }) => {
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLoadingButton, setIsLoadingButton] = useState(false);
    const [errors, setErrors] = useState({});

    const [data, setData] = useState({
        fullName: '',
        gender: '',
        email: '',
        mobile: '',
        address: '',
        profession: '',
        password: '',
        confirmPassword: ''
    });

    const validateForm = () => {
        let valid = true;
        const newErrors = {};

        if (data.fullName.trim() === '') {
            newErrors.fullName = 'Full Name is required';
            valid = false;
        }

        if (data.email.trim() === '') {
            newErrors.email = 'Email is required';
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            newErrors.email = 'Email is invalid';
            valid = false;
        }

        if (data.mobile.trim() === '') {
            newErrors.mobile = 'Mobile is required';
            valid = false;
        } else if (!/^\d{10}$/.test(data.mobile)) {
            newErrors.mobile = 'Mobile must be 10 digits';
            valid = false;
        }

        if (data.gender.trim() === '') {
            newErrors.gender = 'Gender is required';
            valid = false;
        }

        if (data.password.trim() === '') {
            newErrors.password = 'Password is required';
            valid = false;
        }

        if (data.confirmPassword.trim() === '') {
            newErrors.confirmPassword = 'Confirm Password is required';
            valid = false;
        } else if (data.password !== data.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const inputData = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        setIsLoadingButton(true);
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, data)
            .then(response => {
                setIsLoadingButton(false);
                setData({
                    fullName: '',
                    gender: '',
                    email: '',
                    mobile: '',
                    address: '',
                    profession: '',
                    password: '',
                    confirmPassword: ''
                });

                toast({
                    title: response.data.msg,
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                    position: 'top'
                });
                onClose();
            }).catch(error => {
                if (error?.response?.status === 409) {
                    toast({
                        title: error?.response?.data?.msg || 'Submission Failed',
                        status: 'error',
                        duration: 4000,
                        isClosable: true,
                        position: 'top'
                    });
                    setIsLoadingButton(false);
                }
                setIsLoadingButton(false);
            })
    };

    return (
        <>
            {btnStyle === 1 ? (
                <button
                    onClick={onOpen}
                    className="btn"
                    data-aos="fade-right"
                    data-aos-delay={700}
                >
                    Apply Now
                </button>
            ) : (
                <button
                    onClick={onOpen}
                    style={{
                        background: '#0054FD',
                        color: '#fff',
                        height: 42,
                        padding: '0px 25px',
                        borderRadius: '100px',
                        paddingBottom: '2px'
                    }}
                >
                    Apply Now
                </button>
            )}

            <Modal onClose={onClose} size={'xl'} isOpen={isOpen}>
                <ModalOverlay />
                <ModalContent width="90vw">
                    <ModalHeader>Apply</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div className="row align-items-start">
                            <div className="col-12 col-sm-12 col-md-6 mt-2">
                                <label>Full Name</label>
                                <input name='fullName' onChange={inputData} value={data.fullName} className="form-control" type="text" />
                                {errors.fullName && <span className="text-danger" style={{ fontSize: '14px' }}>{errors.fullName}</span>}
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 mt-2">
                                <label>Email</label>
                                <input name='email' onChange={inputData} value={data.email} className="form-control" type="email" />
                                {errors.email && <span className="text-danger" style={{ fontSize: '14px' }}>{errors.email}</span>}
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 mt-2">
                                <label>Mobile</label>
                                <input name='mobile' type='tel' onChange={inputData} value={data.mobile} className="form-control" maxLength="10" />
                                {errors.mobile && <span className="text-danger" style={{ fontSize: '14px' }}>{errors.mobile}</span>}
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 mt-2">
                                <label>Gender</label>
                                <select name='gender' onChange={inputData} value={data.gender} className="form-select" aria-label="Default select example">
                                    <option value="">Select</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                                {errors.gender && <span className="text-danger" style={{ fontSize: '14px' }}>{errors.gender}</span>}
                            </div>

                            <div className="col-12 col-sm-12 col-md-12 mt-2">
                                <label>Address</label>
                                <textarea name='address' onChange={inputData} value={data.address} className="form-control" id="exampleFormControlTextarea1" rows="4"></textarea>
                            </div>
                            <div className="col-12 col-sm-12 col-md-12 mt-2">
                                <label>Profession</label>
                                <input name='profession' onChange={inputData} value={data.profession} className="form-control" type="text" />
                            </div>

                            <div className="col-12 col-sm-12 col-md-6 mt-2">
                                <label>Password</label>
                                <input name='password' onChange={inputData} value={data.password} className="form-control" type="password" />
                                {errors.password && <span className="text-danger" style={{ fontSize: '14px' }}>{errors.password}</span>}
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 mt-2">
                                <label>Confirm Password</label>
                                <input name='confirmPassword' onChange={inputData} value={data.confirmPassword} className="form-control" type="password" />
                                {errors.confirmPassword && <span className="text-danger" style={{ fontSize: '14px' }}>{errors.confirmPassword}</span>}
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            isLoading={isLoadingButton}
                            style={{
                                background: '#0054FD',
                                color: '#fff',
                                height: 40,
                                padding: '0px 20px',
                                borderRadius: '10px'
                            }}
                            onClick={handleSubmit}
                            loadingText={'Submitting..'}
                        >
                            Submit
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ApplyForm;
