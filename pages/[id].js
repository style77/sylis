import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FaFile, FaFileAudio, FaFileCode, FaFileCsv, FaFileExcel, FaFileImage, FaFilePdf, FaFilePowerpoint, FaFileVideo, FaFileWord, FaSignInAlt } from 'react-icons/fa'

import { getStorage, ref, getDownloadURL } from "firebase/storage"
import { Container } from '.././components/container'
import { AspectRatio, Box, Circle, Flex, Icon, Image, Link, Radio, RadioGroup, Stack, Text, Textarea } from '@chakra-ui/react';
import useAuth from '../components/hooks/useAuth'
import { Layout } from '../components/layout'

import dynamic from "next/dynamic"
import "@uiw/react-textarea-code-editor/dist.css";
import Head from 'next/head'

// codeEditor setup https://github.com/uiwjs/react-textarea-code-editor#support-nextjs

const CodeEditor = dynamic(
    () => import("@uiw/react-textarea-code-editor").then((mod) => mod.default),
    { ssr: false }
)

// Icon setup

const iconMap = {
    "doc": FaFileWord,
    "docx": FaFileWord,
    "pdf": FaFilePdf,
    "ppx": FaFilePowerpoint,
    "csv": FaFileCsv,
    "xlsm": FaFileExcel,
    "xlsx": FaFileExcel,
    "xls": FaFileExcel,
}

const codingExts = ["txt", "js", "ts", "html", "css", "json", "md", "py", "go", "java", "c", "cpp", "cs", "rb", "rs", "kt", "swift", "dart", "php", "sql", "sh", "bat"]
const imageExts = ["png", "jpg", "jpeg", "svg", "gif"]
const videoExts = ["mp4", "mov", "avi", "mkv", "webm", "flv", "wmv", "mpeg", "mpg", "m4v", "3gp", "3g2"]
const audioExts = ["mp3", "wav", "ogg", "flac", "aac", "wma", "m4a", "aiff", "alac", "amr", "ape", "au", "dct", "dss", "dvf", "gsm", "iklax", "ivs", "m4p", "mmf", "mpc", "msv", "nmf", "nsf", "oga", "opus", "ra", "raw", "sln", "tta", "vox", "wv", "webm", "8svx", "cda"]

codingExts.forEach(element => {
    iconMap[element] = FaFileCode
})

imageExts.forEach(element => {
    iconMap[element] = FaFileImage
})

videoExts.forEach(element => {
    iconMap[element] = FaFileVideo
})

audioExts.forEach(element => {
    iconMap[element] = FaFileAudio
})

// utils

function get(object, key, default_value) {
    var result = object[key];
    return (typeof result !== "undefined") ? result : default_value;
}

const File = () => {
    const { isLoggedIn, user } = useAuth()

    const router = useRouter()
    const { id } = router.query

    const [fileName, setFileName] = useState("")
    const [fileUrl, setFileUrl] = useState("")

    const [textContent, setTextContent] = useState("")

    useEffect(() => {
        if (id) {
            const storage = getStorage();
            setFileName(id.split("_").splice(1).join("_"))
            getDownloadURL(ref(storage, id))
                .then((url) => {
                    setFileUrl(url)

                    if (codingExts.includes(id.split("_").splice(1).join("_").split(".").at(-1))) {
                        fetch(url).then((response) => {
                            response.text().then((text) => {
                                setTextContent(text)
                            })
                        })
                    }

                })
                .catch((error) => {
                    console.error(error)
                });
        }
    }, [id])

    const onDownload = () => {
        const link = document.createElement("a")
        link.download = fileName
        link.href = `./${fileName}`
        link.click()
    }

    return (
        <Layout>
            <head>
                <title>{fileName}</title>
                <meta property='og:title' content={fileName} key='title' />
                <meta property='og:description' content='Uploaded to sylis' key='description' />
                <meta property='og:url' content="https://sylis.vercel.app/" />
                {imageExts.includes(fileName.split(".").at(-1)) && <meta property='og:image' content={fileUrl} />}
                {videoExts.includes(fileName.split(".").at(-1)) && <meta property='og:video' content={fileUrl} />}
                {audioExts.includes(fileName.split(".").at(-1)) && <meta property='og:audio' content={fileUrl} />}
                <meta property='og:type' content='website' />
            </head>
            <Flex align="center" justify="center" direction="column" transition="all 0.15s ease-out" display="block">
                <Stack height="100vh" bg="gray.900" color="gray.100">
                    <Stack>
                        <Stack display="block">
                            <Text fontSize="6xl" align="center">
                                <Link href="/" style={{ textDecoration: 'none' }}>
                                    Sylis
                                </Link>
                            </Text>
                            <Text onClick={onDownload} cursor="pointer" _hover={{ textDecoration: "underline" }}>
                                <Stack align="center" marginTop="25px">
                                    <Icon as={get(iconMap, fileName.split(".").at(-1), FaFile)} fontSize="60px" />
                                    <Text fontSize="lg" align="center">
                                        {fileName}
                                    </Text>
                                </Stack>
                            </Text>
                            <Stack align="center" marginTop="25px">
                                {imageExts.includes(fileName.split(".").at(-1)) ? (
                                    <Box width="70vw" height="auto" align="center" zIndex="1000">
                                        <Image src={fileUrl} />
                                    </Box>
                                ) : <></>}
                                {codingExts.includes(fileName.split(".").at(-1)) ? (
                                    <>
                                        <CodeEditor 
                                        value={textContent}
                                        language={fileName.split(".").at(-1)}
                                        style={{
                                            height: "70vh",
                                            width: "50vw",
                                            overflow: "auto",
                                            fontSize: "0.9rem",
                                            backgroundColor: "#222830",
                                            borderRadius: "5px",
                                            zIndex: "1000",
                                            
                                        }}
                                        // sx={{
                                        //     '&::-webkit-scrollbar': {
                                        //         width: '0.5em',
                                        //         backgroundColor: '#F5F5F5'
                                        //     },
                                        //     '&::-webkit-scrollbar-thumb': {
                                        //         borderRadius: '10px',
                                        //         '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.5)',
                                        //         backgroundColor: '#555',
                                        //     },
                                        //     '&::-webkit-scrollbar-track': {
                                        //         borderRadius: '10px',
                                        //         '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.5)',
                                        //         backgroundColor: '#F5F5F5',
                                        //     }
                                        // }}
                                        disabled="disabled"
                                        />
                                    </>
                                ) : <></>}
                                {videoExts.includes(fileName.split(".").at(-1)) ? (
                                    <Box width="70vw" height="auto" align="center" zIndex="1000">
                                        <iframe src={fileUrl} allowFullScreen />
                                    </Box>
                                ) : <></>}
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            </Flex>
        </Layout>
    )
}

export default File