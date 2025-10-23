import {useEffect, useState} from 'react'
import {Navigate} from 'react-router-dom'
import { verifyUser } from '../services/userService'

function ProtectedRoute({children}) {
    const [isAuth, setIsAuth] = useState(null)

    useEffect(() => {
        const checkAuth = async () => {
            const data = await verifyUser()
            setIsAuth(data.success)
        }
        checkAuth()
    }, [])

    if (isAuth === null) return <p>Authenticating...</p>
    if (!isAuth) return <Navigate to="/login" replace/>
    return children
}

export default ProtectedRoute