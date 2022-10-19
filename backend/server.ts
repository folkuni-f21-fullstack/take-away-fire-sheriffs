import express, { Request, Response } from 'express'
const app = express()
const PORT = 1337  // TODO: environment variables istället
import menuRoute from './routes/menu.js';
import usersRoute from './routes/users.js';
import ordersRoute from './routes/orders.js';

import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url));  // __dirname i äldre versioner av node
const staticPath = join( __dirname, '../../dist' )


// Middleware
app.use( express.json() ) // hanterar JSON i request body

// app.use( (req, res, next) => {
// 	console.log(`${req.method}  ${req.url} `, req.body)
// 	next()
// });

// Obs! express.static bör ligga först, när man får många statiska filer
app.use( express.static(staticPath) )


// Routes / endpoints
app.use('/api/menu', menuRoute);
app.use('/api/users', usersRoute);
app.use('/api/orders', ordersRoute);


app.get('/hello', (req: Request, res: Response) => {
	console.log('GET /hello - request received by server')
	// Vi kan svara med: send, sendFile
	res.send('Hejsan, funkar detta+?')
})

// Starta servern
app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}.`)
})