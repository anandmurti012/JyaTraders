import { Avatar, Box, Flex, Grid, GridItem, Stat, StatLabel, StatNumber, Text, Icon } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

const AdminDashboard = () => {
  const admin = useSelector((state) => state.auth.user);

  return (
    <Flex direction="column" alignItems="center" p={10} >
      <Box bg="white" p={8} borderRadius="md" boxShadow="lg" textAlign="center" maxW="md" w="full">
        <Avatar name={admin?.firstName} size="2xl" src={admin?.avatarUrl} mb={4} />
        <Text fontSize="2xl" fontWeight="bold" color="teal.600">
          Welcome Back, {admin?.firstName}!
        </Text>
        <Text fontSize="lg" color="gray.600">
          {admin?.email}
        </Text>
      </Box>
     
    </Flex>
  );
};

export default AdminDashboard;
