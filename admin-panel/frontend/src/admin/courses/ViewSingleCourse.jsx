import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, CircularProgress, CircularProgressLabel, Image, SimpleGrid, Skeleton, useDisclosure } from '@chakra-ui/react';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { catchError } from '../../services/api';
import { AspectRatio } from '@chakra-ui/react';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
} from '@chakra-ui/react';
import { FaCirclePlay } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

const ViewSingleCourse = () => {
    const auth = useSelector((state) => state.auth);
    const token = auth.token;

    const toast = useToast();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const [course, setCourse] = useState([]);
    const [lectures, setLectures] = useState([]);
    const [showMoreState, setShowMoreState] = useState({});
    const [showMore, setShowMore] = useState(false);

    const handleShowMore = (index) => {
        setShowMoreState(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    useEffect(() => {
        fetchCourseData();
    }, []);

    const fetchCourseData = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_APIURL}/api/admins/view-single-course`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
            });

            if (res.status === 200) {
                setIsLoading(false);
                setCourse(res.data.results);
                if (res?.data?.results?.id) {
                    fetchLecturesData(res.data.results.id);
                }
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

    const fetchLecturesData = async (id) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_APIURL}/api/admins/get-lectures?courseId=${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
            });
            if (res.status === 200) {
                setIsLoading(false);
                setLectures(res.data.results);
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

    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();
    const [deleteId, setDeleteId] = useState();
    const [deleteImage, setDeleteImage] = useState();

    const deleteCourse = async (id, image) => {
        setDeleteId(id);
        setDeleteImage(image);
        onOpen();
    };

    const handelDeleteSubmit = async () => {
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_APIURL}/api/admins/delete-courses?id=${deleteId}&image=${deleteImage}`,
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token,
                    },
                }
            );
            if (res.status === 200) {
                toast({
                    title: res.data.msg,
                    position: 'top',
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                });
                window.history.back();
            } else {
                toast({
                    title: res.data.msg || 'something went wrong 1',
                    position: 'top',
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                });
            }
        } catch (error) {
            const msg = await catchError(error);
            toast({
                title: msg || 'something went wrong 2',
                position: 'top',
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
        }
    };

    const deleteLecture = async (id) => {
        if (window.confirm('Are you sure to delete?')) {
            try {
                const res = await axios.post(
                    `${process.env.REACT_APP_APIURL}/api/admins/delete-lecture?id=${id}`,
                    {},
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: token,
                        },
                    }
                );
                if (res.status === 200) {
                    toast({
                        title: res.data.msg,
                        position: 'top',
                        status: 'success',
                        duration: 4000,
                        isClosable: true,
                    });
                    fetchLecturesData();
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
                const msg = await catchError(error);
                toast({
                    title: msg || 'something went wrong',
                    position: 'top',
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                });
            }
        }
    };


    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress < 100) {
                    return prevProgress + 1;
                } else {
                    clearInterval(interval);
                    return prevProgress;
                }
            });
        }, 50); // Update the progress every 100 milliseconds

        return () => clearInterval(interval); // Clear the interval on component unmount
    }, []);
    return isLoading ? (
        <>
            {/* Skeleton start */}
            <div className='courseDiv'>
                <div className='courseImage'>
                    <AspectRatio maxW='400px' ratio={16 / 9}>
                        <Skeleton>
                            <div>contents wrapped</div>
                            <div>won't be visible</div>
                        </Skeleton>
                    </AspectRatio>
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-12'>
                            <Skeleton style={{ width: '100%', height: 20, marginBottom: 4 }} />
                            <Skeleton style={{ width: '100%', height: 20, marginBottom: 4 }} />
                            <Skeleton style={{ width: '100%', height: 20, marginBottom: 4 }} />
                            <Skeleton style={{ width: '100%', height: 55, marginBottom: 4 }} />

                            <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                                <Skeleton>
                                    <Button colorScheme='teal' size='sm'>
                                        button 1
                                    </Button>
                                </Skeleton>

                                <Skeleton>
                                    <Button colorScheme='blue' size='sm'>
                                        button 2
                                    </Button>
                                </Skeleton>

                                <Skeleton>
                                    <Button colorScheme='red' size='sm'>
                                        button 3
                                    </Button>
                                </Skeleton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='lectures-div'>
                <SimpleGrid columns={1} spacing={5}>
                    <div className='course-card lectures-div0' style={{ padding: '10px', borderRadius: '10px' }} >
                        <div className='lectures-div00'>
                            <div className='lectures-div1'>
                                <div className='lectures-div1-cart1'>
                                    <CircularProgress value={progress} color='green.400'>
                                        <CircularProgressLabel>{progress}%</CircularProgressLabel>
                                    </CircularProgress>
                                </div>
                                <div className='lectures-div1-cart2'>

                                </div>
                            </div>
                        </div>
                        <Skeleton>
                            <Button
                            >
                                Delete Lecture
                            </Button>
                        </Skeleton>
                    </div>
                </SimpleGrid>
            </div>
            {/* Skeleton end */}
        </>
    ) : (
        <>
            {/* Single Course section start */}
            <div className='courseDiv'>
                <div className='courseImage'>
                    <AspectRatio maxW='400px' ratio={16 / 9}>
                        <Image
                            src={`${process.env.REACT_APP_APIURL}/uploads/courses/${course?.image}`}
                            alt='image-not-found'
                            objectFit='cover'
                        />
                    </AspectRatio>
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-12'>
                            <div style={{ fontWeight: 700, padding: '0px 5px' }}>{course?.title}</div>
                            <div style={{ padding: '0px 5px' }} className='pb-1'>
                                Validity: <b style={{ color: 'gray' }} >Every End of the year, 31 December.</b>
                            </div>
                            {course?.description && (
                                <div style={{ padding: '0px 5px' }} className='pb-1 mb-3'>
                                    Description:
                                    <span
                                        style={{
                                            padding: '0px 4px',
                                            whiteSpace: 'pre-wrap',
                                            wordWrap: 'break-word',
                                        }}
                                    >
                                        {showMore ? course?.description : `${course?.description.substring(0, 200)}`}
                                        {course?.description.length > 200 && (
                                            <>
                                                <button onClick={() => { setShowMore(!showMore) }} style={{ color: 'green' }}>
                                                    {showMore ? ' Show Less' : '.. Show More'}
                                                </button>
                                            </>
                                        )}
                                    </span>
                                </div>
                            )}
                            {
                                course ?
                                    <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                                        <Button leftIcon={<IoMdAdd />} onClick={() => navigate(`/addLectures/${course?.id}`)} colorScheme='teal' size='sm'>
                                            Add Lectures
                                        </Button>
                                        <Button leftIcon={<FaEdit />} onClick={() => navigate(`/editCourse/${course?.id}`)} colorScheme='blue' size='sm'>
                                            Edit
                                        </Button>
                                        <Button leftIcon={<MdDelete />} onClick={() => deleteCourse(course?.id, course?.image)} colorScheme='red' size='sm'>
                                            Delete
                                        </Button>


                                        {/* Pop-up section start*/}
                                        <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
                                            <AlertDialogOverlay>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>Delete Course</AlertDialogHeader>

                                                    <AlertDialogBody>
                                                        Are you sure you want to delete this course? All lectures will be deleted.
                                                    </AlertDialogBody>

                                                    <AlertDialogFooter>
                                                        <Button ref={cancelRef} onClick={onClose}>
                                                            Cancel
                                                        </Button>
                                                        <Button colorScheme='red' onClick={handelDeleteSubmit} ml={3}>
                                                            Delete
                                                        </Button>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialogOverlay>
                                        </AlertDialog>
                                        {/* Pop-up section end */}
                                    </div>
                                    :
                                    <p style={{ color: 'red', fontWeight: '700' }} >In Valid Course / Not Available</p>
                            }

                        </div>
                    </div>
                </div>
            </div>


            {/* Single Course section end */}

            {/* View Lectures of Single courses section start */}
            <div className='lectures-div'>
                <SimpleGrid columns={1} spacing={5}>
                    {lectures?.length > 0 ? (
                        lectures.map((item, index) => (
                            <>
                                <div className='course-card lectures-div0' style={{ padding: '10px', borderRadius: '10px' }} key={item.id}>
                                    <div className='lectures-div00'>
                                        <div className='lectures-div1'>
                                            <div className='lectures-div1-cart1 col-md-2'>
                                                <Image
                                                    src={`${process.env.REACT_APP_APIURL}/uploads/lectures/${item?.image}`}
                                                    alt='lecture'
                                                    objectFit='cover'
                                                    className='lectures-image'
                                                />
                                            </div>
                                            <div className='lectures-div1-cart2'>
                                                <span style={{ fontWeight: '500' }}>
                                                    {index + 1}. {item?.title}
                                                </span>
                                                <div style={{ padding: '0px 5px' }} className='pb-1 mb-3'>
                                                    Description:
                                                    <span
                                                        style={{
                                                            padding: '0px 4px',
                                                            whiteSpace: 'pre-wrap',
                                                            wordWrap: 'break-word',

                                                        }}
                                                    >
                                                        {showMoreState[index] ? item?.description : `${item?.description.substring(0, 200)}`}
                                                        {item?.description.length > 200 && (
                                                            <button onClick={() => handleShowMore(index)} style={{ color: 'green' }}>
                                                                {showMoreState[index] ? ' Show Less' : '.. Show More'}
                                                            </button>
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className='lectures-delete' style={{ display: 'flex', gap: 5 }}>
                                            <Button
                                                onClick={() => { navigate(`/editLectures/${item.id}`) }}
                                                colorScheme='red'
                                                style={{ fontSize: '10px', background: '#3182CE' }}
                                                size='xs'
                                            >
                                                Edit Lecture
                                            </Button>
                                            <Button
                                                onClick={() => deleteLecture(item.id)}
                                                colorScheme='red'
                                                style={{ fontSize: '10px' }}
                                                size='xs'
                                            >
                                                Delete Lecture
                                            </Button>

                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px' }} >
                                            <Button

                                                onClick={() => { navigate(`/viewPlayList/${course.id}`) }}
                                                leftIcon={<FaCirclePlay color='#223555' />}>
                                                Play
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ))
                    ) : (
                        'No Lectures Available.'
                    )}
                </SimpleGrid>
            </div>
            {/* View Lectures of Single courses section end */}
        </>
    );
};

export default ViewSingleCourse;
