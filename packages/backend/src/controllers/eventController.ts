import { Request, Response, NextFunction } from 'express';
import { EventService } from '../services/eventService';
import {
    CreateEventRequest,
    CreateEventResponse,
    GetEventsResponse,
    UpdateEventRequest,
    UpdateEventResponse,
    DeleteEventResponse,
} from '@types-server/index';
import { handlePrismaError } from '../utils/prismaErrorHandler';
import { Event, Prisma } from '@prisma/client';
import CustomError from '../utils/customError';
import { validationResult } from 'express-validator';

export class EventController {
    static async createEvent(
        req: Request<{ user_id: number }, {}, CreateEventRequest>,
        res: Response,
        next: NextFunction
    ) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        const user_id = Number(req.params.user_id);
        const { name, date, end_time, location, pricing_info, thumbnail_url, capacity, state, description } = req.body;
        const data = { user_id, name, date, end_time, location, pricing_info, thumbnail_url, capacity, state, description };

        try {
            const event = await EventService.createEvent(data);
            res.status(201).json(event);
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                next(handlePrismaError(error));
            } else {
                next(new CustomError('Failed to create event', 400));
            }
        }
    }

    static async getAllEvents(
        req: Request<{}, {}, {}>,
        res: Response<GetEventsResponse>,
        next: NextFunction
    ) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: String(errors.array()) });
        }

        try {
            const events = await EventService.getAllEvents();
            res.status(200).json(events);
        } catch (error) {
            next(new CustomError('Failed to retrieve events', 400));
        }
    }

    static async getEventById(
        req: Request<{ event_id: number }, {}, {}>,
        res: Response<UpdateEventResponse>,
        next: NextFunction
    ) {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: String(errors.array()) });
        }
        try {
            const event = await EventService.getEventById(Number(req.params.event_id));
            if (!event) {
                next(new CustomError(`Event not found for id ${req.params.event_id}`, 404));
            } else {
                res.status(200).json(event);
            }
        } catch (error) {
            next(new CustomError(`Failed to fetch event with id ${req.params.event_id}`, 400));
        }
    }

    static async updateEvent(
        req: Request<{ event_id: number, user_id: number }, {}, UpdateEventRequest>,
        res: Response,
        next: NextFunction
    ) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        const { event_id, user_id } = req.params;
        const { name, description, date, end_time, location, pricing_info, thumbnail_url, capacity, state } = req.body;

        const updateData = { user_id: Number(user_id), name, description, date, end_time, location, pricing_info, thumbnail_url, capacity, state };

        try {
            const event = await EventService.updateEvent(Number(event_id), updateData);

            if (!event) {
                return next(new CustomError('Event not found', 404));
            }
            res.status(200).json(event);
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                next(handlePrismaError(error));
            }
        }
    }

    static async deleteEvent(
        req: Request<{ event_id: number }, {}, {}>,
        res: Response,
        next: NextFunction
    ) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }
        try {
            await EventService.deleteEvent(Number(req.params.event_id));
            res.status(204).send();
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                next(new CustomError('Record to delete does not exist.', 400));

                if (error instanceof Prisma.PrismaClientKnownRequestError) {
                    next(handlePrismaError(error));
                } else {
                    next(new CustomError(`Failed to delete event with id ${req.params.event_id}`, 400));
                }
            }
        }
    }
}
