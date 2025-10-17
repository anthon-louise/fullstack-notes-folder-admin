import Button from "../components/Button"
import TextBox from "../components/TextBox"
import FolderList from "../components/FolderList"
import { useState, useEffect } from "react"
import { createFolder, fetchFolders } from "../services/folderService"

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
        alert(data.message)
        setFolderName("")
        switchActiveInput()
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
                <FolderList folders={folders}/>
            </div>

        </div>
    )
}

export default HomePage