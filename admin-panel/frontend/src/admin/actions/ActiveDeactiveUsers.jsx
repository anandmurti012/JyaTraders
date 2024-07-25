import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/react';
import { useSelector } from 'react-redux';


const ActiveDeactiveUsers = ({ udata, RefetchData }) => {

    const auth = useSelector((state) => state.auth)
    const token = auth.token
    const toast = useToast();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isloading, setIsloading] = useState(true);
    const [isloadingButton, setIsloadingButton] = useState(false);
    const [user, setUser] = useState();

    const [selectedData, setSelectedData] = useState(null);

    const saveData = async (id) => {
        setUser(id)
        onOpen()
    }


    const handlesubmit = async () => {
        try {
            // setIsloadingButton(true)
            await axios.post(`${process.env.REACT_APP_APIURL}/api/admins/active-deactive-users`, { userId: user.id, activeStatus: user.isActive }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            })
                .then(response => {
                    // console.log(response.data)
                    setIsloadingButton(false)
                    RefetchData();
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

    return (
        <div>
            {
                udata?.isActive === 0 ?
                    <div style={{ display: 'flex' }} >
                        <div >
                            <i className="fa-solid fa-ban mr-2" style={{ color: 'red' }} ></i>
                        </div>
                        <button onClick={() => { saveData(udata) }}  >
                            <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                    </div>
                    :
                    <div style={{ textAlign:'center'}}>
                        {/* <img src='/img/verified.png' className='mr-2' alt='v' style={{ height: 25, width: 25 }} /> */}
                        <button onClick={() => { saveData(udata) }}  >
                            <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                    </div>

            }


            <Modal onClose={() => { setSelectedData(null); onClose() }} size={'md'} isOpen={isOpen}>
                <ModalOverlay />
                <ModalContent width="96vw">
                    <ModalHeader>Alert</ModalHeader>
                    <ModalCloseButton />

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

                        <p style={{ fontWeight: '600', color: 'red', margin: '10px 0' }}>
                            Are you sure, you want to {udata?.isActive === 1 ? <span style={{ color: 'blue' }} >deactivate</span> : <span style={{ color: 'blue' }} >active</span>} this user?
                        </p>
                    </ModalBody>

                    <ModalFooter>
                        <Button sx={{ height: '35px', width: '70px' }}
                            onClick={() => { handlesubmit() }} isLoading={isloadingButton}
                            colorScheme='blue' mr={3}>
                            Yes
                        </Button>
                        <Button sx={{ height: '35px', width: '70px' }}
                            onClick={
                                () => {
                                    setSelectedData(null);
                                    onClose()
                                }
                            }>No</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default ActiveDeactiveUsers
