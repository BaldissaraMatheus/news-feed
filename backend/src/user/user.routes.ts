import express, { Request, Response, NextFunction, } from 'express';
import userController from './user.controller';

const router = express.Router();

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { email, password } = req.body;
		if (!email) {
			return res.status(400).send('O campo "email" é obrigatório');
		}
		if (!password) {
			return res.status(400).send('O campo "password" é obrigatório');
		}
		const user = await userController.findByEmail(email);
		if (!user) {
			return res.status(404).send('Não foi encontrado nenhum usuário com este email');
		}
		const isPasswordCorrect = await userController.isPasswordCorrect(password, user.password);
		if (!isPasswordCorrect) {
			return res.status(401).send('Password incorreto');
		}
		const token = userController.generateToken(user._id.toHexString());
		res.status(200).send({ token });
	} catch (err) {
		console.log(err);
		return res.status(500).send('Ocorreu um erro inesperado');
	}
});

router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { email, password } = req.body;
		if (!email) {
			return res.status(400).send('O campo "email" é obrigatório');
		}
		if (!password) {
			return res.status(400).send('O campo "password" é obrigatório');
		}
		const foundUser = await userController.findByEmail(email);
		if (foundUser) {
			return res.status(409).send('Já existe um usuário cadastrado com este email');
		}
		const hashPassword = await userController.hashPassowrd(password);
		await userController.create({ email, password: hashPassword });
		return res.status(201).send({ success: true });
	} catch (err) {
		console.log(err);
		return res.status(500).send('Ocorreu um erro inesperado');
	}
});

export default router;
