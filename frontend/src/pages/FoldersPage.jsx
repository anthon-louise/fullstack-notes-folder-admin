import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchNotes } from "../services/folderService"
import NoteList from "../components/NoteList"
import TextBox from "../components/TextBox"
import Button from "../components/Button"
import { createNote, deleteNote, updateNote } from "../services/noteService"


function FoldersPage() {
    const {folderId} = useParams()
    const [notes, setNotes] = useState([])
    const [isActiveInput, setIsActiveInput] = useState(false)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const handleSubmit = async () => {
        const data = await createNote({title, content}, folderId)
        alert(data.message)
        switchActiveInput()
        handleFetchNotes()
    }

    const handleFetchNotes = async () => {
        const id = folderId
        const data = await fetchNotes(id)
        setNotes(data.data)
    }

    const switchActiveInput = async () => {
        setIsActiveInput(!isActiveInput)
    }

    const handleDeleteNote = async (id) => {
        const data = await deleteNote(id)
        alert(data.message)
        handleFetchNotes()
    }
    
    const handleUpdateNote = async (title, content, id) => {
        const data = await updateNote(title, content, id)
        console.log(data)
        handleFetchNotes()
    }

    useEffect(() => {
        handleFetchNotes()
    }, [])

    return (
        <div>
            {
                isActiveInput ?
                (
                    <div>
                        <TextBox label="Note title" value={title} onChange={setTitle}/>
                        <br />
                        <TextBox label="Note content" value={content} onChange={setContent}/>
                        <br />
                        <Button type="submit" label="Submit" onClick={handleSubmit}/>
                        <Button type="submit" label="Cancel" onClick={switchActiveInput}/>
                    </div>
                ) : (
                    <div>
                        <Button type="submit" label="Create note" onClick={switchActiveInput}/>
                    </div>
                )
                
            }
            <NoteList notes={notes} handleDeleteNote={handleDeleteNote} handleUpdateNote={handleUpdateNote}/>
        </div>
    )
}

export default FoldersPage