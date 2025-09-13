import Button from "../components/Button"
import TextBox from "../components/Input"
import { useState } from "react"

function HomePage() {
    const [activeFolderInput, setactiveFolderInput] = useState(true)
    return (
        <div>
            <h3>Notes</h3>
            {
                activeFolderInput ? (
                    <div>
                        <TextBox label="Create Folder" />
                        <Button type="submit" label="Create Folder"/>
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