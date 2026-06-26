import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = Number(process.env.PORT) || 8000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-backend' });
});

app.get('/', (_req, res) => {
  res.send('Octofit Tracker backend is running');
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Octofit backend listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });
