import dotenv from 'dotenv';
dotenv.config(); // 👈 MUST be FIRST

import express from 'express';
import cors from 'cors';
import summarizeRoute from './routes/summarizeRoute.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/summarize', summarizeRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
