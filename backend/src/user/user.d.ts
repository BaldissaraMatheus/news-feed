import { ObjectId } from "bson";

export interface IUser {
	_id: ObjectId;
	email: string;
	password: string;
}