import dotenv from 'dotenv';
import app from './app';

dotenv.config();

app.listen(process.env.DB_PORT, () => {
  console.log('Ouvindo a porta: ', process.env.DB_PORT);
});
