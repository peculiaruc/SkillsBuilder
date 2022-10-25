import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('short'));

app.use('/api/v1/', (req, res) => {
    res.status(200).send('Welcome to this awesome API')
});

app.use((req, res) => {
  res.status(404).send({
    status: 404,
    error: 'Not Found !',
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

export default app;