import express, { Request, Response, NextFunction, } from 'express';
import userController from './user.controller';

const router = express.Router();

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { email, password } = req.body;
		if (!email) {
			return res.status(400).send('The field "email" is required');
		}
		if (!password) {
			return res.status(400).send('The field "password" is required');
		}
		const user = await userController.findByEmail(email);
		if (!user) {
			return res.status(404).send('We couldn\'t find any user with this email address');
		}
		const isPasswordCorrect = await userController.isPasswordCorrect(password, user.password);
		if (!isPasswordCorrect) {
			return res.status(401).send('The provided password is incorrect');
		}
		const token = userController.generateToken(user._id.toHexString());
		res.status(200).send({ token });
	} catch (err) {
		console.log(err);
		return res.status(500).send('An unexpected error occurred');
	}
});

router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { email, password } = req.body;
		if (!email) {
			return res.status(400).send('The field "email" is required');
		}
		if (!password) {
			return res.status(400).send('The field "password" is required');
		}
		const foundUser = await userController.findByEmail(email);
		if (foundUser) {
			return res.status(409).send('There is already a user registered with this email address');
		}
		const hashPassword = await userController.hashPassowrd(password);
		await userController.create({ email, password: hashPassword });
		return res.status(201).send({ success: true });
	} catch (err) {
		console.log(err);
		return res.status(500).send('An unexpected error occurred');
	}
});

export default router;
