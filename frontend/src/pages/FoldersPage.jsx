import { useParams } from "react-router-dom"

function FoldersPage() {
    const {folderId} = useParams()

    return (
        <div>
            <h1>{folderId}</h1>
        </div>
    )
}

export default FoldersPage