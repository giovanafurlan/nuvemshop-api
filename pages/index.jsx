import { useState } from "react";
import {
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Input,
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
  MdSave,
  MdSubtitles
} from 'react-icons/md';
import {
  AiFillEdit
} from 'react-icons/ai';
import styled from "styled-components";

const Check = styled.div`
.tableSelected {
  background-color: blue;
}
`

export default function Home() {

  const [data, setData] = useState([]);
  const [visibility, setVisibility] = useState('hidden');

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

  function save() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var seoTitle_;
    var seoDescription_;

    const titleId = document.getElementsByClassName(`title-${id}`);
    console.log(titleId);
    const descriptionId = document.getElementsByClassName(`description-${id}`);
    console.log(descriptionId);

    for (let item of titleId) {
      console.log(item.value);
      seoTitle_ = item.value;
    }

    for (let item of descriptionId) {
      console.log(item.value);
      seoDescription_ = item.value;
    }

    var raw = JSON.stringify({
      user: {
        id: id,
        name: name,
        seo_description: seoDescription_,
        seo_title: seoTitle_,
        description: seoDescription_
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

  function generate() {

    const values = [
      {
        id: 1,
        title: `Comprar ${name}`,
        description: `Comprar ${name} de maneira rápida e segura é aqui. Acesse e confira nossa linha completa com o melhor preço!`
      },
      {
        id: 2,
        title: `Compre ${name}`,
        description: `Compre ${name} com agilidade e segurança aqui. Acesse e confira nossa linha completa com o melhor preço!`
      },
      {
        id: 3,
        title: `Procurando por  ${name}`,
        description: `Procurando por ${name}? Compre com agilidade e segurança. Acesse e confira nossa linha completa com o melhor preço!`
      },
      {
        id: 4,
        title: `Encontre ${name}`,
        description: `Encontre ${name} com preços incríveis, entrega rápida e garantida. Aproveite e garanta descontos, confira!`
      }
    ]

    var val = values[Math.floor(Math.random() * values.length)];

    console.log(id);

    const titleId = document.getElementsByClassName(`title-${id}`);
    console.log(titleId);

    const descriptionId = document.getElementsByClassName(`description-${id}`);
    console.log(descriptionId);

    for (let item of titleId) {
      console.log(item.value);
      item.value = val.title;
    }

    for (let item of descriptionId) {
      console.log(item.value);
      item.value = val.description;
    }
  }

  return (
    <Container
      py='6'
      my='10'
      maxW={'full'}>
      <Grid
        templateColumns={'repeat(1,1fr)'}
        gap='4'>
        <Flex
          flexDir={'column'}
          gap='6'
          boxShadow='lg'
          p='4'
          borderRadius={'lg'}>
          <Heading>
            Nuvemshop API
          </Heading>
          <Flex
            align={'center'}
            justifyContent='space-between'>
            <Text>
              Selecione o nome do produto que deseja alterar as informações
            </Text>
            <Button
              onClick={listAll}>
              List All
            </Button>
          </Flex>
          <TableContainer
            visibility={visibility}>
            <Table>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>
                    <Flex
                      align={'center'}
                      gap='2'
                      color=''>
                      <AiFillEdit />
                      Name
                    </Flex>
                  </Th>
                  <Th>SEO Title</Th>
                  <Th>SEO Description</Th>
                  <Th>Generate</Th>
                  <Th>Save</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((item, idx) => (
                  <Tr
                    key={idx}
                    _hover={{
                      bg: '#a2a2a2'
                    }}>
                    <Td isNumeric>
                      {item.id}
                    </Td>
                    <Td>
                      <Input
                        className='name'
                        id={item.id}
                        onChange={e => {
                          setName(e.target.value),
                            setId(e.target.id)
                        }}
                        onClick={e => {
                          setName(e.target.value),
                            setId(e.target.id)
                        }}
                        defaultValue={item.name.pt} />
                    </Td>
                    <Td>
                      <Input
                        id='seoTitle'
                        className={`title-${item.id}`}
                        defaultValue={item.seo_title.pt}
                        readOnly />
                    </Td>
                    <Td>
                      <Input
                        id='seoDescription'
                        className={`description-${item.id}`}
                        defaultValue={item.seo_description.pt}
                        readOnly />
                    </Td>
                    <Td>
                      <Button onClick={generate}>
                        <MdSubtitles />
                      </Button>
                    </Td>
                    <Td>
                      <Button onClick={save}>
                        <MdSave />
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
      </Grid>
    </Container>
  )
}