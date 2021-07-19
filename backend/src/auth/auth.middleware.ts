import userController from '../user/user.controller';
import { Request, Response, NextFunction, } from 'express';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'bson';

async function authenticate(req: Request, res: Response, next: NextFunction) {
	try {
		const token = req.headers.authorization?.split('Bearer ')[1];
		if (!token) {
			return res.status(401).send('Authorization token é obrigatório');
		}
		const decoded = jwt.decode(token) as { id: string, }
		if (!decoded) {
			return res.status(401).send('Authorization token inválido');
		}
		const { id } = decoded;
		if (!id) {
			return res.status(401).send('Authorization token inválido');
		}
		const isIdValid = ObjectId.isValid(id);
		if (!isIdValid) {
			return res.status(401).send('Authorization token inválido');
		}
		const user = await userController.findById(id);
		if (!user) {
			return res.status(401).send('Authorization token inválido');
		}
		return next();

	} catch (err) {
		console.log(err);
		res.status(500).send('Ocorreu um erro inesperado');
	}
}

export default authenticate;
