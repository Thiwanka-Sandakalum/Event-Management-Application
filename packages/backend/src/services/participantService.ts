import { Prisma, PrismaClient, Participant } from '@prisma/client';

const prisma = new PrismaClient();

export class ParticipantService {
    /**
     * Adds a new participant to an event.
     * @param data - The data of the participant to be created.
     * @returns A Promise that resolves to the created participant.
     */
    static async addParticipant(data: Prisma.ParticipantCreateInput): Promise<Participant> {
        const participant = await prisma.participant.create({ data });
        return participant;
    }

    /**
     * Removes a participant from an event.
     * @param userId - The ID of the user.
     * @param eventId - The ID of the event.
     * @returns A Promise that resolves when the participant is successfully removed.
     */
    static async removeParticipant(userId: number, eventId: number): Promise<void> {
        await prisma.participant.delete({ where: { user_id_event_id: { user_id: userId, event_id: eventId } } });
    }

    /**
     * Retrieves all participants of an event.
     * @param eventId - The ID of the event.
     * @returns A Promise that resolves to an array of participants.
     */
    static async getEventParticipants(eventId: number): Promise<Participant[]> {
        const participants = await prisma.participant.findMany({ where: { event_id: eventId } });
        return participants;
    }

    /**
     * Retrieves a participant by their user ID and event ID.
     * @param userId - The ID of the user.
     * @param eventId - The ID of the event.
     * @returns A Promise that resolves to the participant if found, or null if not found.
     */
    static async getParticipantById(userId: number, eventId: number): Promise<Participant | null> {
        const participant = await prisma.participant.findUnique({ where: { user_id_event_id: { user_id: userId, event_id: eventId } } });
        return participant;
    }

    /**
     * Retrieves all participants.
     * @returns A Promise that resolves to an array of all participants.
     */
    static async getAllParticipants(): Promise<Participant[]> {
        const participants = await prisma.participant.findMany();
        return participants;
    }

    /**
     * Updates a participant's data.
     * @param userId - The ID of the user.
     * @param eventId - The ID of the event.
     * @param data - The updated data of the participant.
     * @returns A Promise that resolves to the updated participant.
     */
    static async updateParticipant(userId: number, eventId: number, data: Prisma.ParticipantUpdateInput): Promise<Participant> {
        const participant = await prisma.participant.update({
            where: { user_id_event_id: { user_id: userId, event_id: eventId } },
            data,
        });
        return participant;
    }
}
