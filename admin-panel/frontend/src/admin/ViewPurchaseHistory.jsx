
import React, { useEffect, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Badge, Progress, Stack, useToast } from '@chakra-ui/react';
import { formatTime } from '../utils/FormatTime';
import { formatDate } from '../utils/FormatDate';
import Pagination from '../components/Pagination';
import styles from './styles.module.css'
import { saveAs } from 'file-saver';


const ViewPurchaseHistory = () => {

  const auth = useSelector((state) => state.auth)
  const token = auth.token
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(true);

  const [prospects, setProspects] = useState([]);

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


  // Update the debounced search term after a delay
  useEffect(() => {
    const handler = setTimeout(() => {
      getProspects(0);
    }, 500); // Delay in milliseconds (e.g., 300ms)

    // Cleanup function to clear the timeout if searchTerm changes
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, subscriptionType]);

  const searchInput = (e) => {
    setSearchTerm(e.target.value)
    // console.log(e.target.value)
  }

  const handleSubscriptionChange = (e) => {
    setSubscriptionType(e.target.value);
  };


  const getProspects = async (page) => {
    try {
      setIsLoading(true)
      await axios.get(`${process.env.REACT_APP_APIURL}/api/admins/get-paymentHistory?page=${page}&searchTerm=${searchTerm}&subscriptionType=${subscriptionType}`, {
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


  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [isLoadingButton, setIsLoadingButton] = useState(false);

  const exportPdf = async (type) => {
    setIsLoadingButton(type)
    await axios.get(`${process.env.REACT_APP_APIURL}/api/admins/get-subscription-report`, {
      params: { fromDate, toDate, type: type },
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
          link.setAttribute('download', 'subscription-report.pdf');
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
        } else {
          setIsLoadingButton(0)
          const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          saveAs(blob, 'subscription-report.xlsx');
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
        <div className='col-sm-12 col-lg-3 mb-2' >
          <input type='search' onChange={searchInput} placeholder='Search..' className='form-control' />
        </div>

        <div className='col-sm-12 col-lg-2 mb-2' >
          <select className='form-select' onChange={handleSubscriptionChange}>
            <option value='' style={{ background: "#eee" }}>Subscription Type</option>
            <option value='special'>Special</option>
            <option value='traditional'>Traditional</option>
          </select>
        </div>

        <div className='col-sm-12 col-lg-2 mb-2'>
          <div className='calInput'>
            From:
            <input type='date' className='form-control' value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
          </div>
        </div>

        <div className='col-sm-12 col-lg-2 mb-2'>
          <div className='calInput'>
            To:
            <input type='date' className='form-control' max={new Date().toISOString().split('T')[0]} value={toDate} onChange={(e) => setToDate(e.target.value)} />
          </div>
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

      {/* <Tabs activeKey={activeTab} id="prospects-tabs" onSelect={handleSelect}>
        <Tab eventKey="appointment" title="Users"> */}
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
                    <th>Name</th>
                    <th>Mobile</th>
                    <th>Email</th>
                    <th>Aadhar Id</th>
                    <th>Subscription</th>
                    <th>Payment Id</th>
                    <th>Order Id</th>
                    <th>CreatedAt</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    prospects.length > 0 ?
                      prospects.map((prospect) => (
                        <tr key={prospect.id}>
                          <td>{prospect.id}</td>
                          <td>{prospect.fullName}</td>
                          <td>{prospect.mobile}</td>
                          <td>{prospect.email}</td>
                          <td>{prospect.aadharId}</td>
                          <td style={{ background: prospect?.subscriptionType === 'special' ? 'green' : 'blue', color: prospect?.subscriptionType ? 'white' : 'black' }} >{prospect?.subscriptionType ? prospect.subscriptionType : 'Not Active'}</td>
                          <td>{prospect.razorpay_payment_id}</td>
                          <td>{prospect.razorpay_order_id}</td>
                          <td>{formatDate(prospect.createdAt) + '-' + formatTime(prospect.createdAt)}</td>
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
      {/* </Tab>

      </Tabs> */}

    </div>
  )
}

export default ViewPurchaseHistory;
