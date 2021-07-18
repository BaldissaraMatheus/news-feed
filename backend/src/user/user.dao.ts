import driver from '../db';
import { Collection, ObjectId } from "mongodb";
import { IUser } from './user';

let collection: Collection<IUser>;

async function initCollection() {
	collection = await driver.getCollection('users');
}

async function findOne(query: Partial<IUser>) {
	await initCollection();
	return collection.findOne(query);
}

async function insertOne(query: Pick<IUser, 'email' | 'password'>) {
	await initCollection();
	return collection.insertOne(query);
}

export default {
	findOne,
	insertOne,
}