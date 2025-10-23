import axios from 'axios'
const API_URL = 'http://localhost:5000/users'

export async function registerUser(credentials) {
    try {
        const res = await axios.post(`${API_URL}/register`, credentials, {withCredentials: true})
        return res.data
    } catch (err) {
        if (err.response && err.response.data) {
            return err.response.data
        }
        return {success: false, message: err.message}
    }
}

export async function loginUser(credentials) {
    try {
        const res = await axios.post(`${API_URL}/login`, credentials, {withCredentials: true})
        return res.data
    } catch (err) {
        if (err.response && err.response.data) {
            return err.response.data
        }
        return {success: false, message: err.message}
    } 
}

export async function logoutUser() {
    try {
        const res = await axios.post(`${API_URL}/logout`, {}, {withCredentials: true})
        return res.data
    } catch (err) {
        if (err.response && err.response.data) {
            return err.response.data
        }
        return {success: false, message: err.message}
    }
}

export async function verifyUser() {
    try {
        const res = await axios.get(`${API_URL}/verify`, {withCredentials: true})
        return res.data
    } catch (err) {
        if (err.response && err.response.data) {
            return err.response.data
        }
        return {success: false, message: err.response.data}
    }
}