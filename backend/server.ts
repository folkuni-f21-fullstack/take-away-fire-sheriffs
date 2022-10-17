import express, { Request, Response } from 'express'
const app = express()
const PORT = 1337  // TODO enviroment variables istället ?? 


import { data } from 'data.json'

import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url));
const staticPath = join( __dirname, '../../dist' )



app.use( express.json() )


app.use ( (req, res ,next) => {
    console.log(`${req.method}  ${req.url} `, req.body)
	next()
})

app.use( express.static(staticPath) )



// Routes / endpoints
// Exempel: frontend skickar "GET /api/data", backend tar emot och servar ett svar
// HTTP methods: GET, POST, PUT, DELETE -> motsvarar CRUD = Create, Read, Update, Delete
// Dessa fyra används när vi bygger ett RESTful API
// GET    - hämta data
// POST   - lägga till ny data
// PUT    - uppdatera data
// DELETE - ta bort data

// GET 


// Landing page
app.get('/', (req, res) => {
    res.send()
})


// About page
app.get('/about', (req, res) => {
    res.send()
})

// Menu page

app.get('/menu', (req, res) => {
    res.send()
})

// Orders page

app.get('/orders', (req, res) => {
    res.send()
})

// Admin page

app.get('/admin', (req, res) => {
    res.send()
})



// POST  

// Add new order  

app.post('/api/.....', (req, res) => {
     let newOrder = ??? = req.body
})

// Add new customer

app.post('/api/...', (req, res) => {
    let newCustomer = ???  = req.body
})

// PUT

// Update order to kitchen

app.put('/api/', (req,res) => {

})


// DELETE 

// Delete order or product

app.delete('/api/:id', (req, res) => {

})



app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}.`);
    
})

