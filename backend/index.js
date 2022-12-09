import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import initializeDb from './db/dbinit';
import {
  authRoute,
  courseRoute,
  socialLoginRoute,
  assignmentRoute,
  groupRoute,
  userRoute,
  questionRoute,
  submissionRoute,
  postsRoute,
  materialRoute,
  lessonRoute,
} from './routes';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('short'));

app.use('/home', (req, res) => {
  res.status(200).send('Welcome to this awesome API!!');
});
const apiPath = '/api/v1';
app.use(`${apiPath}/auth`, authRoute);
app.use(`${apiPath}/social`, socialLoginRoute);
app.use(`${apiPath}/course`, courseRoute);
app.use(`${apiPath}/assignment`, assignmentRoute);
app.use(`${apiPath}/submission`, submissionRoute);
app.use(`${apiPath}/question`, questionRoute);
app.use(`${apiPath}/group`, groupRoute);
app.use(`${apiPath}/user`, userRoute);
app.use(`${apiPath}/post`, postsRoute);
app.use(`${apiPath}/material`, materialRoute);
app.use(`${apiPath}/lesson`, lessonRoute);

app.use((req, res) => {
  res.status(404).send({
    status: 'error',
    error: '404 Not Found !',
  });
});

app.listen(PORT, async () => {
  await initializeDb();
  console.log(`Listening on port: ${PORT}`);
});

export default app;
