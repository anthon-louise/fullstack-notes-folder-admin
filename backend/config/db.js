const { createConnection } = require('mysql2')
const mysql = require('mysql2/promise')

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.NAME,
    password: process.env.PASSWORD,
    connectionLimit: 10,
    queueLimit: 0,
    waitForConnections: true
})

async function initializeDatabase() {
    try {
        const connection = await pool.getConnection()

        await connection.query(`
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255),
            password TEXT
        )
        `)

        await connection.query(`
        CREATE TABLE IF NOT EXISTS folders (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            user_id INT,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
            `)


        await connection.query(`
            CREATE TABLE IF NOT EXISTS notes (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255),
                content VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                user_id INT,
                folder_id INT,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ,
                FOREIGN KEY (folder_id) REFERENCES folders(id) ON DELETE CASCADE 
            )
            `)

        await connection.query(`
            CREATE TABLE IF NOT EXISTS admins (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255),
            password TEXT
            )
            `)

        connection.release()
        console.log('Database connected')
    } catch (err) {
        throw new Error(`Database Initialization Error: ${err.message}`)
    }



}

initializeDatabase()

module.exports = pool