import { useState } from "react"
import { loginUser } from "../services/userService"
import { useNavigate } from "react-router-dom"
import TextBox from "../components/TextBox"
import Button from "../components/Button"

function LoginPage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = async () => {
        const credentials = { username, password }
        const data = await loginUser(credentials)
        if (data.success) {
            alert("login success")
            navigate('/')

        } else {
            alert("login unsuccess")
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