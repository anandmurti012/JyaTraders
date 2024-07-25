
import React, { useEffect, useRef, useState } from 'react'
import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import { useSelector } from 'react-redux';
import CustomButton from '../../components/CustomButton';
import './form.css'

const CreateSections = () => {
    const auth = useSelector((state) => state.auth)
    const token = auth.token

    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const [sectionsNames, setSectionsNames] = useState([])

    useEffect(() => {
        fetchForms()
    }, [])

    const fetchForms = async () => {
        try {
            await axios.get(`${process.env.REACT_APP_APIURL}/api/admins/get-form-section`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            })
                .then(response => {
                    console.log(response.data)
                    setSectionsNames(response.data.results)
                })
                .catch(error => {
                    toast({ title: `${error?.response?.data?.msg || error?.message}`, position: "top", status: 'error', duration: 4000, isClosable: true, });
                    console.error('There was an error:', error);
                });
        } catch (error) {
            console.log('Api Call Error:', error);
        }
    }

    const [data, setData] = useState({
        title: '',
    });

    const inputData = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const clear = () => {
        setData({ ...data, title: '' })
    }

    const submitData = async () => {
        try {
            const { title } = data
            if (!title) {
                toast({ title: `Enter Form Section Name`, position: "top", status: 'error', duration: 4000, isClosable: true, });
            } else {
                setIsLoading(true)
                await axios.post(`${process.env.REACT_APP_APIURL}/api/admins/create-form-section`, data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    }
                })
                    .then(response => {
                        fetchForms()
                        toast({ title: response.data.msg, position: "top", status: 'success', duration: 4000, isClosable: true, });
                        // console.log(response.data)
                        setData({ ...data, title: '' })
                        setIsLoading(false)
                    })
                    .catch(error => {
                        setIsLoading(false)
                        toast({ title: `${error?.response?.data?.msg || error?.message}`, position: "top", status: 'error', duration: 4000, isClosable: true, });
                        console.error('There was an error:', error);
                    });
            }
        } catch (error) {
            setIsLoading(false)
            console.log('Api Call Error:', error);
        }
    }

    const deleteSection = async (id) => {
        try {
            if (window.confirm('Are you sure to delete?')) {
                await axios.post(`${process.env.REACT_APP_APIURL}/api/admins/delete-form-section`, { id: id }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    }
                })
                    .then(response => {
                        fetchForms()
                        toast({ title: response.data.msg, position: "top", status: 'success', duration: 4000, isClosable: true, });
                    })
                    .catch(error => {
                        toast({ title: `${error?.response?.data?.msg || error?.message}`, position: "top", status: 'error', duration: 4000, isClosable: true, });
                        console.error('There was an error:', error);
                    });
            }
        } catch (error) {
            console.log('Api Call Error:', error);
        }
    }





    return (
        <div>
            <div className='form'>
                <div className='row'>
                    <div className='col-12 col-sm-12 col-md-12'>
                        <div className='form-group'>
                            <label className='label mb-2'>Create Form Section </label>
                            <input
                                type='text'
                                name='title'
                                placeholder='Section name'
                                value={data.title}
                                className='form-control'
                                onChange={inputData}
                            />
                        </div>
                    </div>
                </div>

                <div className='form-footer mt-3'>
                    <div></div>
                    <div style={{ display: 'flex', gap: 8 }}>
                        <div>
                            <CustomButton
                                title='Clear'
                                buttonClick={clear}
                            />
                        </div>
                        <div>
                            <CustomButton
                                title='Create'
                                isLoading={isLoading}
                                loadingText={'Creating..'}
                                buttonClick={submitData}
                                colorScheme="blue"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className=' form mt-3' >
                {
                    sectionsNames.map((e, i) => {
                        return (
                            <div className=' sectionnames'>
                                <div>{i + 1}. {e?.name}</div>
                                <div>
                                    <button onClick={() => { deleteSection(e?.id) }} className='btn btn-danger btn-sm'>Delete</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default CreateSections
