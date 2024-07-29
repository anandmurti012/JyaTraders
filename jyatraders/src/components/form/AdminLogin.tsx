'use client'
import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react'
import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation'


const AdminLogin = ({ onClose }) => {

    const router = useRouter()

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const [data, setData] = useState({
        email: 'jyatrades@gmail.com',
        password: 'jya@admin'
    });
    const inputData = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async () => {
        try {
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
                await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/login`, data)
                    .then(response => {
                        // console.log("res=============>", response);
                        onClose();
                        setIsLoading(false)
                        router.push('/admin')

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
                        onClose();
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
        } catch (error) {
            console.log(error)
            onClose();
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
                    onChange={inputData} placeholder='Enter your password' />
            </FormControl>

            <div style={{ marginTop: '30px' }} >
                <Button
                    isLoading={isLoading}
                    loadingText={'Login..'}
                    style={{
                        background: '#0054FD',
                        color: "#fff",
                        height: 42,
                        padding: '0px 25px',
                        borderRadius: '100px',
                        paddingBottom: '2px',
                        width: '100%'
                    }}

                    onClick={handleSubmit} colorScheme='blue'>
                    Login
                </Button>
            </div>
        </>
    )
}

export default AdminLogin