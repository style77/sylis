import { Center, Circle, Icon } from "@chakra-ui/react"
import { getStorage, ref, uploadBytes } from "firebase/storage"
import React, { useCallback } from "react"
import { useDropzone } from 'react-dropzone'
import { FaCloudUploadAlt } from "react-icons/fa"
import { MdMoveToInbox } from "react-icons/md"

import Router, { useRouter } from 'next/router';

const FileDropzone = () => {

    const router = useRouter()

    const generateID = () => {
        return Math.random().toString(36).substr(2, 9)
    }

    const onDrop = useCallback(acceptedFiles => {

        let file = acceptedFiles[0]

        const refName = `${generateID()}_${file.name}`
        var storageRef = ref(getStorage(), refName)

        uploadBytes(storageRef, file).then((snapshot) => {
            router.push(`/${refName}`)
        })
    }, [])
    
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            <Center cursor="pointer">
                {
                    isDragActive ?
                        <Icon fontSize="48px" as={FaCloudUploadAlt} /> :
                        <Icon fontSize="48px" as={MdMoveToInbox} />
                }
            </Center>
        </div>
    )
}

export default FileDropzone