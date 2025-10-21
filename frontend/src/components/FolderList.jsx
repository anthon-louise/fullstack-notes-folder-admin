import { Link } from 'react-router-dom'
import Button from './Button'
import { useState } from 'react'
import TextBox from './TextBox'

function FolderList({ folders, handleDeleteFolder, handleUpdateFolder }) {
    const [activeInput, setActiveInput] = useState(null)
    const [folderName, setFolderName] = useState('')

    const switchActiveInput = (id) => {
        setActiveInput(id)
    }

    return (
        <div>
            <h2>Folders📂</h2>
            <ul>
                {
                    folders.map((folder) => (
                        activeInput === folder.id ? (
                            <li key={folder.id}>
                                <TextBox label="Folder Name" value={folderName} onChange={setFolderName}/>
                                <Button type="button" label="update" onClick={() => {
                                    handleUpdateFolder(folder.id, folderName)
                                    switchActiveInput(null)
                                }} />
                                <Button type="button" label="cancel" onClick={
                                    () => {
                                        switchActiveInput(null)
                                    }
                                } />
                            </li>
                        ) : (
                            <li key={folder.id}>
                                <Link to={`folder/${folder.id}`}>{folder.name}</Link>
                                <Button type="button" label="delete" onClick={() => {
                                    handleDeleteFolder(folder.id)
                                }} />
                                <Button type="button" label="update" onClick={
                                    () => {
                                        switchActiveInput(folder.id)
                                        setFolderName(folder.name)
                                    }
                                    }  />
                            </li>
                        )

                    ))
                }
            </ul>
        </div>
    )
}

export default FolderList