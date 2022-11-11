describe("UserApi", () => {
    describe("/users", () => {
        describe("GET /", () => {
            test.todo("Deve retornar uma lista vazia de usuarios")
            test.todo("Deve retornar uma lista contendo dois usuarios")
        })

        describe("POST /", () => {
            test.todo("Deve incluir um usuário no banco")
            test.todo("Não deve permitir a inclusão de usuários com e-mail existente no banco")
        })
    })

    describe("/users/:id", () => {
        describe("GET /", () => {
            test.todo("Deve retornar os dados de um usuario")
            test.todo("Deve retornar 404 para um usuário não existente")
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