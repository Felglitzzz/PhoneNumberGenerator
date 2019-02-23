import express from 'express';
import bodyParser from 'body-parser';
import router from './routes';

const PORT = process.env.PORT || 3000;

const app = express();

app.get('/', (req, res) => res.status(200).send({
  message: 'welcome to random phone generator api',
}));

app.use(bodyParser.json());
app.use('/api/v1', router);

app.listen(PORT, () => {
  console.log(`PhoneNumberGeneratorAPI listening on port ${PORT}`);
});

export default app;
