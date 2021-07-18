import { INews } from "./news";
// import { InsertOneWriteOpResult, ObjectId, UpdateWriteOpResult } from 'mongodb';
import driver from '../db';
import { Collection, ObjectId } from "mongodb";

let collection: Collection<INews>;

async function initCollection() {
	collection = await driver.getCollection('news');
}

// TODO ordenar por data
async function findAll(
	query: Record<string, unknown> = {},
	skip: number,
	limit: number,
): Promise<INews[]> {
	await initCollection();
	return collection
		.find(query)
		.skip(skip)
		.limit(limit)
		.sort({ createdAt: -1 })
		.toArray();
}

async function count(findQuery?: Partial<INews>): Promise<number> {
	await initCollection();
	return collection.countDocuments();
}

async function findOne(query: Record<string, unknown>) {
	await initCollection();
	return collection.findOne(query);
}

async function insertOne(query: Pick<INews, 'title' | 'content' | 'createdAt'>) {
	await initCollection();
	return collection.insertOne(query);
}

async function updateOne(findQuery: Partial<INews>, updateQuery: Partial<INews>) {
	await initCollection();
	return collection.updateOne(findQuery, { $set: { ...updateQuery } });
}

async function remove(query: Record<string, unknown>) {
	await initCollection();
	return collection.remove(query);
}

export default {
	findAll,
	count,
	findOne,
	insertOne,
	updateOne,
	remove,
}