const { MongoClient } = require("mongodb");
const UserRepository = require('./user-repository')


describe("UserRepository", () => {

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

    /**
     * roteiro de testes
     *
     * uma pratica boa chamada tdd fala de criar os testes antes da app
     * um passo antes disso, é escrever o roteiro de testes para definir
     * as operacoes que serao alvos de nossos testes
     */
    describe('findOneByEmail', () => {
        test("Deve retornar o usuário john@doe.com", async () => {
            const result = await collection.insertOne({
                name: 'John Doe',
                email: 'john@doe.com'
            })

            const user = await userRepository.findOneByEmail('john@doe.com')

            expect(user).toStrictEqual({
                _id: result.insertedId,
                name: 'John Doe',
                email: 'john@doe.com'
            })
        })

        test("Deve lançar uma exceção para um usuário não existente", async () => {
            await expect(userRepository.findOneByEmail('john@doe.com'))
                .rejects.toThrow('User with email john@doe.com does not exists')
        })
    })

    describe('insert', () => {
        test("Inserir um novo usuário", async () => {
            const user = await userRepository.insert({
                name: 'John Doe',
                email: 'john@doe.com'
            })

            const result = await userRepository.findOneByEmail('john@doe.com')

            expect(result).toStrictEqual(user)
        })
    })

    describe('update', () => {
        test.todo("Deve atualizar um usuário existente")
        test.todo("Deve lançar uma exceção para um usuário não existente")
    })

    describe('delete', () => {
        test("Deve remover um usuário existente", async () => {
            const user = await userRepository.insert({
                name: 'John Doe',
                email: 'john@doe.com'
            })

            await userRepository.delete(user._id)
            await expect(userRepository.findOneByEmail('john@doe.com'))
                .rejects.toThrow()
        })
        test("Deve lançar uma exceção para um usuário não existente", async () => {
            await userRepository.delete('iddddd')
            await expect(userRepository.findOneByEmail('john@doe.com'))
                .rejects.toThrow()
        })
    })

    describe('findAll', () => {
        test.todo("Deve retornar uma lista vazia de usuários")
        test.todo("Deve retornar uma lista contendo dois usuários")
    })

})