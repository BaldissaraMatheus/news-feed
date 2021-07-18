import { MongoClient, Db } from 'mongodb';

const uri = 'mongodb://mongodb:27017/local';

const state: {
	db: Db | null,
	client: MongoClient | null
} = {
	db: null,
	client: null,
}

async function connect() {
	console.log('conectando a ' + uri);
	return MongoClient
		.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then((client: MongoClient) => {
			state.client = client;
			state.db = client.db();
		})
		.catch((err: Error) => {	console.log(err) });
}

function getDb() {
	if (!state.db) {
		throw new Error('Connection lost');
	}
	return state.db;
}

async function getCollection(collectionName: string) {
	await connect();
	return getDb().collection(collectionName);
}

export default {
	getCollection,
}
