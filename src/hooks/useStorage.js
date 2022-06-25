import { useState, useEffect } from "react";
import { projectStorage, projectFirestore } from "../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";


const useStorage = (file) => {
    const [progress, setProgress] = useState(0)
    const [error, setError] = useState(null)
    const [url, setUrl] = useState(null)

    useEffect(() => {
        // references
        const storageRef = ref(projectStorage, file.name)

        uploadBytesResumable(storageRef, file).on('state_changed', (snap) => {
            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100
            setProgress(percentage)
        }, (err) => {
            setError(err)
        }, async () => {
            const url = await getDownloadURL(storageRef)
            setUrl(url)
            const createdAt = serverTimestamp()
            await addDoc(collection(projectFirestore, 'images'), { url, createdAt })
        })
    }, [file])

    return { progress, url, error }
}

export default useStorage