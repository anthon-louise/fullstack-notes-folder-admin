function NoteList({ notes }) {
    return (
        <div>
            <ul>
                {
                    notes.map((note) => (
                        <li key={note.id}>
                            <h3>{note.title}</h3>
                            <p>{note.content}</p>
                        </li>
                    ))
                }

            </ul>


        </div>
    )
}

export default NoteList