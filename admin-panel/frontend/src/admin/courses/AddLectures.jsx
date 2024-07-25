import React, { useRef, useState } from 'react'
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

const AddLectures = () => {
    const auth = useSelector((state) => state.auth)
    const token = auth.token
    const { id } = useParams()


    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const [data, setData] = useState({
        title: '',
        videolink: '',
        image: '',
        description: '',
    });

    const inputData = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const fileData = (e) => {
        setData({ ...data, image: e.target.files[0] })
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
        const { title, videolink, image } = data;
        if (!title) {
            toast({ title: 'Enter Title', position: "top", status: 'warning', duration: 4000, isClosable: true, });
        } else if (!videolink) {
            toast({ title: 'Enter videolink', position: "top", status: 'warning', duration: 4000, isClosable: true, });
        } else if (!image) {
            toast({ title: 'Choose an Image', position: "top", status: 'warning', duration: 4000, isClosable: true, });
        } else {
            setIsLoading(true);
            const formData = new FormData();
            formData.append('files', data.image, data.image.name);
            files.forEach((file, index) => {
                formData.append(`files`, file);
            });           
            formData.append('courseId', id);
            formData.append('title', data.title);
            formData.append('videolink', data.videolink);
            formData.append('description', data.description);

            try {
                setIsLoading(true);
                const res = await axios.post(`${process.env.REACT_APP_APIURL}/api/admins/add-lectures`, formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': token
                        }
                    }
                );

                setIsLoading(false);
                if (res.status === 201) {
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
    return (
        <div className='form'>
            <div className='row'>
                <div className='col-12 col-sm-6 col-md-4'>
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
                <div className='col-12 col-sm-6 col-md-4'>
                    <div className='form-group'>
                        <label className='label'>Video Link <span style={{ color: 'red' }}>*</span></label>
                        <CustomInput
                            placeholder='Lecture Video Link'
                            name='videolink'
                            value={data.videolink}
                            inputData={inputData}
                        />
                    </div>
                </div>
                <div className='col-12 col-sm-6 col-md-4'>
                    <div className='form-group'>
                        <label className='label'> Image<span style={{ color: 'red' }}>*</span></label>
                        <CustomInput
                            ref={ref}
                            placeholder={'image'}
                            type='file'
                            name={'image'}
                            inputData={fileData}
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

            <div className='row mt-2'>
                <div className='col-12'>
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
                            <Button onClick={handleAddFile}>
                                Add Attachment
                            </Button>
                    }
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
                            title='Submit'
                            isLoading={isLoading}
                            loadingText={'Submit..'}
                            buttonClick={submitData}
                            colorScheme="blue"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddLectures
