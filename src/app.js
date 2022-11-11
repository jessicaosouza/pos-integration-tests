const bodyParser = require('body-parser');
const express = require('express')
const { MongoClient } = require("mongodb");
const UserRepository = require('./user-repository')

const app = express()

app.use(bodyParser.json())

let userRepository;
let connected = false;
let dbclient;

app.use(async (req, res, next) => {
    if(!connected) {
        const uri = 'mongodb+srv://admina:nT2X2EA31xc0UjVh@cluster0.hp7msk8.mongodb.net/?retryWrites=true&w=majority'
        dbclient = new MongoClient(uri)
        await dbclient.connect();
        collection = dbclient.db('users_db').collection('users')
        userRepository = new UserRepository(collection)
        connected = true
    }
    next()
})

app.get('/users', async (request, response) => {
    const users = await userRepository.findAll()
    response.status(200).json(users)
})

app.get('/users/:id', async (request, response) => {
    try {
        const user = await userRepository.findOneById(ObjectId(request.params.id))
        response.json(user)
    } catch (error) {
        response.status(404).send()
    }
})

app.post('/users', async (request, response) => {
    const user = await userRepository.insert(request.body)
    response.status(201).json(user)
})

module.exports = app