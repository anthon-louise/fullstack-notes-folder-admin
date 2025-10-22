import { Link, useNavigate } from 'react-router-dom'
import Button from './Button'
import { logoutUser } from '../services/userService'

function NavBar() {
    const navigate = useNavigate()

    const handleGoToHome = () => {
        navigate('/')
    }
    
    const handleLogout = async () => {
        const data = await logoutUser()
        alert(data.message)
        navigate('/login')
    }

    return (
        <div>
            <Button label='Home' onClick={handleGoToHome} type='button' />
            <Button label='Logout' onClick={handleLogout} type='button' />
        </div>
    )
}

export default NavBar