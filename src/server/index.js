import express from 'express';

const PORT = process.env.PORT || 3000;

const app = express();

app.get('/', (req, res) => res.status(200).send({
  message: 'welcome to random phone generator api',
}));
app.listen(PORT, () => {
  console.log(`PhoneNumberGeneratorAPI listening on port ${PORT}`);
});
