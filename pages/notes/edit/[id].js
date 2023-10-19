//get static props

import Header from '@/components/header';
import Footer from '@/components/footer';
import dynamic from 'next/dynamic';
import { Input, Textarea, Box, Button, Flex, Grid, GridItem, Card, CardBody, CardHeader, CardFooter, Heading, Text, } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const LayoutComponent = dynamic(() => import("@/components/layout"))

export default function EditNotes() {
  const router = useRouter()
  const { id } = router?.query
  const [notes, setNotes] = useState({})

  const HandleSubmit = async () => {
    try {
      const response = await fetch(`https://paace-f178cafcae7b.nevacloud.io/api/notes/update/${id}`, {
        method: 'PATCH', headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: notes?.title,
          description: notes?.description,
        }),
      }
      )
      const result = await response.json()
      if (result?.success) {
        router.push("/notes")
      }
    } catch (error) { }
  }

  useEffect(() => {
    async function fetchingData() {
      const res = await fetch(`https://paace-f178cafcae7b.nevacloud.io/api/notes/${id}`)
      const listNotes = await res.json()
      setNotes(listNotes?.data)
    }
    fetchingData()
  }, [id])

  return (
    <div>
      <LayoutComponent metaTitle="Notes">
        <Header />
        <Card margin="5" padding="5">
          <Heading>Edit Notes</Heading>
          <Grid gap="5">
            <GridItem>
              <Text>Title</Text>
              <Input value={notes?.title || ''} type='text' onChange={(event) => setNotes({ ...notes, title: event.target.value })
              } />
            </GridItem>
            <GridItem>
              <Text>Description</Text>
              <Textarea value={notes?.description || ''} onChange={(event) => setNotes({ ...notes, description: event.target.value })
              } />
            </GridItem>
            <GridItem>
              <Button onClick={() => HandleSubmit()} colorScheme='blue'>Submit</Button>
            </GridItem>
          </Grid>
        </Card>

        <Footer />
      </LayoutComponent >
    </div >
  );
}

