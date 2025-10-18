import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchNotes } from "../services/folderService"
import NoteList from "../components/NoteList"

function FoldersPage() {
    const {folderId} = useParams()
    const [notes, setNotes] = useState([])

    const handleFetchNotes = async () => {
        const id = folderId
        const data = await fetchNotes(id)
        setNotes(data.data)
    }

    useEffect(() => {
        handleFetchNotes()
    }, [])

    return (
        <div>
            <h1>{folderId}</h1>
            <NoteList notes={notes}/>
        </div>
    )
}

export default FoldersPage