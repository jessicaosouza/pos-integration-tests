const ObjectId = require('mongodb').ObjectId;

class UserRepository {
    constructor(collection) {
        this.collection = collection
    }

    async findAll(){
        const cursor = this.collection.find({})
        const users = await cursor.toArray();
        return users
    }

    async findOneByEmail(email){
        const user = await this.collection.findOne({email: email})

        if(user === null){
            throw new Error(`User with email ${email} does not exists`)
        }

        return user
    }

    async findOneById(id){
        const user = await this.collection.findOne({_id:id})

        if(user === null){
            throw new Error(`User with id ${id} not exists`)
        }

        return user
    }

    async insert(user){
        await this.collection.insertOne(user)
        return user
    }

    async delete(id){
        await this.collection.deleteOne({_id:id})
    }

    async update(filter, update){
        await this.collection.updateOne(filter, { $set: update});
    }
}

module.exports = UserRepository