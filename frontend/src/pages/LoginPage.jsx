import { useState } from "react"
import { loginUser } from "../services/userService"
import TextBox from "../components/TextBox"
import Button from "../components/Button"

function LoginPage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async () => {
        const credentials = { username, password }
        const data = await loginUser(credentials)
        if (data.success) {
            console.log("success")
        } else {
            console.log("unsuccess")
        }
        console.log(data)
    }
    return (
        <div>
            <TextBox label='username' value={username} onChange={setUsername} />
            <TextBox label='password' value={password} onChange={setPassword} />
            <Button label='login' type='submit' onClick={handleLogin} />
        </div>
    )
}


export default LoginPage