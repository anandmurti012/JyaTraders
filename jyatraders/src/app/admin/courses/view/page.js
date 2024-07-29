"use client";
import React, { useState, useEffect } from 'react';
import styles from './CoursesSection.module.css';
import Link from 'next/link'
import BreadcrumbComponent from '../../../../components/BreadcrumbComponent';
import axios from 'axios';
import Loading from '../../../../components/Loading';
import Image from 'next/image'
export default function CoursesSection() {
    const [courses, setCourses] = useState([]);

    const [IsLoading, setIsLoading] = useState(false)
    const fetchData = async () => {
        setIsLoading(true);
        await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/courses`,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': ''
                }
            }
        ).then(response => {
            setIsLoading(false);
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
        IsLoading ?
            <>
                <Loading />
            </>
            :
            <section >
                <BreadcrumbComponent pages={[
                    { link: '/admin', page: 'Dashboard', active: true },
                    { link: '#', page: 'Courses' }
                ]} />

                <div className={styles.container}>
                    <h1 className={styles.heading}> </h1>
                    <div className="row">
                        {courses.map(course => (
                            <div key={course.id} className="col-md-4 mb-4">
                                <Link href={`/admin/courses/view/${course.id}`} className='textDecor'>
                                    <div className={`card ${styles.courseCard}`}>
                                        <div className={styles.cardImageContainer}>
                                            <Image
                                                src={`/uploads/${course.image}`}
                                                className={`card-img-top ${styles.cardImage}`}
                                                height={300}
                                                width={400}
                                            />
                                        </div>
                                        <div className={`card-body ${styles.cardBody}`}>
                                            <h5 className={`card-title ${styles.cardTitle}`}>{course.title}</h5>
                                            <p className={`card-text ${styles.cardText}`}>{course.description}</p>
                                            <p className={`card-text ${styles.cardPrice}`}><strong>Price: {course.price}</strong></p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
    );
};

