"use server"
import getCollection from '../lib/db';
import { ObjectId } from "mongodb";

interface FormData {
    name?: string;
    email?: string;
    phoneNo?: string;
    icNo?: string;
    dateOfBirth?: string;
    joinDate?: string;
}

export async function getAllUsers() {

    const usersCollection = await getCollection("users");
    let users = await usersCollection?.find().toArray();
    users = JSON.parse(JSON.stringify(users));
    return users;

}

export async function getUserById(id: string) {

    const usersCollection = await getCollection("users");
    const user = await usersCollection.findOne({ _id: new ObjectId(id) });
    return JSON.parse(JSON.stringify(user));

}

export async function submitUser(formData: FormData, id: string) {

    const usersCollection = await getCollection("users");

    if (!usersCollection) {
        throw new Error("Database connection failed");
    }

    const payload = {
        name: formData.name,
        email: formData.email,
        phoneNo: formData.phoneNo,
        icNo: formData.icNo,
        dateOfBirth: formData.dateOfBirth,
        joinDate: formData.joinDate,
    };

    if (id !== "new") {
        const updateResult = await usersCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: payload }
        );
        return JSON.parse(JSON.stringify(updateResult));

    } else {
        const insertResult = await usersCollection.insertOne(payload);
        return JSON.parse(JSON.stringify(insertResult));
    }


}

export async function getAllRoles() {

    const rolesCollection = await getCollection("roles");
    let roles = await rolesCollection?.find().toArray();
    roles = JSON.parse(JSON.stringify(roles));
    return roles;

}
