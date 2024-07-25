import React, { useEffect, useState } from 'react';
import { AspectRatio, useToast } from '@chakra-ui/react';
import { Container, Row, Col, Nav, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { catchError } from '../../services/api';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import YouTubePlayer from '../../utils/YouTubePlayer';
import { getYouTubeId } from '../../utils/ConvertYouTubeLink';
import Loading from '../../components/Loading';
import CustomButton from '../../components/CustomButton';

const ViewPlayList = () => {

  const { courseId } = useParams();
  const id = courseId;

  const auth = useSelector((state) => state.auth)
  const token = auth.token

  const toast = useToast();
  const [lectures, setlectures] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  const [activeVideo, setActiveVideo] = useState([])
  const [files, setFiles] = useState([])
  useEffect(() => {
    const files = JSON.parse(activeVideo?.attachment ? activeVideo?.attachment : '[]');
    setFiles(files)
  }, [activeVideo]);

  useEffect(() => {
    fetchLecturesData();
  }, []);


  const fetchLecturesData = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_APIURL}/api/admins/get-lectures?courseId=${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          }
        }
      );
      if (res.status === 200) {
        setIsLoading(false);
        setlectures(res.data.results)
        setActiveVideo(res?.data?.results[0])
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


  const [isButtonLoading, setButtonIsLoading] = useState(false)

  const handleDownload = async (index, f) => {
    try {
      console.log(f)
      setButtonIsLoading(index)
      const response = await axios.get(`${process.env.REACT_APP_APIURL}/uploads/lectures/${f}`, {
        responseType: 'blob', // Ensure response type is blob
        headers: {
          'Content-Type': 'application/octet-stream',
        },
      })
      const blob = new Blob([response.data], { type: response.data.type });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', f); // Use file name or another property if available
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      setButtonIsLoading(null);

    } catch (error) {
      setButtonIsLoading(null);
      console.log('Downloading Error:', error)
    }
  }


  const tabs = lectures.map((lecture, index) => ({
    eventKey: `lecture${index + 1}`,
    title: `${index + 1}. ${lecture.title}`,
    data: lecture
  }));

  const [activeKey, setActiveKey] = useState(tabs[0]?.eventKey || '');
  const sidebarHeight = Math.min(tabs.length * 50, window.innerHeight);
  return (

    <div style={{ padding: 0 }}>
      

      <Row>
        <Col md={3} sm={4} xs={12} className="sidebar" style={{ background: '#60666b', color: 'white', minHeight: sidebarHeight, padding: 0 }}>
          <Nav variant="pills" className="flex-column" onSelect={(selectedKey) => setActiveKey(selectedKey)} style={{ padding: '10px' }}>
            {tabs.map((tab, index) => (
              <Nav.Item key={index}>
                <Nav.Link onClick={() => { setActiveVideo(tab?.data) }} eventKey={tab.eventKey} style={{ color: 'white', cursor: 'pointer',boxShadow: '0 4px 8px rgba(0, 0, 6, 0.1)' }}>
                <i class="fa-regular fa-circle-play"></i> &nbsp; &nbsp; {tab.title}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Col>

        <Col md={9} sm={8} xs={12} className="tab-content" style={{ padding: '10px' }}>
          <div style={{ marginTop: '10px' }}>
            {
              isLoading ?
                <Loading />
                :
                activeVideo ?
                  <>
                    <YouTubePlayer width={'99%'} height={'500px'} videoId={getYouTubeId(activeVideo?.videoLink)} />
                    <div className='mt-1' >
                      <p style={{ fontWeight: '500', fontSize: '18px' }} > {activeVideo?.title}</p>
                      <p style={{ fontWeight: '500', fontSize: '18px' }} > {activeVideo?.description}</p>

                      {
                        files.map((e, i) => {
                          return (
                            <div style={{ marginBottom: 5 }} >
                              <CustomButton
                                title={`Attachment ${i + 1} `}
                                isLoading={isButtonLoading === i ? true : false}
                                loadingText={"Downloading.."}
                                buttonClick={() => handleDownload(i, e)}
                                backgroundColor={'#0DCAF0'}
                                colorScheme="blue"
                              // width="10%"
                              />
                            </div>
                          )
                        })
                      }
                    </div>

                  </>
                  :
                  ''
            }
          </div>
        </Col>
      </Row>
    </div>
  );
};


// Dummy data for lectures
export default ViewPlayList