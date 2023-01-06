import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  Grid,
  Heading, Input,
  Select,
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
  MdSave
} from 'react-icons/md';

export default function Home() {

  const [data, setData] = useState([]);
  const [visibility, setVisibility] = useState('hidden');

  const [id, setId] = useState();
  const [name, setName] = useState();
  const [seoTitle, setSeoTitle] = useState();
  const [seoDescription, setSeoDescription] = useState();

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

    var raw = JSON.stringify({
      user: {
        id: id,
        name: name,
        description: seoDescription,
        seo_title: seoTitle,
        seo_description: seoDescription
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

  function getNameId(e) {
    setId(e.target.id);
    setName(e.target.value);

    console.log(id);
    console.log(name);
  }

  function getTitle(e) {
    setSeoTitle(e.target.value);

    console.log(seoTitle);
  }

  function getDescription(e) {
    setSeoDescription(e.target.value);

    console.log(seoDescription);
  }

  function randomInt(min, max) {
    return min + Math.floor((max - min) * Math.random());
  }

  const SEOContent = {
    Portal: (palavraChave) => {
      const titleOptions = [
        `Tudo sobre ${palavraChave}`,
        `Novidades sobre ${palavraChave}`,
      ];
      const descriptionOptions = [
        `Quer saber tudo sobre ${palavraChave}? Clique aqui e tenha todas as informações em primeira mão!`,
        `Todas a novidades sobre ${palavraChave} em primeira mão. Acompanhe o site e assine a newsletter!`,
      ];

      return {
        title: titleOptions[randomInt(0, titleOptions.length)],
        description:
          descriptionOptions[randomInt(0, descriptionOptions.length)],
      };
    },

    Outros: (palavraChave) => {
      const titleOptions = [
        `Quer saber mais sobre ${palavraChave}?`,
        `Conheça ${palavraChave}`,
        `Você quer ${palavraChave}?`,
      ];
      const descriptionOptions = [
        `Quer saber mais sobre ${palavraChave}? Clique aqui e encontre todas as informações que você precisa!`,
        `Conheça mais sobre ${palavraChave} Acesse nosso site e encontre todas as informações que você precisa!`,
        `Você quer mais sobre ${palavraChave}? Acesse nosso site e encontre todas as informações que deseja!`,
      ];

      return {
        title: titleOptions[randomInt(0, titleOptions.length)],
        description:
          descriptionOptions[randomInt(0, descriptionOptions.length)],
      };
    },
    Loja: (palavraChave) => {
      const titleOptions = [
        `Comprar ${palavraChave}`,
        `Compre ${palavraChave}`,
        `Procurando por ${palavraChave}`,
        `Encontre ${palavraChave}`,
      ];
      const descriptionOptions = [
        `Comprar ${palavraChave} de maneira rápida e segura é aqui. Acesse e confira nossa linha completa com o melhor preço!`,
        `Compre ${palavraChave} com agilidade e segurança aqui. Acesse e confira nossa linha completa com o melhor preço!`,
        `Procurando por ${palavraChave}? Compre com agilidade e segurança. Acesse e confira nossa linha completa com o melhor preço!`,
        `Encontre ${palavraChave} com preços incríveis, entrega rápida e garantida. Aproveite e garanta descontos, confira!`,
      ];

      return {
        title: titleOptions[randomInt(0, titleOptions.length)],
        description:
          descriptionOptions[randomInt(0, descriptionOptions.length)],
      };
    },
    Blog: (palavraChave) => {
      const titleOptions = [
        `Leia mais sobre ${palavraChave}`,
        `Conheça ${palavraChave}`,
        `Dicas sobre ${palavraChave}`,
      ];
      const descriptionOptions = [
        `O conteúdo mais completo você encontra aqui! Clique e leia mais sobre ${palavraChave}.`,
        `Conheça ${palavraChave} e veja como seu dia-a-dia será facilitado. Nós temos as melhores soluções para seu negócio. Confira!`,
        `Preparamos algumas Dicas de ${palavraChave} para você. Acesse e confira. Não se esqueça de compartilhar!`,
      ];

      return {
        title: titleOptions[randomInt(0, titleOptions.length)],
        description:
          descriptionOptions[randomInt(0, descriptionOptions.length)],
      };
    },
    Institucional: (palavraChave) => {
      const titleOptions = [
        `Conheça ${palavraChave}`,
        `Trabalhamos com ${palavraChave}`,
      ];
      const descriptionOptions = [
        `Conheça ${palavraChave}. Comprove nossa qualidade. Acesse e confira nosso trabalho e cases de sucesso!`,
        `Trabalhamos com ${palavraChave} e toda a qualidade que você merece. Conheça nosso trabalho e entre em contato!`,
      ];

      return {
        title: titleOptions[randomInt(0, titleOptions.length)],
        description:
          descriptionOptions[randomInt(0, descriptionOptions.length)],
      };
    },
  }

  function gerarTitleEDescription() {
    const palavraChave = document.querySelector(".palavra-chave").value;
    const tipo = document.querySelector("#select-tipo").value;

    const tituloSugerido = document.querySelector("#h1-textarea");
    const titleTextArea = document.querySelector("#title-textarea");
    const descriptionTextArea = document.querySelector("#description-textarea");

    console.log(palavraChave, tipo);

    const { title, description } = SEOContent[tipo](palavraChave);

    titleTextArea.value = title;
    tituloSugerido.value = title;
    descriptionTextArea.value = description;
  }

  return (
    <Container
      py='6'
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
          <Table>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Name</Th>
                <Th>SEO Description</Th>
                <Th>SEO Title</Th>
                <Th>Save</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((item, idx) => (
                <Tr
                  key={idx}
                  _hover={{
                    bg: '#FFADBC'
                  }}>
                  <Td>
                    <Input
                      defaultValue={item.id} />
                  </Td>
                  <Td>
                    <Input
                      id={item.id}
                      onClick={getNameId}
                      defaultValue={item.name.pt} />
                  </Td>
                  <Td>
                    <Input
                      defaultValue={item.seo_description.pt}
                      onClick={getDescription} />
                  </Td>
                  <Td>
                    <Input
                      defaultValue={item.seo_title.pt}
                      onClick={getTitle} />
                  </Td>
                  <Td>
                    <Button>
                      <MdSave onClick={save} />
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        {/* <Flex
          flexDir={'column'}
          gap='6'>
          <Heading>
            Generator
          </Heading>
          <FormControl
            className='form'>
            <Grid
              templateColumns={{
                lg: '2fr 2fr 1fr'
              }}
              gap='4'>
              <Input
                className='palavra-chave' />
              <Select
                id='select-tipo'
                name='tipo'>
                <option value='Portal'>
                  Type
                </option>
                <option value='Outros'>
                  Others
                </option>
                <option value='Loja'>
                  Store
                </option>
                <option value='Blog'>
                  Blog
                </option>
                <option value='Institucional'>
                  Institucional
                </option>
              </Select>
              <Button
                onClick={gerarTitleEDescription}
                variant='button-orange'
                _hover={{
                  bg: '#FFB596'
                }}>
                Generade
              </Button>
            </Grid>
          </FormControl>
          <Flex
            className='results'
            flexDir={'column'}
            gap='4'>
            <Result
              titulo={'H1'}
              id={'h1-textarea'} />
            <Result
              titulo={'Title'}
              id={'title-textarea'} />
            <Result
              titulo={'Description'}
              id={'description-textarea'} />
          </Flex>
        </Flex> */}
      </Flex>
    </Container>
  )
}

function Result({
  titulo,
  id,
}) {

  return (
    <>
      <Flex
        justifyContent={'space-between'}
        align='center'>
        <Text>
          {titulo}
        </Text>
      </Flex>
      <Input
        id={id} />
    </>
  )
}