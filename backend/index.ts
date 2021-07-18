import express from 'express';
import newsRoutes from './src/news/news.routes';

const port = 4000;
const app = express();

async function startServer() {
  try {
    app.use(express.json())
    app.use(express.urlencoded({ extended: true}))
    app.use('/news', newsRoutes);
    app.listen(port, () => {
      console.log(`Servidor sendo executado em https://localhost:${port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

startServer();
