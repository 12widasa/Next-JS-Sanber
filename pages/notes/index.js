//get static props

import Header from '@/components/header';
import Footer from '@/components/footer';
import dynamic from 'next/dynamic';
import { Spinner, Box, Button, Flex, Grid, GridItem, Card, CardBody, CardHeader, CardFooter, Heading, Text, } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQueries } from '@/hooks/useQueries';
import fetcher from '@/utils/fatcher';
import useSWR from 'swr'


const LayoutComponent = dynamic(() => import("@/components/layout"))

export default function Notes() {
  // const { data, isLoading } = useQueries({
  //   prefixUrl: `https://paace-f178cafcae7b.nevacloud.io/api/notes`
  // })
  const { data, error, isLoading } = useSWR(`https://paace-f178cafcae7b.nevacloud.io/api/notes`, fetcher, { revalidateOnFocus: true })
  console.log('data =>', data)
  const router = useRouter()
  const [notes, setNotes] = useState()
  const HandleDelete = async (id) => {
    try {
      const response = await fetch(`https://paace-f178cafcae7b.nevacloud.io/api/notes/delete/${id}`,
        {
          method: 'DELETE',
        }
      )
      const result = await response.json()
      if (result?.success) {
        router.reload()
      }
    } catch (eror) { }
  }

  // useEffect(() => {
  //   async function fetchingData() {
  //     const res = await fetch(`https://paace-f178cafcae7b.nevacloud.io/api/notes`)
  //     const listNotes = await res.json()
  //     setNotes(listNotes)
  //   }
  //   fetchingData()
  // }, [])

  console.log("note => ", notes)
  return (
    <div>
      <LayoutComponent metaTitle="Notes">
        <Header />
        <Box padding="5">
          <Flex justifyContent="end">
            <Button colorScheme='blue' onClick={() => router.push("/notes/add")}>Add Notes</Button>
          </Flex>
          {
            isLoading ? (
              <Flex alignItems="center" justifyContent="center">
                <Spinner
                  thickness='4px'
                  speed='0.65s'
                  emptyColor='gray.200'
                  color='blue.500'
                  size='xl'
                />
              </Flex>
            ) : (
              <Flex>
                <Grid templateColumns='repeat(3, 1fr)' gap={5}>
                  {
                    data?.data?.map((item) => (
                      <GridItem>
                        <Card>
                          <CardHeader>
                            <Heading>
                              {item?.title}
                            </Heading>
                          </CardHeader>
                          <CardBody>
                            <Text>{item?.description}</Text>
                          </CardBody>
                          <CardFooter
                            justify='space-between'
                            flexWrap='wrap'
                          >
                            <Button onClick={() => router.push(`/notes/edit/${item?.id}`)} flex='1' variant='ghost'>
                              Edit
                            </Button>
                            <Button onClick={() => HandleDelete(item?.id)} flex='1' variant='ghost'>
                              Delete
                            </Button>
                          </CardFooter>
                        </Card>
                      </GridItem>
                    ))
                  }
                </Grid>
              </Flex>
            )
          }

        </Box>
        <Footer />
      </LayoutComponent >
    </div >
  );
}


// export async function getStaticProps() {
//   const res = await fetch('https://paace-f178cafcae7b.nevacloud.io/api/notes')
//   const notes = await res.json()
//   return { props: { notes }, revalidate: 10 }
// }