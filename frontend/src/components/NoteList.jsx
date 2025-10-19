import Button from './Button'
function NoteList({ notes, handleDeleteNote }) {
    return (
        <div>
            <ul>
                {
                    notes.map((note) => (
                        <li key={note.id}>
                            <h3>{note.title}</h3>
                            <p>{note.content}<Button label="Delete" type="button" onClick={() => {
                                handleDeleteNote(note.id)
                            }}/></p>
                        </li>
                    ))
                }

            </ul>


        </div>
    )
}

export default NoteList