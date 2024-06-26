import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import CustomError from '../utils/customError';
import { handlePrismaError } from '../utils/prismaErrorHandler';

export function errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
    console.error(err);

    let customError: CustomError;

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        customError = handlePrismaError(err);
    } else if (err instanceof CustomError) {
        customError = err;
    } else {
        customError = new CustomError('Internal Server Error', 500, false);
    }

    res.status(customError.statusCode).json({ error: customError.message });
}
