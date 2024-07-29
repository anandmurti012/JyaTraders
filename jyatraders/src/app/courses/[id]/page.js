 // pages/course/[id].js

"use client";
import { useEffect, useState } from 'react';
import styles from './SingleCourse.module.css';
import Link from 'next/link';

const SingleCourse = ({ params }) => {
    const { id } = params;
    const [course, setCourse] = useState(null);
    const [error, setError] = useState(null);

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
            if (selectedCourse) {
                setCourse(selectedCourse);
            } else {
                setError('Course not found');
            }
        }
    }, [id]);

    if (error) return <p>{error}</p>;
    if (!course) return <p>Loading...</p>;

    return (
        <div className={styles.singleCourseContainer}>
            <Link href="/courses" className={styles.backLink}>Back to Courses</Link>
            <h1 className={styles.courseTitle}>{course.title}</h1>
            <img src={course.image} alt={course.title} className={styles.courseImage} />
            <p className={styles.courseDescription}>
                {course.description}
                <br /><br />
                This course is designed to provide an in-depth understanding of the subject matter, with expert instructors guiding you through comprehensive modules. You'll gain hands-on experience and practical skills that can be applied in real-world scenarios.
            </p>
            <p className={styles.coursePrice}><strong>Price: {course.price}</strong></p>
            <button className={`btn ${styles.enrollButton}`}>Enroll Now</button>
        </div>
    );
};

export default SingleCourse;
