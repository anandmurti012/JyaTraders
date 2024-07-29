import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  ModalHeader,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react'
import AdminLogin from './AdminLogin';
import UsrLogin from './UserLogin';

const Login = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {/* <Button onClick={onOpen} className="btn btn-primary px-3 d-none d-lg-block pb-2">Open Modal</Button> */}

      <Button onClick={onOpen} style={{
        background: '#0054FD',
        color: "#fff",
        height: 42,
        padding: '0px 25px',
        borderRadius: '100px',
        paddingBottom: '2px'
      }}>Login</Button>



      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          width="96vw"
        >
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <div style={{ paddingBottom: 20 }}>
            <Tabs
              isFitted
            // variant='enclosed'
            >
              <TabList
                mb='1em'
              >
                <Tab>User Login</Tab>
                <Tab>Admin Login</Tab>
              </TabList>
              {/* <TabIndicator mt='-1.5px' height='2px' bg='blue.500' borderRadius='1px' /> */}

              <TabPanels>
                <TabPanel>
                  <UsrLogin onClose={onClose} />
                </TabPanel>
                <TabPanel style={{paddingTop:0,paddingBottom:0}} >
                  <AdminLogin onClose={onClose} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Login