import { Request, Response, NextFunction } from 'express';
import { ParticipantService } from '../services/participantService';
import { handlePrismaError } from '../utils/prismaErrorHandler';
import { Participant } from '@prisma/client';
import { validationResult } from 'express-validator';
import CustomError from '../utils/customError';
import { CreateRsvpRequest } from '@types-server/index';

export class ParticipantController {
    static async addParticipant(
        req: Request<{ user_id: string }, {}, CreateRsvpRequest>,
        res: Response,
        next: NextFunction
    ) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        const userId = Number(req.params.user_id);
        const { event_id, rsvp_date, payment_status } = req.body;
        const data = { user_id: userId, event_id, rsvp_date, payment_status };

        try {
            const participant = await ParticipantService.addParticipant(data);
            res.status(201).json(participant);
        } catch (error) {
            if (error instanceof Error && (error as any)?.code) {
                return next(handlePrismaError(error as any));
            }

            next(new CustomError('Failed to add participant', 500));
        }
    }

    static async removeParticipant(
        req: Request<{ user_id: string, event_id: string }, {}, {}>,
        res: Response,
        next: NextFunction
    ) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        const userId = Number(req.params.user_id);
        const eventId = Number(req.params.event_id);

        try {
            await ParticipantService.removeParticipant(userId, eventId);
            res.status(204).send();
        } catch (error) {
            // Check if the error is a PrismaClientKnownRequestError
            if (error instanceof Error && (error as any)?.code) { // Add a type assertion or type guard here
                return next(handlePrismaError(error as any)); // Adjust this line according to your handlePrismaError function
            }

            next(new CustomError(`Failed to remove participant with user_id ${userId} and event_id ${eventId}`, 500));
        }
    }

    static async updateParticipant(
        req: Request<{ user_id: string, event_id: string }, {}, Participant>,
        res: Response,
        next: NextFunction
    ) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        const userId = Number(req.params.user_id);
        const eventId = Number(req.params.event_id);
        const { rsvp_date, payment_status } = req.body;
        const data = { user_id: userId, event_id: eventId, rsvp_date, payment_status };

        try {
            const updatedParticipant = await ParticipantService.updateParticipant(userId, eventId, data);
            res.status(200).json(updatedParticipant);
        } catch (error) {
            // Check if the error is a PrismaClientKnownRequestError
            if (error instanceof Error && (error as any)?.code) { // Add a type assertion or type guard here
                if ((error as any).code === 'P2002') {
                    return next(new CustomError('Duplicate entry', 400));
                }
                return next(handlePrismaError(error as any)); // Adjust this line according to your handlePrismaError function
            }

            next(new CustomError(`Failed to update participant with user_id ${userId} and event_id ${eventId}`, 500));
        }
    }


    static async getUserRSVPsdetails(
        req: Request<{ event_id: string, user_id: string }, {}, {}>,
        res: Response,
        next: NextFunction
    ) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }
        const eventId = Number(req.params.event_id);
        const userId = Number(req.params.user_id);


        try {
            const participants = await ParticipantService.getParticipantById(userId, eventId);
            if (!participants || participants === null) {
                return res.status(404).json({ error: 'No participants found' });
            }
            res.status(200).json(participants);

        } catch (error) {
            // Check if the error is a PrismaClientKnownRequestError
            if (error instanceof Error && (error as any)?.code) { // Add a type assertion or type guard here
                return next(handlePrismaError(error as any)); // Adjust this line according to your handlePrismaError function
            }

            next(new CustomError(`Failed to get participants for event with id ${eventId}`, 500));
        }
    }

    static async getEventParticipants(
        req: Request<{ event_id: string }, {}, {}>,
        res: Response,
        next: NextFunction
    ) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }
        const eventId = Number(req.params.event_id);

        try {
            const participants = await ParticipantService.getEventParticipants(eventId);
            res.status(200).json(participants);
        } catch (error) {

            if (error instanceof Error && (error as any)?.code) {
                return next(handlePrismaError(error as any));
            }

            next(new CustomError(`Failed to get participants for event with id ${eventId}`, 500));
        }
    }
}
