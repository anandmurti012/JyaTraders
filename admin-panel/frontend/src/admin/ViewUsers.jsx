import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Tab, Tabs, Button, CircularProgress, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Progress, Stack, TabList, TabPanel, TabPanels, useDisclosure, useToast } from '@chakra-ui/react';
import { formatTime } from '../utils/FormatTime';
import { formatDate } from '../utils/FormatDate';
import Pagination from '../components/Pagination';
import styles from './styles.module.css'
import ActiveDeactiveUsers from './actions/ActiveDeactiveUsers';
import { saveAs } from 'file-saver';


const ViewUsers = () => {

  const auth = useSelector((state) => state.auth)
  const token = auth.token
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(true);

  const [prospects, setProspects] = useState([]);
  const [user, setUser] = useState();


  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);


  const handlePageChange = (page) => {
    setCurrentPage(page);
    getProspects(page);
  }


  const [activeTab, setActiveTab] = useState('appointment');

  const handleSelect = (key) => {
    setActiveTab(key);
    getProspects()
  };


  const [searchTerm, setSearchTerm] = useState('')
  const [subscriptionType, setSubscriptionType] = useState('');
  const [status, setStatus] = useState('');


  // Update the debounced search term after a delay
  useEffect(() => {
    const handler = setTimeout(() => {
      getProspects(0);
    }, 500); // Delay in milliseconds (e.g., 300ms)

    // Cleanup function to clear the timeout if searchTerm changes
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, subscriptionType, status]);

  const searchInput = (e) => {
    setSearchTerm(e.target.value)
    // console.log(e.target.value)
  }

  const handleSubscriptionChange = (e) => {
    setSubscriptionType(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };


  const getProspects = async (page) => {
    try {
      setIsLoading(true)
      await axios.get(`${process.env.REACT_APP_APIURL}/api/admins/get-users?page=${page}&searchTerm=${searchTerm}&subscriptionType=${subscriptionType}&status=${status}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })
        .then(response => {
          console.log(response.data)

          setIsLoading(false)
          setProspects(response.data.results || []);
          setTotalPages(response.data.totalPages)
        })
        .catch(error => {
          setIsLoading(false)
          toast({ title: `${error?.response?.data?.msg || error?.message}`, position: "top", status: 'error', duration: 4000, isClosable: true, });
          console.error('There was an error fetching the data:', error);
        });
    } catch (error) {
      setIsLoading(false)
      console.log('APi call error', error)
    }
  };


  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isloading, setIsloading] = useState(true);
  const [isloadingButton, setIsloadingButton] = useState(false);

  const [selectedData, setSelectedData] = useState(null);

  const saveData = async (data) => {
    setUser(data)
    onOpen()
    setIsloading(false)
  }

  const handlesubmit = async () => {
    try {
      setIsloadingButton(true)
      await axios.post(`${process.env.REACT_APP_APIURL}/api/admins/add-users-subscription`, { userId: user.id, type: selectedData.type }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })
        .then(response => {
          // console.log(response.data)
          setIsloadingButton(false)
          getProspects(currentPage);
        })
        .catch(error => {
          setIsloadingButton(false)
          toast({ title: `${error?.response?.data?.msg || error?.message}`, position: "top", status: 'error', duration: 4000, isClosable: true, });
          console.error('There was an error fetching the data:', error);
        });
    } catch (error) {
      setIsloadingButton(false)
      console.log('APi call error', error)
    }
  }


  const [isLoadingButton, setIsLoadingButton] = useState(false);

  const exportPdf = async (type) => {
    setIsLoadingButton(type)
    await axios.get(`${process.env.REACT_APP_APIURL}/api/admins/get-users-report`, {
      params: { type: type },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      responseType: 'blob',
    })
      .then(response => {
        if (response.data.type === 'application/pdf') {
          setIsLoadingButton(0)
          const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'users-data.pdf');
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
        } else {
          setIsLoadingButton(0)
          const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          saveAs(blob, 'users-data.xlsx');
        }
      })
      .catch(error => {
        setIsLoadingButton(0)
        toast({ title: `${error?.response?.data?.msg || error?.message}`, position: "top", status: 'error', duration: 4000, isClosable: true, });
        console.error('There was an error fetching the data:', error);
      });
  }

  return (
    <div className='form'>
      <div className='row' >
        <div>
        </div>
        <div className='col-sm-12 col-lg-3' >
          <input type='search' onChange={searchInput} placeholder='Name / Email / Mobile' className='form-control' />
        </div>

        <div className='col-sm-12 col-lg-3' >
          <select className='form-select' onChange={handleSubscriptionChange}>
            <option value='' style={{ background: "#eee" }}>Subscription Type</option>
            <option value='special'>Special</option>
            <option value='traditional'>Traditional</option>
          </select>
        </div>


        <div className='col-sm-12 col-lg-3 mb-2'>
          <select className='form-select' onChange={handleStatusChange}>
            <option value='' style={{ background: "#eee" }}>Status</option>
            <option value={1}>Active Users</option>
            <option value={0}>Deactive Users</option>
          </select>
        </div>




        <div className='col-sm-12 col-lg-3'>


          <button onClick={() => { exportPdf('excel') }} className='btn btn-primary mr-2' >
            {
              isLoadingButton === 'excel' ?
                <>
                  <span className="spinner-border spinner-border-sm mr-2" aria-hidden="true"></span>
                  <span role="status">Downloading..</span>
                </>
                :
                'Export Excel'
            }
          </button>
          <button onClick={() => { exportPdf('pdf') }} className='btn btn-danger ' >
            {
              isLoadingButton === 'pdf' ?
                <>
                  <span className="spinner-border spinner-border-sm mr-2" aria-hidden="true"></span>
                  <span role="status">Downloading..</span>
                </>
                :
                'Export PDF'
            }
          </button>
        </div>
      </div>

      {
        activeTab === 'appointment' ?
          isLoading ?
            <div className='mt-2' >
              <Progress size='xs' isIndeterminate sty />
            </div>
            :
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead className={styles.theadDark}>
                  <tr>
                    <th>Id</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Mobile</th>
                    <th>Email</th>
                    <th>Aadhar Id</th>
                    <th>Subscription</th>
                    <th>CreatedAt</th>
                    <th colSpan={2} >Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    prospects.length > 0 ?
                      prospects.map((prospect) => (
                        <tr key={prospect.id}>
                          <td>{prospect.id}</td>
                          <td style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                            <img
                              src={`${process.env.REACT_APP_APIURL}/uploads/users/${prospect.image}`}
                              alt='image'
                              style={{ height: 30, width: 30 }}
                            />
                          </td>
                          <td>{prospect.fullName}</td>
                          <td>{prospect.gender}</td>
                          <td>{prospect.mobile}</td>
                          <td>{prospect.email}</td>
                          <td>{prospect.aadharId}</td>
                          <td style={
                            {
                              background: prospect?.subscriptionType === 'special' ?
                                'green' :
                                prospect?.subscriptionType === 'traditional' ?
                                  'blue' : 'red',
                              color: prospect?.subscriptionType ? 'white' : 'black'
                            }
                          } >{prospect?.subscriptionType ? prospect.subscriptionType : 'Not Active'}</td>
                          <td>{formatDate(prospect.createdAt) + '-' + formatTime(prospect.createdAt)}</td>

                          <td>
                            {
                              prospect?.subscriptionType ?
                                ''
                                :
                                <button
                                  onClick={() => { saveData(prospect) }}
                                  className='btn btn-primary btn-sm' >
                                  <span style={{ display: 'flex', gap: '5px' }} ><span>+</span> <span>Subscription</span></span>
                                </button>
                            }
                          </td>
                          <td>
                            <ActiveDeactiveUsers RefetchData={() => { getProspects(currentPage) }} udata={prospect} />
                          </td>
                        </tr>
                      ))
                      :
                      'No Data Available..'
                  }
                </tbody>
              </table>
              {/* pagination */}
              {
                prospects.length > 0 ?
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                  :
                  ''
              }
            </div>
          :
          ''
      }





      <Modal onClose={() => { setSelectedData(null); onClose() }} size={'md'} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent width="96vw">
          <ModalHeader>Choose Target</ModalHeader>
          <ModalCloseButton />
          {
            isloading ?
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh' }} >
                <CircularProgress size={8} isIndeterminate color='green.300' />
              </div>
              :
              <>
                <ModalBody>
                  <div>
                    <img
                      src={`${process.env.REACT_APP_APIURL}/uploads/users/${user?.image}`}
                      alt='image'
                      style={{ height: 30, width: 30 }}
                    />
                    <div>Name: {user?.fullName}</div>
                    <div>Mobile: {user?.mobile}</div>
                    <div>Email: {user?.email}</div>
                  </div>

                  <Tabs variant='soft-rounded' colorScheme='green'>
                    <TabList style={{ background: '#F5F7F8', borderRadius: '10px', marginBottom: 10 }} >
                      <Tab style={{ display: 'none' }} > </Tab>
                    </TabList>
                    <TabList style={{ background: '#F5F7F8', borderRadius: '10px', marginBottom: 10 }} >
                      <Tab onClick={() => { setSelectedData({ type: 'special' }) }} style={{ width: '100%', borderRadius: '10px' }} >
                        Special
                      </Tab>
                    </TabList>
                    <TabList onClick={() => { setSelectedData({ type: 'traditional' }) }} style={{ background: '#F5F7F8', borderRadius: '10px', marginBottom: 10 }}>
                      <Tab style={{ width: '100%', borderRadius: '10px' }} >
                        Traditional
                      </Tab>
                    </TabList>


                    {
                      selectedData && (
                        <p>You are selected plan <b>{selectedData.type} </b> </p>
                      )
                    }
                  </Tabs>
                </ModalBody>
                {
                  selectedData ?
                    <ModalFooter>
                      <Button onClick={() => { handlesubmit() }} isLoading={isloadingButton} loadingText={'Saving..'} style={{ height: 38 }} colorScheme='blue' mr={3}>
                        Submit
                      </Button>
                      <Button style={{ height: 38 }}
                        onClick={
                          () => {
                            setSelectedData(null);
                            onClose()
                          }
                        }>Close</Button>
                    </ModalFooter>
                    :
                    ''
                }
              </>
          }
        </ModalContent>
      </Modal>

    </div>
  )
}

export default ViewUsers;
