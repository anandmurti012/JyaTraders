import React, { useEffect, useState } from 'react'
import { Box, Image, SimpleGrid } from '@chakra-ui/react'
import axios from 'axios'
import { useToast } from '@chakra-ui/react'
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { catchError } from '../../services/api';
import Loading from '../../components/Loading';
import { AspectRatio } from '@chakra-ui/react'

const ViewCourses = () => {
  const auth = useSelector((state) => state.auth)
  const token = auth.token

  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true)

  const [courses, setCourses] = useState([]);

  // console.log(courses);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_APIURL}/api/admins/view-courses`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          }
        }
      );
      if (res.status === 200) {
        setIsLoading(false);
        setCourses(res.data.results)
      } else {
        setIsLoading(false);
        toast({ title: res.data.msg || 'something went wromg', position: "top", status: 'error', duration: 4000, isClosable: true, });
      }
    } catch (error) {
      setIsLoading(false);
      const msg = await catchError(error);
      toast({ title: msg || 'something went wromg', position: "top", status: 'error', duration: 4000, isClosable: true, });

    }
  }



  return (
    isLoading ?
      <Loading />
      :
      <SimpleGrid columns={4} spacing={10}>

        {
          courses.map((item, index) => {
            return (
              <NavLink to={`/viewSingleCourse/${item.id}`} >
                <div className='course-card'>
                  <AspectRatio maxW='400px' ratio={4 / 2}>
                    <Image src={`${process.env.REACT_APP_APIURL}/uploads/courses/${item.image}`} alt='naruto' objectFit='cover' />
                  </AspectRatio>
                  <div className='mt-2'>
                    <div className='course-title' style={{ fontWeight: 500 }} > {item.title}</div>
                    <div style={{ padding: "0px 5px" }} className='pb-1' >Price: ₹{item.price} /-</div>
                  </div>
                </div>
              </NavLink>
            )
          })
        }

      </SimpleGrid>
  )
}

export default ViewCourses
