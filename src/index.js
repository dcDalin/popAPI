import express from 'express';

const app = express();

const PORT = 4000;

app.get('/', (req, res) => {
  res.send('hello world');
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running at port ${PORT}`);
});
