import { Event, Participant, Prisma, PrismaClient, User } from '@prisma/client';
import CustomError from '../utils/customError';

const prisma = new PrismaClient();

/**
 * Service class for managing user-related operations.
 */
export class UserService {
    /**
     * Registers a new user.
     * @param data - The user data to be created.
     * @returns The created user.
     */
    static async registerUser(data: Prisma.UserCreateInput): Promise<User> {
        const user = await prisma.user.create({ data });
        return user;
    }

    /**
     * Retrieves a user by their ID.
     * @param userId - The ID of the user to retrieve.
     * @returns The user with the specified ID, or null if not found.
     */
    static async getUserById(userId: number): Promise<User | null> {
        console.log(userId)
        return await prisma.user.findUnique({ where: { user_id: userId } });
    }

    /**
     * Updates a user with the specified ID.
     * @param userId - The ID of the user to update.
     * @param data - The updated user data.
     * @returns The updated user.
     */
    static async updateUser(userId: number, data: Prisma.UserUpdateInput): Promise<User> {
        const user = await prisma.user.update({
            where: { user_id: userId },
            data,
        });

        return user;
    }

    /**
     * Deletes a user with the specified ID.
     * @param userId - The ID of the user to delete.
     */
    static async deleteUser(userId: number): Promise<void> {
        await prisma.user.delete({ where: { user_id: userId } });
    }

    /**
     * Retrieves all events associated with a user.
     * @param userId - The ID of the user.
     * @returns An array of events associated with the user.
     * @throws CustomError if the user is not found.
     */
    static async getUserEvents(userId: number): Promise<Event[]> {
        const events = await prisma.event.findMany({
            where: { user_id: userId }
        });

        if (!events) {
            throw new CustomError(`User not found for id ${userId}`, 404);
        }

        return events;
    }

    /**
     * Retrieves all RSVPs (participants) associated with a user.
     * @param userId - The ID of the user.
     * @returns An array of participants associated with the user.
     * @throws CustomError if the user is not found.
     */
    static async getUserRSVPs(userId: number): Promise<Participant[]> {
        const participants = await prisma.participant.findMany({
            where: { user_id: userId }
        });

        if (!participants) {
            throw new CustomError(`User not found for id ${userId}`, 404);
        }

        return participants;
    }
}
