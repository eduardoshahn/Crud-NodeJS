import app from './app';

app.listen(process.env.DB_PORT, () => {
  console.log('Ouvindo a porta: ', process.env.DB_PORT);
});
