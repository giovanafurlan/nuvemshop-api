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
    const tipo = 'Loja';

    const { title, description } = SEOContent[tipo](name);

    console.log(id);

    const titleId = document.getElementsByClassName(`title-${id}`);
    console.log(titleId);

    const descriptionId = document.getElementsByClassName(`description-${id}`);
    console.log(descriptionId);

    for (let item of titleId) {
      console.log(item.value);
      item.value = title;
    }

    for (let item of descriptionId) {
      console.log(item.value);
      item.value = description;
    }

  }

  function changeBg(event) {
    event.target.style.backgroundColor = '#c4c4c4';
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
              Products
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
                  <Th>Name</Th>
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
                      bg: '#c4c4c4'
                    }}
                    onClick={changeBg}>
                    <Td>
                      <Input
                        defaultValue={item.id}
                        readOnly />
                    </Td>
                    <Td>
                      <Input
                        className='name'
                        id={item.id}
                        onChange={e => {
                          setName(e.target.value),
                            setId(e.target.id)
                        }}
                        defaultValue={item.name.pt} />
                    </Td>
                    <Td>
                      <Input
                        id='seoTitle'
                        className={`title-${item.id}`}
                        onChange={e => {
                          setSeoTitle(e.target.value)
                        }}
                        defaultValue={item.seo_title.pt} />
                    </Td>
                    <Td>
                      <Input
                        id='seoDescription'
                        className={`description-${item.id}`}
                        onChange={e => {
                          setSeoDescription(e.target.value)
                        }}
                        defaultValue={item.seo_description.pt} />
                    </Td>
                    <Td>
                      <Button>
                        <MdSubtitles
                          onClick={gerarTitleEDescription} />
                      </Button>
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
        </Flex>
      </Grid>
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