//get static props

import Header from '@/components/header';
import Footer from '@/components/footer';
import dynamic from 'next/dynamic';
import { Input, Textarea, Box, Button, Flex, Grid, GridItem, Card, CardBody, CardHeader, CardFooter, Heading, Text, } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@/hooks/useMutation';

const LayoutComponent = dynamic(() => import("@/components/layout"))

export default function AddNotes() {
  const { mutate } = useMutation()
  const router = useRouter()
  const [notes, setNotes] = useState({
    title: '',
    description: ''
  })

  const HandleSubmit = async () => {
    // try {
    //   const response = await fetch(`https://paace-f178cafcae7b.nevacloud.io/api/notes`, {
    //     method: 'POST', headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(notes),
    //   }
    //   )
    //   const result = await response.json()
    //   if (result?.success) {
    //     router.push("/notes")
    //   }
    // } catch (eror) { }

    const response = await mutate({
      url: `https://paace-f178cafcae7b.nevacloud.io/api/notes`,
      payload: notes
    })
    console.log("response => ", response)
  }

  return (
    <div>
      <LayoutComponent metaTitle="Notes">
        <Header />
        <Card margin="5" padding="5">
          <Heading>Add Notes</Heading>
          <Grid gap="5">
            <GridItem>
              <Text>Title</Text>
              <Input type='text' onChange={(event) => setNotes({ ...notes, title: event.target.value })
              } />
            </GridItem>
            <GridItem>
              <Text>Description</Text>
              <Textarea onChange={(event) => setNotes({ ...notes, description: event.target.value })
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

