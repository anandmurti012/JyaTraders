 "use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './CoursesSection.module.css';
import { Link as ChakraLink } from '@chakra-ui/react';

const CoursesSection = () => {
  const [courses, setCourses] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Fetch or define your courses data here
    const fetchedCourses = [
      { id: 1, title: 'Course 1', description: 'This is course 1 description', price: '$100', image: 'https://media.istockphoto.com/id/2151904525/photo/young-man-software-developers-using-computer-to-write-code-application-program-for-ai.jpg?s=612x612&w=0&k=20&c=w2LEOfSiSn082gEQ_C_3qbEO9UzdDFGjLNr9c6pYEuw=' },
      { id: 2, title: 'Course 2', description: 'This is course 2 description', price: '$200', image: 'https://media.istockphoto.com/id/1332011346/photo/team-training.jpg?s=612x612&w=0&k=20&c=J_WyIeXJY3HcPr_YakQj1S8uO0iLQkmK-Oi9R_r7hPo=' },
      { id: 3, title: 'Course 3', description: 'This is course 3 description', price: '$300', image: 'https://media.istockphoto.com/id/1024637858/photo/graduate-certificate-program-concept-black-graduation-cap-a-diploma-white-ladder-a-small-book.jpg?s=612x612&w=0&k=20&c=wqFhgaCRBkDpgLmD46GrbyciLbcoYWOCm9rToXTpJGg=' },
      // Add more courses as needed
    ];
    setCourses(fetchedCourses);
  }, []);

  const handleCourseClick = (id) => {
    router.push(`/course/${id}`);
  };

  return (
    <section className={styles.aboutSection}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Enroll Coursess</h1>
        <div className="row">
          {courses.map(course => (
            <div key={course.id} className="col-md-4 mb-4">
              <ChakraLink className='textDecor' onClick={() => handleCourseClick(course.id)}>
                <div className={`card ${styles.courseCard}`}>
                  <div className={styles.cardImageContainer}>
                    <img src={course.image} className={`card-img-top ${styles.cardImage}`} alt={course.title} />
                  </div>
                  <div className={`card-body ${styles.cardBody}`}>
                    <h5 className={`card-title ${styles.cardTitle}`}>{course.title}</h5>
                    <p className={`card-text ${styles.cardText}`}>{course.description}</p>
                    <p className={`card-text ${styles.cardPrice}`}><strong>Price: {course.price}</strong></p>
                    <button className={`btn ${styles.enrollButton}`}>Enroll Now</button>
                  </div>
                </div>
              </ChakraLink>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
