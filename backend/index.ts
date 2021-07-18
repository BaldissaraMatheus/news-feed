import express from 'express';
import newsRoutes from './src/news/news.routes';

const port = 4000;
const app = express();

async function startServer() {
  try {
    app.use(express.json())
    app.use(express.urlencoded({ extended: true}))
    app.use((req, res, next) => {
      res.header(
        'Access-Control-Allow-Headers',
        'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
      );
      res.header('Access-Control-Expose-Headers', 'Content-Range');
      next();
    });
    app.use('/news', newsRoutes);
    app.listen(port, () => {
      console.log(`Servidor sendo executado em https://localhost:${port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

startServer();
