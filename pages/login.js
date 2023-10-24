import { useToast, Flex, Stack, Heading, FormControl, Input, Button } from "@chakra-ui/react"
import { useState } from "react"
import { useMutation } from "@/hooks/useMutation"
import Cookies from "js-cookie"
import { useRouter } from "next/router"

export default function Login() {
  const router = useRouter()
  const toast = useToast()
  const { mutate } = useMutation()
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  })

  const HandleSubmit = async () => {
    const response = await mutate({ url: `https://paace-f178cafcae7b.nevacloud.io/api/login`, payload })
    // apabila login gagal maka akan memunculkan toast
    if (!response?.success) {
      toast({
        title: 'Login Failed',
        description: "email and password not valid",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top"
      })
    }
    // apabila login berhasil maka akan mengirimkan cookie
    else {
      Cookies.set("user_token", response?.data?.token, {
        expires: new Date(response?.data?.expires_at),
        path: "/"
      })
      router.push("/")
    }
  }

  return (
    <Flex alignItems="center" justifyContent="center">
      <Stack direction="column">
        <Heading as="h4">
          Login
        </Heading>
        <FormControl>
          <Input value={payload?.email} onChange={(event) => setPayload({ ...payload, email: event.target.value })} placeholder="email" />
        </FormControl>
        <FormControl>
          <Input value={payload.password} onChange={(event) => setPayload({ ...payload, password: event.target.value })} placeholder="password" type="password" />
        </FormControl>
        <FormControl>
          <Button onClick={() => HandleSubmit()} type="submit">Login</Button>
        </FormControl>
      </Stack>
    </Flex>
  )
}
