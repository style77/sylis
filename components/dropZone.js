import { Center, Circle, Icon } from "@chakra-ui/react"
import { getStorage, ref, uploadBytes, uploadBytesResumable } from "firebase/storage"
import React, { useCallback, useState } from "react"
import { useDropzone } from 'react-dropzone'
import { FaCloudUploadAlt } from "react-icons/fa"
import { MdMoveToInbox } from "react-icons/md"

import Router, { useRouter } from 'next/router';

const FileDropzone = () => {

    const router = useRouter()
    const [progress, setProgress] = useState(0);

    const generateID = () => {
        return Math.random().toString(36).substr(2, 9)
    }

    const onDrop = useCallback(acceptedFiles => {
        let file = acceptedFiles[0]

        const refName = `${generateID()}_${file.name}`
        var storageRef = ref(getStorage(), refName)

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progress);
        }, (error) => {
            console.error(error)
        }, () => {
            router.push(`/${refName}`)
        });
    }, [])
    
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div {...getRootProps()}>
            {progress === 0 && (
                <input {...getInputProps()} />
            )}
            <Center cursor={progress === 0 && "pointer"}>
                {
                    isDragActive ?
                        <Icon fontSize="48px" as={FaCloudUploadAlt} /> :
                        <Icon fontSize="48px" as={MdMoveToInbox} />
                }
            </Center>
            {progress > 0 && <Circle size="48px" bg="blue.700" color="white" position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)">{progress.toFixed(0)}%</Circle>}
        </div>
    )
}

export default FileDropzone