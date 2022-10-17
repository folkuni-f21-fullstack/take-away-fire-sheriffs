import express, { Request, Response } from 'express'
const app = express()
const PORT = 1337  // TODO enviroment variables istället ?? 


import { data } from 'data.json'

import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url));
const staticPath = join( __dirname, '../../dist' )



app.use( express.json() )


// app.use ( (req, res next) => {
//     console.log(`${req.method}  ${req.url} `, req.body)
// 	next()
// })

app.use( express.static(staticPath) )

// GET 

app.get('/', (req,res) => {
    res.send()
})


app.get('/about', (req,res) => {
    res.send()
})

app.get('/menu', (req,res) => {
    res.send()
})

app.get('/orders', (req,res) => {
    res.send()
})

app.get('/admin', (req,res) => {
    res.send()
})



// POST  add new order  

app.post('/api/?', (req,res) => {

})



// PUT


// DELETE 


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}.`);
    
})

