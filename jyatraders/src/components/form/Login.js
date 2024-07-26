import React, {useState} from 'react';
import {
  Modal,
  Button,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
  FormControl,
  FormLabel, Input
} from '@chakra-ui/react'

function Login() {
     const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [errors, setErrors] = useState({}); // State to hold validation errors

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const [data, setData] = useState({
 email:'',
 password:''
});
const inputData = (e) => {
  const { name, value } = e.target;
  setData({ ...data, [name]: value });
};

  const handleSubmit = async () => {
    try {

      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,data)
        .then(response => {
          console.log("res", response);
          setData({
            ...data,
            email: '',
           password:''
        });
          toast({
            title: response.data.msg,
            // description: "We've collected your request. We will contact you shortly.",
            status: 'success',
            duration: 4000,
            isClosable: true,
            position: 'top'
          });
        })
        .catch(error => {
          console.error(error);
          console.error('Submission error:', error);
          toast({
            title: 'Submission Failed',
            description: 'Failed to submit your request. Please try again later.',
            status: 'error',
            duration: 4000,
            isClosable: true,
            position: 'top'
          });
        });
      onClose();
    } catch (error) {
      console.log(error)
      onClose();
    }
  };

  return (
    <>
      <Button onClick={onOpen} style={{
        background: '#0054FD',
        color: "#fff",
        height: 42,
        padding: '0px 25px',
        borderRadius: '100px',
        paddingBottom: '2px'
      }}>Login</Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input ref={initialRef}  
                name="email"
                value={data.email}
                onChange={inputData} placeholder='Your Email' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input name="password"
                type="password"
                value={data.password}
                onChange={inputData} placeholder='Enter your password' />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleSubmit} colorScheme='blue' mr={3}>
              Submit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Login;