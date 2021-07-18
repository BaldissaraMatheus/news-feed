import { ObjectId } from "mongodb";

export interface INews {
	_id: ObjectId;
	title: string;
	content: string;
	createdAt: Date;
}