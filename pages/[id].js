import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FaFile, FaFileAudio, FaFileCode, FaFileCsv, FaFileExcel, FaFileImage, FaFilePdf, FaFilePowerpoint, FaFileWord, FaSignInAlt } from 'react-icons/fa'

import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { Container } from '../components/Container';
import { Circle, Flex, Icon, Link, Stack, Text } from '@chakra-ui/react';
import useAuth from '../components/hooks/useAuth';

const iconMap = {
    "png": FaFileImage,
    "jpg": FaFileImage,
    "jpeg": FaFileImage,
    "doc": FaFileWord,
    "docx": FaFileWord,

    "pdf": FaFilePdf,
    "ppx": FaFilePowerpoint,

    "csv": FaFileCsv,
    "xlsm": FaFileExcel,
    "xlsx": FaFileExcel,
    "xls": FaFileExcel,

    "mp3": FaFileAudio,
    "wav": FaFileAudio,

    "js": FaFileCode,
    "ts": FaFileCode,
    "html": FaFileCode,
    "css": FaFileCode,
    "json": FaFileCode,
    "md": FaFileCode,
    "py": FaFileCode,
    "go": FaFileCode,
    "java": FaFileCode,
    "c": FaFileCode,
    "cpp": FaFileCode,
    "cs": FaFileCode,
    "rb": FaFileCode,
    "rs": FaFileCode,
    "kt": FaFileCode,
    "swift": FaFileCode,
    "dart": FaFileCode,
    "php": FaFileCode,
    "sql": FaFileCode,
    "sh": FaFileCode,
    "bat": FaFileCode,

}

function get(object, key, default_value) {
    console.log(object, key, default_value)
    var result = object[key];
    return (typeof result !== "undefined") ? result : default_value;
}

const File = () => {
    const { isLoggedIn, user } = useAuth()

    const router = useRouter()
    const { id } = router.query

    const [fileName, setFileName] = useState("")
    const [fileUrl, setFileUrl] = useState("")

    useEffect(() => {
        console.log(id)
        if (id) {
            const storage = getStorage();
            setFileName(id.split("_")[1])
            getDownloadURL(ref(storage, id))
                .then((url) => {
                    setFileUrl(url)
                    // const xhr = new XMLHttpRequest();
                    // xhr.responseType = 'blob';
                    // xhr.onload = (event) => {
                    //     const blob = xhr.response;
                    // };
                    // xhr.open('GET', url);
                    // xhr.send();
                })
                .catch((error) => {
                    console.error(error)
                });
        }
    }, [id])

    return (
        <Container>
            <Flex align="center" justify="center" direction="column" transition="all 0.15s ease-out" display="block">
                <Stack height="100vh" bg="gray.900" color="gray.100" paddingTop="50%">
                    <Stack>
                        <Stack display="block">
                            <Text fontSize="6xl" align="center">
                                Sylis
                            </Text>
                            <Link href={fileUrl}>
                                <Stack align="center" marginTop="25px">
                                    <Icon as={ get(iconMap, fileName.split(".").at(-1), FaFile) } fontSize="60px" />
                                    <Text fontSize="lg" align="center">
                                        {fileName}
                                    </Text>
                                </Stack>
                            </Link>
                        </Stack>
                    </Stack>
                    <Stack margin="30px">

                    </Stack>
                </Stack>
            </Flex>
            <Stack bottom="2" left="2" position="absolute">
                {isLoggedIn && (
                    <Circle size="60px" bg='white' color="gray.900" opacity="25%" _hover={{ opacity: "100%", transition: "all 0.1s ease-in-out" }} cursor="pointer" onClick={() => auth.signOut()}>
                        <Icon as={FaSignInAlt} fontSize="30px" />
                    </Circle>
                )}
                <Text fontSize="sm" color="gray.100" opacity="25%" _hover={{ opacity: "100%", transition: "all 0.1s ease-in-out" }}>
                    made with ❤️ by <Link href="https://github.com/Style77/">yves#4105</Link>
                </Text>
            </Stack>
        </Container>
    )
}

export default File