import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import userDao from './user.dao';
import { IUser } from './user';
import { ObjectId } from 'bson';

function generateToken(id: string) {
	return jwt.sign({ id }, 'segredo');
}

async function hashPassowrd(password: string) {
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt);
	return hash;
}

async function isPasswordCorrect(password: string, hash: string) {
	return bcrypt.compare(password, hash);
}

async function findByEmail(email: string) {
	return userDao.findOne({ email });
}

async function findById(id: string) {
	const _id = new ObjectId(id);
	return userDao.findOne({ _id });
}

async function create(user: Pick<IUser, 'email' | 'password'>) {
	return userDao.insertOne(user);	
}

export default {
	generateToken,
	findByEmail,
	findById,
	hashPassowrd,
	isPasswordCorrect,
	create,
}