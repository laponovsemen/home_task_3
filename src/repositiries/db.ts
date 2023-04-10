import {MongoClient} from 'mongodb'
import dotenv from 'dotenv'
dotenv.config()

const mongoUri = process.env.MONGO_URL  || "mongodb://localhost:27017/?maxPoolSize=20&w=majority"

console.log(mongoUri)
export const client = new MongoClient(mongoUri)

export const blogsCollection = client.db("blogs").collection('blogs')

export async function runDB(){
    try{
        await client.connect()
        await client.db("blogs").command({ping : 1})
        console.log("connected successfully to Mongo server")
    } catch(e) {
        console.log("cant connect to mongo server", e)
        await client.close()
    }
}