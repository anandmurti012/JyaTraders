import React, { useRef, useState } from 'react'
import CustomInput from '../../components/CustomInput'
import './css/styles.css'
import CustomTextArea from '../../components/CustomTextArea'
import CustomButton from '../../components/CustomButton'
import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import { useSelector } from 'react-redux';
import { catchError } from '../../services/api'

const AddCourses = () => {
  const auth = useSelector((state) => state.auth)
  const token = auth.token

  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState({
    title: '',
    price: 0,
    description: '',
    image: '',
    validity: 1
  });

  const inputData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }
  const fileData = (e) => {
    setData({ ...data, image: e.target.files[0] })
  }

  const ref = useRef(null);

  const clearData = () => {
    setData({
      ...data,
      title: '',
      price: '',
      description: '',
      image: '',
      validity: 1
    })
  }

  const submitData = async () => {
    const { title, price, image } = data;
    if (!title) {
      toast({ title: 'Enter Course Title', position: "top", status: 'warning', duration: 4000, isClosable: true, });
    } else if (!image) {
      toast({ title: 'Choose an Image', position: "top", status: 'warning', duration: 4000, isClosable: true, });
    } else {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('image', data.image, data.image.name);
      formData.append('title', data.title);
      formData.append('price', data.price);
      formData.append('description', data.description);
      formData.append('validity', data.validity);

      try {
        setIsLoading(true);
        const res = await axios.post(`${process.env.REACT_APP_APIURL}/api/admins/add-courses`, formData,
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
              placeholder={'Course title'}
              name='title'
              value={data.title}
              inputData={inputData}
            />
          </div>
        </div>
        <div className='col-12 col-sm-6 col-md-4'>
          <div className='form-group'>
            <label className='label'> Thumbnail Image<span style={{ color: 'red' }}>*</span></label>
            <CustomInput
              ref={ref}
              placeholder={'image'}
              type='file'
              name={'image'}
              inputData={fileData}
            />
          </div>
        </div>
        <div className='col-12 col-sm-6 col-md-4'>
          <div className='form-group'>
            <label className='label'>Validity Upto <span style={{ color: 'red' }}>*</span></label>
            <select disabled name='validity' onChange={inputData} className='form-select' >
              <option value={1} >1 Year</option>
              <option value={2}>2 Year</option>
              <option value={3} >3 Year</option>
              <option value={999} >Lifetime</option>
            </select>
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

export default AddCourses
