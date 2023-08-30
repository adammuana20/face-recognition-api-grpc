import express from 'express'
import bcrypt from'bcrypt-nodejs'
import cors from'cors'
import knex from'knex'

import handleRegister from "./controllers/register.js";
import handleSignIn from "./controllers/signin.js";
import { handleImage, handleApiCall } from './controllers/image.js';
import handleProfileGet from './controllers/profile.js';

const db = knex({
    client: 'pg',
    connection: {
      host : process.env.DATABASE_HOST,
      port : 5432,
      user : process.env.DATABASE_USER,
      password : process.env.DATABASE_PW,
      database : process.env.DATABASE_DB
    }
});

const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Success')
})
 
app.post('/signin', (req, res) => { handleSignIn(req, res, db, bcrypt) })

app.post('/register', (req, res) => { handleRegister(req, res, db, bcrypt) })

app.get('/profile/:id', (req, res) => { handleProfileGet(req, res, db) })

app.put('/image', (req, res) => { handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { handleApiCall(req, res) })

app.listen(3000, () => {
    console.log('app is running on port 3000');
})