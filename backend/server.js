require('dotenv').config()
const express = require('express')


const app = express()

const port = process.env.PORT
console.log(port)

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})