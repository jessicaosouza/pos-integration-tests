const request = require('supertest')
const app = require('./app')
const { MongoClient } = require("mongodb");
const UserRepository = require('./user-repository')

describe("UserApi", () => {
    let userRepository;
    let collection;
    let dbclient;

    // credenciais mongo
    // admina
    // nT2X2EA31xc0UjVh

    beforeAll(async () => {
        const uri = 'mongodb+srv://admina:nT2X2EA31xc0UjVh@cluster0.hp7msk8.mongodb.net/?retryWrites=true&w=majority'
        dbclient = new MongoClient(uri)
        await dbclient.connect();
        collection = dbclient.db('users_db').collection('users')
        userRepository = new UserRepository(collection)
    })

    afterAll(async () => {
        await dbclient.close()
    })

    beforeEach(async () => {
        await collection.deleteMany()
    })

    describe("/users", () => {
        describe("GET /", () => {
            test("Deve retornar uma lista vazia de usuarios", async () => {
                const response = await request(app).get('/users')
                expect(response.statusCode).toBe(200)
                expect(response.body).toStrictEqual([])
            })

            test("Deve retornar uma lista contendo dois usuarios", async () => {
                await userRepository.insert({
                    name: 'John Doe',
                    email: 'john@doe.com'
                })
                await userRepository.insert({
                    name: 'Jane Doe',
                    email: 'jane@doe.com'
                })

                const response = await request(app).get('/users')
                expect(response.statusCode).toBe(200)
                expect(response.body[0]).toEqual(expect.objectContaining({
                    name: 'John Doe',
                    email: 'john@doe.com'
                }))
                expect(response.body[1]).toEqual(expect.objectContaining({
                    name: 'Jane Doe',
                    email: 'jane@doe.com'
                }))
            })
        })

        describe("POST /", () => {
            test("Deve incluir um usuário no banco", async () => {
                const response = await request(app).post('/users').send({
                    name: 'Uilza Alves',
                    email: 'uilza.alves@gmail.com'
                })
                expect(response.statusCode).toBe(201)
                const user = await userRepository.findOneByEmail('uilza.alves@gmail.com')
                expect(user).toEqual(expect.objectContaining({
                    name: 'Uilza Alves',
                    email: 'uilza.alves@gmail.com'
                }))
            })
            test.todo("Não deve permitir a inclusão de usuários com e-mail existente no banco")
        })
    })

    describe("/users/:id", () => {
        describe("GET /", () => {
            test("Deve retornar os dados de um usuario", async () => {
                const user = await userRepository.insert({
                    name: 'John Doe',
                    email: 'john@doe.com'
                })

                const response = await request(app).get(`/users/${user._id}`)

                expect(response.statusCode).toBe(200)
                expect(response.body).toEqual(expect.objectContaining({
                    name: 'John Doe',
                    email: 'john@doe.com'
                }))

            })

            test("Deve retornar 404 para um usuário não existente", async () => {
                const response = await request(app).get(`/users/45353trets`)
                expect(response.statusCode).toBe(404)
            })
        })

        describe("PUT /", () => {
            test.todo("Deve atualizar os dados de um usuario")
            test.todo("Deve retornar 404 para um usuário não existente")
        })

        describe("DELETE /", () => {
            test.todo("Deve remover um usuario")
            test.todo("Deve retornar 404 para um usuário não existente")
        })
    })
})




//delete /users/:id -> remover usuario