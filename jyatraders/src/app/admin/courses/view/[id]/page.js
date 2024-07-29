// pages/course/[id].js

"use client";
import { useEffect, useState } from 'react';
import styles from './SingleCourse.module.css';
import Link from 'next/link'
import BreadcrumbComponent from '../../../../../components/BreadcrumbComponent';

const SingleCourse = ({ params }) => {

    const { id } = params;
    const [course, setCourse] = useState(null);

    useEffect(() => {
        if (id) {
            // Fetch or define your course data here
            const courses = [
                { id: 1, title: 'Course 1', description: 'This is course 1 description', price: '$100', image: 'https://media.istockphoto.com/id/2151904525/photo/young-man-software-developers-using-computer-to-write-code-application-program-for-ai.jpg?s=612x612&w=0&k=20&c=w2LEOfSiSn082gEQ_C_3qbEO9UzdDFGjLNr9c6pYEuw=' },
                { id: 2, title: 'Course 2', description: 'This is course 2 description', price: '$200', image: 'https://media.istockphoto.com/id/1332011346/photo/team-training.jpg?s=612x612&w=0&k=20&c=J_WyIeXJY3HcPr_YakQj1S8uO0iLQkmK-Oi9R_r7hPo=' },
                { id: 3, title: 'Course 3', description: 'This is course 3 description', price: '$300', image: 'https://media.istockphoto.com/id/1024637858/photo/graduate-certificate-program-concept-black-graduation-cap-a-diploma-white-ladder-a-small-book.jpg?s=612x612&w=0&k=20&c=wqFhgaCRBkDpgLmD46GrbyciLbcoYWOCm9rToXTpJGg=' },
                // Add more courses as needed
            ];
            const selectedCourse = courses.find(course => course.id === parseInt(id));
            setCourse(selectedCourse);
        }
    }, [id]);

    if (!course) return <p>Loading...</p>;

    return (
        <section>
            <BreadcrumbComponent pages={[
                { link: '/admin/courses/view', page: 'Courses', active: true },
                { link: '#', page: 'View Course' }
            ]} />

            <div className={styles.singleCourseContainer}>


                <h1 className={styles.courseTitle}>{course.title}</h1>
                <img src={course.image} alt={course.title} className={styles.courseImage} />
                <p className={styles.courseDescription}>{course.description}</p>
                <p className={styles.coursePrice}><strong>Price: {course.price}</strong></p>
                <button className={`btn ${styles.enrollButton}`}>Enroll Now</button>
            </div>
        </section>

    );
};

export default SingleCourse;
