import React, { useEffect, useRef, useState } from 'react'
import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import { useSelector } from 'react-redux';
import CustomButton from '../../components/CustomButton';
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
} from '@chakra-ui/react'
import { NavLink } from 'react-router-dom';
import { saveAs } from 'file-saver';

const UploadForms = () => {
    const auth = useSelector((state) => state.auth)
    const token = auth.token

    const toast = useToast();

    const [sectionsNames, setSectionsNames] = useState([])
    const [formData, setFormData] = useState([])

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
                    // console.log(response.data)
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

    const [isLoading2, setIsLoading2] = useState(false);
    const [form, setForm] = useState({
        title: '',
        file: '',
        selectItem: ''
    });

    const inputData2 = (e) => {
        console.log(e.target)
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const clear2 = () => {
        // setForm({ ...form, title: '' })
        window.location.reload()
    }

    const fileData = (e) => {
        setForm({ ...form, file: e.target.files[0] })
    }


    const submitDataForm = async () => {
        try {
            const { title, file, selectItem } = form
            if (!selectItem) {
                toast({ title: `Select Form section`, position: "top", status: 'error', duration: 4000, isClosable: true, });
            } else if (!title) {
                toast({ title: `Enter Form Name`, position: "top", status: 'error', duration: 4000, isClosable: true, });
            } else if (!file) {
                toast({ title: `Choose File`, position: "top", status: 'error', duration: 4000, isClosable: true, });
            } else {
                setIsLoading2(true)
                const formData = new FormData()
                formData.append('title', title)
                formData.append('file', file, file.name)
                formData.append('sectionId', selectItem)

                await axios.post(`${process.env.REACT_APP_APIURL}/api/admins/upload-form`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': token
                    }
                })
                    .then(response => {
                        setForm({ ...form, title: '' })
                        toast({ title: response.data.msg, position: "top", status: 'success', duration: 4000, isClosable: true, });
                        // console.log(response.data)
                        setIsLoading2(false)
                    })
                    .catch(error => {
                        setIsLoading2(false)
                        toast({ title: `${error?.response?.data?.msg || error?.message}`, position: "top", status: 'error', duration: 4000, isClosable: true, });
                        console.error('There was an error:', error);
                    });
            }
        } catch (error) {
            setIsLoading2(false)
            console.log('Api Call Error:', error);
        }
    }


    const [loadingForms, setLoadingForms] = useState(false)
    const getForms = async (id) => {
        try {
            setLoadingForms(true)
            await axios.get(`${process.env.REACT_APP_APIURL}/api/admins/get-forms?id=${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            })
                .then(response => {
                    setFormData(response.data.results)
                    setLoadingForms(false)
                })
                .catch(error => {
                    setLoadingForms(false)
                    toast({ title: `${error?.response?.data?.msg || error?.message}`, position: "top", status: 'error', duration: 4000, isClosable: true, });
                    console.error('There was an error:', error);
                });
        } catch (error) {
            setLoadingForms(false)
            console.log('Api Call Error:', error);
        }
    }

    const deleteForms = async (id, sid, fileName) => {
        try {
            await axios.post(`${process.env.REACT_APP_APIURL}/api/admins/delete-forms`, { id: id, fileName: fileName }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            })
                .then(response => {
                    getForms(sid)
                })
                .catch(error => {
                    setLoadingForms(false)
                    toast({ title: `${error?.response?.data?.msg || error?.message}`, position: "top", status: 'error', duration: 4000, isClosable: true, });
                    console.error('There was an error:', error);
                });
        } catch (error) {
            setLoadingForms(false)
            console.log('Api Call Error:', error);
        }
    }

    const handleDownload = (url, filename) => {
        axios.get(url, { responseType: 'blob' })
            .then((res) => {
                saveAs(res.data, filename);
            });
    };



    return (
        <div>
            {/* UPLOAD FORMS */}

            <div className='form mt-4'>
                <label className='label mb-3'>Upload Form </label>
                <div className='row'>
                    <div className='col-12 col-sm-12 col-md-4'>
                        <div className='form-group'>
                            <select name='selectItem' onChange={inputData2} className='form-select' >
                                <option value='' >Select Section</option>
                                {
                                    sectionsNames.map((e, i) => {
                                        return (
                                            <option key={i} value={e?.id} >{e.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className='col-12 col-sm-12 col-md-5'>
                        <div className='form-group'>

                            <input
                                type='text'
                                name='title'
                                placeholder='Enter form name'
                                value={form.title}
                                className='form-control'
                                onChange={inputData2}
                            />
                        </div>
                    </div>
                    <div className='col-12 col-sm-12 col-md-3'>
                        <div className='form-group'>
                            <input
                                type='file'
                                name='file'
                                className='form-control'
                                onChange={fileData}
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
                                buttonClick={clear2}
                            />
                        </div>
                        <div>
                            <CustomButton
                                title='upload'
                                isLoading={isLoading2}
                                loadingText={'uploading..'}
                                buttonClick={submitDataForm}
                                colorScheme="blue"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <main className="form mt-3">
                <h5 className='text-center' style={{ background: 'blue', color: '#fff', padding: '5px 0px' }}>LIC Forms</h5>
                <div class="accordion accordion-flush" id="accordionFlushExample">
                    <div class="accordion-item">
                        <Accordion allowToggle>
                            {
                                sectionsNames.map((e, index) => {
                                    return (
                                        <>
                                            <AccordionItem key={index} className='AccordionItem'>
                                                {({ isExpanded }) => (
                                                    <>
                                                        <NavLink style={{ textDecoration: 'none' }} onClick={() => getForms(e?.id)} >
                                                            <AccordionButton>
                                                                <Box as='span' flex='1' textAlign='left'>
                                                                    {e?.name}
                                                                </Box>
                                                                {isExpanded ? (
                                                                    <i class="fa-solid fa-minus"></i>
                                                                ) : (
                                                                    <i class="fa-solid fa-plus"></i>
                                                                )}
                                                            </AccordionButton>
                                                        </NavLink>
                                                        <AccordionPanel className='AccordionPanel'>
                                                            <table className="table table-striped" style={{ border: 'none' }} >
                                                                <tbody>
                                                                    {
                                                                        loadingForms ?
                                                                            <div class="spinner-border text-primary" role="status">
                                                                                <span class="visually-hidden">Loading...</span>
                                                                            </div>
                                                                            :
                                                                            formData.length === 0 ?
                                                                                <span style={{ fontSize: '12px' }} >No Forms Available</span>
                                                                                :
                                                                                formData?.map((item, index) => {
                                                                                    return (
                                                                                        <tr key={index} >
                                                                                            <th scope="row">
                                                                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: "center" }} >
                                                                                                    <NavLink onClick={() => handleDownload(`${process.env.REACT_APP_APIURL}/uploads/forms/${item?.file}`, item?.file)} className='text-muted' >
                                                                                                        {item?.name}
                                                                                                    </NavLink>

                                                                                                    <button onClick={() => { deleteForms(item?.id, e?.id, item?.file); }} className='btn btn-danger btn-sm' >
                                                                                                        Delete
                                                                                                    </button>
                                                                                                </div>
                                                                                            </th>
                                                                                        </tr>
                                                                                    )
                                                                                })
                                                                    }
                                                                </tbody>
                                                            </table>
                                                        </AccordionPanel>
                                                    </>
                                                )}
                                            </AccordionItem>
                                        </>
                                    )
                                })
                            }
                        </Accordion>
                    </div>
                </div>
                <h5 className='text-center' style={{ background: 'blue', color: '#fff', padding: '5px 0px' }}></h5>
            </main>
        </div>
    )
}

export default UploadForms
