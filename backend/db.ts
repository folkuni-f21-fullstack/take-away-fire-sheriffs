import { Menu, Schema } from './models.js';
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { Low, JSONFile } from 'lowdb'
import { data as defaultData } from './defaultData.js';
const __dirname = dirname(fileURLToPath(import.meta.url))
const file = join(__dirname, 'data.json');
const adapter = new JSONFile<Schema>(file);
const db = new Low(adapter);

await db.read() 
if (!db.data) {
    db.data = defaultData;
    db.write(); 
}

export default db;