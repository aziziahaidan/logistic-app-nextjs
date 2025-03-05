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
    roleId?: string;
    position?:string
}

export async function getAllUsers() {

    const usersCollection = await getCollection("users");

    // let users = await usersCollection?.find().toArray(); // get all

    let users = await usersCollection.aggregate([
        {
          $lookup: {
            from: "roles",
            localField: "roleId",
            foreignField: "_id",
            as: "role"
          }
        },
        { 
          $unwind: { 
            path: "$role", 
            preserveNullAndEmptyArrays: true // allows missing roles
          } 
        },
        {
          $addFields: {
            role: { $ifNull: ["$role", {}] } // cant find role return {}
          }
        }
      ]).toArray();

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
        roleId: formData.position ? new ObjectId(formData.position) : undefined
    };

    try {
        let result;
        if (id !== "new") {
            const updateResult = await usersCollection.updateOne(
                { _id: new ObjectId(id) },
                { $set: payload }
            );
            result = updateResult;
        } else {
            const insertResult = await usersCollection.insertOne(payload);
            result = insertResult;
        }

        // Check if the operation was successful
        if (result.acknowledged) {
            return {
                status: 200,
                message: id !== "new" ? "User updated successfully" : "User added successfully",
                data: result
            };
        } else {
            return {
                status: 500,
                message: "Operation not acknowledged by the database"
            };
        }

    } catch (e) {
        console.error("Error in submitUser:", e);
        return {
            status: 500,
            message: "Internal server error",
            error: "Error in submitUser:"
        };
    }
}

export async function getAllRoles() {

    const rolesCollection = await getCollection("roles");
    let roles = await rolesCollection?.find().toArray();
    roles = JSON.parse(JSON.stringify(roles));
    return roles;

}
