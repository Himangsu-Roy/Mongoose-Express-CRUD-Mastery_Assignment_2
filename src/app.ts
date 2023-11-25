import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import { UserRoutes } from './app/modules/user/user.route';

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cors
app.use(cors());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

// Application routes
app.use('/api/users', UserRoutes);

// landing route
app.get('/', (req: Request, res: Response) => {
  res.send('Node.js, Express, MongoDB, TypeScript CRUD Application Server is Running');
});

export default app;
