
'use client'
import React, { useRef, useState } from 'react'
import { Button, useToast } from '@chakra-ui/react'
import axios from 'axios'
import { toast } from 'react-toastify';

export default function AddCourses() {
    const auth = {}
    const token = ''

    const [isLoading, setIsLoading] = useState(false);

    const [data, setData] = useState({
        title: '',
        price: '0',
        description: '',
        image: '',
        validity: '',
        link: ''
    });

    const inputData = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const fileData = (e) => {
        setData({ ...data, image: e.target.files[0] })
    }

    const ref = useRef(null);

    const clearData = () => {
        setData({
            ...data,
            title: '',
            price: '',
            description: '',
            image: '',
            validity: 1
        })
    }

    const submitData = async () => {
        const { title, price, image } = data;
        if (!title) {
            toast.warn('Enter Course title', {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

        } else if (!image) {
            toast.warn('Choose Image', {
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
            setIsLoading(true);
            const formData = new FormData();
            formData.append('image', data.image, data.image.name);
            formData.append('title', data.title);
            formData.append('price', data.price);
            formData.append('description', data.description);
            formData.append('validity', data.validity);
            formData.append('link', data.link);
            try {
                setIsLoading(true);
                await axios.post(`${process.env.REACT_APP_APIURL}/api/admins/add-courses`, formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': token
                        }
                    }
                ).then(response => {
                    setIsLoading(false);
                }).catch(error => {
                    console.log(error)
                });

            } catch (error) {
                setIsLoading(false);
                console.log("Api Call Error", error)
            }
        }
    }


    return (
        <div className='form'>
            <div className='row'>
                <div className='col-12 mt-2 col-sm-6 col-md-4'>
                    <div className='form-group'>
                        <label className='label'>Title <span style={{ color: 'red' }}>*</span></label>
                        <input
                            className='form-control'
                            placeholder={'Course title'}
                            name='title'
                            value={data.title}
                            onChange={inputData}
                        />
                    </div>
                </div>
                <div className='col-12 mt-2 col-sm-6 col-md-4'>
                    <div className='form-group'>
                        <label className='label'> Thumbnail Image<span style={{ color: 'red' }}>*</span></label>
                        <input
                            ref={ref}
                            className='form-control'
                            placeholder={'image'}
                            type='file'
                            name={'image'}
                            onChange={fileData}
                        />
                    </div>
                </div>
                <div className='col-12 mt-2 col-sm-6 col-md-4'>
                    <div className='form-group'>
                        <label className='label'> Price<span style={{ color: 'red' }}>*</span></label>
                        <input
                            className='form-control'
                            placeholder={'₹'}
                            type='number'
                            name='price'
                            value={data.price}
                            onChange={inputData}
                        />
                    </div>
                </div>

                <div className='col-12 mt-2'>
                    <div className='form-group'>
                        <label className='label'>Description </label>
                        <textarea
                            className='form-control'
                            rows={5}
                            placeholder={'Course Description'}
                            name='description'
                            value={data.description}
                            onChange={inputData}
                        />
                    </div>
                </div>
                <div className='col-12 mt-2 col-sm-6 col-md-4'>
                    <div className='form-group'>
                        <label className='label'>Course Link <span style={{ color: 'red' }}>*</span></label>
                        <input
                            className='form-control'
                            placeholder={'Link'}
                            name='link'
                            value={data.link}
                            onChange={inputData}
                        />
                    </div>
                </div>

                <div className='col-12 mt-2 col-sm-6 col-md-4'>
                    <div className='form-group'>
                        <label className='label'>Validity <span style={{ color: 'red' }}>*</span></label>
                        <select name='validity' onChange={inputData} class="form-select mb-3" aria-label="Large select example">
                            <option value="0" selected>No Expire</option>
                            <option value="1">1 Month</option>
                            <option value="3">3 Month</option>
                            <option value="6">6 Month</option>
                            <option value="12">1 Year</option>
                            <option value="24">2 Year</option>
                        </select>
                    </div>
                </div>
            </div>


            <div className='form-footer mt-3'>
                <div> </div>

                <div style={{ display: 'flex', gap: 8 }}>
                    <div>
                        <Button
                            isLoading={false}
                            loadingText={''}
                            colorScheme="gray"
                            onClick={clearData}
                        >Cancel</Button>
                    </div>
                    <div>
                        <Button
                            isLoading={isLoading}
                            onClick={submitData}
                            colorScheme="blue"
                        >Submit</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
