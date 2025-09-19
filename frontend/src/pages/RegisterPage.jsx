import Button from "../components/Button"
import TextBox from "../components/TextBox"
import { useState } from "react"
import { registerUser } from "../services/userService"

function RegisterPage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    async function handleSubmit() {
        const credentials = {username, password}
        const data = await registerUser(credentials)
        if (data.success) {
            console.log("success")
        } else {
            console.log("unsuccess")
        }
        console.log(data)
    }
    return (
        <div>
            <TextBox label="Username" value={username} onChange={setUsername}/>
            <TextBox label="Password" value={password} onChange={setPassword}/>
            <Button label="Register" type="submit" onClick={handleSubmit}/>
        </div>
    )
}

export default RegisterPage