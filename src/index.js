import express from 'express';
import bodyParser from 'body-parser';
import countyRouter from './routes/county';
import subCountyRouter from './routes/sub-county';

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

const { PORT } = process.env;

app.use(bodyParser.json());

app.use('/api/county', countyRouter);
app.use('/api/sub-county', subCountyRouter);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));

export default app;
