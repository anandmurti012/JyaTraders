// pages/course/[id].js

"use client";
import { useEffect, useState } from 'react';
import styles from './SingleCourse.module.css';
import BreadcrumbComponent from '../../../../../components/BreadcrumbComponent';
import axios from 'axios';
import Image from 'next/image'
import { Button } from '@chakra-ui/react';

const SingleCourse = ({ params }) => {

    const { id } = params;

    const [courses, setCourses] = useState([]);

    const [IsLoading, setIsLoading] = useState(false)
    const fetchData = async () => {
        setIsLoading(true);
        await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/courses?id=${id}`)
            .then(response => {
                setIsLoading(false);
                console.log(response.data.results)
                setCourses(response.data.results)
            }).catch(error => {
                setIsLoading(false);
                console.log('Api Call Error', error)
            });
    }

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <section>
            <BreadcrumbComponent pages={[
                { link: '/admin/courses/view', page: 'Courses', active: true },
                { link: '#', page: 'View Course' }
            ]} />

            <div className={styles.singleCourseContainer}>
                <h1 className={styles.courseTitle}>

                </h1>
                {
                    courses?.image ?
                        <Image
                            src={`/uploads/${courses.image}`}
                            className={``}
                            height={500}
                            width={500}
                        />
                        :
                        'Error Image'
                }
                <p className={styles.courseDescription}>
                    <b>{courses?.title}</b>
                    <br />
                    {courses?.description}
                </p>
                <p className={styles.coursePrice}><strong>Price: {courses?.price}</strong></p>

                <div style={{ display: 'flex', gap: 10 }} >
                    <Button
                        style={{
                            background: '#0054FD',
                            color: "#fff",
                            paddingBottom: '2px',
                            width: '10%',
                            paddingTop: '3px'
                        }}
                        size='sm'
                        colorScheme='blue'>
                        Edit
                    </Button>

                    <Button
                        style={{
                            paddingBottom: '2px',
                            width: '10%',
                            paddingTop: '3px'
                        }}
                        size='sm'
                        colorScheme='red'>
                        Delete
                    </Button>
                </div>

            </div>
        </section>

    );
};

export default SingleCourse;
