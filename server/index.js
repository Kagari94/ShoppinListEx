const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise')
const config = require('./config')

const port = 3001

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({extended:false}))

app.get("/",async (req,res) => {
    try {
        const connection = await mysql.createConnection(config.db)
        console.log(connection)
        const [result, ] = await connection.execute('SELECT * FROM item')
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send({error: error.message})
    }
})

app.listen(port)