import Button from "../components/Button"
import TextBox from "../components/Input"
import { useState } from "react"
import { createFolder } from "../services/folderService"

function HomePage() {
    const [folderName, setFolderName] = useState('')
    const [activeFolderInput, setactiveFolderInput] = useState(true)


    const handleCreateFolder = async () => {
        const data = await createFolder(folderName)
        if (data.success) {
            console.log('suc')
        } else {
            console.log('unsuc')
        }
        console.log(data)
    }

    return (
        <div>
            <h3>Notes</h3>
            {
                activeFolderInput ? (
                    <div>
                        <TextBox label="Create Folder" value={folderName} onChange={setFolderName}/>
                        <Button type="submit" label="Create Folder" onClick={handleCreateFolder}/>
                    </div>
                )
                    :
                    (
                        <p>hello</p>
                    )
            }

        </div>
    )
}

export default HomePage