import {
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  Heading,
  Input,
  Select,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useBoolean
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';

import { useEffect, useState } from 'react';
import { getContacts } from '../api/contacts';
import { ContactDetails } from './ContactDetails';
import { ColumnsControl } from '../components';
import { sortByNameAscending, sortByNameDescending } from '../utils/sort';

export const COLUMNS = ['City', 'Email', 'Phone'];

export const Contacts = () => {
  const initialColumnsState = {
    Name: true,
    City: true,
    Email: true,
    Phone: true
  };

  const [sortEnabled, setSort] = useBoolean(true);
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [nameFilter, setNameFilter] = useState(null);
  const [columns, setColumns] = useState(initialColumnsState);

  const fetchContacts = async () => {
    setLoading(true);

    const requestContacts = await getContacts();
    setLoading(false);
    setContacts(requestContacts);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleNameFilter = (e) => setNameFilter(e.target.value);
  const toggleColumn = (colData) => setColumns({ ...columns, ...colData });

  const filteredContacts = contacts.filter((c) => !nameFilter || c.name.includes(nameFilter));

  if (loading) return <Spinner size="xl" />;

  return (
    <Container maxW="80vw">
      <Flex bg="mainBlue.300" alignItems="center" color="white">
        <Flex flex={1} bg="mainBlue.500" w="70%" borderTopRadius="lg" p={4} gap={4}>
          <Input w="150px" placeholder="Name" onChange={handleNameFilter} />
          <Select w="150px" placeholder="City" />
          <Checkbox colorScheme="mainGreen" defaultIsChecked>
            Show active <FontAwesomeIcon icon={faEye} />
          </Checkbox>
          <Button bg="mainGreen.900" h="40px" w="100px" borderRadius="25px">
            FILTER
          </Button>
        </Flex>

        <Flex px="5" width="300px" justifyContent="center" alignItems="center">
          <Heading size="lg">CONTACTIFY</Heading>
        </Flex>
      </Flex>

      <Box borderBottomRadius="lg" overflow="hidden">
        <Table variant="simple" minH="50vh">
          <Thead bg="mainGreen.900" h="50px">
            <Tr>
              <Th>
                <Button
                  p={0}
                  w="100%"
                  justifyContent="flex-start"
                  onClick={setSort.toggle}
                  colorScheme="mainGreen"
                  variant="ghost"
                  color="white"
                  rightIcon={<FontAwesomeIcon icon={sortEnabled ? faSortDown : faSortUp} />}>
                  Name
                </Button>
              </Th>
              <Th>{columns.City && 'City'}</Th>
              <Th>{columns.Email && 'Email'}</Th>
              <Th>{columns.Phone && 'Phone'}</Th>
              <Th>
                <ColumnsControl columns={COLUMNS} toggleColumn={toggleColumn} />
              </Th>
              {selectedId && <Th></Th>}
            </Tr>
          </Thead>
          <Tbody bg="mainGreen.100" color="mainSecondary.500">
            {selectedId && (
              <Tr>
                <Td colSpan={5} p={0} border={0}></Td>
                <Td rowSpan={contacts.length + 1} w="300px" bg="mainSecondary.100">
                  <ContactDetails id={selectedId} />
                </Td>
              </Tr>
            )}
            {filteredContacts
              .sort(sortEnabled ? sortByNameAscending : sortByNameDescending)
              .map((p) => (
                <Tr
                  key={p.id}
                  _hover={{
                    background: 'mainSecondary.200'
                  }}
                  onClick={() => setSelectedId(p.id)}>
                  <Td>{p.name}</Td>
                  <Td>{columns.City && p.city}</Td>
                  <Td>{columns.Email && p.email}</Td>
                  <Td>{columns.Phone && p.phone}</Td>
                  <Td w={0} p={0}></Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </Box>
    </Container>
  );
};
