import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import initializeDb from './db/dbinit';
import userRoute from './routes/userRoute';
import socialLoginRoute from './routes/socialLoginRoute';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('short'));

app.use('/api/v1/auth', socialLoginRoute);

app.use('/api/v1/auth', userRoute);

app.use((req, res) => {
  res.status(404).send({
    status: 404,
    error: 'Not Found !',
  });
});

app.listen(PORT, async () => {
  await initializeDb();
  console.log(`Listening on port: ${PORT}`);
});

export default app;
