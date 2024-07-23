 "use client"
import React, { useState } from 'react';
import { Offcanvas, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEye } from '@fortawesome/free-solid-svg-icons';
import styles from './CourseSection.module.css';

const CourseSection = () => {
  const [show, setShow] = useState(false);
  const [activeTab, setActiveTab] = useState('view-courses');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    handleClose();
  };

  return (
    <>
    <div className='container'>
      <Button variant="primary" onClick={handleShow} className="mt-3">
        Toggle Sidebar
      </Button>
    </div>

      <Offcanvas show={show} onHide={handleClose} className="offcanvas-start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Courses</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className={styles.sidebarList}>
            <li>
              <button className={styles.sidebarButton} onClick={() => handleTabClick('add-courses')}>
                <FontAwesomeIcon icon={faPlus} /> Add Courses
              </button>
            </li>
            <li>
              <button className={styles.sidebarButton} onClick={() => handleTabClick('view-courses')}>
                <FontAwesomeIcon icon={faEye} /> View Courses
              </button>
            </li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
<div className='container'>
      <div className={styles.content}>
        <div className={activeTab === 'add-courses' ? `${styles.tabContent} ${styles.tabContentActive}` : styles.tabContent} id="add-courses">
          Add Courses Content
        </div>
        <div className={activeTab === 'view-courses' ? `${styles.tabContent} ${styles.tabContentActive}` : styles.tabContent} id="view-courses">
          View Courses Content
        </div>
      </div>
</div>
    </>
  );
}

export default CourseSection;
