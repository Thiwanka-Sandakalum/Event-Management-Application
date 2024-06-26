import { Request, Response, NextFunction } from 'express';
import { EventService } from '../services/eventService';
import { FilterEventsRequest, FilterEventsResponse, SearchEventsRequest, SearchEventsResponse } from '@types-server/index';
import { validationResult } from 'express-validator';
import { Prisma } from '@prisma/client';
import CustomError from '../utils/customError';
import { handlePrismaError } from '../utils/prismaErrorHandler';

export class SearchController {
    static async searchEvents(
        req: Request<{}, {}, {}, SearchEventsRequest>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ error: String(errors.array()) });
            }
            const keyword = req.query.keyword;

            const events = await EventService.searchEvents(keyword);
            res.status(200).json(events);
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                next(handlePrismaError(error));
            } else {
                next(new CustomError(`Failed to searchEvents `, 500));
            }
        }
    }

    static async filterEvents(
        req: Request<{}, {}, {}, FilterEventsRequest>,
        res: Response<FilterEventsResponse>,
        next: NextFunction
    ) {
        try {
            console.log('Incoming request:', req.query);
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log('Validation errors:', errors.array());
                return res.status(400).json({ error: String(errors.array()) });
            }

            const { date, location, category, page = '1', limit = '10' } = req.query;

            const categories = Array.isArray(category) ? category : category ? [category] : [];
            const parsedPage = parseInt(page as string, 10) || 1;
            const parsedLimit = parseInt(limit as string, 10) || 10;

            const events = await EventService.filterEvents(categories, date, location, parsedPage, parsedLimit);
            res.status(200).json(events);
        } catch (error) {

            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                next(handlePrismaError(error));
            } else {
                next(new CustomError(`Failed to filterEvents`, 500));
            }
        }
    }
}
