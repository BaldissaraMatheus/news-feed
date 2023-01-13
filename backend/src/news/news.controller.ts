import { ObjectId } from "bson";
import { INews } from "./news";
import newsDao from "./news.dao";

async function findAll(
	skip: number,
	limit: number,
	search?: string,
): Promise<{ news: INews[], total: number }> {
	const query = search
		? {
			$or: [
				{ content: { '$regex': search, '$options': 'i' } },
				{	title: { '$regex': search, '$options': 'i' } }
			]
		}
		: {};
	const newsPromise = newsDao.findAll(query, skip, limit);
	const countPromise = newsDao.count();
	const result = await Promise.all([newsPromise, countPromise]);
	return {
		news: result[0],
		total: result[1],
	}
}

async function findbyId(id: string) {
	const objectId = new ObjectId(id);
	return newsDao.findOne({ _id: objectId });
}

async function create(title: string, content: string) {
	const createdAt = new Date();
	return newsDao.insertOne({ title, content, createdAt });
}

async function updateById(id: string, valuesToUpdate: Pick<INews, 'title' | 'content'>) {
	const objectId = new ObjectId(id);
	const body: Partial<INews> = {};
	if (valuesToUpdate.content) {
		body.content = valuesToUpdate.content;
	}
	if (valuesToUpdate.title) {
		body.title = valuesToUpdate.title;
	}
	return newsDao.updateOne({ _id: objectId }, body);
}

async function deleteById(id: string) {
	const objectId = new ObjectId(id);
	const result = await newsDao.remove({ _id: objectId });
	if (result.result.n === 0) {
		return false;
	}
	return true;
}

export default {
	findAll,
	findbyId,
	create,
	updateById,
	deleteById,
}