'use client'
import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react'
import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const UsrLogin = ({ onClose }) => {

    const router = useRouter()

    const [isLoading, setIsLoading] = useState(false)

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const [data, setData] = useState({
        email: '',
        password: ''
    });
    const inputData = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleSubmit = async () => {
        const { email, password } = data
        if (!email) {
            toast.warn('Enter Email Id', {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } else if (!password) {
            toast.warn('Enter Password', {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } else {
            setIsLoading(true)
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users/login`, data)
                .then(response => {
                    setIsLoading(false)
                    onClose();
                    console.log("res=============>", response);
                    router.push('/users');

                    toast.success(response.data.msg, {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                })
                .catch(error => {
                    setIsLoading(false)
                    toast.error(error.response.data.msg, {
                        position: "top-center",
                        autoClose: 4000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                });
        }
    };
    return (
        <>
            <FormControl>
                <FormLabel>Email</FormLabel>
                <Input ref={initialRef}
                    name="email"
                    value={data.email}
                    onChange={inputData} placeholder='Your Email' />
            </FormControl>

            <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <Input name="password"
                    type="password"
                    value={data.password}
                    onChange={inputData} placeholder='Enter your password'
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSubmit()
                        }
                    }} />
            </FormControl>

            <div style={{ marginTop: '5px', marginLeft: '2px' }} >
                <Link style={{ color: 'blue' }} href={'/forgotpassword'}>Forgot Password?</Link>
            </div>

            <div style={{ marginTop: '30px' }} >
                <Button
                    style={{
                        background: '#0054FD',
                        color: "#fff",
                        height: 42,
                        padding: '0px 25px',
                        borderRadius: '100px',
                        paddingBottom: '2px',
                        width: '100%'
                    }}
                    isLoading={isLoading}
                    loadingText={'Login..'}

                    onClick={handleSubmit} colorScheme='blue'>
                    Login
                </Button>
            </div>
        </>
    )
}

export default UsrLogin