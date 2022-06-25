import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";


const useFirestore = (collectionName) => {
    const [docs, setDocs] = useState([])

    const q = query(collection(projectFirestore, collectionName), orderBy('createdAt', 'desc'))

    useEffect(() => {
        const unsub = onSnapshot(q, (snapshot) => {
            let documents = [];
            snapshot.forEach((doc) => {
                documents.push({...doc.data(), id: doc.id})
            })
            setDocs(documents)
        })

        return () => unsub()
    }, [collectionName])

    return { docs }
}

export default useFirestore