import bodyParser from 'body-parser';
import express, { Application, Request, Response, NextFunction } from 'express';
import router from './apiRoutes';  // Consolidated route file
import { errorMiddleware } from './middleware/errorMiddleware';

const loggerMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const { method, url, headers, body } = req;
    const date = new Date().toISOString();
    console.log(`[${date}] ${method} ${url}`);
    next();
};

const app: Application = express();

app.use(bodyParser.json());
app.use(loggerMiddleware);

// Mounting the consolidated routes
app.use('/api', router);

app.use(errorMiddleware);

export default app;
