import Button from "../components/Button"
import TextBox from "../components/TextBox"
import FolderList from "../components/FolderList"
import NavBar from "../components/NavBar"
import { useState, useEffect } from "react"
import { createFolder, fetchFolders, deleteFolder, updateFolder } from "../services/folderService"

function HomePage() {
    const [folderName, setFolderName] = useState('')
    const [activeFolderInput, setactiveFolderInput] = useState(true)
    const [folders, setFolders] = useState([])

    const handleCreateFolder = async () => {
        const data = await createFolder(folderName)
        if (data.success) {
            console.log("success")
        } else {
            console.log("unsuccess")
        }
        fetchFolder()
        alert(data.message)
        setFolderName("")
        switchActiveInput()
    }

    const handleDeleteFolder = async (id) => {
        const data = await deleteFolder(id)
        alert(data.message)
        fetchFolder()
    }

    const handleUpdateFolder = async (id, newFolderName) => {
        const data = await updateFolder(id, newFolderName)
        alert(data.message)
        fetchFolder()
    }

    const fetchFolder = async () => {
        const data = await fetchFolders()
        setFolders(data.data)
    }


    const switchActiveInput = () => {
        setactiveFolderInput(!activeFolderInput)
    }

    useEffect(() => {
        fetchFolder()
    }, [])

    return (
        <div>
            <NavBar/>
            <h3>Notes</h3>
            {
                activeFolderInput ? (
                    <div>
                        <Button label="Create Folder" type="submit" onClick={switchActiveInput}/>
                    </div>
                )
                    :
                    (
                    <div>
                        <TextBox label="Create Folder" value={folderName} onChange={setFolderName}/>
                        <Button type="submit" label="Save" onClick={handleCreateFolder}/>     
                        <Button label="Cancel" type="submit" onClick={switchActiveInput}/>
                    </div>
                    )
            }
            <div>
                <FolderList folders={folders} handleDeleteFolder={handleDeleteFolder} handleUpdateFolder={handleUpdateFolder}/>
            </div>

        </div>
    )
}

export default HomePage