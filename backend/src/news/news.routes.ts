import { ObjectId } from 'mongodb';
import express, { Request, Response, NextFunction, } from 'express';
import newsController from './news.controller';
import authenticate from '../auth/auth.middleware';

const router = express.Router();

router.get('/', authenticate, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { skip, limit } = req.query;
		const skipNumber = skip ? Number.parseInt(skip.toString()) : 0;
		const limitNumber = limit ? Number.parseInt(limit.toString()) : 20;
		const { news, total } = await newsController.findAll(skipNumber, limitNumber);
		// https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status/206
		const statusCode = news.length === total ? 200 : 206;
		return res
			.status(statusCode)
			.set('Accept-Ranges', 'news')
			.set(
				'Content-Range',
				`news ${skipNumber+1}-${news.length}/${total}`,
			)
			.send(news);
	} catch (err) {
		console.log(err);
		return res.status(500).send('Ocorreu um erro inesperado');
	}
});


router.post('/', authenticate, async (req: Request, res: Response, next: NextFunction) => {
	try {
		if (!req.body) {
			return res.status(400).send('The request\'s body cannot be empty');
		}
		const { title, content } = req.body;
		if (!title) {
			return res.status(400).send('The field "title" is required');
		}
		if (!content) {
			return res.status(400).send('The field "content" is required')
		}
		await newsController.create(title, content);
		return res.status(201).send({ success: true });
	} catch (err) {
		console.log(err);
		return res.status(500).send('An unexpected error occurred');
	}
});

router.get('/:id', authenticate, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;
		const isValid = ObjectId.isValid(id);
		if (!isValid) {
			return res.status(422).send('The provided ID is invalid');
		}
		const news = await newsController.findbyId(id);
		if (!news) {
			return res.status(404).send('News not found');
		}
		return res.status(200).send(news);
	} catch (err) {
		console.log(err);
		return res.status(500).send('An unexpected error occurred');
	}
});

router.patch('/:id', authenticate, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;
		const isValid = ObjectId.isValid(id);
		if (!isValid) {
			res.status(422).send('The provided ID is invalid');
		}
		const { title, content } = req.body;
		if (!title && !content) {
			res.status(400).send('There must be at least 1 field in the request\'s body');
		}
		const updated = await newsController.updateById(id, { title, content });
		if (updated.modifiedCount === 0) {
			return res.status(404).send('News not found');
		}
		return res.status(204).send({ success: true });
	} catch (err) {
		console.log(err);
		return res.status(500).send('An unexpected error occurred');
	}
});

router.delete('/:id', authenticate, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;
		const isValid = ObjectId.isValid(id);
		if (!isValid) {
			return res.status(422).send('The provided ID is invalid');
		}
		const deleted = await newsController.deleteById(id);
		if (!deleted) {
			return res.status(404).send('News not found');
		}
		return res.status(204).send({ success: true });
	} catch (err) {
		console.log(err);
		return res.status(500).send('An unexpected error occurred');
	}
});

export default router;