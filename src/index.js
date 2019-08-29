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

app.get('/', (req, res) => {
  res
    .status(200)
    .redirect(
      'https://documenter.getpostman.com/preview/3662708-ad4e72d0-0a38-4d17-8cb8-fcf4c4416e7c?versionTag=latest&apiName=CURRENT&version=latest&top-bar=ffffff&right-sidebar=303030&highlight=ef5b25#4b707fdf-d1da-4cd0-a26a-a4f9bc4f5414',
    );
});

app.use('/api/county', countyRouter);
app.use('/api/sub-county', subCountyRouter);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));

export default app;
