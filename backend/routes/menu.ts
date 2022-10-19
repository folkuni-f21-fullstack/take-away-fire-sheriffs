import express, { Request, Response } from "express";
const router = express.Router();

import db from '../db.js';
import { data as defaultData } from '../defaultData.js';

router.get('/', (req, res) => {

    if (db.data) {
        res.send(db.data.menu);
    } else {
        res.sendStatus(404);
    }
})

export default router;