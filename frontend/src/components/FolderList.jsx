import {Link} from 'react-router-dom'
import Button from './Button'

function FolderList({ folders, handleDeleteFolder }) {
    return (
        <div>
            <h2>Folders📂</h2>
            <ul>
                {
                    folders.map((folder) => (
                        <li key={folder.id}>
                            <Link to={`folder/${folder.id}`}>{folder.name}</Link>
                            <Button type="button" label="delete" onClick={() => {
                                handleDeleteFolder(folder.id)
                            }}/>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default FolderList