function NoteList({ notes }) {
    return (
        <div>
            <ul>
                {
                    notes.map((note) => (
                        <li key={note.id}>{note.title}</li>
                    ))
                }

            </ul>


        </div>
    )
}

export default NoteList