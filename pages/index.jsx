import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading, Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react";
import {
  FiEdit3
} from 'react-icons/fi';
import {
  MdDelete,
  MdSave
} from 'react-icons/md';

export default function Home() {

  const [data, setData] = useState([]);
  const [visibility, setVisibility] = useState('hidden');
  const [readOnlyName, setReadOnlyName] = useState(true);

  const [id, setId] = useState();
  const [name, setName] = useState();

  function listAll() {

    setVisibility('visible');

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // var raw = JSON.stringify({
    //   user: {
    //     url: string
    //   }
    // });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      // body: raw,
      redirect: "follow",
    };

    fetch("/api/nuvemshop-getAll", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);

        const data_ = result;

        setData(data_);

      })
      .catch(error => {
        console.log('error index', error);
      })
  }

  function edit(id, name) {
    setId(id);
    setName(name);
  }

  function reply_click(clicked_id)
  {
      alert(clicked_id);
  }

  function save() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      user: {
        id: id,
        name: name
      }
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("/api/nuvemshop-put", requestOptions)
      .then(response => response.json())
      .then(result => {

        console.log(result);
      })
      .catch(error => {
        console.log('error index', error);
      })
  }

  return (
    <Container
      py='10'
      my='10'
      maxW={'8xl'}>
      <Flex
        flexDir={'column'}
        gap='4'>
        <Heading>
          Nuvemshop API
        </Heading>
        <Text>
          Products
        </Text>
        <Button
          onClick={listAll}>
          List All
        </Button>
        <TableContainer
          visibility={visibility}>
          <Table variant='striped'>
            {data.map((item, idx) => (
              <Box
                key={idx}>
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>Name</Th>
                    <Th>SEO Description</Th>
                    <Th>SEO Title</Th>
                    <Th>Edit</Th>
                    <Th>Delete</Th>
                    <Th>Salvar</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>
                      <Input
                        id={item.id}
                        defaultValue={item.id}
                        onClick={reply_click(this.id)}
                        readOnly />
                    </Td>
                    <Td>
                      <Input
                        defaultValue={item.name.pt}
                        readOnly />
                    </Td>
                    <Td>
                      <Input
                        defaultValue={item.seo_description.pt}
                        readOnly />
                    </Td>
                    <Td>
                      <Input
                        defaultValue={item.seo_title.pt}
                        readOnly />
                    </Td>
                    <Td>
                      <Button>
                        {/* <FiEdit3
                          onClick={edit(item.id, item.name.pt)} /> */}
                      </Button>
                    </Td>
                    <Td>
                      <Button>
                        <MdDelete />
                      </Button>
                    </Td>
                    <Td>
                      <Button>
                        {/* <MdSave onClick={save} /> */}
                      </Button>
                    </Td>
                  </Tr>
                </Tbody>
              </Box>
            ))}
          </Table>
        </TableContainer>
      </Flex>
    </Container>
  )
}
