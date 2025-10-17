import axios from 'axios'
const API_URL = 'http://localhost:5000/folders'

export async function createFolder(folderName) {
    try {
        const res = await axios.post(`${API_URL}`, {name: folderName}, {withCredentials: true})
        return res.data
    } catch (err) {
        if (err.response && err.response.data) {
            return err.response.data
        }
        return {success: false, message: err.message}
    }
}

export async function fetchFolders() {
    try {
        const res = await axios.get(`${API_URL}`, {withCredentials: true})
        return res.data
    } catch (err) {
        if (err.response && err.response.data) {
            return err.response.data
        }
        return {success: false, message: err.message1}
    }
}