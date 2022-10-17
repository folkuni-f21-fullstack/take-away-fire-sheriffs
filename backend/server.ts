import express, { Request, Response } from 'express'
const app = express()

const PORT = 1337  // TODO: environment variables istället

import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url));  // __dirname i äldre versioner av node
const staticPath = join( __dirname, '../../dist' )


// Middleware
app.use( express.json() )

// app.use( (req, res, next) => {
//     console.log(`${req.method}  ${req.url} `, req.body)
//     next()
// } )

// Obs! express.static bör ligga först, när man får många statiska filer
app.use( express.static(staticPath) )

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}.`)
})