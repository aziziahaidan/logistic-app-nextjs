
"use server"
import { MongoClient, ServerApiVersion } from "mongodb";

console.log(process.env.DB_URI)

if (!process.env.DB_URI) {
    throw new Error('Mongo URI not found');
}

const client = new MongoClient(process.env.DB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
})

async function getDB(dbName) {
    try {
        await client.connect();
        console.log(" --- Connected To Db --- ");
        return client.db(dbName);
    }
    catch (e) {
        console.error(e);
    }

}

export default async function getCollection(collectionName) {
    const db = await getDB("logistics_app");
    if (!db) return db.collection(collectionName)

    return db.collection(collectionName);

}