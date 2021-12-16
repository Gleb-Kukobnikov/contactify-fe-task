import { useEffect, useState } from 'react';
import { getContactDetails } from '../api/contacts';
import { Center, Flex, Image, Link, Spinner } from '@chakra-ui/react';
import userPic from '../assets/userpic.jpg';

export const ContactDetails = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({});

  const fetchDetails = async () => {
    setLoading(true);

    const requestDetails = await getContactDetails(id);
    setLoading(false);
    setDetails(requestDetails);
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  if (loading)
    return (
      <Center>
        <Spinner />
      </Center>
    );

  return (
    <Flex direction="column" justifyContent="center" alignItems="center" gap={4}>
      <Image
        borderRadius="full"
        boxSize="250px"
        src={userPic}
        alt="User"
        border="5px solid white"
      />

      <Flex gap={4}>
        <Flex direction="column" gap={4}>
          <Flex justifyContent="right">Name:</Flex>
          <Flex justifyContent="right">City:</Flex>
          <Flex justifyContent="right">Email:</Flex>
          <Flex justifyContent="right">Phone:</Flex>
        </Flex>
        <Flex direction="column" gap={4} color="black">
          <Flex>{details.name}</Flex>
          <Flex>{details.city}</Flex>
          <Link href={`mailto:${details.email}`} color="mainBlue.300">
            {details.email}
          </Link>
          <Flex>{details.phone}</Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
