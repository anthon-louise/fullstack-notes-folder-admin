import Button from './Button'
import TextBox from './TextBox'
import { useState } from 'react'

function NoteList({ notes, handleDeleteNote, handleUpdateNote }) {
    const [isActiveInput, setIsActiveInput] = useState(null)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const switchActiveInput = (id) => {
        setIsActiveInput(id)
    }

    return (
        <div>
            <ul>
                {
                    notes.map((note) => (
                        isActiveInput === note.id ? (
                            <div key={note.id}>
                                <TextBox label="title" value={title} onChange={setTitle} /> <br />
                                <TextBox label="content" value={content} onChange={setContent} /> <br />
                                <Button label="Update" type="button" onClick={() => {
                                    handleUpdateNote(title, content, note.id)
                                    switchActiveInput(null)
                                }} />
                                <Button label="Cancel" type="button" onClick={
                                    () => {
                                        switchActiveInput(null)
                                    }
                                } />
                            </div>

                        ) : (
                            <li key={note.id}>
                                <h3>{note.title}</h3>
                                <div>
                                    {note.content}
                                    <Button label="Delete" type="button" onClick={() => {
                                        handleDeleteNote(note.id)
                                    }} />
                                    <Button label="Update" type="button" onClick={
                                        () => {
                                            setTitle(note.title)
                                            setContent(note.content)
                                            switchActiveInput(note.id)
                                        }
                                    } />
                                </div>
                            </li>
                        )

                    ))
                }
            </ul>
        </div>
    )
}

export default NoteList