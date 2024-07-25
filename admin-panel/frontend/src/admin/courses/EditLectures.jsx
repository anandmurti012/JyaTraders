import React, { useEffect, useRef, useState } from 'react'
import CustomInput from '../../components/CustomInput'
import './css/styles.css'
import CustomTextArea from '../../components/CustomTextArea'
import CustomButton from '../../components/CustomButton'
import { Button, IconButton, useToast } from '@chakra-ui/react'
import axios from 'axios'
import { useSelector } from 'react-redux';
import { IoClose } from "react-icons/io5";
import { catchError } from '../../services/api'
import { useParams } from 'react-router-dom'

const EditLectures = () => {
    const auth = useSelector((state) => state.auth)
    const token = auth.token
    const { id } = useParams()


    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);

    const [attachments, setAttachments] = useState([]);

    const [data, setData] = useState({
        title: '',
        videoLink: '',
        image: '',
        description: '',
        attachment: ''
    });


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_APIURL}/api/admins/view-single-lectures?id=${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
            });
            if (res.status === 200) {
                setData(res.data.results);
                setAttachments(JSON.parse(res.data.results.attachment))
                setIsLoading(false);
            } else {
                setIsLoading(false);
                toast({
                    title: res.data.msg || 'something went wrong',
                    position: 'top',
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                });
            }
        } catch (error) {
            setIsLoading(false);
            const msg = await catchError(error);
            toast({
                title: msg || 'something went wrong',
                position: 'top',
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
        }
    };



    const inputData = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const [image, setImage] = useState()
    const fileData = (e) => {
        setImage(e.target.files[0])
    }

    const ref = useRef(null);

    const clearData = () => {
        window.history.back()
    }
    // ----------------- Attachment -----------------
    const [files, setFiles] = useState([]);

    const handleFileChange = (e, index) => {
        const newFiles = [...files];
        newFiles[index] = e.target.files[0];
        setFiles(newFiles);
    };

    const [limit, setLimit] = useState(1)
    const handleAddFile = () => {
        const newlimit = limit + 1
        setLimit(newlimit)
        if (limit < 6) {
            setFiles([...files, null]);
        }
    };

    const handleRemoveFile = (index) => {
        const newlimit = limit - 1
        setLimit(newlimit)

        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);
    };

    const submitData = async () => {
        const { title, videoLink } = data;
        if (!title) {
            toast({ title: 'Enter Title', position: "top", status: 'warning', duration: 4000, isClosable: true, });
        } else if (!videoLink) {
            toast({ title: 'Enter videoLink', position: "top", status: 'warning', duration: 4000, isClosable: true, });
        } else {
            setIsLoading(true);
            const formData = new FormData();
            image && (
                formData.append('files', image, image.name)
            )
            files.forEach((file, index) => {
                formData.append(`files`, file);
            });

            formData.append('id', data.id);
            formData.append('title', data.title);
            formData.append('pre_img', data.image);
            formData.append('videoLink', data.videoLink);
            formData.append('description', data.description);

            try {
                setIsLoading(true);
                const res = await axios.post(`${process.env.REACT_APP_APIURL}/api/admins/update-lectures`, formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': token
                        }
                    }
                );

                setIsLoading(false);
                if (res.status === 200) {
                    clearData()
                    // console.log(res.data);
                    toast({ title: res.data.msg, position: "top", status: 'success', duration: 4000, isClosable: true, });

                } else {
                    toast({ title: res.data.msg || 'something went wromg', position: "top", status: 'error', duration: 4000, isClosable: true, });
                }
            } catch (error) {
                setIsLoading(false);
                const msg = await catchError(error);
                toast({ title: msg || 'something went wromg', position: "top", status: 'error', duration: 4000, isClosable: true, });

            }
        }
    }


    const updateAttachment = async () => {
        setIsLoading2(true);
        const formData = new FormData();
        files.forEach((file, index) => {
            formData.append(`files`, file);
        });

        formData.append('id', data.id);
        formData.append('prev_file', data.attachment);

        try {
            setIsLoading2(true);
            const res = await axios.post(`${process.env.REACT_APP_APIURL}/api/admins/update-attachments`, formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': token
                    }
                }
            );

            setIsLoading2(false);
            if (res.status === 200) {
                window.location.reload()
                // console.log(res.data);
                toast({ title: res.data.msg, position: "top", status: 'success', duration: 4000, isClosable: true, });

            } else {
                toast({ title: res.data.msg || 'something went wromg', position: "top", status: 'error', duration: 4000, isClosable: true, });
            }
        } catch (error) {
            setIsLoading2(false);
            const msg = await catchError(error);
            toast({ title: msg || 'something went wromg', position: "top", status: 'error', duration: 4000, isClosable: true, });

        }
    }

    const deleteAttach = async (e, mf) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_APIURL}/api/admins/delete-attachments`, { files: e, attachments: mf, id: id },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    }
                }
            );
            if (res.status === 200) {
                window.location.reload()
                // console.log(res.data);
                toast({ title: res.data.msg, position: "top", status: 'success', duration: 4000, isClosable: true, });

            } else {
                toast({ title: res.data.msg || 'something went wromg', position: "top", status: 'error', duration: 4000, isClosable: true, });
            }
        } catch (error) {
            const msg = await catchError(error);
            toast({ title: msg || 'something went wromg', position: "top", status: 'error', duration: 4000, isClosable: true, });

        }
    }




    return (
        <div className='form'>
            <div className='row'>
                <div className='col-12 col-sm-6 col-md-6'>
                    <div className='form-group'>
                        <label className='label'>Title <span style={{ color: 'red' }}>*</span></label>
                        <CustomInput
                            placeholder={'Lecture title'}
                            name='title'
                            value={data.title}
                            inputData={inputData}
                        />
                    </div>
                </div>
                <div className='col-12 col-sm-6 col-md-6'>
                    <div className='form-group'>
                        <label className='label'>Video Link <span style={{ color: 'red' }}>*</span></label>
                        <CustomInput
                            placeholder='Lecture Video Link'
                            name='videoLink'
                            value={data.videoLink}
                            inputData={inputData}
                        />
                    </div>
                </div>
                <div className='col-12 col-sm-6 col-md-12 mt-3 mb-3' >
                    <div className='form-group' >
                        <label for='select' style={{ cursor: 'pointer' }} >
                            <img
                                src={image ? URL.createObjectURL(image) : `${process.env.REACT_APP_APIURL}/uploads/lectures/${data?.image}`}
                                alt='course-image'
                                style={{ height: 100, width: 100 }}
                            />
                        </label>
                        <input
                            ref={ref}
                            placeholder={'image'}
                            type='file'
                            name={'image'}
                            onChange={fileData}
                            className='form-control'
                        />
                    </div>
                </div>
            </div>

            <div className='row mt-2'>
                <div className='col-12'>
                    <div className='form-group'>
                        <label className='label'>Description </label>
                        <CustomTextArea
                            placeholder={'Course Description'}
                            name='description'
                            value={data.description}
                            inputData={inputData}
                        />
                    </div>
                </div>
            </div>

            <div className='form-footer mt-3'>
                <div>

                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                    <div>
                        <CustomButton
                            title='Cancel'
                            isLoading={false}
                            loadingText={''}
                            colorScheme="gray"
                            buttonClick={clearData}
                        />
                    </div>
                    <div>
                        <CustomButton
                            title='Update'
                            isLoading={isLoading}
                            loadingText={'Updating..'}
                            buttonClick={submitData}
                            colorScheme="blue"
                        />
                    </div>
                </div>
            </div>

            <div className='row mt-2'>
                <div className='col-12'>
                    {attachments?.map((e, index) => (
                        <div key={index}>
                            <div className='mb-2' style={{ display: 'flex', gap: 38 }}  >
                                <div >{e}</div>
                                <IconButton
                                    onClick={() => { deleteAttach(e, attachments) }}
                                    isRound={true}
                                    fontSize='20px'
                                    icon={<IoClose />}
                                />
                            </div>
                        </div>
                    ))}

                    {files.map((file, index) => (
                        <div key={index}>
                            <div className='mb-2'>
                                <input
                                    type="file"
                                    id={`file${index}`}
                                    onChange={(e) => handleFileChange(e, index)}
                                />
                                <IconButton
                                    onClick={() => handleRemoveFile(index)}
                                    isRound={true}
                                    fontSize='20px'
                                    icon={<IoClose />}
                                />
                            </div>
                        </div>
                    ))}

                    {
                        limit === 6 ? ''
                            :
                            <div style={{ display: 'flex', gap: 10 }} className='mt-3 mb-3' >
                                <CustomButton
                                    title='Add Attachment'
                                    buttonClick={handleAddFile}
                                />

                                <CustomButton
                                    title='Save Attachment'
                                    isLoading={isLoading2}
                                    loadingText={'Updating..'}
                                    buttonClick={updateAttachment}
                                    colorScheme="blue"
                                />
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default EditLectures
