import { useState, useEffect } from "react";
import { projectStorage } from "../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


const useStorage = (file) => {
    const [progress, setProgress] = useState(0)
    const [error, setError] = useState(null)
    const [url, setUrl] = useState(null)

    useEffect(() => {
        // references
        const storageRef = ref(projectStorage, file.name)

        uploadBytes(storageRef, file).on('state_changed', (snap) => {
            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100
            setProgress(percentage)
        }, (err) => {
            setError(err)
        }, async () => {
            const url = await getDownloadURL(storageRef)
            setUrl(url)
        })
    }, [file])

    return { progress, url, error }
}

export default useStorage