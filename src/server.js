import express from 'express';
import cors from 'cors';
import 'dotenv/config.js';
import { connectToDatabase } from './config/database.js';
import apiLoggerMiddleware from './middlewares/apiLogger.mdw.js';
import appRouter from './routes/index.js';
import handleErrorMiddleware from './middlewares/handleError.mdw.js';

const whitelist = [
  'http://localhost:3001',
  'http://localhost:5173',
  'https://vapi.vnappmob.com/api/province'
];

const corsOptions = {
  origin: (origin, callback) => {
    if (process.env.NODE_ENV === 'development') {
      return callback(null, true);
    }
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'PUT,PATCH,GET,DELETE,UPDATE'
};

const app = express();
const PORT = process.env.PORT;

connectToDatabase();

app.use(express.json());
app.use(cors(corsOptions));
app.use(apiLoggerMiddleware);

app.use('/api/v1', appRouter);

app.use(handleErrorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});
