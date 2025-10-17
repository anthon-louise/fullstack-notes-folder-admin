import {Link} from 'react-router-dom'

function FolderList({ folders }) {
    return (
        <div>
            <h2>Folders📂</h2>
            <ul>
                {
                    folders.map((folder) => (
                        <li key={folder.id}>
                            <Link to={`folder/${folder.id}`}>{folder.name}</Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default FolderList