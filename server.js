import express from 'express'
import bcrypt from'bcrypt-nodejs'
import cors from'cors'
import knex from'knex'
import path from 'path';
import { fileURLToPath } from 'url';

import handleRegister from "./controllers/register.js";
import handleSignIn from "./controllers/signin.js";
import image from './controllers/image.js';
import handleProfileGet from './controllers/profile.js';

const db = knex({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      host : process.env.DATABASE_HOST,
      port : 5432,
      user : process.env.DATABASE_USER,
      password : process.env.DATABASE_PW,
      database : process.env.DATABASE_DB
    }
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express()
app.use(express.json())
app.use(cors())

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})
 
app.post('/signin', (req, res) => { handleSignIn(req, res, db, bcrypt) })

app.post('/register', (req, res) => { handleRegister(req, res, db, bcrypt) })

app.get('/profile/:id', (req, res) => { handleProfileGet(req, res, db) })

app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(3000, () => {
    console.log(`app is running on port 3000`);
})