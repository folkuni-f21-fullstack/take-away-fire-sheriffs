import express, { Request, Response } from "express";
const router = express.Router();

import db from '../db.js';
import { data as defaultData } from '../defaultData.js';

router.get('/', (req, res) => {
    console.log('hejhej');
    if (db.data) {
        // console.log(db.data.menu);
        
        res.json(db.data.menu);
    } else {
        // console.log('hejhej');
        res.sendStatus(404);
    }
})

export default router;