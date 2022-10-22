import express, { Request, Response } from "express";
import db from "../db";
const router = express.Router();

router.delete('/:id', async (req, res) => {
    if (db.data) {
        res.sendStatus(404);
        return;
    }
    let id: string = req.params.id;
});

export default router;