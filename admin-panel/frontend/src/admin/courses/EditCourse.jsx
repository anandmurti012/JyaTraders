import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Input, Textarea, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { catchError } from '../../services/api';
import Loading from '../../components/Loading';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';

const EditCourse = () => {
    const { id } = useParams();
    const auth = useSelector((state) => state.auth);
    const token = auth.token;


    const toast = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [course, setCourse] = useState({
        title: '',
        price: '',
        description: '',
        image: '',
        file: ''
    });

    const fileData = (e) => {
        // console.log(e.target.files);
        setCourse({ ...course, file: e.target.files[0] })
    }
    console.log(course)

    useEffect(() => {
        fetchCourseData();
    }, []);

    const fetchCourseData = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_APIURL}/api/admins/view-single-course?id=${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
            });
            if (res.status === 200) {
                setCourse(res.data.results);
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCourse({ ...course, [name]: value });
    };

    const [isButtonLoading, setIsButtonLoading] = useState(false)

    const handleUpdateCourse = async () => {
        try {
            setIsButtonLoading(true);
            const formData = new FormData();
            formData.append('oldimage', course?.image);

            if (course?.file) {
                formData.append('image', course?.file, course?.file?.name);
            }

            formData.append('title', course.title);
            formData.append('price', course.price);
            formData.append('description', course.description);

            const res = await axios.post(`${process.env.REACT_APP_APIURL}/api/admins/update-course?id=${id}`, formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: token,
                    }
                }
            );
            setIsButtonLoading(false);
            if (res.status === 200) {
                toast({
                    title: 'Course updated successfully',
                    position: 'top',
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                });
                navigate(`/viewSingleCourse`);
            } else {
                toast({
                    title: res.data.msg || 'something went wrong',
                    position: 'top',
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                });
            }
        } catch (error) {
            setIsButtonLoading(false);
            console.log(error)
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

    return isLoading ? (
        <Loading />

    ) : (
        <div className='form mt-5' style={styles.container}>
            <h3 className='mb-3'>Edit Course</h3>
            <div>
                <Input
                    placeholder='Course Title'
                    value={course.title}
                    name='title'
                    onChange={handleInputChange}
                    mb={3}
                />
                <Input
                    placeholder='Price'
                    value={parseInt(course.price)}
                    name='price'
                    onChange={handleInputChange}
                    mb={3}
                    type='number'
                />
                <Textarea
                    placeholder='Description'
                    value={course.description}
                    name='description'
                    onChange={handleInputChange}
                    mb={3}
                />

                <label  for='select' style={{ cursor: 'pointer' }} >
                    <img
                        src={course.file ? URL.createObjectURL(course.file) : `${process.env.REACT_APP_APIURL}/uploads/courses/${course.image}`}
                        alt='course-image'
                        style={{ height: 200, width: 350 }}
                    />
                </label>

                <input
                    id='select'
                    type='file'
                    name={'file'}
                    onChange={fileData}
                    hidden
                />
                <div style={{display:'flex',gap:10}} >
                    <CustomButton
                        title='Update'
                        isLoading={isButtonLoading}
                        loadingText={'Updating..'}
                        buttonClick={handleUpdateCourse}
                        colorScheme='teal'
                    />
                    <CustomButton
                        buttonClick={() => { navigate('/viewSingleCourse') }}
                        title='Cancel'
                    />
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        position: 'relative',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        width: '1000px',
        margin: '0 auto',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    },
    label: {
        fontWeight: 'bold',
        fontSize: '20px',
        marginBottom: '10px'
    }
}

export default EditCourse;
