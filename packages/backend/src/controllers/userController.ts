import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/userService';
import { Prisma } from '@prisma/client';
import CustomError from '../utils/customError';
import { handlePrismaError } from '../utils/prismaErrorHandler';
import { validationResult } from 'express-validator';
import { CreateUserRequest } from '@types-server/index';

export class UserController {
    /**
     * Registers a new user.
     * @param req - The request object.
     * @param res - The response object.
     * @param next - The next middleware function.
     * @returns The registered user.
     */
    static async registerUser(req: Request<{}, {}, CreateUserRequest>, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { username, email, password_hash, first_name = undefined, last_name, bio = undefined, profile_picture_url = undefined, social_links = undefined, address = undefined } = req.body;
            const userData = { username, email, password_hash, first_name, last_name, bio, profile_picture_url, social_links, address };

            const user = await UserService.registerUser(userData);
            res.status(201).json(user);
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    const target = error.meta?.target as string[];
                    if (target.includes('User_username_key')) {
                        next(new CustomError('Username already exists', 400));
                    } else if (target.includes('User_email_key')) {
                        next(new CustomError('Email already exists', 400));
                    } else {
                        next(handlePrismaError(error));
                    }
                } else {
                    next(handlePrismaError(error));
                }
            } else {
                next(new CustomError('Failed to register user', 500));
            }
        }
    }

    /**
     * Gets a user by their ID.
     * @param req - The request object.
     * @param res - The response object.
     * @param next - The next middleware function.
     * @returns The user with the specified ID.
     */
    static async getUserById(req: Request<{ user_id: number }>, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const user = await UserService.getUserById(Number(req.params.user_id));
            if (!user) {
                next(new CustomError(`User not found for id ${req.params.user_id}`, 404));
            } else {
                res.status(200).json(user);
            }
        } catch (error) {
            next(new CustomError(`Failed to fetch user with id ${req.params.user_id}`, 500));
        }
    }

    /**
     * Updates a user.
     * @param req - The request object.
     * @param res - The response object.
     * @param next - The next middleware function.
     * @returns The updated user.
     */
    static async updateUser(req: Request<{ user_id: number }>, res: Response, next: NextFunction) {
        try {
            // Validate request
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            // Clean up request body
            const { password_hash, first_name = undefined, last_name, bio = undefined, profile_picture_url = undefined, social_links = undefined, address = undefined } = req.body;
            const updateData = { password_hash, first_name, last_name, bio, profile_picture_url, social_links, address };

            const user = await UserService.updateUser(Number(req.params.user_id), updateData);
            res.status(200).json(user);
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                next(handlePrismaError(error));
            }
            next(new CustomError('Failed to update user', 500));
        }
    }

    /**
     * Deletes a user.
     * @param req - The request object.
     * @param res - The response object.
     * @param next - The next middleware function.
     */
    static async deleteUser(req: Request<{ user_id: number }>, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            await UserService.deleteUser(Number(req.params.user_id));
            res.status(204).send();
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                next(handlePrismaError(error));
            } else {
                next(new CustomError(`Failed to delete user with id ${req.params.user_id}`, 500));
            }
        }
    }

    /**
     * Gets the events associated with a user.
     * @param req - The request object.
     * @param res - The response object.
     * @param next - The next middleware function.
     * @returns The events associated with the user.
     */
    static async getUserEvents(req: Request<{ user_id: number }>, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const userId = Number(req.params.user_id);
            const events = await UserService.getUserEvents(userId);
            res.status(200).json(events);
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                next(handlePrismaError(error));
            } else {
                next(new CustomError(`Failed to get User Events user with id ${req.params.user_id}`, 500));
            }
        }
    }

    /**
     * Gets the RSVPs of a user.
     * @param req - The request object.
     * @param res - The response object.
     * @param next - The next middleware function.
     * @returns The RSVPs of the user.
     */
    static async getUserRSVPs(req: Request<{ user_id: number }>, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const userId = Number(req.params.user_id);
            const rsvps = await UserService.getUserRSVPs(userId);
            res.status(200).json(rsvps);
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                next(handlePrismaError(error));
            } else {
                next(new CustomError(`Failed to get User RSVPs with id ${req.params.user_id}`, 500));
            }
        }
    }
}
