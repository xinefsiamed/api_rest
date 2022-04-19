import app from './app';

const port = 3001;

app.listen(port, () => {
  console.log(`app listen at port ${port}`); // eslint-disable-line
  console.log('CTRL + http://localhost:3001'); // eslint-disable-line
});
