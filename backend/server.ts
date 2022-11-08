import express, { Request, Response } from 'express'
const app = express()
const PORT = process.env.PORT || 8080;  
import menuRoute from './routes/menu.js';
import usersRoute from './routes/users.js';
import ordersRoute from './routes/orders.js';

import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url));  
const staticPath = join( __dirname, '../../dist' )
import cors from 'cors';



app.use( express.json() ) 




app.use( express.static(staticPath) )
app.use(cors({ origin: '*' }));



app.use('/api/menu', menuRoute);
app.use('/api/users', usersRoute);
app.use('/api/orders', ordersRoute);


app.get('/hello', (req: Request, res: Response) => {
	console.log('GET /hello - request received by server')
	
	res.send('Hejsan, funkar detta+?')
})


app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}.`)
})