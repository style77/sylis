import {
  Text,
  Center,
  Circle,
  Icon,
  Stack,
  Flex,
  Spacer,
  Link
} from '@chakra-ui/react'
import { FaApple, FaFacebook, FaGoogle, FaSignOutAlt } from 'react-icons/fa'
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { auth } from "../firebase"
import useAuth from '../components/hooks/useAuth'

import { Container } from '../components/Container'
import FileDropzone from '../components/dropZone'

const texts = {
  true: {
    head: "Drag and drop your file on icon to upload it",
    mid: "Start using Sylis"
  },
  false: {
    head: "Light and Free storage for your files",
    mid: "Sign in to start using Sylis"
  }
}

const Index = () => {
  const { isLoggedIn, user } = useAuth()

  const handleAuth = async () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential.accessToken
        // The signed-in user info.
        const user = result.user
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        // The email of the user's account used.
        const email = error.customData.email
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error)
      })
  }

  return (
    <Container>
      <Flex align="center" justify="center" direction="column" transition="all 0.15s ease-out" display="block">
        <Stack height="100vh" bg="gray.900" color="gray.100" paddingTop="50%">
          <Stack>
            <Stack display="inline-block">
              <Text fontSize="6xl" align="center">
                Sylis
                <Text fontSize="md" align="center">
                  {texts[isLoggedIn]["head"]}
                </Text>
              </Text>
              
            </Stack>
          </Stack>
          <FileDropzone />
          <Stack margin="30px">
            {!isLoggedIn && (
              <Text fontSize="4xl">
              {texts[isLoggedIn]["mid"]}
              </Text>
            )}
            <Flex >
              {!isLoggedIn && (
                <Flex w="13rem" align="center" justify="center" direction="row" marginLeft="22.5%">
                  <Circle size="60px" bg='white' color="gray.900" float="left" opacity="35%" cursor="not-allowed">
                    <Icon as={FaApple} fontSize="30px"></Icon>
                  </Circle>
                  <Spacer />
                  <Circle size="60px" bg='white' color="gray.900" float="center" cursor="pointer" onClick={() => handleAuth()}>
                    {/* _hover={{ transform: "rotate(45deg) scale(1.1);", transition: "all 1.5s ease-in-out" }} */}
                    <Icon as={FaGoogle} fontSize="30px"></Icon>
                  </Circle>
                  <Spacer />
                  <Circle size="60px" bg='white' color="gray.900" float="right" opacity="35%" cursor="not-allowed">
                    <Icon as={FaFacebook} fontSize="30px"></Icon>
                  </Circle>
                </Flex>
              )}
            </Flex>
          </Stack>
        </Stack>
      </Flex>
      <Stack bottom="2" left="2" position="absolute">
        {isLoggedIn && (
          <Circle size="60px" bg='white' color="gray.900" opacity="25%" _hover={{ opacity: "100%", transition: "all 0.1s ease-in-out" }} cursor="pointer" onClick={() => auth.signOut()}>
            <Icon as={FaSignOutAlt} fontSize="30px" />
          </Circle>
        )}
        <Text fontSize="sm" color="gray.100" opacity="25%" _hover={{ opacity: "100%", transition: "all 0.1s ease-in-out" }}>
          made with ❤️ by <Link href="https://github.com/Style77/">yves#4105</Link>
        </Text>
      </Stack>
    </Container>
  )
}

export default Index