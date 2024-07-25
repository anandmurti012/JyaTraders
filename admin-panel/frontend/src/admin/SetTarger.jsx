// import React from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import axios from 'axios';

// const SetTarget = () => {
//   const formik = useFormik({
//     initialValues: {
//       MDRT: '',
//       COT: '',
//       TOT: ''
//     },
//     validationSchema: Yup.object({
//       MDRT: Yup.string().required('Required'),
//       COT: Yup.string().required('Required'),
//       TOT: Yup.string().required('Required')
//     }),
//     onSubmit: (values) => {
//       // Replace the URL with your actual backend endpoint
//       axios.post('https://your-backend-api.com/save', values)
//         .then(response => {
//           console.log('Data saved successfully:', response.data);
//         })
//         .catch(error => {
//           console.error('There was an error saving the data:', error);
//         });
//     }
//   });

//   return (
//     <div style={styles.container} className='mt-5'>
//       <div style={styles.label}>In Rupees</div>
//       <form onSubmit={formik.handleSubmit} style={styles.form}>
//         <div style={styles.formGroup}>
//           <label style={styles.labelInput}>
//             MDRT:
//             <input
//               type="text"
//               name="MDRT"
//               value={formik.values.MDRT}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               style={styles.input}
//             />
//           </label>
//           {formik.touched.MDRT && formik.errors.MDRT ? (
//             <div style={styles.error}>{formik.errors.MDRT}</div>
//           ) : null}
//         </div>
//         <div style={styles.formGroup}>
//           <label style={styles.labelInput}>
//             COT:
//             <input
//               type="text"
//               name="COT"
//               value={formik.values.COT}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               style={styles.input}
//             />
//           </label>
//           {formik.touched.COT && formik.errors.COT ? (
//             <div style={styles.error}>{formik.errors.COT}</div>
//           ) : null}
//         </div>
//         <div style={styles.formGroup}>
//           <label style={styles.labelInput}>
//             TOT:
//             <input
//               type="text"
//               name="TOT"
//               value={formik.values.TOT}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               style={styles.input}
//             />
//           </label>
//           {formik.touched.TOT && formik.errors.TOT ? (
//             <div style={styles.error}>{formik.errors.TOT}</div>
//           ) : null}
//         </div>
//         <button type="submit" style={styles.button}>Save</button>
//       </form>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     position: 'relative',
//     padding: '20px',
//     border: '1px solid #ccc',
//     borderRadius: '8px',
//     width: '500px',
//     margin: '0 auto',
//     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
//   },
//   label: {
//     position: 'absolute',
//     top: '10px',
//     right: '20px',
//     fontSize: '16px',
//     color:'green'
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//   },
//   formGroup: {
//     marginBottom: '15px'
//   },
//   labelInput: {
//     display: 'block',
//     marginBottom: '5px',
//     fontSize: '18px',
//     color: '#333',
//     fontWeight:'bold'
//   },
//   input: {
//     width: '100%',
//     padding: '8px',
//     borderRadius: '4px',
//     border: '1px solid #ccc',
//     fontSize: '14px'
//   },
//   button: {
//     padding: '10px',
//     borderRadius: '4px',
//     border: 'none',
//     backgroundColor: '#007bff',
//     color: '#fff',
//     fontSize: '14px',
//     cursor: 'pointer'
//   },
//   error: {
//     color: 'red',
//     fontSize: '12px'
//   }
// };

// export default SetTarget;


import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/react';
import './settarget.css'
import { useSelector } from 'react-redux';
import Loading from '../components/Loading';


const SetTarget = () => {

  const auth = useSelector((state) => state.auth)
  const token = auth.token
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [target, setTarget] = useState();
  const [newTarget, setNewTarget] = useState({
    id: '',
    mdrt: '',
    cot: '',
    tot: ''
  });

  const inputData = (e) => {
    setNewTarget({ ...newTarget, [e.target.name]: e.target.value })
  }
  console.log(newTarget)
  useEffect(() => {
    fetchTargets();
  }, []);

  const fetchTargets = async () => {
    setIsLoading(true)
    await axios.get(`${process.env.REACT_APP_APIURL}/api/admins/get-targets`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    })
      .then(response => {
        setIsLoading(false);
        setTarget(response?.data?.results);
        setNewTarget({
          ...newTarget,
          id: response?.data?.results?.id,
          mdrt: response?.data?.results?.mdrt,
          cot: response?.data?.results?.cot,
          tot: response?.data?.results?.tot
        })
        // console.log('successfully get:', response.data);
      })
      .catch(error => {
        setIsLoading(false)
        toast({ title: `${error?.message || error?.response?.data?.msg}`, position: "top", status: 'error', duration: 4000, isClosable: true, });
        console.error('There was an error saving the data:', error);
      });
  }

  const updateTargets = async () => {
    setIsLoadingButton(true)
    await axios.patch(`${process.env.REACT_APP_APIURL}/api/admins/update-target`, newTarget, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    })
      .then(response => {
        setIsLoadingButton(false);
        console.log('successfully Updated');
        setTarget({
          ...target,
          mdrt: newTarget?.mdrt,
          cot: newTarget?.cot,
          tot: newTarget?.tot
        });
        onClose()
      })
      .catch(error => {
        setIsLoadingButton(false)
        toast({ title: `${error?.message || error?.response?.data?.msg}`, position: "top", status: 'error', duration: 4000, isClosable: true, });
        console.error('There was an error saving the data:', error);
      });
  }


  const formik = useFormik({
    initialValues: {
      MDRT: '',
      COT: '',
      TOT: ''
    },
    validationSchema: Yup.object({
      MDRT: Yup.string().required('Required'),
      COT: Yup.string().required('Required'),
      TOT: Yup.string().required('Required')
    }),
    onSubmit: async (values) => {
      // Replace the URL with your actual backend endpoint
      setIsLoadingButton(true)
      await axios.post(`${process.env.REACT_APP_APIURL}/api/admins/set-target`, values, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })
        .then(response => {
          setIsLoadingButton(false)
          toast({ title: `${response?.data?.msg}`, position: "top", status: 'success', duration: 4000, isClosable: true, });

          fetchTargets();
          // console.log('Data saved successfully:');
        })
        .catch(error => {
          setIsLoadingButton(false)
          toast({ title: `${error?.message || error?.response?.data?.msg}`, position: "top", status: 'error', duration: 4000, isClosable: true, });
          console.error('There was an error saving the data:', error);
        });
    }
  });

  return (
    isLoading ?
      <Loading />
      :
      <>
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update Target</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel style={{ marginBottom: 0 }}>MDRT</FormLabel>
                <Input
                  value={newTarget.mdrt}
                  onChange={inputData}
                  name='mdrt'
                  placeholder='₹'
                  type='number'
                />
              </FormControl>

              <FormControl mt={2}>
                <FormLabel style={{ marginBottom: 0 }}>COT</FormLabel>
                <Input
                  value={newTarget.cot}
                  onChange={inputData}
                  name='cot'
                  placeholder='₹'
                  type='number'
                />
              </FormControl>

              <FormControl mt={2} >
                <FormLabel style={{ marginBottom: 0 }}>TOT</FormLabel>
                <Input
                  value={newTarget.tot}
                  onChange={inputData}
                  name='tot'
                  placeholder='₹'
                  type='number'
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                onClick={updateTargets}
                style={styles.button}
                isLoading={isLoadingButton}
                loadingText='Updating..'
                colorScheme='blue'
                mr={3}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {
          target ?
            <div className='form' >
              <div class="row column1">
                <div class="col-md-12">
                  <div class="white_shd full margin_bottom_30">
                    <div class="full graph_head">
                      <div class="heading1 margin_0">
                        <h4> <small>Targets</small></h4>
                      </div>
                    </div>
                    <div class="full price_table padding_infor_info">
                      <div class="row">
                        <div class="col-lg-12">
                          <div class="table-responsive-sm">
                            <table class="table table-striped projects">
                              <thead class="thead-dark">
                                <tr>
                                  <th>Updated On</th>
                                  <th>MDRT</th>
                                  <th>COT</th>
                                  <th>TOT</th>
                                  {/* <th>Status</th> */}
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>{target?.updatedAt}</td>
                                  <td>₹ {target?.mdrt}</td>
                                  <td>₹ {target?.cot}</td>
                                  <td>₹ {target?.tot}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- end row --> */}

                <div style={{ display: 'flex', justifyContent: 'space-between' }} >
                  <div>
                  </div>
                  <Button onClick={onOpen} style={{ fontWeight: '600' }} >
                    Update Target
                  </Button>
                </div>
              </div>
            </div>
            :
            <div className='mt-5 targetContainer' >
              <div style={styles.label}>₹ INR</div>
              <form onSubmit={formik.handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                  <label style={styles.labelInput}>
                    MDRT
                    <input
                      type="number"
                      className='form-control'
                      placeholder='₹'
                      name="MDRT"
                      value={formik.values.MDRT}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      style={styles.input}
                    />
                  </label>
                  {formik.touched.MDRT && formik.errors.MDRT ? (
                    <div style={styles.error}>{formik.errors.MDRT}</div>
                  ) : null}
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.labelInput}>
                    COT
                    <input
                      type="number"
                      className='form-control'
                      placeholder='₹'
                      name="COT"
                      value={formik.values.COT}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      style={styles.input}
                    />
                  </label>
                  {formik.touched.COT && formik.errors.COT ? (
                    <div style={styles.error}>{formik.errors.COT}</div>
                  ) : null}
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.labelInput}>
                    TOT
                    <input
                      type="number"
                      className='form-control'
                      placeholder='₹'
                      name="TOT"
                      value={formik.values.TOT}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      style={styles.input}
                    />
                  </label>
                  {formik.touched.TOT && formik.errors.TOT ? (
                    <div style={styles.error}>{formik.errors.TOT}</div>
                  ) : null}
                </div>
                <Button
                  style={styles.button}
                  type="submit"
                  isLoading={isLoadingButton}
                  loadingText='Saving..'
                >
                  Save
                </Button>
              </form>
            </div>
        }
      </>
  );
};

const styles = {
  label: {
    position: 'absolute',
    top: '10px',
    right: '20px',
    fontSize: '16px',
    color: 'green'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '15px'
  },
  labelInput: {
    display: 'block',
    marginBottom: '5px',
    fontSize: '18px',
    color: '#333',
    fontWeight: '500'
  },
  input: {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '14px'
  },
  button: {
    padding: '10px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '14px',
    cursor: 'pointer'
  },
  error: {
    color: 'red',
    fontSize: '12px'
  }
};

export default SetTarget;
